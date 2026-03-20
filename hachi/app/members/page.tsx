"use client";

import { motion } from "framer-motion";
import { ArrowLeft, User, Loader2 } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface Member {
  name: string;
  email: string;
  photoURL?: string;
}

export default function MembersPage() {
  const { householdId, loading: authLoading } = useAuth();
  const [members, setMembers] = useState<Member[]>([]);
  const [householdName, setHouseholdName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMembers() {
      if (!householdId) return;
      
      try {
        // Fetch household name
        const householdRef = doc(db, "households", householdId);
        const householdSnap = await getDoc(householdRef);
        if (householdSnap.exists()) {
          setHouseholdName(householdSnap.data().name);
        }

        // Fetch users in this household
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("householdId", "==", householdId));
        const querySnapshot = await getDocs(q);
        
        const memberList: Member[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          memberList.push({
            name: data.displayName || "Anonymous",
            email: data.email,
            photoURL: data.photoURL
          });
        });
        
        setMembers(memberList);
      } catch (err) {
        console.error("Error fetching members:", err);
      } finally {
        setLoading(false);
      }
    }

    if (householdId) {
      fetchMembers();
    } else if (!authLoading) {
      setLoading(false);
    }
  }, [householdId, authLoading]);

  if (loading || authLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <Loader2 className="animate-spin text-primary" size={48} />
      </div>
    );
  }

  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground font-outfit">
      {/* Header */}
      <header className="p-6 flex items-center justify-between border-b border-gray-100 dark:border-zinc-800 sticky top-0 bg-background/80 backdrop-blur-md z-10">
        <div className="flex items-center gap-4">
          <Link 
            href="/"
            className="p-2.5 rounded-2xl bg-gray-50 dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <ArrowLeft size={24} />
          </Link>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-primary dark:text-gray-100">
              Family Members
            </h1>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{householdName || householdId}</p>
          </div>
        </div>
        
        <div className="bg-gray-100 dark:bg-zinc-800 text-black dark:text-white px-4 py-1.5 rounded-xl text-xs font-bold border border-gray-200 dark:border-zinc-700">
          ID: {householdId}
        </div>
      </header>

      <div className="flex-1 px-4 py-8 max-w-lg mx-auto w-full">
        {members.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 font-medium">No other members yet.</p>
            <p className="text-xs text-gray-400 mt-2">Share your household ID to invite family!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {members.map((member, index) => (
              <motion.div
                key={member.email}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center gap-4 p-5 bg-white dark:bg-zinc-900 rounded-[32px] border border-gray-50 dark:border-zinc-800 shadow-sm"
              >
                <div className="w-14 h-14 rounded-2xl bg-gray-100 dark:bg-zinc-800 flex items-center justify-center text-black dark:text-white overflow-hidden border border-gray-200 dark:border-zinc-700">
                  {member.photoURL ? (
                    <img src={member.photoURL} alt={member.name} className="w-full h-full object-cover grayscale" />
                  ) : (
                    <User size={28} />
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-black dark:text-gray-100">{member.name}</h3>
                  <p className="text-xs font-bold text-gray-400">
                    {member.email}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <div className="mt-12 p-8 bg-gray-50 dark:bg-zinc-900/50 rounded-[40px] border border-dashed border-gray-200 dark:border-zinc-800 text-center">
          <h4 className="font-bold text-black dark:text-gray-200 mb-2">Invite your Family</h4>
          <p className="text-sm text-gray-500 mb-6">Ask them to enter this code when they sign up:</p>
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-gray-100 dark:border-zinc-800 shadow-sm">
            <span className="text-4xl font-extrabold tracking-[0.3em] text-black dark:text-white">{householdId}</span>
          </div>
        </div>
      </div>
    </main>
  );
}

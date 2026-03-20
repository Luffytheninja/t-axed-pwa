"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Home, LogOut, Search, Plus, ArrowRight } from "lucide-react";
import { doc, setDoc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { User } from "firebase/auth";

interface HouseholdSelectionProps {
  user: User;
  onHouseholdJoined: (id: string) => void;
  onLogout: () => void;
}

export default function HouseholdSelection({ user, onHouseholdJoined, onLogout }: HouseholdSelectionProps) {
  const [mode, setMode] = useState<"choice" | "create" | "join">("choice");
  const [householdName, setHouseholdName] = useState("");
  const [householdIdInput, setHouseholdIdInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreate = async () => {
    if (!householdName.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const householdId = Math.random().toString(36).substring(2, 8).toUpperCase();
      const householdRef = doc(db, "households", householdId);
      
      await setDoc(householdRef, {
        name: householdName,
        createdBy: user.uid,
        createdAt: new Date().toISOString(),
        members: [user.uid]
      });

      // Update user profile
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        householdId: householdId
      });

      onHouseholdJoined(householdId);
    } catch (err) {
      console.error(err);
      setError("Failed to create household. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleJoin = async () => {
    if (!householdIdInput.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const householdRef = doc(db, "households", householdIdInput.toUpperCase());
      const householdSnap = await getDoc(householdRef);

      if (!householdSnap.exists()) {
        setError("Household not found. Check the code.");
        return;
      }

      const householdData = householdSnap.data();
      const currentMembers = householdData.members || [];
      
      if (!currentMembers.includes(user.uid)) {
        await updateDoc(householdRef, {
          members: [...currentMembers, user.uid]
        });
      }

      // Update user profile
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        householdId: householdIdInput.toUpperCase()
      });

      onHouseholdJoined(householdIdInput.toUpperCase());
    } catch (err) {
      console.error(err);
      setError("Failed to join household. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background overflow-hidden relative font-outfit">
      {/* Background Decorations */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-black/5 dark:bg-white/5 rounded-full blur-3xl" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-black/5 dark:bg-white/5 rounded-full blur-3xl" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-sm relative z-10"
      >
        <div className="mb-8 flex flex-col items-center">
          <div className="w-16 h-16 bg-black dark:bg-white rounded-2xl flex items-center justify-center text-white dark:text-black shadow-xl mb-4">
            <Home size={32} />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-black dark:text-white">Setup Household</h1>
          <p className="text-gray-500 mt-1">Connect with your family members.</p>
        </div>

        <div className="bg-white dark:bg-zinc-900 p-8 rounded-[40px] shadow-2xl border border-gray-100 dark:border-zinc-800">
          {mode === "choice" && (
            <div className="space-y-4">
              <button
                onClick={() => setMode("create")}
                className="w-full flex items-center justify-between p-6 rounded-3xl bg-black dark:bg-white text-white dark:text-black hover:opacity-90 transition-all group"
              >
                <div className="text-left">
                  <p className="text-sm font-medium opacity-80">New Family</p>
                  <p className="text-xl font-bold">Create Household</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-gray-400/20 dark:bg-black/20 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                  <Plus size={24} />
                </div>
              </button>

              <button
                onClick={() => setMode("join")}
                className="w-full flex items-center justify-between p-6 rounded-3xl bg-gray-100 dark:bg-zinc-800 text-black dark:text-white hover:bg-gray-200 transition-all group border border-gray-200 dark:border-zinc-700"
              >
                <div className="text-left">
                  <p className="text-sm font-medium opacity-80">Existing Family</p>
                  <p className="text-xl font-bold">Join Household</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-black/5 dark:bg-white/10 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                  <Search size={24} />
                </div>
              </button>
            </div>
          )}

          {mode === "create" && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-400 uppercase tracking-widest mb-2 px-1">Household Name</label>
                <input 
                  type="text"
                  placeholder="e.g. Ogunjobi Home"
                  value={householdName}
                  onChange={(e) => setHouseholdName(e.target.value)}
                  className="w-full p-4 rounded-2xl bg-gray-50 dark:bg-zinc-800 border border-transparent focus:border-black dark:focus:border-white outline-none transition-all font-bold text-lg"
                />
              </div>
              <button
                disabled={loading || !householdName.trim()}
                onClick={handleCreate}
                className="w-full py-4 rounded-2xl bg-black dark:bg-white text-white dark:text-black font-bold text-lg shadow-lg disabled:opacity-50 transition-all flex items-center justify-center gap-2"
              >
                {loading ? "Creating..." : <>Create Household <ArrowRight size={20} /></>}
              </button>
              <button 
                onClick={() => setMode("choice")}
                className="w-full text-center text-sm font-bold text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
              >
                Go Back
              </button>
            </div>
          )}

          {mode === "join" && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-400 uppercase tracking-widest mb-2 px-1">Household Code</label>
                <input 
                  type="text"
                  placeholder="Enter 6-digit code"
                  value={householdIdInput}
                  onChange={(e) => setHouseholdIdInput(e.target.value)}
                  className="w-full p-4 rounded-2xl bg-gray-50 dark:bg-zinc-800 border border-transparent focus:border-black dark:focus:border-white outline-none transition-all font-bold text-lg uppercase text-center tracking-[0.3em]"
                  maxLength={6}
                />
              </div>
              {error && <p className="text-gray-500 text-sm font-bold text-center">{error}</p>}
              <button
                disabled={loading || householdIdInput.length < 4}
                onClick={handleJoin}
                className="w-full py-4 rounded-2xl bg-black dark:bg-white text-white dark:text-black font-bold text-lg shadow-lg disabled:opacity-50 transition-all flex items-center justify-center gap-2"
              >
                {loading ? "Joining..." : <>Join Family <ArrowRight size={20} /></>}
              </button>
              <button 
                onClick={() => setMode("choice")}
                className="w-full text-center text-sm font-bold text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
              >
                Go Back
              </button>
            </div>
          )}
        </div>

        <button 
          onClick={onLogout}
          className="mt-8 mx-auto flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-red-500 transition-colors"
        >
          <LogOut size={16} /> Sign out of {user.email}
        </button>
      </motion.div>
    </div>
  );
}

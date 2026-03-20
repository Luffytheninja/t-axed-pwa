"use client";

import { useState, useEffect } from "react";
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  onAuthStateChanged, 
  signOut, 
  User 
} from "firebase/auth";
import { doc, setDoc, onSnapshot } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [householdId, setHouseholdId] = useState<string | null>(null);
  const [walletBalance, setWalletBalance] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribeUser: (() => void) | null = null;

    const unsubscribeAuth = onAuthStateChanged(auth, async (firebaseUser) => {
      if (unsubscribeUser) {
        unsubscribeUser();
        unsubscribeUser = null;
      }

      if (firebaseUser) {
        const userRef = doc(db, "users", firebaseUser.uid);
        
        // Listen to user profile changes
        unsubscribeUser = onSnapshot(userRef, async (docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data();
            setHouseholdId(data.householdId || null);
            setWalletBalance(data.walletBalance || 0);
          } else {
            // Create profile if missing
            await setDoc(userRef, {
              email: firebaseUser.email,
              displayName: firebaseUser.displayName,
              photoURL: firebaseUser.photoURL,
              householdId: null,
              walletBalance: 0,
              createdAt: new Date().toISOString()
            });
            setHouseholdId(null);
            setWalletBalance(0);
          }
          setLoading(false);
        });

        setUser(firebaseUser);
      } else {
        setUser(null);
        setHouseholdId(null);
        setWalletBalance(0);
        setLoading(false);
      }
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeUser) unsubscribeUser();
    };
  }, []);

  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const loginWithGoogle = async () => {
    if (isLoggingIn) return;
    setIsLoggingIn(true);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error: unknown) {
      if (error && typeof error === "object" && "code" in error && error.code !== "auth/popup-closed-by-user") {
        console.error("Error signing in with Google:", error);
      }
    } finally {
      setIsLoggingIn(false);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return { user, householdId, walletBalance, loading, loginWithGoogle, logout };
}

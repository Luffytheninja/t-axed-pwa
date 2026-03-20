"use client";

import { useAuth } from "@/hooks/useAuth";
import { LogIn, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import SplashScreens from "./SplashScreens";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading, loginWithGoogle } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [hasSeenSplash, setHasSeenSplash] = useState(true); // default true to avoid flicker

  useEffect(() => {
    setMounted(true);
    // Check if they've seen the splash screens
    const seen = localStorage.getItem("hachi_has_seen_splash");
    if (!seen) {
      setHasSeenSplash(false);
    }
  }, []);

  const handleSplashComplete = () => {
    localStorage.setItem("hachi_has_seen_splash", "true");
    setHasSeenSplash(true);
  };

  // Avoid hydration mismatch
  if (!mounted) {
    return <div className="min-h-screen bg-background" />;
  }

  console.log("AuthGuard: State ->", { loading, userEmail: user?.email });

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <Loader2 className="animate-spin text-primary" size={48} />
      </div>
    );
  }

  if (!user) {
    if (!hasSeenSplash) {
      return <SplashScreens onComplete={handleSplashComplete} />;
    }

    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-background overflow-hidden relative">
        {/* Background Decorations */}
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-black/5 dark:bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-black/5 dark:bg-white/5 rounded-full blur-3xl" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm text-center relative z-10"
        >
          <div className="mb-8 flex flex-col items-center">
            <div className="relative w-24 h-24 mb-6 drop-shadow-2xl transform rotate-3 transition-transform hover:rotate-6">
              <img src="/images/logo.webp" alt="Hachi Logo" className="w-full h-full object-contain grayscale" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-black dark:text-white mb-2">Hachi</h1>
            <p className="text-gray-500 font-medium">Shared groceries for the family.</p>
          </div>

          <div className="bg-white dark:bg-zinc-900 p-8 rounded-[40px] shadow-xl border border-gray-100 dark:border-zinc-800">
            <h2 className="text-xl font-bold mb-6 text-gray-800 dark:text-gray-100">Welcome back</h2>
            
            <button
              onClick={loginWithGoogle}
              className="w-full flex items-center justify-center gap-3 py-4 px-6 rounded-2xl bg-black dark:bg-white text-white dark:text-black hover:opacity-90 transition-all active:scale-95 group"
            >
              <LogIn size={20} />
              <span className="font-bold">Sign in with Google</span>
            </button>
            
            <p className="mt-8 text-xs text-gray-400 leading-relaxed px-4">
              By signing in, you agree to share your grocery list with other family members.
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  return <>{children}</>;
}

"use client";

import { useWallet } from "@/hooks/useWallet";
import { useAuth } from "@/hooks/useAuth";
import { ArrowLeft, Plus, History, Wallet, TrendingUp } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function WalletPage() {
  const { user, walletBalance, loading } = useAuth();
  const { initiateTopUp } = useWallet();
  const [amount, setAmount] = useState("");
  const [isToppingUp, setIsToppingUp] = useState(false);

  const handleTopUp = async () => {
    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum <= 0) return;
    
    setIsToppingUp(true);
    initiateTopUp(amountNum, () => {
      setIsToppingUp(false);
      setAmount("");
    });
  };

  if (!user && !loading) {
     return <div className="p-8 text-center">Please log in to view your wallet.</div>
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
            <h1 className="text-xl font-bold tracking-tight text-black dark:text-white">
              My Wallet
            </h1>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Manage your funds</p>
          </div>
        </div>
      </header>

      <div className="flex-1 px-4 py-8 max-w-lg mx-auto w-full">
        {/* Balance Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden bg-black dark:bg-zinc-900 rounded-[40px] p-8 text-white shadow-2xl mb-8"
        >
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-12">
               <div>
                  <p className="text-zinc-400 text-sm font-medium mb-1">Total Balance</p>
                  <h2 className="text-5xl font-black tracking-tight">₦{walletBalance.toLocaleString()}</h2>
               </div>
               <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md border border-white/10">
                  <Wallet size={24} className="text-white" />
               </div>
            </div>

            <div className="flex items-center gap-2 text-zinc-400 text-xs font-bold uppercase tracking-widest bg-white/5 w-fit px-3 py-1.5 rounded-full border border-white/5">
                <TrendingUp size={14} className="text-green-400" />
                Active Funds
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -ml-32 -mb-32" />
        </motion.div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4 mb-10">
           <button 
             onClick={() => setIsToppingUp(true)}
             className="flex flex-col items-center gap-3 p-6 bg-white dark:bg-zinc-900 rounded-[32px] border border-gray-100 dark:border-zinc-800 shadow-sm hover:border-black dark:hover:border-white transition-all group"
           >
              <div className="p-3 bg-gray-50 dark:bg-zinc-800 rounded-2xl group-hover:bg-black dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-black transition-colors">
                 <Plus size={24} />
              </div>
              <span className="text-sm font-bold">Top Up</span>
           </button>
           <button className="flex flex-col items-center gap-3 p-6 bg-white dark:bg-zinc-900 rounded-[32px] border border-gray-100 dark:border-zinc-800 shadow-sm hover:border-black dark:hover:border-white transition-all group opacity-50 cursor-not-allowed">
              <div className="p-3 bg-gray-50 dark:bg-zinc-800 rounded-2xl transition-colors">
                 <History size={24} />
              </div>
              <span className="text-sm font-bold">History</span>
           </button>
        </div>

        {/* Top Up Form (Dynamic) */}
        <AnimatePresence>
          {isToppingUp && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-gray-50 dark:bg-zinc-900/50 rounded-[40px] p-8 border border-gray-100 dark:border-zinc-800 mb-8"
            >
              <h3 className="text-lg font-bold mb-6 text-black dark:text-gray-100">Top Up Amount</h3>
              <div className="flex gap-4 mb-6">
                 {[1000, 5000, 10000].map(val => (
                   <button 
                     key={val}
                     onClick={() => setAmount(val.toString())}
                     className="flex-1 py-3 px-4 rounded-2xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 text-sm font-bold hover:border-black dark:hover:border-white transition-all"
                   >
                     ₦{val.toLocaleString()}
                   </button>
                 ))}
              </div>
              <div className="relative mb-8">
                 <input 
                   type="number"
                   value={amount}
                   onChange={(e) => setAmount(e.target.value)}
                   placeholder="Custom amount"
                   className="w-full h-16 px-6 bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all text-xl font-bold"
                 />
                 <span className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 font-bold">₦</span>
              </div>
              <div className="flex gap-4">
                 <button 
                   onClick={() => setIsToppingUp(false)}
                   className="flex-1 h-14 rounded-2xl border border-gray-200 dark:border-zinc-800 font-bold transition-all hover:bg-gray-100 dark:hover:bg-zinc-800"
                 >
                   Cancel
                 </button>
                 <button 
                   disabled={!amount || parseFloat(amount) <= 0}
                   onClick={handleTopUp}
                   className="flex-[2] h-14 bg-black dark:bg-white text-white dark:text-black rounded-2xl font-bold transition-all hover:scale-[1.02] disabled:opacity-50 disabled:grayscale"
                 >
                   Proceed to Pay
                 </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Transactions Placeholder */}
        <div className="mt-4">
           <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-6 px-1 flex items-center gap-2">
             Recent Activity <span className="w-2 h-2 rounded-full bg-gray-200 dark:bg-zinc-800"></span>
           </h3>
           <div className="text-center py-20 border-2 border-dashed border-gray-100 dark:border-zinc-800 rounded-[40px] text-gray-400 text-sm font-medium">
             No recent transactions! 🕊️
           </div>
        </div>
      </div>
    </main>
  );
}

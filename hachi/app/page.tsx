"use client";

import { useState } from "react";
import GroceryItemCard from "@/components/GroceryItem";
import AddItemModal from "@/components/AddItemModal";
import HouseholdSelection from "@/components/HouseholdSelection";
import { useGroceryItems } from "@/hooks/useGroceryItems";
import { Plus, Users, LayoutDashboard, Loader2, LogOut, Wallet } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/hooks/useAuth";

export default function Home() {
  const { user, householdId, walletBalance, loading: authLoading, logout } = useAuth();
  const { items, loading: itemsLoading, addItem, updateStatus, clearBoughtItems } = useGroceryItems(householdId || "pending");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddItem = async (name: string, quantity: string) => {
    await addItem(name, quantity, user?.displayName || "Anonymous");
  };

  if (authLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <Loader2 className="animate-spin text-primary" size={48} />
      </div>
    );
  }

  if (!user) return null; // AuthGuard handles this usually

  if (!householdId) {
    return (
      <HouseholdSelection 
        user={user} 
        onHouseholdJoined={() => {}} // useAuth will update automatically via onSnapshot
        onLogout={logout} 
      />
    );
  }

  const needed = items.filter(i => i.status === "needed");
  const buying = items.filter(i => i.status === "buying");
  const bought = items.filter(i => i.status === "bought");

  return (
    <main className="flex min-h-screen flex-col bg-background text-foreground pb-24 overflow-x-hidden font-outfit">
      {/* Header */}
      <header className="sticky top-0 z-10 p-6 bg-background/80 backdrop-blur-md flex items-center justify-between border-b border-gray-100 dark:border-zinc-800">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-black dark:bg-white rounded-xl flex items-center justify-center text-white dark:text-black shadow-lg">
            <LayoutDashboard size={20} />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-black dark:text-white flex items-center gap-2">
              Hachi <Image src="/images/logo.webp" alt="logo" width={24} height={24} className="object-contain grayscale" />
            </h1>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{householdId}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link 
            href="/wallet"
            className="flex items-center gap-2 pr-3 pl-1 py-1 rounded-2xl bg-gray-50 dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-all text-black dark:text-white"
          >
            <div className="p-1.5 rounded-xl bg-black dark:bg-white text-white dark:text-black">
              <Wallet size={16} />
            </div>
            <span className="text-sm font-bold tracking-tight">₦{walletBalance.toLocaleString()}</span>
          </Link>
          <Link 
            href="/members"
            className="p-2.5 rounded-2xl bg-gray-50 dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-all text-black dark:text-white"
          >
            <Users size={20} />
          </Link>
          <button 
            onClick={logout}
            className="p-2.5 rounded-2xl bg-gray-100 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-800 transition-all text-gray-600 dark:text-gray-400"
          >
            <LogOut size={20} />
          </button>
        </div>
      </header>

      {/* Content */}
      <div className="flex-1 px-4 py-8 max-w-lg mx-auto w-full">
        {/* Items List */}

        {itemsLoading ? (
          <div className="flex justify-center py-20">
             <Loader2 className="animate-spin text-primary" size={48} />
          </div>
        ) : items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center animate-in fade-in zoom-in duration-500">
            <div className="relative w-64 h-64 mb-6">
              <Image 
                src="/images/empty-list.png" 
                alt="Empty list" 
                fill 
                className="object-contain grayscale dark:invert"
              />
            </div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">The grocery list is empty</h3>
            <p className="text-gray-400 mt-2 px-8">Tap the + button below to add your first item and start sharing!</p>
          </div>
        ) : (
          <>
            {/* Needed Section */}
            <section className="mb-10">
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-5 px-1 flex items-center gap-2">
                Needed <span className="w-2 h-2 rounded-full bg-needed"></span>
              </h2>
              <AnimatePresence mode="popLayout">
                {needed.length > 0 ? (
                  needed.map(item => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ type: "spring", damping: 25, stiffness: 350 }}
                    >
                      <GroceryItemCard item={item} onStatusChange={updateStatus} />
                    </motion.div>
                  ))
                ) : (
                  <motion.div 
                    layout
                    className="flex flex-col items-center justify-center py-8 border-2 border-dashed border-gray-100 dark:border-zinc-800 rounded-[32px]"
                  >
                    <div className="relative w-40 h-40 mb-4">
                      <Image 
                        src="/images/nothing-needed.png" 
                        alt="Nothing needed" 
                        fill 
                        className="object-contain grayscale dark:invert opacity-60"
                      />
                    </div>
                    <p className="text-gray-400 font-medium">Nothing needed right now! ✨</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </section>

            {/* Buying Section */}
            {buying.length > 0 && (
              <section className="mb-10">
                <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-black dark:text-white mb-5 px-1 flex items-center gap-2">
                  Buying <span className="w-2 h-2 rounded-full bg-black dark:bg-white animate-pulse"></span>
                </h2>
                <AnimatePresence mode="popLayout">
                  {buying.map(item => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ type: "spring", damping: 25, stiffness: 350 }}
                    >
                      <GroceryItemCard item={item} onStatusChange={updateStatus} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </section>
            )}

            {/* Bought Section */}
            {bought.length > 0 && (
              <section>
                <div className="flex items-center justify-between mb-5 px-1">
                  <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-black dark:text-zinc-500 flex items-center gap-2">
                    Bought <span className="w-2 h-2 rounded-full bg-black"></span>
                  </h2>
                  <button 
                    onClick={clearBoughtItems}
                    className="text-xs font-bold text-gray-400 hover:underline px-3 py-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
                  >
                    Clear All
                  </button>
                </div>
                <AnimatePresence mode="popLayout">
                  {bought.map(item => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ type: "spring", damping: 25, stiffness: 350 }}
                    >
                      <GroceryItemCard item={item} onStatusChange={updateStatus} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </section>
            )}
          </>
        )}
      </div>

      {/* FAB */}
      <motion.button 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-8 right-8 w-18 h-18 rounded-3xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center shadow-2xl z-20 overflow-hidden"
      >
        <Plus size={36} strokeWidth={2.5} className="relative z-10" />
      </motion.button>

      {/* Modal */}
      <AddItemModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAdd={handleAddItem} 
      />
    </main>
  );
}

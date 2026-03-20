"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (name: string, quantity: string) => void;
}

export default function AddItemModal({ isOpen, onClose, onAdd }: Props) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onAdd(name, quantity || "1");
      setName("");
      setQuantity("");
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 font-outfit">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div 
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative w-full max-w-lg bg-white dark:bg-zinc-900 rounded-t-[32px] sm:rounded-[40px] p-8 shadow-2xl"
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-black dark:text-white">Add New Item</h2>
              <button 
                onClick={onClose}
                className="p-3 rounded-2xl hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 px-1">Item Name</label>
                <input 
                  autoFocus
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Milk"
                  className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-zinc-800 border-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all text-lg font-bold"
                />
              </div>

              <div className="flex flex-col">
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 px-1">Quantity</label>
                <input 
                  type="text" 
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="e.g. 2"
                  className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-zinc-900 border-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all text-lg font-bold"
                />
              </div>

              <button 
                type="submit"
                className="w-full py-5 rounded-3xl bg-black dark:bg-white text-white dark:text-black font-bold text-lg hover:opacity-95 transition-all shadow-xl active:scale-[0.98] mt-4"
              >
                Add to Grocery List
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Check } from 'lucide-react';
import { useBookkeeping } from '@/components/providers/BookkeepingContext';
import { cn } from '@/lib/utils'; // Use our local util

export default function InputFlow() {
  const { addIncome, addExpense } = useBookkeeping();
  const [mode, setMode] = useState<'income' | 'expense'>('income');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount) return;

    const val = parseFloat(amount.replace(/,/g, ''));
    const date = new Date().toISOString();
    const id = Date.now();

    if (mode === 'income') {
      addIncome({
        id,
        date,
        amount: val.toString(),
        description: description || 'Income',
        category: category || 'General',
        receiptId: '',
        client: '',
        currency: 'NGN',
        exchangeRate: 1,
      });
    } else {
      addExpense({
        id,
        date,
        amount: val.toString(),
        description: description || 'Expense',
        category: category || 'General',
        receiptId: '',
        deductible: true,
      });
    }

    // Reset
    setAmount('');
    setDescription('');
    setCategory('');
  };

  return (
    <div className="glass-card rounded-warm p-6">
      <div className="flex gap-2 mb-6 bg-black/40 p-1 rounded-full border border-white/5">
        <button
          onClick={() => setMode('income')}
          className={cn(
            'flex-1 py-3 rounded-full text-sm font-bold tracking-wide transition-all flex items-center justify-center gap-2',
            mode === 'income'
              ? 'bg-emerald-600 text-white shadow-lg'
              : 'text-gray-400 hover:text-white',
          )}
        >
          <Plus size={16} /> INCOME
        </button>
        <button
          onClick={() => setMode('expense')}
          className={cn(
            'flex-1 py-3 rounded-full text-sm font-bold tracking-wide transition-all flex items-center justify-center gap-2',
            mode === 'expense'
              ? 'bg-red-600 text-white shadow-lg'
              : 'text-gray-400 hover:text-white',
          )}
        >
          <Minus size={16} /> EXPENSE
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1">
          <label className="text-xs uppercase tracking-widest opacity-60 ml-2">Amount (NGN)</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-mono">
              ₦
            </span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full bg-black/50 border border-white/10 rounded-2xl py-4 pl-10 pr-4 text-xl font-bold font-mono focus:outline-none focus:border-emerald-500/50 transition-colors"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs uppercase tracking-widest opacity-60 ml-2">Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={mode === 'income' ? 'e.g. Client Payment' : 'e.g. Server Costs'}
            className="w-full bg-black/50 border border-white/10 rounded-2xl py-3 px-4 text-sm focus:outline-none focus:border-emerald-500/50 transition-colors"
          />
        </div>

        <button
          type="submit"
          className={cn(
            'w-full py-4 rounded-2xl font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-2 transition-all active:scale-95',
            mode === 'income'
              ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-900/20'
              : 'bg-red-600 hover:bg-red-500 text-white shadow-red-900/20',
          )}
        >
          <Check size={18} />
          {mode === 'income' ? 'Record Income' : 'Record Expense'}
        </button>
      </form>
    </div>
  );
}

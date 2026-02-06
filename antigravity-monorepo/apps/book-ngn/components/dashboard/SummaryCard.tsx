'use client';

import { motion } from 'framer-motion';
import { Shield, TrendingUp, Globe } from 'lucide-react';
import AnimatedNumber from '@/components/ui/AnimatedNumber';
import { cn } from '@/lib/utils'; // Assuming utils exists, if not I will modify to use clsx directly or create lib/utils

interface SummaryCardProps {
  annualIncome: number;
  annualTax: number;
  effectiveRate: number;
  userCategory: string;
}

export default function SummaryCard({
  annualIncome,
  annualTax,
  effectiveRate,
  userCategory,
}: SummaryCardProps) {
  const isNomad = userCategory === 'DigitalNomad';

  // Fiscal Freedom Score (Inverse of tax burden, roughly)
  // 100% - Effective Rate, capped at 100
  const freedomScore = Math.max(0, Math.min(100, 100 - effectiveRate));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        'relative overflow-hidden rounded-warm p-6 md:p-8',
        isNomad
          ? 'bg-gradient-to-br from-emerald-600 to-emerald-800 text-white'
          : 'bg-surface-card border border-surface-border',
      )}
    >
      <div className="relative z-10 flex flex-col gap-6">
        <div className="flex justify-between items-start">
          <div>
            <div className="text-xs uppercase tracking-widest opacity-80 mb-1">
              Fiscal Freedom Score
            </div>
            <div className="text-5xl font-bold tracking-tighter">
              <AnimatedNumber value={freedomScore} />%
            </div>
          </div>

          {isNomad && (
            <div className="flex items-center gap-2 bg-emerald-900/40 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-medium border border-emerald-500/30">
              <Globe size={14} />
              <span>DIGITAL NOMAD MODE</span>
            </div>
          )}
        </div>

        <div>
          <div className="text-sm uppercase tracking-widest opacity-70 mb-2">Annual Take-Home</div>
          <div className="text-4xl md:text-6xl font-black tracking-tight leading-none break-all">
            <AnimatedNumber value={annualIncome - annualTax} currency />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-2">
          <div className="bg-black/20 backdrop-blur-sm p-4 rounded-2xl border border-white/10">
            <div className="flex items-center gap-2 text-xs opacity-70 mb-1">
              <Shield size={12} /> Statutory Tax
            </div>
            <div className="text-xl md:text-2xl font-bold">
              <AnimatedNumber value={annualTax} currency />
            </div>
            <div className="text-[10px] opacity-60">/ year</div>
          </div>

          <div className="bg-black/20 backdrop-blur-sm p-4 rounded-2xl border border-white/10">
            <div className="flex items-center gap-2 text-xs opacity-70 mb-1">
              <TrendingUp size={12} /> Effective Rate
            </div>
            <div className="text-xl md:text-2xl font-bold">{effectiveRate.toFixed(1)}%</div>
            <div className="text-[10px] opacity-60">optimized</div>
          </div>
        </div>

        {/* Progress Bar for Tax vs Income */}
        <div className="w-full h-2 bg-black/20 rounded-full overflow-hidden flex">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${100 - effectiveRate}%` }}
            transition={{ duration: 1, delay: 0.5 }}
            className={cn('h-full', isNomad ? 'bg-white/90' : 'bg-emerald-500')}
          />
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${effectiveRate}%` }}
            transition={{ duration: 1, delay: 0.5 }}
            className={cn('h-full', isNomad ? 'bg-emerald-900' : 'bg-red-500')}
          />
        </div>
        <div className="flex justify-between text-[10px] uppercase font-bold tracking-wider opacity-60">
          <span>Retained Capital</span>
          <span>Statutory Tax</span>
        </div>
      </div>

      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
    </motion.div>
  );
}

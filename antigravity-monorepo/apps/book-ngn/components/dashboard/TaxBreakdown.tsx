'use client';

import { motion } from 'framer-motion';
import { Layers, Calculator, ShieldCheck, Wallet, ArrowDown } from 'lucide-react';
import { TaxResults } from '@/utils/types';
import { formatCurrency } from '@/utils/tax';
import AnimatedNumber from '@/components/ui/AnimatedNumber';

interface TaxBreakdownProps {
    results: TaxResults;
}

const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 }
};

export default function TaxBreakdown({ results }: TaxBreakdownProps) {
    return (
        <div className="space-y-6">
            {/* Tax Staircase Visualizer */}
            <motion.div
                variants={item}
                initial="hidden"
                animate="show"
                className="glass-card rounded-warm p-6 border-white/5"
            >
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                        <Layers className="w-4 h-4 text-emerald-500" />
                    </div>
                    <div>
                        <h3 className="text-sm font-bold tracking-tight">Tax Staircase</h3>
                        <p className="text-[10px] uppercase tracking-widest opacity-50">Progressive Bands</p>
                    </div>
                </div>

                <div className="space-y-4">
                    {results.taxBands.map((band, idx) => (
                        <div key={idx} className="space-y-1.5">
                            <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider">
                                <span className="opacity-60">Band {band.rate}%</span>
                                <span className="font-mono"><AnimatedNumber value={band.taxInBand} currency /></span>
                            </div>
                            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(band.taxableInBand / (results.chargeableIncome || 1)) * 100}%` }}
                                    className="h-full bg-emerald-500/80 shadow-[0_0_8px_rgba(16,185,129,0.3)]"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Analysis Center */}
            <motion.div
                variants={item}
                initial="hidden"
                animate="show"
                className="glass-card rounded-warm p-6 border-white/5"
            >
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                        <Calculator className="w-4 h-4 text-emerald-500" />
                    </div>
                    <h3 className="text-sm font-bold tracking-tight">Analysis Center</h3>
                </div>

                <div className="space-y-6">
                    {/* Allowances */}
                    <div className="space-y-3">
                        <div className="text-[10px] uppercase tracking-[0.2em] opacity-40 px-2">Reliefs & Allowances</div>
                        <div className="bg-black/20 rounded-2xl border border-white/5 overflow-hidden">
                            {[
                                { label: 'Pension (8%)', value: results.pension },
                                { label: 'NHF Fund', value: results.nhf },
                                { label: 'Insurance Relief', value: results.lifeInsuranceRelief },
                                { label: 'Operating Costs', value: results.totalBusinessExpenses },
                            ].map((row, i) => (
                                <div key={i} className="flex justify-between p-3 px-4 border-b border-white/5 last:border-0 hover:bg-white/[0.02]">
                                    <span className="text-xs opacity-70">{row.label}</span>
                                    <span className="text-xs font-mono font-bold text-red-400">
                                        -<AnimatedNumber value={row.value} currency />
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Liability Summary */}
                    <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-4 flex justify-between items-center">
                        <div>
                            <div className="text-[9px] uppercase tracking-widest text-emerald-400 font-bold mb-1">Monthly Liability</div>
                            <div className="text-2xl font-black font-mono tracking-tighter">
                                <AnimatedNumber value={results.monthlyTax} currency />
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-[9px] uppercase tracking-widest opacity-40 font-bold mb-1">Annual Total</div>
                            <div className="text-sm font-bold opacity-80 font-mono">
                                <AnimatedNumber value={results.annualTax} currency />
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

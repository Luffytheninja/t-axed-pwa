'use client';

import { useState } from 'react';
import { Calendar, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { TaxResults } from '@/utils/types';
import { formatCurrency } from '@/utils/tax';
import AnimatedNumber from '@/components/ui/AnimatedNumber';
import { cn } from '@/lib/utils';

interface PaymentScheduleProps {
    results: TaxResults;
}

export default function PaymentSchedule({ results }: PaymentScheduleProps) {
    const [isOpen, setIsOpen] = useState(false);
    const quarterlyTax = results.annualTax / 4;

    const schedule = [
        { q: 'Q1', dates: 'Jan - Mar', due: 'April 30', status: 'Due' },
        { q: 'Q2', dates: 'Apr - Jun', due: 'July 31', status: 'Pending' },
        { q: 'Q3', dates: 'Jul - Sep', due: 'Oct 31', status: 'Pending' },
        { q: 'Q4', dates: 'Oct - Dec', due: 'Jan 31', status: 'Pending' },
    ];

    return (
        <div className="glass-card rounded-warm border-white/5 overflow-hidden transition-all duration-500">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-6 hover:bg-white/[0.02]"
            >
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                        <Calendar className="w-4 h-4 text-emerald-500" />
                    </div>
                    <div className="text-left">
                        <h3 className="text-sm font-bold tracking-tight text-white">Payment Schedule</h3>
                        <p className="text-[10px] uppercase tracking-widest opacity-50">Quarterly Remittance</p>
                    </div>
                </div>
                {isOpen ? <ChevronUp size={16} className="opacity-40" /> : <ChevronDown size={16} className="opacity-40" />}
            </button>

            {isOpen && (
                <div className="px-6 pb-6 space-y-4">
                    {schedule.map((row, i) => (
                        <div key={i} className="bg-black/40 rounded-2xl p-4 border border-white/5 flex justify-between items-center group hover:border-white/10 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className={cn(
                                    "w-2 h-2 rounded-full",
                                    row.status === 'Due' ? "bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.5)]" : "bg-white/10"
                                )} />
                                <div>
                                    <div className="text-xs font-bold text-white">{row.q} ({row.dates})</div>
                                    <div className="text-[10px] uppercase tracking-widest opacity-40">Due {row.due}</div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-sm font-bold font-mono">
                                    <AnimatedNumber value={quarterlyTax} currency />
                                </div>
                                <div className={cn(
                                    "text-[9px] uppercase font-black tracking-widest",
                                    row.status === 'Due' ? "text-red-400" : "text-white/20"
                                )}>{row.status}</div>
                            </div>
                        </div>
                    ))}

                    <div className="mt-4 p-4 bg-red-500/5 rounded-2xl border border-red-500/10 flex gap-3">
                        <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                        <p className="text-[10px] text-red-200/60 leading-relaxed italic">
                            Strict adherence to remittance dates is mandatory to avoid the <span className="text-red-400 font-bold">₦100,000 NTAA penalty</span> under the 2026 guidelines.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}

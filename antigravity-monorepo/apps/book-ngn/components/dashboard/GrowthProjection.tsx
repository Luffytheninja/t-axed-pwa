'use client';

import { useState, useMemo } from 'react';
import { TrendingUp, BarChart3, ChevronDown, ChevronUp } from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
  AreaChart,
  ReferenceLine,
} from 'recharts';
import { TaxResults } from '@/utils/types';
import { formatCurrency } from '@/utils/tax';

interface GrowthProjectionProps {
  results: TaxResults;
}

export default function GrowthProjection({ results }: GrowthProjectionProps) {
  const [isOpen, setIsOpen] = useState(false);

  const projectionData = useMemo(() => {
    if (!results) return [];
    const years = [];
    const growthRate = 0.15; // 15% annual growth expectation for dynamic business owners

    for (let i = 0; i < 5; i++) {
      const yearIndex = 2026 + i;
      const income = results.annualGross * Math.pow(1 + growthRate, i);
      const tax = results.annualTax * Math.pow(1 + growthRate, i); // Simplified projection
      const takeHome = income - tax;

      years.push({
        year: yearIndex,
        income: Math.round(income),
        tax: Math.round(tax),
        takeHome: Math.round(takeHome),
      });
    }
    return years;
  }, [results]);

  if (!results || results.annualGross === 0) return null;

  return (
    <div className="glass-card rounded-warm border-white/5 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 hover:bg-white/[0.02]"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
            <BarChart3 className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-left">
            <h3 className="text-sm font-bold tracking-tight text-white">Growth Projection</h3>
            <p className="text-[10px] uppercase tracking-widest opacity-50">5-Year Outlook</p>
          </div>
        </div>
        {isOpen ? (
          <ChevronUp size={16} className="opacity-40" />
        ) : (
          <ChevronDown size={16} className="opacity-40" />
        )}
      </button>

      {isOpen && (
        <div className="px-6 pb-6 space-y-6">
          <div className="h-64 w-full bg-black/40 rounded-2xl p-4 border border-white/5">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={projectionData}>
                <defs>
                  <linearGradient id="colorTakeHome" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis
                  dataKey="year"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#ffffff40', fontSize: 10, fontWeight: 'bold' }}
                />
                <YAxis hide />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#18181b',
                    borderRadius: '12px',
                    border: '1px solid #ffffff10',
                    fontSize: '10px',
                    color: '#fff',
                  }}
                  itemStyle={{ color: '#10b981' }}
                  formatter={(val: number | undefined) =>
                    val !== undefined ? formatCurrency(val) : ''
                  }
                />
                <Area
                  type="monotone"
                  dataKey="takeHome"
                  stroke="#10b981"
                  fillOpacity={1}
                  fill="url(#colorTakeHome)"
                  strokeWidth={3}
                />
                <Line
                  type="monotone"
                  dataKey="tax"
                  stroke="#ef4444"
                  strokeDasharray="5 5"
                  strokeWidth={1}
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-5 gap-2">
            {projectionData.map((d) => (
              <div key={d.year} className="text-center">
                <div className="text-[8px] font-black opacity-30 uppercase">{d.year}</div>
                <div className="text-[10px] font-bold text-emerald-400 font-mono">
                  {(d.takeHome / 1000000).toFixed(1)}M
                </div>
              </div>
            ))}
          </div>

          <div className="bg-emerald-500/5 rounded-2xl p-4 border border-emerald-500/10">
            <div className="flex items-center gap-2 text-emerald-400 text-[10px] font-bold uppercase tracking-wider mb-1">
              <TrendingUp size={12} /> Optimization Insight
            </div>
            <p className="text-[10px] text-white/50 leading-relaxed">
              Based on organic 15% growth, your annual take-home will reach{' '}
              <span className="text-white font-bold">
                {formatCurrency(projectionData[4].takeHome)}
              </span>{' '}
              by 2030. Scaling insurance premiums proportionately can save an additional ₦450k in
              projected tax.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

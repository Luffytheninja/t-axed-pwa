import { Calculator, CheckCircle, TrendingUp, Wallet, Layers, ShieldCheck } from 'lucide-react';
import { formatCurrency } from '../utils';
import { TaxResults, IncomeEntry, ExpenseEntry } from '../types';

interface TaxResultsBreakdownProps {
    results: TaxResults;
    incomeEntries: IncomeEntry[];
    expenseEntries: ExpenseEntry[];
}

export default function TaxResultsBreakdown({ results }: TaxResultsBreakdownProps) {
    const takeHomePercent = Math.round((results.annualTakeHome / results.annualGross) * 100);
    const taxPercent = Math.round((results.annualTax / results.annualGross) * 100);

    return (
        <div className="space-y-6">
            <div className="ios-card bg-gradient-to-br from-emerald-600 via-green-600 to-green-700 p-8 text-white relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 p-12 opacity-10 rotate-12">
                    <TrendingUp className="w-48 h-48" />
                </div>

                <div className="relative z-10">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <span className="text-emerald-100 text-[10px] font-black uppercase tracking-[0.2em] block mb-1">Fiscal Freedom Score</span>
                            <div className="text-4xl font-black tracking-tight">{takeHomePercent}%</div>
                        </div>
                        <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                            <ShieldCheck className="w-3 h-3" />
                            {results.category} Mode
                        </div>
                    </div>

                    <span className="text-emerald-100/60 text-xs font-bold uppercase tracking-widest block mb-1">Annual Take-Home</span>
                    <h2 className="text-5xl font-black tracking-tighter mb-4">{formatCurrency(results.annualTakeHome)}</h2>

                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2 text-emerald-100/80 text-sm font-medium">
                            <Wallet className="w-4 h-4" />
                            <span>{formatCurrency(results.monthlyTakeHome)}/mo</span>
                        </div>
                        <div className="flex items-center gap-2 text-emerald-100/80 text-sm font-medium">
                            <TrendingUp className="w-4 h-4" />
                            <span>{results.effectiveRate.toFixed(1)}% Effective Tax</span>
                        </div>
                    </div>

                    <div className="mt-8">
                        <div className="h-3 w-full bg-black/10 rounded-full overflow-hidden flex border border-white/10">
                            <div className="h-full bg-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.5)]" style={{ width: `${takeHomePercent}%` }} />
                            <div className="h-full bg-red-400" style={{ width: `${taxPercent}%` }} />
                        </div>
                        <div className="flex justify-between mt-2 text-[10px] font-black uppercase tracking-widest text-blue-100/60">
                            <span>Retained Capital</span>
                            <span>Statutory Tax</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* The Staircase Visualizer */}
            <div className="ios-card p-8">
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center shadow-sm">
                        <Layers className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-gray-900 tracking-tight">Tax Staircase</h2>
                        <p className="text-xs text-gray-500 font-medium whitespace-nowrap overflow-hidden text-ellipsis">Progressive tax bands visualization</p>
                    </div>
                </div>

                <div className="space-y-4">
                    {results.taxBands.map((band, idx) => (
                        <div key={idx} className="relative">
                            <div className="flex justify-between items-end mb-1">
                                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Band {band.rate}%</span>
                                <span className="text-xs font-bold text-gray-900">{formatCurrency(band.taxInBand)}</span>
                            </div>
                            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-orange-500 transition-all duration-1000"
                                    style={{ width: `${(band.taxableInBand / results.chargeableIncome) * 100}%` }}
                                />
                            </div>
                            {idx < results.taxBands.length - 1 && band.taxableInBand > 0 && (
                                <div className="absolute -bottom-3 left-1/2 w-0.5 h-2 bg-orange-200" />
                            )}
                        </div>
                    ))}
                    {results.chargeableIncome === 0 && (
                        <div className="py-8 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">No Chargeable Income in Staircase</span>
                        </div>
                    )}
                </div>
            </div>

            <div className="ios-card p-8">
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center shadow-sm">
                        <Calculator className="w-5 h-5 text-indigo-600" />
                    </div>
                    <h2 className="text-lg font-bold text-gray-900 tracking-tight">Analysis Center</h2>
                </div>

                <div className="space-y-8">
                    {/* Gross Income Section */}
                    <div className="ios-input-group !bg-indigo-50/30 border-indigo-100">
                        <div className="ios-input-item !border-0 py-4 px-6 flex justify-between items-center">
                            <div>
                                <span className="text-[10px] text-indigo-600 font-bold uppercase tracking-widest block mb-1">Total Revenue</span>
                                <span className="text-3xl font-bold text-gray-900 tracking-tight">{formatCurrency(results.annualGross)}</span>
                            </div>
                            {results.totalTrackedIncome > 0 && (
                                <div className="bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase flex items-center gap-1.5 border border-emerald-200">
                                    <CheckCircle className="w-3 h-3" />
                                    Synced
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Deductions Section */}
                    <div>
                        <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 px-1">Allowances & Reliefs</h3>
                        <div className="ios-input-group">
                            <div className="ios-input-item py-3 px-5 flex justify-between items-center">
                                <span className="text-sm font-medium text-gray-600">Pension Contribution</span>
                                <span className="text-sm font-bold text-gray-900">-{formatCurrency(results.pension)}</span>
                            </div>
                            <div className="ios-input-item py-3 px-5 flex justify-between items-center border-t border-gray-50">
                                <span className="text-sm font-medium text-gray-600">NHF Fund</span>
                                <span className="text-sm font-bold text-gray-900">-{formatCurrency(results.nhf)}</span>
                            </div>
                            <div className="ios-input-item py-3 px-5 flex justify-between items-center border-t border-gray-50">
                                <span className="text-sm font-medium text-gray-600">Insurance Relief</span>
                                <span className="text-sm font-bold text-emerald-600">-{formatCurrency(results.lifeInsuranceRelief)}</span>
                            </div>
                            <div className="ios-input-item py-3 px-5 flex justify-between items-center border-t border-gray-50">
                                <span className="text-sm font-medium text-gray-600">Operating Expenses</span>
                                <span className="text-sm font-bold text-gray-900">-{formatCurrency(results.totalBusinessExpenses)}</span>
                            </div>
                            <div className="bg-gray-50/80 px-5 py-4 flex justify-between items-center border-t border-gray-100">
                                <span className="text-sm font-bold text-gray-900">Total Deductions</span>
                                <span className="text-sm font-black text-indigo-600">-{formatCurrency(results.totalDeductions)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Tax Section */}
                    <div className="ios-input-group !bg-red-50/30 border-red-100">
                        <div className="ios-input-item !border-0 py-5 px-6 flex justify-between items-end">
                            <div>
                                <span className="text-[10px] text-red-600 font-bold uppercase tracking-widest block mb-1">Estimated Tax Liability</span>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-3xl font-bold text-red-600 tracking-tight">{formatCurrency(results.monthlyTax)}</span>
                                    <span className="text-xs font-semibold text-red-400">/ month</span>
                                </div>
                            </div>
                            <div className="text-right">
                                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest block mb-1">Annual Total</span>
                                <span className="text-sm font-bold text-gray-900">{formatCurrency(results.annualTax)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

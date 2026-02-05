import { useState } from 'react';
import { Plus, Trash2, Receipt, Globe } from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { formatCurrency, COLORS } from '../utils';
import { IncomeEntry } from '../types';

interface IncomeTrackerProps {
    entries: IncomeEntry[];
    onAddEntry: (entry: IncomeEntry) => void;
    onDeleteEntry: (id: number) => void;
    totalTrackedIncome: number;
    exchangeRate: number;
}

export default function IncomeTracker({ entries, onAddEntry, onDeleteEntry, totalTrackedIncome, exchangeRate }: IncomeTrackerProps) {
    const [newIncome, setNewIncome] = useState<Omit<IncomeEntry, 'id'>>({
        date: new Date().toISOString().split('T')[0],
        amount: '',
        description: '',
        receiptId: '',
        client: '',
        category: 'Design Services',
        currency: 'NGN',
        exchangeRate: 1
    });

    const handleAdd = () => {
        if (newIncome.amount && newIncome.description) {
            onAddEntry({
                ...newIncome,
                id: Date.now(),
                exchangeRate: newIncome.currency === 'NGN' ? 1 : exchangeRate
            });
            setNewIncome({
                date: new Date().toISOString().split('T')[0],
                amount: '',
                description: '',
                receiptId: '',
                client: '',
                category: 'Design Services',
                currency: 'NGN',
                exchangeRate: 1
            });
        }
    };

    const getIncomeByCategory = () => {
        const categories: Record<string, number> = {};
        entries.forEach(entry => {
            const val = parseFloat(entry.amount || '0');
            const rate = entry.exchangeRate || 1;
            const ngnValue = val * rate;
            categories[entry.category] = (categories[entry.category] || 0) + ngnValue;
        });
        return Object.entries(categories).map(([name, value]) => ({ name, value }));
    };

    return (
        <div className="ios-card p-8 mb-8">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-black text-gray-900 flex items-center gap-3">
                    <Receipt className="w-7 h-7 text-emerald-600" />
                    Revenue Ledger
                </h2>
                <div className="bg-blue-50 px-4 py-2 rounded-2xl flex items-center gap-3 border border-blue-100">
                    <Globe className="w-4 h-4 text-blue-600" />
                    <span className="text-xs font-bold text-blue-900 uppercase tracking-widest">CBN Rate: ₦{exchangeRate.toLocaleString()}</span>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-12 mb-12">
                <div className="space-y-6">
                    <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Log New Transaction</h3>

                    <div className="ios-input-group">
                        <div className="ios-input-item">
                            <span className="ios-label">Date</span>
                            <input
                                type="date"
                                value={newIncome.date}
                                onChange={(e) => setNewIncome({ ...newIncome, date: e.target.value })}
                                className="ios-input"
                            />
                        </div>
                        <div className="ios-input-item">
                            <div className="flex items-center gap-2">
                                <span className="w-4 h-4 text-emerald-500 font-sans font-bold flex items-center justify-center text-lg">₦</span>
                                <span className="ios-label">Value</span>
                            </div>
                            <div className="flex items-center gap-2 w-full justify-end">
                                <select
                                    className="bg-transparent text-xs font-bold text-emerald-600 focus:outline-none"
                                    value={newIncome.currency}
                                    onChange={(e) => setNewIncome({ ...newIncome, currency: e.target.value })}
                                >
                                    <option value="NGN">NGN</option>
                                    <option value="USD">USD</option>
                                    <option value="GBP">GBP</option>
                                    <option value="EUR">EUR</option>
                                </select>
                                <input
                                    type="number"
                                    value={newIncome.amount}
                                    onChange={(e) => setNewIncome({ ...newIncome, amount: e.target.value })}
                                    placeholder="0.00"
                                    className="ios-input w-24"
                                />
                            </div>
                        </div>
                        <div className="ios-input-item">
                            <span className="ios-label">Client</span>
                            <input
                                type="text"
                                value={newIncome.client}
                                onChange={(e) => setNewIncome({ ...newIncome, client: e.target.value })}
                                placeholder="Client ID"
                                className="ios-input"
                            />
                        </div>
                        <div className="ios-input-item">
                            <span className="ios-label">Category</span>
                            <select
                                value={newIncome.category}
                                onChange={(e) => setNewIncome({ ...newIncome, category: e.target.value })}
                                className="ios-input appearance-none text-right"
                            >
                                <option>Design Services</option>
                                <option>Branding</option>
                                <option>Software</option>
                                <option>Consulting</option>
                                <option>Other</option>
                            </select>
                        </div>
                    </div>

                    <button
                        onClick={handleAdd}
                        className="ios-btn-primary w-full bg-emerald-600 hover:bg-emerald-700 shadow-emerald-100"
                    >
                        <Plus className="w-5 h-5" />
                        Capture Revenue
                    </button>
                    <p className="text-[10px] text-gray-400 text-center font-medium">Compliance: Digital records retained for 6-Year Vault</p>
                </div>

                <div>
                    <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1 mb-4">Capital Distribution</h3>
                    <div className="ios-input-group p-4 !bg-white/50 mb-6">
                        {getIncomeByCategory().length > 0 ? (
                            <ResponsiveContainer width="100%" height={250}>
                                <PieChart>
                                    <Pie
                                        data={getIncomeByCategory()}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {getIncomeByCategory().map((_, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="rgba(255,255,255,0.5)" />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }}
                                        formatter={(value: any) => formatCurrency(Number(value))}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="h-[250px] flex items-center justify-center text-xs text-gray-400 font-medium italic">Establishing fiscal data...</div>
                        )}
                    </div>

                    <div className="ios-input-group bg-emerald-50/50 border-emerald-100 p-5 shadow-inner">
                        <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest block mb-1">Normalized Annual Revenue</span>
                        <p className="text-4xl font-black text-emerald-900 tracking-tight">{formatCurrency(totalTrackedIncome)}</p>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Ledger History Vault</h3>
                {entries.length === 0 ? (
                    <div className="ios-input-group !bg-white/40 p-12 text-center text-xs text-gray-400 font-medium rounded-[32px] border-dashed border-2">
                        Vault is currently empty. Start logging to build your 6-year history.
                    </div>
                ) : (
                    <div className="space-y-3">
                        {entries.map((entry) => (
                            <div key={entry.id} className="ios-card !rounded-2xl !bg-white/60 hover:border-emerald-200 transition-all group">
                                <div className="p-4 flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600 shadow-sm transition-transform group-hover:scale-110">
                                            <Receipt className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 leading-none mb-1">{entry.description}</h4>
                                            <div className="flex items-center gap-2">
                                                <span className="text-[10px] font-bold text-gray-400 whitespace-nowrap">{new Date(entry.date).toLocaleDateString('en-NG')}</span>
                                                <span className="text-[10px] font-black text-emerald-600 opacity-30">•</span>
                                                <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-tight">{entry.category}</span>
                                                {entry.currency !== 'NGN' && (
                                                    <span className="text-[9px] font-black bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded-md uppercase">Converted @ ₦{entry.exchangeRate}</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <div className="text-right">
                                            <p className="text-lg font-black text-gray-900 leading-none mb-1">
                                                {entry.currency !== 'NGN' ? `${entry.currency} ${entry.amount}` : formatCurrency(parseFloat(entry.amount))}
                                            </p>
                                            <p className="text-[10px] font-bold text-gray-400 leading-none uppercase tracking-tighter">{entry.client || 'Direct Client'}</p>
                                        </div>
                                        <button
                                            onClick={() => onDeleteEntry(entry.id)}
                                            className="w-8 h-8 rounded-full bg-red-50 text-red-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

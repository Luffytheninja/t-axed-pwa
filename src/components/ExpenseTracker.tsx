import { useState } from 'react';
import { Plus, Trash2, FileText } from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { formatCurrency, COLORS } from '../utils';
import { ExpenseEntry } from '../types';

interface ExpenseTrackerProps {
    entries: ExpenseEntry[];
    onAddEntry: (entry: ExpenseEntry) => void;
    onDeleteEntry: (id: number) => void;
    totalTrackedExpenses: number;
}

export default function ExpenseTracker({ entries, onAddEntry, onDeleteEntry, totalTrackedExpenses }: ExpenseTrackerProps) {
    const [newExpense, setNewExpense] = useState<Omit<ExpenseEntry, 'id'>>({
        date: new Date().toISOString().split('T')[0],
        amount: '',
        description: '',
        receiptId: '',
        category: 'Utilities',
        deductible: true
    });

    const handleAdd = () => {
        if (newExpense.amount && newExpense.description) {
            onAddEntry({ ...newExpense, id: Date.now() });
            setNewExpense({
                date: new Date().toISOString().split('T')[0],
                amount: '',
                description: '',
                receiptId: '',
                category: 'Utilities',
                deductible: true
            });
        }
    };

    const getExpenseByCategory = () => {
        const categories: Record<string, number> = {};
        entries.forEach(entry => {
            categories[entry.category] = (categories[entry.category] || 0) + parseFloat(entry.amount || '0');
        });
        return Object.entries(categories).map(([name, value]) => ({ name, value }));
    };

    return (
        <div className="ios-card p-8 mb-8">
            <h2 className="ios-section-header flex items-center gap-2 mb-8">
                <FileText className="w-6 h-6 text-red-500" />
                Expense Tracker
            </h2>

            <div className="grid md:grid-cols-2 gap-12 mb-12">
                <div className="space-y-6">
                    <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Log New Expense</h3>

                    <div className="ios-input-group">
                        <div className="ios-input-item">
                            <span className="ios-label">Date</span>
                            <input
                                type="date"
                                value={newExpense.date}
                                onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
                                className="ios-input"
                            />
                        </div>
                        <div className="ios-input-item">
                            <span className="ios-label">Amount (₦)</span>
                            <input
                                type="number"
                                value={newExpense.amount}
                                onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                                placeholder="0"
                                className="ios-input"
                            />
                        </div>
                        <div className="ios-input-item">
                            <span className="ios-label">Category</span>
                            <select
                                value={newExpense.category}
                                onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
                                className="ios-input appearance-none text-right"
                            >
                                <option>Utilities</option>
                                <option>Software Subscriptions</option>
                                <option>Equipment</option>
                                <option>Marketing</option>
                                <option>Office Supplies</option>
                                <option>Professional Fees</option>
                                <option>Travel</option>
                                <option>Other</option>
                            </select>
                        </div>
                        <div className="ios-input-item">
                            <span className="ios-label">Description</span>
                            <input
                                type="text"
                                value={newExpense.description}
                                onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                                placeholder="What was this for?"
                                className="ios-input"
                            />
                        </div>
                        <div className="ios-input-item !border-0 py-4">
                            <span className="text-[13px] font-medium text-gray-600">Tax Deductible</span>
                            <input
                                type="checkbox"
                                checked={newExpense.deductible}
                                onChange={(e) => setNewExpense({ ...newExpense, deductible: e.target.checked })}
                                className="w-5 h-5 accent-red-500 rounded-full"
                            />
                        </div>
                    </div>

                    <button
                        onClick={handleAdd}
                        className="ios-btn-primary w-full bg-red-500 hover:bg-red-600 shadow-red-100"
                    >
                        <Plus className="w-5 h-5" />
                        Log Entry
                    </button>
                </div>

                <div>
                    <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1 mb-4">Breakdown</h3>
                    <div className="ios-input-group p-4 !bg-white/50 mb-6">
                        {getExpenseByCategory().length > 0 ? (
                            <ResponsiveContainer width="100%" height={250}>
                                <PieChart>
                                    <Pie
                                        data={getExpenseByCategory()}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {getExpenseByCategory().map((_, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="rgba(255,255,255,0.5)" />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                        formatter={(value: any) => formatCurrency(Number(value))}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="h-[250px] flex items-center justify-center text-xs text-gray-400 font-medium">No results</div>
                        )}
                    </div>

                    <div className="ios-input-group bg-red-50/30 border-red-100 p-5">
                        <span className="text-[10px] font-bold text-red-600 uppercase tracking-widest block mb-2">Total Deductible Costs</span>
                        <p className="text-3xl font-black text-red-900 tracking-tight">{formatCurrency(totalTrackedExpenses)}</p>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Expense Log ({entries.length})</h3>
                {entries.length === 0 ? (
                    <div className="ios-input-group !bg-white/40 p-12 text-center text-xs text-gray-400 font-medium">
                        Your expense ledger is empty.
                    </div>
                ) : (
                    <div className="space-y-3">
                        {entries.map((entry) => (
                            <div key={entry.id} className="ios-input-group !bg-white/60 hover:border-red-200 transition-all group">
                                <div className="p-4 flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center text-red-600 shadow-sm">
                                            <FileText className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 leading-none mb-1">{entry.description}</h4>
                                            <div className="flex items-center gap-2">
                                                <span className="text-[10px] font-bold text-gray-400">📅 {new Date(entry.date).toLocaleDateString('en-NG')}</span>
                                                <span className="text-[10px] font-black text-red-600 uppercase tracking-tighter opacity-50">•</span>
                                                <span className="text-[10px] font-bold text-red-600 uppercase tracking-tight">{entry.category}</span>
                                                {entry.deductible && (
                                                    <span className="ml-2 text-[8px] font-black bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full uppercase">Deductible</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <div className="text-right">
                                            <p className="text-lg font-black text-gray-900 leading-none mb-1">{formatCurrency(parseFloat(entry.amount))}</p>
                                            <p className="text-[10px] font-bold text-gray-400 leading-none uppercase tracking-tighter">{entry.receiptId || 'Direct Pay'}</p>
                                        </div>
                                        <button
                                            onClick={() => onDeleteEntry(entry.id)}
                                            className="w-8 h-8 rounded-full bg-red-50 text-red-500 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-100"
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

            <div className="mt-8 bg-amber-50/50 border-l-4 border-amber-500 p-5 rounded-xl">
                <p className="text-[11px] font-medium text-amber-800 leading-relaxed">
                    <strong className="block mb-1 font-bold uppercase tracking-widest text-[9px]">⚠️ COMPLIANCE NOTE</strong>
                    Under Section 20 NTA 2025, only expenses "wholly and exclusively incurred" for business are deductible.
                    Marking personal costs as business expenses may trigger audit queries.
                </p>
            </div>
        </div>
    );
}

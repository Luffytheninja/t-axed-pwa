import { Shield, Heart, AlertCircle, FileText, UserCircle, Briefcase, Globe, Info } from 'lucide-react';
import { UserCategory } from '../types';

interface InputSectionProps {
    monthlyIncome: number;
    setMonthlyIncome: (val: number) => void;
    employeeCount: number;
    setEmployeeCount: (val: number) => void;
    rentPaid: number;
    setRentPaid: (val: number) => void;
    monthlyUtilities: number;
    setMonthlyUtilities: (val: number) => void;
    utilityPercentage: number;
    setUtilityPercentage: (val: number) => void;

    lifePremium: number;
    setLifePremium: (val: number) => void;
    healthPremium: number;
    setHealthPremium: (val: number) => void;
    nhiaVoluntary: number;
    setNhiaVoluntary: (val: number) => void;

    isTrackerActive: boolean;
    nhiaMandatory: boolean;

    showInsuranceAPI: boolean;
    setShowInsuranceAPI: (val: boolean) => void;

    userCategory: UserCategory;
    setUserCategory: (val: UserCategory) => void;
}

const CATEGORIES: { id: UserCategory, label: string, icon: any, desc: string }[] = [
    { id: 'PAYE', label: 'Salary Earner', icon: UserCircle, desc: 'Tax deducted by employer' },
    { id: 'SmallBusiness', label: 'Small Business', icon: Briefcase, desc: 'Turnover < ₦50M' },
    { id: 'Professional', label: 'Professional/Freelancer', icon: FileText, desc: 'Independent consultant' },
    { id: 'DigitalNomad', label: 'Digital Nomad', icon: Globe, desc: 'Earns in foreign currency' },
];

export default function InputSection({
    monthlyIncome, setMonthlyIncome,
    employeeCount, setEmployeeCount,
    rentPaid, setRentPaid,
    monthlyUtilities, setMonthlyUtilities,
    utilityPercentage, setUtilityPercentage,
    lifePremium, setLifePremium,
    healthPremium, setHealthPremium,
    nhiaVoluntary, setNhiaVoluntary,
    isTrackerActive,
    nhiaMandatory,
    showInsuranceAPI, setShowInsuranceAPI,
    userCategory, setUserCategory
}: InputSectionProps) {
    return (
        <div className="space-y-8">
            <div className="flex items-center gap-4 px-2">
                <div className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-gray-100 flex items-center justify-center">
                    <UserCircle className="w-7 h-7 text-blue-600" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Business Profile</h2>
                    <p className="text-gray-500 text-sm font-medium">Configure your commercial fingerprint</p>
                </div>
            </div>

            {/* Category Selector */}
            <div className="ios-card p-6">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                        <Info className="w-5 h-5 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">Tax Classification</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setUserCategory(cat.id)}
                            className={`p-4 rounded-2xl border transition-all text-left flex flex-col gap-2 ${userCategory === cat.id
                                    ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-200'
                                    : 'bg-white border-gray-100 text-gray-900 hover:border-blue-200'
                                }`}
                        >
                            <cat.icon className={`w-6 h-6 ${userCategory === cat.id ? 'text-white' : 'text-blue-600'}`} />
                            <div>
                                <div className="text-xs font-bold leading-tight uppercase tracking-wider">{cat.label}</div>
                                <div className={`text-[10px] mt-1 opacity-70 ${userCategory === cat.id ? 'text-blue-50' : 'text-gray-500'}`}>{cat.desc}</div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Income Input */}
                <div className="ios-card p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                            <Briefcase className="w-5 h-5 text-blue-600" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">Commercial Core</h3>
                    </div>

                    <div className="ios-input-group mb-6">
                        <div className="ios-input-item">
                            <label className="ios-label">Base Monthly Income</label>
                            <input
                                type="number"
                                value={monthlyIncome}
                                onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                                className="ios-input"
                                disabled={isTrackerActive}
                                placeholder="0"
                            />
                        </div>
                        {isTrackerActive && (
                            <div className="px-4 py-2 bg-blue-50/50 text-[10px] text-blue-600 font-bold uppercase tracking-wider flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
                                Synced with Tracker
                            </div>
                        )}

                        <div className="ios-input-item">
                            <label className="ios-label">Headcount</label>
                            <input
                                type="number"
                                value={employeeCount}
                                onChange={(e) => setEmployeeCount(Number(e.target.value))}
                                className="ios-input"
                                placeholder="0"
                            />
                        </div>
                    </div>

                    <div className="ios-input-group">
                        <div className="ios-input-item">
                            <label className="ios-label">Annual Rent</label>
                            <input
                                type="number"
                                value={rentPaid}
                                onChange={(e) => setRentPaid(Number(e.target.value))}
                                className="ios-input"
                                placeholder="0"
                            />
                        </div>
                        <div className="ios-input-item">
                            <label className="ios-label">Utilities (Monthly)</label>
                            <input
                                type="number"
                                value={monthlyUtilities}
                                onChange={(e) => setMonthlyUtilities(Number(e.target.value))}
                                className="ios-input"
                                placeholder="0"
                            />
                        </div>
                        <div className="p-4 bg-gray-50/30">
                            <div className="flex justify-between mb-2">
                                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Business Allocation</label>
                                <span className="text-sm font-black text-blue-600">{utilityPercentage}%</span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={utilityPercentage}
                                onChange={(e) => setUtilityPercentage(Number(e.target.value))}
                                className="w-full accent-blue-600 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer mb-1"
                            />
                        </div>
                    </div>
                </div>

                {/* Insurance Inputs */}
                <div className="ios-card p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">
                            <Shield className="w-5 h-5 text-purple-600" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900">Tax Relief Modules</h3>
                    </div>

                    <div className="ios-input-group mb-6">
                        <div className="ios-input-item">
                            <div className="flex items-center gap-2">
                                <Heart className="w-4 h-4 text-red-500" />
                                <label className="ios-label">Life Insur.</label>
                            </div>
                            <input
                                type="number"
                                value={lifePremium}
                                onChange={(e) => setLifePremium(Number(e.target.value))}
                                className="ios-input"
                                placeholder="Deductible"
                            />
                        </div>

                        <div className="ios-input-item">
                            <div className="flex items-center gap-2">
                                <Shield className="w-4 h-4 text-indigo-500" />
                                <label className="ios-label">Medical</label>
                            </div>
                            <input
                                type="number"
                                value={healthPremium}
                                onChange={(e) => setHealthPremium(Number(e.target.value))}
                                className="ios-input"
                                placeholder="Tracking"
                            />
                        </div>

                        <div className="ios-input-item">
                            <div className="flex items-center gap-2">
                                <AlertCircle className="w-4 h-4 text-orange-500" />
                                <label className="ios-label">NHIA</label>
                            </div>
                            <input
                                type="number"
                                value={nhiaVoluntary}
                                onChange={(e) => setNhiaVoluntary(Number(e.target.value))}
                                className="ios-input"
                                placeholder={nhiaMandatory ? "Required" : "Voluntary"}
                            />
                        </div>
                    </div>

                    <button
                        onClick={() => setShowInsuranceAPI(!showInsuranceAPI)}
                        className="w-full ios-btn-secondary"
                    >
                        <FileText className="w-5 h-5 text-purple-600" />
                        {showInsuranceAPI ? 'Hide Integrations' : 'Sync Insurance API'}
                    </button>

                    <div className="mt-6 flex items-center justify-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-gray-50 py-2 rounded-xl border border-gray-100">
                        <Shield className="w-3 h-3" />
                        E2E Encrypted Protocol
                    </div>
                </div>
            </div>
        </div>
    );
}

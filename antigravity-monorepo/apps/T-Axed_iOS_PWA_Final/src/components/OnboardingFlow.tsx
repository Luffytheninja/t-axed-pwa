import { useState } from 'react';
import { ShieldCheck, ArrowRight, User, MapPin, CheckCircle2 } from 'lucide-react';
import { UserCategory } from '../types';
import SplashScreen from './SplashScreen';

interface OnboardingFlowProps {
    onComplete: (data: {
        residency: boolean;
        annualIncome: number;
        category: UserCategory;
        ninCAC?: string;
    }) => void;
}

export default function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
    const [showSplash, setShowSplash] = useState(true);
    const [step, setStep] = useState(1);
    const [residency, setResidency] = useState<boolean | null>(null);
    const [income, setIncome] = useState('');
    const [category, setCategory] = useState<UserCategory>('PAYE');
    const [idNumber, setIdNumber] = useState('');

    const nextStep = () => setStep(step + 1);

    const handleComplete = () => {
        onComplete({
            residency: residency || false,
            annualIncome: Number(income),
            category: category,
            ninCAC: idNumber
        });
    };

    if (showSplash) {
        return <SplashScreen onComplete={() => setShowSplash(false)} />;
    }

    return (
        <div className="fixed inset-0 z-[100] bg-[#F8F9FD] flex flex-col justify-center items-center p-6 text-center">
            <div className="max-w-md w-full space-y-12 mb-20">

                {/* Progress Indicators */}
                <div className="flex justify-center gap-2">
                    {[1, 2, 3, 4, 5].map((s) => (
                        <div
                            key={s}
                            className={`h-1.5 rounded-full transition-all duration-300 ${step >= s ? 'w-8 bg-blue-600' : 'w-4 bg-gray-200'}`}
                        />
                    ))}
                </div>

                {/* Step 1: Login / Auth Method */}
                {step === 1 && (
                    <div className="view-transition space-y-8">
                        <div className="w-20 h-20 bg-white rounded-3xl mx-auto flex items-center justify-center shadow-xl border border-gray-100">
                            <img src="https://www.google.com/favicon.ico" alt="Google" className="w-10 h-10" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-black text-gray-900 tracking-tight mb-4">Let's Get Started</h2>
                            <p className="text-gray-500 font-medium">Connect your account for seamless sync.</p>
                        </div>
                        <div className="flex flex-col gap-4">
                            <button
                                onClick={nextStep}
                                className="ios-btn-primary h-16 text-lg bg-gray-900 text-white flex items-center justify-center gap-3"
                            >
                                <img src="https://www.google.com/favicon.ico" className="w-6 h-6 rounded-full bg-white p-0.5" alt="" />
                                Continue with Google
                            </button>
                            <button
                                onClick={nextStep}
                                className="ios-btn-secondary h-16 text-lg"
                            >
                                Continue as Guest
                            </button>
                        </div>
                    </div>
                )}

                {/* Step 2: Residency (Replaces old Step 1) */}
                {step === 2 && (
                    <div className="view-transition space-y-8">
                        <div className="w-20 h-20 bg-blue-600 rounded-3xl mx-auto flex items-center justify-center shadow-xl shadow-blue-200">
                            <MapPin className="text-white w-10 h-10" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-black text-gray-900 tracking-tight mb-4">Residency Check</h2>
                            <p className="text-gray-500 font-medium">Have you spent more than 183 days in Nigeria this year?</p>
                        </div>
                        <div className="flex flex-col gap-4">
                            <button
                                onClick={() => { setResidency(true); nextStep(); }}
                                className="ios-btn-primary h-16 text-lg"
                            >
                                Yes, I live here
                            </button>
                            <button
                                onClick={() => { setResidency(false); nextStep(); }}
                                className="ios-btn-secondary h-16 text-lg"
                            >
                                No, I'm visiting
                            </button>
                        </div>
                    </div>
                )}

                {/* Step 3: Income (Replaces old Step 2) */}
                {step === 3 && (
                    <div className="view-transition space-y-8">
                        <div className="w-20 h-20 bg-emerald-500 rounded-3xl mx-auto flex items-center justify-center shadow-xl shadow-emerald-100">
                            <span className="text-white text-5xl font-sans font-bold">₦</span>
                        </div>
                        <div>
                            <h2 className="text-3xl font-black text-gray-900 tracking-tight mb-4">Safe Zone Filter</h2>
                            <p className="text-gray-500 font-medium">Estimated annual income (₦)</p>
                        </div>
                        <div className="space-y-6">
                            <input
                                type="number"
                                value={income}
                                onChange={(e) => setIncome(e.target.value)}
                                placeholder="0.00"
                                className="w-full text-center text-5xl font-black bg-transparent border-0 focus:ring-0 text-gray-900 placeholder-gray-200"
                            />
                            {Number(income) > 0 && Number(income) <= 800000 && (
                                <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100 flex items-center gap-3">
                                    <ShieldCheck className="text-emerald-500 w-5 h-5 flex-shrink-0" />
                                    <span className="text-xs font-bold text-emerald-700 uppercase tracking-tight text-left">You qualify for the Tax-Free Safe Zone (₦800k or less)</span>
                                </div>
                            )}
                            <button
                                disabled={!income}
                                onClick={nextStep}
                                className="ios-btn-primary w-full h-16 text-lg disabled:opacity-50"
                            >
                                Next <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                )}

                {/* Step 4: Tax Category (Replaces old Step 3 - Now Skipable) */}
                {step === 4 && (
                    <div className="view-transition space-y-8">
                        <div className="w-20 h-20 bg-purple-600 rounded-3xl mx-auto flex items-center justify-center shadow-xl shadow-purple-100">
                            <User className="text-white w-10 h-10" />
                        </div>
                        <div>
                            <div className="flex items-center justify-center gap-2 mb-4">
                                <h2 className="text-3xl font-black text-gray-900 tracking-tight">Who are you?</h2>
                            </div>
                            <p className="text-gray-500 font-medium">Help us tailor your tax info.</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { id: 'PAYE', label: 'Salary Earner' },
                                { id: 'SmallBusiness', label: 'Small Business' },
                                { id: 'Professional', label: 'Freelancer' },
                                { id: 'DigitalNomad', label: 'Digital Nomad' }
                            ].map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => { setCategory(cat.id as UserCategory); nextStep(); }}
                                    className={`p-6 rounded-2xl border-2 transition-all font-bold text-sm ${category === cat.id ? 'bg-purple-600 border-purple-600 text-white shadow-lg' : 'bg-white border-gray-100 text-gray-900 hover:border-purple-200'
                                        }`}
                                >
                                    {cat.label}
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={nextStep}
                            className="text-gray-400 font-bold uppercase tracking-widest text-xs py-2 mt-4"
                        >
                            I'm not sure (Skip)
                        </button>
                    </div>
                )}

                {/* Step 5: TIN/NIN (Replaces old Step 4) */}
                {step === 5 && (
                    <div className="view-transition space-y-8">
                        <div className="w-20 h-20 bg-indigo-600 rounded-3xl mx-auto flex items-center justify-center shadow-xl shadow-indigo-100">
                            <CheckCircle2 className="text-white w-10 h-10" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-black text-gray-900 tracking-tight mb-4">TIN Integration</h2>
                            <p className="text-gray-500 font-medium">Link your NIN or CAC number (Optional)</p>
                        </div>
                        <div className="space-y-6">
                            <input
                                type="text"
                                value={idNumber}
                                onChange={(e) => setIdNumber(e.target.value)}
                                placeholder="NIN / CAC Number"
                                className="w-full text-center text-xl font-bold bg-white p-6 rounded-2xl border border-gray-100 focus:border-indigo-400 focus:ring-0 text-gray-900 shadow-sm"
                            />
                            <div className="flex flex-col gap-4">
                                <button
                                    onClick={handleComplete}
                                    className="ios-btn-primary w-full h-16 text-lg bg-indigo-600 hover:bg-indigo-700"
                                >
                                    Finish Setup
                                </button>
                                <button
                                    onClick={handleComplete}
                                    className="text-gray-400 font-bold uppercase tracking-widest text-xs py-2"
                                >
                                    Skip for now
                                </button>
                            </div>
                        </div>
                    </div>
                )}

            </div>

            <p className="fixed bottom-10 text-[10px] font-black text-gray-300 uppercase tracking-[0.3em]">Studio AYO • T-Axed 2026</p>
        </div>
    );
}

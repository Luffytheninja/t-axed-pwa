
import { Calculator, Mail, Share2, HelpCircle, Printer } from 'lucide-react';

interface HeaderProps {
    showEmailScheduler: boolean;
    onToggleEmailScheduler: () => void;
    onExportCSV: () => void;
    onShowTutorial: () => void;
}

export default function Header({
    showEmailScheduler,
    onToggleEmailScheduler,
    onExportCSV,
    onShowTutorial
}: HeaderProps) {
    return (
        <div className="mb-10 px-2 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="bg-white/80 p-2.5 rounded-2xl backdrop-blur-xl shadow-sm border border-white/40">
                    <Calculator className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                    <h1 className="text-2xl font-black tracking-tight text-gray-900 leading-none mb-1">T-Axed</h1>
                    <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">Compliant · 2025</span>
                    </div>
                </div>
            </div>

            <div className="flex gap-2">
                <button
                    onClick={onShowTutorial}
                    className="p-3 rounded-2xl bg-white/50 border border-white/40 text-gray-400 hover:text-blue-600 transition-all shadow-sm"
                    title="How to use this app"
                >
                    <HelpCircle className="w-5 h-5" />
                </button>
                <button
                    onClick={() => window.print()}
                    className="p-3 rounded-2xl bg-white/50 border border-white/40 text-gray-600 hover:bg-white transition-all shadow-sm hidden md:block"
                    title="Print Report"
                >
                    <Printer className="w-5 h-5" />
                </button>
                <button
                    onClick={onToggleEmailScheduler}
                    className={`p-3 rounded-2xl transition-all duration-300 border ${showEmailScheduler ? 'bg-blue-600 border-blue-600 text-white shadow-lg' : 'bg-white/50 border-white/40 text-gray-600 hover:bg-white'}`}
                >
                    <Mail className="w-5 h-5" />
                </button>
                <button
                    onClick={onExportCSV}
                    className="p-3 rounded-2xl bg-white/50 border border-white/40 text-gray-600 hover:bg-white transition-all shadow-sm"
                >
                    <Share2 className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}

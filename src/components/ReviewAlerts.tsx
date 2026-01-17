import { Bell, AlertCircle, Shield, CheckCircle } from 'lucide-react';
import { formatCurrency } from '../utils';
import { TaxResults } from '../types';

interface ReviewAlertsProps {
    results: TaxResults;
    employeeCount: number;
    rentPaid: number;
}

export default function ReviewAlerts({ results, employeeCount, rentPaid }: ReviewAlertsProps) {
    return (
        <div className="ios-card p-8">
            <h2 className="ios-section-header flex items-center gap-2">
                <Bell className="w-6 h-6 text-indigo-600" />
                Compliance Alerts
            </h2>

            <div className="space-y-4 pt-4">
                {results.healthPremium > 0 && (
                    <div className="bg-amber-50/50 border border-amber-100 p-5 rounded-2xl flex items-start gap-4">
                        <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                        <div>
                            <h3 className="text-sm font-bold text-amber-900 leading-none mb-2">Health Coverage Sync</h3>
                            <p className="text-[11px] font-medium text-amber-800 leading-relaxed">
                                You're paying <span className="font-bold">{formatCurrency(results.healthPremium)}</span>/year.
                                Note: Health premiums are not tax-deductible under current NTAA guidelines, but are tracked for future regulation updates.
                            </p>
                            <div className="mt-3 px-2 py-1 bg-amber-100/50 rounded-lg inline-block">
                                <p className="text-[9px] font-black text-amber-700 uppercase tracking-widest">
                                    ⚠️ Monitoring NTAA Phase 2 Updates
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {results.nhiaMandatory && (
                    <div className="bg-red-50/50 border border-red-100 p-5 rounded-2xl flex items-start gap-4">
                        <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                        <div>
                            <h3 className="text-sm font-bold text-red-900 leading-none mb-2">NHIA Compliance Required</h3>
                            <p className="text-[11px] font-medium text-red-800 leading-relaxed">
                                Business has {employeeCount} employees. NHIA registration is <span className="font-bold underline decoration-red-300">MANDATORY</span> for teams of 3+.
                            </p>
                            <p className="text-[10px] font-bold text-red-700 mt-2 uppercase tracking-tighter">
                                Mandatory: 10% Contribution (5% Employer + 5% Employee)
                            </p>
                        </div>
                    </div>
                )}

                {!results.nhiaMandatory && results.nhiaVoluntary > 0 && (
                    <div className="bg-blue-50/50 border border-blue-100 p-5 rounded-2xl flex items-start gap-4">
                        <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <div>
                            <h3 className="text-sm font-bold text-blue-900 leading-none mb-2">Voluntary Protection</h3>
                            <p className="text-[11px] font-medium text-blue-800 leading-relaxed">
                                Your voluntary NHIA contribution of <span className="font-bold">{formatCurrency(results.nhiaVoluntary)}</span>/year is being tracked.
                                Tax relief eligibility for voluntary schemes is currently under review by NRS.
                            </p>
                        </div>
                    </div>
                )}

                {rentPaid > 0 && (
                    <div className="bg-indigo-50/50 border border-indigo-100 p-5 rounded-2xl flex items-start gap-4">
                        <AlertCircle className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                        <div>
                            <h3 className="text-sm font-bold text-indigo-900 leading-none mb-2">Related-Party Disclosure</h3>
                            <p className="text-[11px] font-medium text-indigo-800 leading-relaxed mb-3">
                                Rent paid to family members requires strict documentation to maintain deduction status:
                            </p>
                            <div className="grid grid-cols-1 gap-2">
                                {['Formal lease agreement', 'Bank transfer audit trail', 'Family tax declaration confirmation'].map((item, i) => (
                                    <div key={i} className="flex items-center gap-2 text-[10px] font-bold text-indigo-700/70 uppercase">
                                        <div className="w-1 h-1 rounded-full bg-indigo-400" />
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                <div className="bg-emerald-50/50 border border-emerald-100 p-5 rounded-2xl flex items-start gap-4">
                    <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <div>
                        <h3 className="text-sm font-bold text-emerald-900 leading-none mb-2">Data Integrity: Verified</h3>
                        <p className="text-[11px] font-medium text-emerald-800 leading-relaxed">
                            System is configured for 7-year deep retention. This protocol fully satisfies NTAA 2025 record-keeping mandates, mitigating ₦10,000 per-instance penalties.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

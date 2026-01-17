import { useState, useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { calculateTaxResults, fetchExchangeRates } from './utils';
import { IncomeEntry, ExpenseEntry, TaxResults, UserCategory } from './types';
import {
    loadUserData, saveUserData,
    loadIncomeEntries, saveIncomeEntries,
    loadExpenseEntries, saveExpenseEntries,
    loadUserCategory, saveUserCategory,
    UserData
} from './persistence';

import Header from './components/Header';
import EmailScheduler from './components/EmailScheduler';
import IncomeTracker from './components/IncomeTracker';
import ExpenseTracker from './components/ExpenseTracker';
import TrackerButtons from './components/TrackerButtons';
import InputSection from './components/InputSection';
import InsuranceAPIPanel from './components/InsuranceAPIPanel';
import TaxResultsBreakdown from './components/TaxResultsBreakdown';
import ValueAdvisor from './components/ValueAdvisor';
import DeadlineCountdown from './components/DeadlineCountdown';
import QuarterlyScheduler from './components/QuarterlyScheduler';
import MultiYearProjection from './components/MultiYearProjection';
import ReviewAlerts from './components/ReviewAlerts';
import TabBar, { TabType } from './components/TabBar';
import TutorialOverlay from './components/TutorialOverlay';
import OnboardingFlow from './components/OnboardingFlow';
import { ShieldCheck } from 'lucide-react';

export default function App() {
    // Persistent State
    const [monthlyIncome, setMonthlyIncome] = useState(200000);
    const [lifePremium, setLifePremium] = useState(0);
    const [healthPremium, setHealthPremium] = useState(0);
    const [nhiaVoluntary, setNhiaVoluntary] = useState(0);
    const [rentPaid, setRentPaid] = useState(0);
    const [utilityPercentage, setUtilityPercentage] = useState(40);
    const [monthlyUtilities, setMonthlyUtilities] = useState(20000);
    const [employeeCount, setEmployeeCount] = useState(0);
    const [userCategory, setUserCategory] = useState<UserCategory>('PAYE');

    const [incomeEntries, setIncomeEntries] = useState<IncomeEntry[]>([]);
    const [expenseEntries, setExpenseEntries] = useState<ExpenseEntry[]>([]);

    // UI State
    const [results, setResults] = useState<TaxResults | null>(null);
    const [showEmailScheduler, setShowEmailScheduler] = useState(false);
    const [showIncomeTracker, setShowIncomeTracker] = useState(false);
    const [showExpenseTracker, setShowExpenseTracker] = useState(false);
    const [showInsuranceAPI, setShowInsuranceAPI] = useState(false);
    const [activeTab, setActiveTab] = useState<TabType>('dashboard');
    const [showTutorial, setShowTutorial] = useState(false);
    const [showOnboarding, setShowOnboarding] = useState(false);
    const [exchangeRate, setExchangeRate] = useState(1600);

    // Initial Load
    useEffect(() => {
        const hasSeenTutorial = localStorage.getItem('taxed_tutorial_seen');
        if (!hasSeenTutorial) {
            setShowTutorial(true);
        }

        const data = loadUserData();
        if (data) {
            setMonthlyIncome(data.monthlyIncome);
            setLifePremium(data.lifePremium);
            setHealthPremium(data.healthPremium);
            setNhiaVoluntary(data.nhiaVoluntary);
            setRentPaid(data.rentPaid);
            setUtilityPercentage(data.utilityPercentage);
            setMonthlyUtilities(data.monthlyUtilities);
            setEmployeeCount(data.employeeCount);
        } else {
            setShowOnboarding(true);
        }

        setIncomeEntries(loadIncomeEntries());
        setExpenseEntries(loadExpenseEntries());
        setUserCategory(loadUserCategory());

        // Fetch live exchange rate
        fetchExchangeRates().then(rate => setExchangeRate(rate));
    }, []);

    // Persistence Save
    useEffect(() => {
        const userData: UserData = {
            monthlyIncome, lifePremium, healthPremium, nhiaVoluntary,
            rentPaid, utilityPercentage, monthlyUtilities, employeeCount
        };
        saveUserData(userData);
        saveIncomeEntries(incomeEntries);
        saveExpenseEntries(expenseEntries);
        saveUserCategory(userCategory);
    }, [monthlyIncome, lifePremium, healthPremium, nhiaVoluntary, rentPaid, utilityPercentage, monthlyUtilities, employeeCount, incomeEntries, expenseEntries, userCategory]);

    // Calculation
    useEffect(() => {
        const calculatedResults = calculateTaxResults(
            monthlyIncome, lifePremium, healthPremium, nhiaVoluntary, rentPaid,
            utilityPercentage, monthlyUtilities, employeeCount, incomeEntries, expenseEntries,
            userCategory
        );
        setResults(calculatedResults);
    }, [monthlyIncome, lifePremium, healthPremium, nhiaVoluntary, rentPaid, utilityPercentage, monthlyUtilities, employeeCount, incomeEntries, expenseEntries, userCategory]);

    const addIncomeEntry = (entry: IncomeEntry) => {
        setIncomeEntries([...incomeEntries, { ...entry, exchangeRate: entry.currency === 'NGN' ? 1 : exchangeRate }]);
    };

    const deleteIncomeEntry = (id: number) => {
        setIncomeEntries(incomeEntries.filter(entry => entry.id !== id));
    };

    const addExpenseEntry = (entry: ExpenseEntry) => {
        setExpenseEntries([...expenseEntries, entry]);
    };

    const deleteExpenseEntry = (id: number) => {
        setExpenseEntries(expenseEntries.filter(entry => entry.id !== id));
    };

    const exportToCSV = () => {
        if (!results) return;

        const csvData = [
            ['T-Axed Tax & Business Report - Studio Ayo', ''],
            ['Category', userCategory],
            ['Generated', new Date().toLocaleDateString('en-NG')],
            ['Effective Tax Rate', (results.effectiveRate).toFixed(2) + '%'],
            ['', ''],
            ['BUSINESS INCOME TRACKING', ''],
            ['Total Tracked Income', results.totalTrackedIncome || 0],
            ['Number of Transactions', incomeEntries.length],
            ['', ''],
            ['INCOME BREAKDOWN', ''],
            ...incomeEntries.map(e => [e.date, e.description, e.amount, e.currency, e.exchangeRate, e.receiptId, e.client, e.category]),
            ['', ''],
            ['BUSINESS EXPENSES TRACKING', ''],
            ['Total Tracked Expenses', results.totalTrackedExpenses || 0],
            ['Number of Transactions', expenseEntries.length],
            ['', ''],
            ['EXPENSE BREAKDOWN', ''],
            ...expenseEntries.map(e => [e.date, e.description, e.amount, e.receiptId, e.category, e.deductible ? 'Deductible' : 'Non-Deductible']),
            ['', ''],
            ['TAX CALCULATION (STAIRCASE BANDING)', ''],
            ['Annual Gross Income', results.annualGross],
            ['Deductions Total', results.totalDeductions],
            ['Chargeable Income', results.chargeableIncome],
            ...results.taxBands.map(b => [`Band ${b.rate}%`, b.taxableInBand, b.taxInBand]),
            ['', ''],
            ['Annual Tax Total', results.annualTax],
            ['Monthly Tax', results.monthlyTax],
            ['Annual Take-Home', results.annualTakeHome]
        ];

        const csvContent = csvData.map(row => row.join(',')).join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `T-Axed_Report_${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
    };

    return (
        <div className="min-h-screen pb-32 pt-6 px-4 md:px-12">
            {showOnboarding && (
                <OnboardingFlow
                    onComplete={(data) => {
                        setMonthlyIncome(data.annualIncome / 12);
                        setUserCategory(data.category);
                        setShowOnboarding(false);
                    }}
                />
            )}
            <div className="max-w-7xl mx-auto">
                <Header
                    showEmailScheduler={showEmailScheduler}
                    onToggleEmailScheduler={() => setShowEmailScheduler(!showEmailScheduler)}
                    onExportCSV={exportToCSV}
                    onShowTutorial={() => setShowTutorial(true)}
                />

                <div className="view-transition">
                    {activeTab === 'dashboard' && results && (
                        <div className="space-y-8">
                            <DeadlineCountdown />
                            {/* "Safe Zone" Marker */}
                            {results.isTaxFree && (
                                <div className="ios-card bg-emerald-50/80 border-emerald-200/50 p-6 flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-100">
                                        <ShieldCheck className="w-7 h-7" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-emerald-800">Safe Zone Active</h3>
                                        <p className="text-emerald-600/80 text-sm font-medium">Your income is below ₦800,000/year. You are officially Tax-Free.</p>
                                    </div>
                                </div>
                            )}

                            <TaxResultsBreakdown
                                results={results}
                                incomeEntries={incomeEntries}
                                expenseEntries={expenseEntries}
                            />
                            <ReviewAlerts
                                results={results}
                                employeeCount={employeeCount}
                                rentPaid={rentPaid}
                            />
                            <QuarterlyScheduler results={results} />
                        </div>
                    )}

                    {activeTab === 'tracking' && results && (
                        <div className="space-y-8">
                            <TrackerButtons
                                showIncomeTracker={showIncomeTracker}
                                setShowIncomeTracker={setShowIncomeTracker}
                                showExpenseTracker={showExpenseTracker}
                                setShowExpenseTracker={setShowExpenseTracker}
                                totalTrackedIncome={results?.totalTrackedIncome || 0}
                                totalTrackedExpenses={results?.totalTrackedExpenses || 0}
                            />

                            {showIncomeTracker && (
                                <IncomeTracker
                                    entries={incomeEntries}
                                    onAddEntry={addIncomeEntry}
                                    onDeleteEntry={deleteIncomeEntry}
                                    totalTrackedIncome={results?.totalTrackedIncome || 0}
                                    exchangeRate={exchangeRate}
                                />
                            )}

                            {showExpenseTracker && (
                                <ExpenseTracker
                                    entries={expenseEntries}
                                    onAddEntry={addExpenseEntry}
                                    onDeleteEntry={deleteExpenseEntry}
                                    totalTrackedExpenses={results?.totalTrackedExpenses || 0}
                                />
                            )}
                        </div>
                    )}

                    {activeTab === 'optimization' && results && (
                        <div className="space-y-8">
                            <ValueAdvisor results={results} />
                            <MultiYearProjection
                                results={results}
                                lifePremium={lifePremium}
                            />
                        </div>
                    )}

                    {activeTab === 'profile' && (
                        <div className="space-y-8">
                            <InputSection
                                monthlyIncome={monthlyIncome} setMonthlyIncome={setMonthlyIncome}
                                employeeCount={employeeCount} setEmployeeCount={setEmployeeCount}
                                rentPaid={rentPaid} setRentPaid={setRentPaid}
                                monthlyUtilities={monthlyUtilities} setMonthlyUtilities={setMonthlyUtilities}
                                utilityPercentage={utilityPercentage} setUtilityPercentage={setUtilityPercentage}
                                lifePremium={lifePremium} setLifePremium={setLifePremium}
                                healthPremium={healthPremium} setHealthPremium={setHealthPremium}
                                nhiaVoluntary={nhiaVoluntary} setNhiaVoluntary={setNhiaVoluntary}
                                isTrackerActive={(results?.totalTrackedIncome || 0) > 0}
                                nhiaMandatory={results?.nhiaMandatory || false}
                                showInsuranceAPI={showInsuranceAPI} setShowInsuranceAPI={setShowInsuranceAPI}
                                userCategory={userCategory} setUserCategory={setUserCategory}
                            />

                            {showInsuranceAPI && <InsuranceAPIPanel onUpdatePremiums={(life, health) => {
                                setLifePremium(prev => prev + life);
                                setHealthPremium(prev => prev + health);
                            }} />}

                            {showEmailScheduler && results && (
                                <EmailScheduler results={results} />
                            )}
                        </div>
                    )}
                </div>
            </div>

            <TabBar activeTab={activeTab} setActiveTab={setActiveTab} />
            <TutorialOverlay isOpen={showTutorial} onClose={() => setShowTutorial(false)} />
            <Analytics />
        </div>
    );
}

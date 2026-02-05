import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
import QuarterlyScheduler from './components/QuarterlyScheduler';
import MultiYearProjection from './components/MultiYearProjection';
import TabBar, { TabType } from './components/TabBar';
import TutorialOverlay from './components/TutorialOverlay';
import OnboardingFlow from './components/OnboardingFlow';
import SummaryHeader from './components/SummaryHeader';
import { TrendingUp, TrendingDown } from 'lucide-react';

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
    const [voluntaryPension, setVoluntaryPension] = useState(0);
    const [mortgageInterest, setMortgageInterest] = useState(0);
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
            setVoluntaryPension(data.voluntaryPension || 0);
            setMortgageInterest(data.mortgageInterest || 0);
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
            rentPaid, utilityPercentage, monthlyUtilities, employeeCount,
            voluntaryPension, mortgageInterest
        };
        saveUserData(userData);
        saveIncomeEntries(incomeEntries);
        saveExpenseEntries(expenseEntries);
        saveUserCategory(userCategory);
    }, [monthlyIncome, lifePremium, healthPremium, nhiaVoluntary, rentPaid, utilityPercentage, monthlyUtilities, employeeCount, incomeEntries, expenseEntries, userCategory, voluntaryPension, mortgageInterest]);

    // Calculation
    useEffect(() => {
        const calculatedResults = calculateTaxResults(
            monthlyIncome, lifePremium, healthPremium, nhiaVoluntary, rentPaid,
            utilityPercentage, monthlyUtilities, employeeCount, incomeEntries, expenseEntries,
            voluntaryPension, mortgageInterest, userCategory
        );
        setResults(calculatedResults);
    }, [monthlyIncome, lifePremium, healthPremium, nhiaVoluntary, rentPaid, utilityPercentage, monthlyUtilities, employeeCount, incomeEntries, expenseEntries, userCategory, voluntaryPension, mortgageInterest]);

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
        <div className="min-h-screen pb-32 pt-6 px-4 md:px-12 bg-black">
            {showOnboarding && (
                <OnboardingFlow
                    onComplete={(data) => {
                        setMonthlyIncome(data.annualIncome / 12);
                        setUserCategory(data.category);
                        setShowOnboarding(false);
                    }}
                />
            )}
            <div className="max-w-2xl mx-auto">
                <Header
                    showEmailScheduler={showEmailScheduler}
                    onToggleEmailScheduler={() => setShowEmailScheduler(!showEmailScheduler)}
                    onExportCSV={exportToCSV}
                    onShowTutorial={() => setShowTutorial(true)}
                />

                {/* Minimalist Summary Header - Always Visible on Dashboard */}
                {activeTab === 'dashboard' && results && (
                    <SummaryHeader
                        annualIncome={results.totalTrackedIncome > 0 ? results.totalTrackedIncome : results.annualGross}
                        annualTax={results.annualTax}
                    />
                )}

                <div className="relative overflow-hidden min-h-[600px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
                        >
                            {activeTab === 'dashboard' && results && (
                                <div className="space-y-6">
                                    {/* Action Buttons */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <button
                                            onClick={() => { setActiveTab('tracking'); setShowIncomeTracker(true); }}
                                            className="ios-card p-4 flex flex-col items-center justify-center gap-2 hover:bg-emerald-50 transition-colors group"
                                        >
                                            <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
                                                <TrendingUp className="w-6 h-6" />
                                            </div>
                                            <span className="font-bold text-gray-900 text-sm">Add Income</span>
                                        </button>
                                        <button
                                            onClick={() => { setActiveTab('tracking'); setShowExpenseTracker(true); }}
                                            className="ios-card p-4 flex flex-col items-center justify-center gap-2 hover:bg-red-50 transition-colors group"
                                        >
                                            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-600 group-hover:scale-110 transition-transform">
                                                <TrendingDown className="w-6 h-6" />
                                            </div>
                                            <span className="font-bold text-gray-900 text-sm">Add Expense</span>
                                        </button>
                                    </div>

                                    {/* Quick Recent Activity / Mini-Tracker */}
                                    <div className="ios-card p-6">
                                        <h3 className="font-bold text-gray-900 mb-4 text-lg">Recent Bookkeeping</h3>
                                        {incomeEntries.length === 0 && expenseEntries.length === 0 ? (
                                            <div className="text-center py-8 text-gray-400 text-sm">
                                                No transactions yet. Start tracking!
                                            </div>
                                        ) : (
                                            <div className="space-y-3">
                                                {incomeEntries.slice(-3).reverse().map(e => (
                                                    <div key={`inc-${e.id}`} className="flex justify-between items-center text-sm">
                                                        <span className="text-gray-600">{e.description}</span>
                                                        <span className="font-bold text-emerald-600">+₦{Number(e.amount).toLocaleString()}</span>
                                                    </div>
                                                ))}
                                                {expenseEntries.slice(-3).reverse().map(e => (
                                                    <div key={`exp-${e.id}`} className="flex justify-between items-center text-sm">
                                                        <span className="text-gray-600">{e.description}</span>
                                                        <span className="font-bold text-red-600">-₦{Number(e.amount).toLocaleString()}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                        <button
                                            onClick={() => setActiveTab('tracking')}
                                            className="w-full mt-4 py-3 text-xs font-bold uppercase tracking-widest text-blue-600 bg-blue-50 rounded-xl"
                                        >
                                            View All Transactions
                                        </button>
                                    </div>

                                    <TaxResultsBreakdown
                                        results={results}
                                        incomeEntries={incomeEntries}
                                        expenseEntries={expenseEntries}
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
                                        voluntaryPension={voluntaryPension} setVoluntaryPension={setVoluntaryPension}
                                        mortgageInterest={mortgageInterest} setMortgageInterest={setMortgageInterest}
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
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            <TabBar activeTab={activeTab} setActiveTab={setActiveTab} />
            <TutorialOverlay isOpen={showTutorial} onClose={() => setShowTutorial(false)} />
        </div>
    );
}

'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { IncomeEntry, ExpenseEntry, UserCategory } from '@/utils/types';
import {
    UserData,
    loadUserData, saveUserData,
    loadIncomeEntries, saveIncomeEntries,
    loadExpenseEntries, saveExpenseEntries,
    loadUserCategory, saveUserCategory
} from '@/utils/persistence';

interface BookkeepingContextType {
    // Financial Entries
    incomeEntries: IncomeEntry[];
    expenseEntries: ExpenseEntry[];
    addIncome: (entry: IncomeEntry) => void;
    deleteIncome: (id: number) => void;
    addExpense: (entry: ExpenseEntry) => void;
    deleteExpense: (id: number) => void;

    // User Profile
    userData: UserData;
    updateUserData: (data: Partial<UserData>) => void;
    userCategory: UserCategory;
    updateUserCategory: (category: UserCategory) => void;

    // Loading State
    isLoading: boolean;
}

const DEFAULT_USER_DATA: UserData = {
    monthlyIncome: 0,
    lifePremium: 0,
    healthPremium: 0,
    nhiaVoluntary: 0,
    rentPaid: 0,
    utilityPercentage: 40,
    monthlyUtilities: 0,
    employeeCount: 0,
    voluntaryPension: 0,
    mortgageInterest: 0
};

const BookkeepingContext = createContext<BookkeepingContextType | undefined>(undefined);

export function BookkeepingProvider({ children }: { children: React.ReactNode }) {
    const [incomeEntries, setIncomeEntries] = useState<IncomeEntry[]>([]);
    const [expenseEntries, setExpenseEntries] = useState<ExpenseEntry[]>([]);
    const [userData, setUserData] = useState<UserData>(DEFAULT_USER_DATA);
    const [userCategory, setUserCategory] = useState<UserCategory>('PAYE');
    const [isLoading, setIsLoading] = useState(true);

    // Initial Load
    useEffect(() => {
        const loadedUserData = loadUserData();
        if (loadedUserData) setUserData(loadedUserData);

        setIncomeEntries(loadIncomeEntries());
        setExpenseEntries(loadExpenseEntries());
        setUserCategory(loadUserCategory());
        setIsLoading(false);
    }, []);

    // Persistence Effects
    useEffect(() => {
        if (!isLoading) saveUserData(userData);
    }, [userData, isLoading]);

    useEffect(() => {
        if (!isLoading) saveIncomeEntries(incomeEntries);
    }, [incomeEntries, isLoading]);

    useEffect(() => {
        if (!isLoading) saveExpenseEntries(expenseEntries);
    }, [expenseEntries, isLoading]);

    useEffect(() => {
        if (!isLoading) saveUserCategory(userCategory);
    }, [userCategory, isLoading]);

    // Actions
    const addIncome = (entry: IncomeEntry) => {
        setIncomeEntries(prev => [...prev, entry]);
    };

    const deleteIncome = (id: number) => {
        setIncomeEntries(prev => prev.filter(e => e.id !== id));
    };

    const addExpense = (entry: ExpenseEntry) => {
        setExpenseEntries(prev => [...prev, entry]);
    };

    const deleteExpense = (id: number) => {
        setExpenseEntries(prev => prev.filter(e => e.id !== id));
    };

    const updateUserData = (data: Partial<UserData>) => {
        setUserData(prev => ({ ...prev, ...data }));
    };

    const updateUserCategory = (category: UserCategory) => {
        setUserCategory(category);
    };

    return (
        <BookkeepingContext.Provider value={{
            incomeEntries, expenseEntries,
            addIncome, deleteIncome,
            addExpense, deleteExpense,
            userData, updateUserData,
            userCategory, updateUserCategory,
            isLoading
        }}>
            {children}
        </BookkeepingContext.Provider>
    );
}

export function useBookkeeping() {
    const context = useContext(BookkeepingContext);
    if (context === undefined) {
        throw new Error('useBookkeeping must be used within a BookkeepingProvider');
    }
    return context;
}

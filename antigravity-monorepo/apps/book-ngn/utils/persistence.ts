import { IncomeEntry, ExpenseEntry, UserCategory } from './types';

const STORAGE_KEYS = {
  USER_DATA: 'taxed_user_data',
  INCOME: 'taxed_income_entries',
  EXPENSE: 'taxed_expense_entries',
  CATEGORY: 'taxed_user_category',
};

export interface UserData {
  monthlyIncome: number;
  lifePremium: number;
  healthPremium: number;
  nhiaVoluntary: number;
  rentPaid: number;
  utilityPercentage: number;
  monthlyUtilities: number;
  employeeCount: number;
  voluntaryPension: number;
  mortgageInterest: number;
}

export const loadUserData = (): UserData | null => {
  if (typeof window === 'undefined') return null;
  const data = localStorage.getItem(STORAGE_KEYS.USER_DATA);
  return data ? JSON.parse(data) : null;
};

export const saveUserData = (data: UserData) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(data));
};

export const loadIncomeEntries = (): IncomeEntry[] => {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(STORAGE_KEYS.INCOME);
  return data ? JSON.parse(data) : [];
};

export const saveIncomeEntries = (entries: IncomeEntry[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.INCOME, JSON.stringify(entries));
};

export const loadExpenseEntries = (): ExpenseEntry[] => {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(STORAGE_KEYS.EXPENSE);
  return data ? JSON.parse(data) : [];
};

export const saveExpenseEntries = (entries: ExpenseEntry[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.EXPENSE, JSON.stringify(entries));
};

export const loadUserCategory = (): UserCategory => {
  if (typeof window === 'undefined') return 'PAYE';
  const data = localStorage.getItem(STORAGE_KEYS.CATEGORY);
  return (data as UserCategory) || 'PAYE';
};

export const saveUserCategory = (category: UserCategory) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.CATEGORY, category);
};

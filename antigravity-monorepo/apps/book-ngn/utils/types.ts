export type UserCategory = 'PAYE' | 'SmallBusiness' | 'Professional' | 'DigitalNomad';

export interface IncomeEntry {
    id: number;
    date: string;
    amount: string;
    description: string;
    receiptId: string;
    client: string;
    category: string;
    currency: string;
    exchangeRate: number;
}

export interface ExpenseEntry {
    id: number;
    date: string;
    amount: string;
    description: string;
    receiptId: string;
    category: string;
    deductible: boolean;
}

export interface TaxBand {
    rate: number;
    threshold: number;
    taxableInBand: number;
    taxInBand: number;
}

export interface TaxResults {
    annualGross: number;
    pension: number;
    nhf: number;
    lifeInsuranceRelief: number;
    lifeInsuranceUnused: number;
    maxLifeRelief: number;
    rentRelief: number;
    businessUtilities: number;
    totalBusinessExpenses: number;
    totalDeductions: number;
    netIncome: number;
    taxFreeAllowance: number;
    chargeableIncome: number;
    annualTax: number;
    monthlyTax: number;
    monthlyTakeHome: number;
    annualTakeHome: number;
    potentialAdditionalLife: number;
    potentialTaxSavings: number;
    nhiaMandatory: boolean;
    healthPremium: number;
    nhiaVoluntary: number;
    totalTrackedIncome: number;
    totalTrackedExpenses: number;
    category: UserCategory;
    isTaxFree: boolean;
    taxBands: TaxBand[];
    effectiveRate: number;
    voluntaryPension: number;
    mortgageInterest: number;
}

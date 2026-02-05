import { IncomeEntry, ExpenseEntry, TaxBand, UserCategory } from './types';

export const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
};

// 2026 Progressive Tax Bands
const TAX_BANDS_CONFIG = [
    { threshold: 1000000, rate: 0.15 },
    { threshold: 2000000, rate: 0.18 },
    { threshold: 5000000, rate: 0.21 },
    { threshold: Infinity, rate: 0.25 }
];

export const calculateTaxResults = (
    monthlyIncome: number,
    lifePremium: number,
    healthPremium: number,
    nhiaVoluntary: number,
    rentPaid: number,
    utilityPercentage: number,
    monthlyUtilities: number,
    employeeCount: number,
    incomeEntries: IncomeEntry[],
    expenseEntries: ExpenseEntry[],
    voluntaryPension: number = 0,
    mortgageInterest: number = 0,
    category: UserCategory = 'PAYE'
) => {
    // Calculate actual income from entries with exchange rate conversion
    const totalTrackedIncome = incomeEntries.reduce((sum, entry) => {
        const val = parseFloat(entry.amount || '0');
        const rate = entry.exchangeRate || 1;
        return sum + (val * rate);
    }, 0);

    const totalTrackedExpenses = expenseEntries.filter(e => e.deductible).reduce((sum, entry) => sum + parseFloat(entry.amount || '0'), 0);

    // Use tracked income if available, otherwise use manual input
    const annualGross = totalTrackedIncome > 0 ? totalTrackedIncome : monthlyIncome * 12;

    // Small Business Exemption Logic
    const isSmallBusinessExempt = (category === 'SmallBusiness' && annualGross <= 50000000);

    // Tax-Free Zone Check (₦800,000 or less)
    const isTaxFree = annualGross <= 800000;

    const pension = annualGross * 0.08;
    const nhf = annualGross * 0.025;
    const maxLifeRelief = annualGross * 0.20;
    const lifeInsuranceRelief = Math.min(lifePremium, maxLifeRelief);
    const lifeInsuranceUnused = maxLifeRelief - lifeInsuranceRelief;
    const rentRelief = Math.min(rentPaid * 0.20, 500000);

    // Include tracked expenses in deductions
    const annualUtilities = monthlyUtilities * 12;
    const businessUtilities = annualUtilities * (utilityPercentage / 100);
    const totalBusinessExpenses = totalTrackedExpenses + businessUtilities;

    // Mortgage interest is fully tax-exempt
    const mortgageRelief = mortgageInterest;

    const totalDeductions = pension + voluntaryPension + nhf + lifeInsuranceRelief + rentRelief + mortgageRelief + totalBusinessExpenses;
    const netIncome = Math.max(0, annualGross - totalDeductions);
    const taxFreeAllowance = 800000;
    const chargeableIncome = isSmallBusinessExempt ? 0 : Math.max(0, netIncome - taxFreeAllowance);

    // Progressive Staircase Calculation
    let remainingChargeable = chargeableIncome;
    let prevThreshold = 0;
    const taxBands: TaxBand[] = [];
    let annualTax = 0;

    for (const band of TAX_BANDS_CONFIG) {
        const bandSize = band.threshold - prevThreshold;
        const taxableInBand = Math.min(remainingChargeable, bandSize);
        const taxInBand = taxableInBand * band.rate;

        taxBands.push({
            rate: band.rate * 100,
            threshold: band.threshold,
            taxableInBand,
            taxInBand
        });

        annualTax += taxInBand;
        remainingChargeable -= taxableInBand;
        prevThreshold = band.threshold;
        if (remainingChargeable <= 0) break;
    }

    const monthlyTax = annualTax / 12;
    const monthlyTakeHome = (annualGross / 12) - monthlyTax;
    const annualTakeHome = monthlyTakeHome * 12;
    const potentialAdditionalLife = lifeInsuranceUnused;
    const potentialTaxSavings = potentialAdditionalLife * 0.15;
    const nhiaMandatory = employeeCount >= 3;
    const effectiveRate = annualGross > 0 ? (annualTax / annualGross) * 100 : 0;

    return {
        annualGross, pension, nhf, lifeInsuranceRelief, lifeInsuranceUnused,
        maxLifeRelief, rentRelief, businessUtilities, totalBusinessExpenses,
        totalDeductions, netIncome, taxFreeAllowance, chargeableIncome, annualTax,
        monthlyTax, monthlyTakeHome, annualTakeHome, potentialAdditionalLife,
        potentialTaxSavings, nhiaMandatory, healthPremium, nhiaVoluntary,
        totalTrackedIncome, totalTrackedExpenses,
        category, isTaxFree, taxBands, effectiveRate,
        voluntaryPension, mortgageInterest
    };
};

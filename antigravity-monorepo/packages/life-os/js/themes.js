/**
 * Life OS - Theme System
 * Dual personality: Classic vs Suave Spartan
 */

const THEMES = {
    classic: {
        id: 'classic',
        name: 'Classic',

        // Colors
        colors: {
            bgPrimary: '#0D1B2A',
            bgCard: '#1B263B',
            bgElevated: '#253447',

            bodyPrimary: '#E63946',
            bodyLight: '#F4A5AE',
            bodyDark: '#A4161A',

            workPrimary: '#457B9D',
            workLight: '#A8DADC',
            workDark: '#1D3557',

            accent: '#06D6A0',
            textPrimary: '#E0E1DD',
            textSecondary: '#9CA3AF',
        },

        // Style
        style: {
            borderRadius: '16px',
            borderRadiusSm: '8px',
            borderRadiusLg: '24px',
            cardBlur: '0',
            cardOpacity: '1',
            progressAnimation: 'smooth',
        },

        // Copy
        copy: {
            bodyLabel: 'Body',
            workLabel: 'Work',
            bodyIcon: '🏋🏽',
            workIcon: '💼',

            gymButton: 'Log Gym Quest',
            workButton: 'Log Work Quest',
            completeButton: 'Complete Quest',

            levelUp: 'LEVEL UP!',
            questComplete: 'Quest Complete!',

            gymQuests: {
                light: 'Light workout',
                standard: 'Standard workout',
                heavy: 'Heavy / PR',
                recovery: 'Recovery / Mobility'
            },

            workQuests: {
                deep_work: 'Deep work (60-90 min)',
                shipped: 'Shipped task',
                learning: 'Learning block',
                admin: 'Admin work'
            }
        },

        // Multipliers (original system)
        multipliers: {
            sleepPoor: 0.7,
            sleepLow: 0.85,
            sleepGood: 1.0,
            sleepExcellent: 1.15,

            fuelLow: 0.75,
            fuelMedium: 1.0,
            fuelHigh: 1.15,

            balanceGate: 0.5,
            balanceBonus: 1.1,
        }
    },

    suaveSpartan: {
        id: 'suaveSpartan',
        name: 'Suave Spartan',

        // Colors (Nigerian Naija Palette)
        colors: {
            bgPrimary: '#050505',      // Obsidian Matte
            bgCard: 'rgba(255, 255, 255, 0.05)',  // Glass Card
            bgElevated: 'rgba(255, 255, 255, 0.08)',

            bodyPrimary: '#C8102E',    // Discipline Red
            bodyLight: '#E63946',
            bodyDark: '#8B0000',

            workPrimary: '#006341',    // Nigerian Forest Green (The Bag)
            workLight: '#00A86B',
            workDark: '#004225',

            accent: '#D4AF37',         // Champagne Gold (Elite Status)
            textPrimary: '#FFFFFF',
            textSecondary: '#A0A0A0',
        },

        // Style (Sharp, No curves)
        style: {
            borderRadius: '0px',       // Sharp edges
            borderRadiusSm: '0px',
            borderRadiusLg: '0px',
            cardBlur: '10px',          // Backdrop blur for glass
            cardOpacity: '0.05',
            progressAnimation: 'liquid',
        },

        // Copy (Aggressive Naija Terminology)
        copy: {
            bodyLabel: 'Discipline Index',
            workLabel: 'Asset Level',
            bodyIcon: '⚔️',
            workIcon: '💰',

            gymButton: 'Lock In',
            workButton: 'Ship It',
            completeButton: 'Secure',

            levelUp: 'ELITE STATUS UNLOCKED',
            questComplete: 'Mission Complete',

            gymQuests: {
                light: 'Active Recovery',
                standard: 'The Iron',
                heavy: 'Beast Mode',
                recovery: 'Systems Recovery',
                boss: 'Boss Battle'        // New type
            },

            workQuests: {
                deep_work: 'Deep Focus Block',
                shipped: 'Deployment',
                learning: 'Skill Acquisition',
                admin: 'Operations',
                boss: 'Client Pitch'       // New type
            }
        },

        // Multipliers (Suave Spartan system - more aggressive)
        multipliers: {
            // Sleep
            sleepDeprived: 0.5,    // < 6h (brutal)
            sleepLow: 0.75,        // 6-7h
            sleepOptimal: 1.0,     // 7-8.5h
            sleepElite: 1.25,      // 8.5h+ (higher bonus)

            // Fuel
            fuelLow: 0.75,
            fuelNormal: 1.0,
            fuelHigh: 1.2,

            // Gym Boost (replaces balance gate)
            gymBoost: 1.5,         // If gym done today
            noGymPenalty: 0.5,     // If gym not done

            // Streak (NEW)
            streakBonus: 1.3,      // 5+ gym sessions this week

            // Boss Battle
            bossBattleXP: 3.0,     // 3x base XP
            bossBattleFatigue: 2.0, // 2x fatigue cost
        },

        // Fatigue penalties (more punishing)
        fatiguePenalties: {
            fresh: 1.0,        // 0-30
            grinding: 0.9,     // 31-50
            fatigued: 0.75,    // 51-70
            burnout: 0.5       // 71-100
        }
    }
};

class ThemeManager {
    constructor() {
        this.currentTheme = this.loadTheme();
    }

    /**
     * Load theme from storage
     */
    loadTheme() {
        const saved = localStorage.getItem('life_os_theme');
        return saved && THEMES[saved] ? THEMES[saved] : THEMES.classic;
    }

    /**
     * Switch theme
     */
    switchTheme(themeId) {
        if (!THEMES[themeId]) {
            console.error('Theme not found:', themeId);
            return;
        }

        this.currentTheme = THEMES[themeId];
        localStorage.setItem('life_os_theme', themeId);
        this.applyTheme();
    }

    /**
     * Apply theme to document
     */
    applyTheme() {
        const theme = this.currentTheme;
        const root = document.documentElement;

        // Apply colors
        root.style.setProperty('--bg-primary', theme.colors.bgPrimary);
        root.style.setProperty('--bg-card', theme.colors.bgCard);
        root.style.setProperty('--bg-elevated', theme.colors.bgElevated);

        root.style.setProperty('--body-primary', theme.colors.bodyPrimary);
        root.style.setProperty('--body-light', theme.colors.bodyLight);
        root.style.setProperty('--body-dark', theme.colors.bodyDark);

        root.style.setProperty('--work-primary', theme.colors.workPrimary);
        root.style.setProperty('--work-light', theme.colors.workLight);
        root.style.setProperty('--work-dark', theme.colors.workDark);

        root.style.setProperty('--accent', theme.colors.accent);
        root.style.setProperty('--text-primary', theme.colors.textPrimary);
        root.style.setProperty('--text-secondary', theme.colors.textSecondary);

        // Apply style
        root.style.setProperty('--radius-md', theme.style.borderRadius);
        root.style.setProperty('--radius-sm', theme.style.borderRadiusSm);
        root.style.setProperty('--radius-lg', theme.style.borderRadiusLg);

        // Apply backdrop blur for Suave Spartan
        if (theme.id === 'suaveSpartan') {
            root.style.setProperty('--card-backdrop-filter', `blur(${theme.style.cardBlur})`);
            root.style.setProperty('--border-width', '1px');
        } else {
            root.style.setProperty('--card-backdrop-filter', 'none');
            root.style.setProperty('--border-width', '1px');
        }

        // Set body class for theme-specific animations
        document.body.className = `theme-${theme.id}`;
    }

    /**
     * Get current theme
     */
    getTheme() {
        return this.currentTheme;
    }

    /**
     * Get copy text
     */
    getCopy(key) {
        const keys = key.split('.');
        let value = this.currentTheme.copy;

        for (const k of keys) {
            value = value[k];
            if (value === undefined) return key;
        }

        return value;
    }

    /**
     * Get multiplier
     */
    getMultiplier(key) {
        return this.currentTheme.multipliers[key] || 1.0;
    }

    /**
     * Get fatigue penalty (Suave Spartan only)
     */
    getFatiguePenalty(fatigue) {
        if (this.currentTheme.id !== 'suaveSpartan') {
            return 1.0; // Classic uses old system
        }

        const penalties = this.currentTheme.fatiguePenalties;
        if (fatigue <= 30) return penalties.fresh;
        if (fatigue <= 50) return penalties.grinding;
        if (fatigue <= 70) return penalties.fatigued;
        return penalties.burnout;
    }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ThemeManager, THEMES };
}

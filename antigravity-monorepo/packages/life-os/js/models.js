/**
 * Life OS - Data Models
 * Defines the core data structures for user profiles, daily logs, and weekly summaries
 */

class UserProfile {
    constructor() {
        this.body_level = 1;
        this.body_xp = 0;
        this.work_level = 1;
        this.work_xp = 0;
        this.created_date = new Date().toISOString().split('T')[0];
        this.schema_version = 2;

        // AI Generated Protocol (Personalized AI Brain)
        this.protocol = {
            protocol_name: "Operation Suave Spartan",
            persona: "Cold Strategist",
            modifiers: {
                strength_training: 1.0,
                cardio: 1.0,
                deep_work: 1.0,
                bad_habit_replacement: 1.5
            },
            fatigue_threshold: 75,
            mini_me_quotes: {
                success: "Efficiency is high. The bag is inevitable.",
                warning: "Trade health for pennies? No. Hit the Iron."
            }
        };

        // Weekly Audit History
        this.audit_history = [];

        // Baseline goals (set during onboarding)
        this.gym_sessions_per_week = 4;
        this.work_blocks_per_day = 3;

        // Streak tracking (for Suave Spartan theme)
        this.current_streak = 0;
        this.longest_streak = 0;
        this.last_gym_date = null;
    }

    /**
     * Calculate XP needed for next level
     */
    getBodyXPToLevel() {
        return this.body_level * 100;
    }

    getWorkXPToLevel() {
        return this.work_level * 100;
    }

    /**
     * Add XP and handle level ups
     * @returns {boolean} true if leveled up
     */
    addBodyXP(xp) {
        this.body_xp += Math.floor(xp);
        const threshold = this.getBodyXPToLevel();

        if (this.body_xp >= threshold) {
            this.body_level += 1;
            this.body_xp = this.body_xp - threshold; // Carry over remainder
            return true;
        }
        return false;
    }

    addWorkXP(xp) {
        this.work_xp += Math.floor(xp);
        const threshold = this.getWorkXPToLevel();

        if (this.work_xp >= threshold) {
            this.work_level += 1;
            this.work_xp = this.work_xp - threshold;
            return true;
        }
        return false;
    }
}

class GymQuest {
    constructor(type) {
        this.type = type; // "light", "standard", "heavy", "recovery", "boss"
        this.xp_earned = 0; // Calculated by XP engine
        this.timestamp = Date.now();
        this.is_boss_battle = type === 'boss'; // Boss Battle flag
    }
}

class WorkQuest {
    constructor(type, duration = null) {
        this.type = type; // "deep_work", "shipped", "learning", "admin", "boss"
        this.duration = duration; // Only for deep_work, in minutes
        this.xp_earned = 0; // Calculated by XP engine
        this.timestamp = Date.now();
        this.is_boss_battle = type === 'boss'; // Boss Battle flag
    }
}

class DailyLog {
    constructor(date) {
        this.date = date; // YYYY-MM-DD format
        this.sleep_hours = 7.0; // Default
        this.fuel_level = "medium"; // "low", "medium", "high"
        this.protein_checked = false;
        this.gym_quest = null; // GymQuest object or null
        this.work_quests = []; // Array of WorkQuest objects
        this.total_body_xp_earned = 0;
        this.total_work_xp_earned = 0;
        this.energy_remaining = 100;
        this.fatigue_level = 0;
        this.balance_gate_applied = false;
        this.sleep_debt = 0; // Hidden in v1, for future use
    }

    /**
     * Add quest to daily log
     */
    addGymQuest(quest) {
        this.gym_quest = quest;
    }

    addWorkQuest(quest) {
        this.work_quests.push(quest);
    }

    /**
     * Check if gym quest exists today
     */
    hasGymQuest() {
        return this.gym_quest !== null;
    }

    /**
     * Get total body XP from gym quest
     */
    getTotalBodyXP() {
        return this.gym_quest ? this.gym_quest.xp_earned : 0;
    }

    /**
     * Get total work XP from all work quests
     */
    getTotalWorkXP() {
        return this.work_quests.reduce((sum, quest) => sum + quest.xp_earned, 0);
    }
}

class WeeklySummary {
    constructor(weekStartDate) {
        this.week_start_date = weekStartDate;
        this.gym_sessions_completed = 0;
        this.work_blocks_completed = 0;
        this.avg_sleep_hours = 0;
        this.fuel_consistency = 0; // Percentage (0-100)
        this.rest_days_taken = 0;
        this.balance_score = 0; // 0-100
        this.total_body_xp = 0;
        this.total_work_xp = 0;
    }

    /**
     * Calculate weekly summary from daily logs
     * @param {Array<DailyLog>} dailyLogs - Array of 7 daily logs
     */
    calculate(dailyLogs) {
        const validLogs = dailyLogs.filter(log => log !== null);

        // Gym sessions
        this.gym_sessions_completed = validLogs.filter(log => log.hasGymQuest()).length;

        // Work blocks
        this.work_blocks_completed = validLogs.reduce((sum, log) =>
            sum + log.work_quests.length, 0
        );

        // Average sleep
        this.avg_sleep_hours = validLogs.reduce((sum, log) =>
            sum + log.sleep_hours, 0) / Math.max(validLogs.length, 1);

        // Fuel consistency
        const goodFuelDays = validLogs.filter(log =>
            log.fuel_level === "medium" || log.fuel_level === "high"
        ).length;
        this.fuel_consistency = Math.round((goodFuelDays / Math.max(validLogs.length, 1)) * 100);

        // Rest days (days with no quests)
        this.rest_days_taken = validLogs.filter(log =>
            !log.hasGymQuest() && log.work_quests.length === 0
        ).length;

        // Total XP
        this.total_body_xp = validLogs.reduce((sum, log) =>
            sum + log.total_body_xp_earned, 0);
        this.total_work_xp = validLogs.reduce((sum, log) =>
            sum + log.total_work_xp_earned, 0);

        // Balance score
        this.calculateBalanceScore();
    }

    /**
     * Calculate balance score (0-100)
     * Ideal ratio is 1.0 (work_xp / body_xp)
     */
    calculateBalanceScore() {
        if (this.total_body_xp === 0) {
            this.balance_score = 50; // Neutral if no body XP
            return;
        }

        const ratio = this.total_work_xp / this.total_body_xp;
        const idealRatio = 1.0;

        if (ratio >= 0.8 && ratio <= 1.2) {
            this.balance_score = 100;
        } else {
            this.balance_score = Math.max(0, 100 - (Math.abs(ratio - idealRatio) * 100));
        }
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { UserProfile, GymQuest, WorkQuest, DailyLog, WeeklySummary };
}

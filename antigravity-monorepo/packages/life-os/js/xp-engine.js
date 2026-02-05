/**
 * Life OS - XP Engine v2.0
 * Neutral / System-Design Calibration
 */

class XPEngine {
    constructor(themeManager) {
        this.themeManager = themeManager;

        // Base XP values
        this.GYM_XP = { light: 30, standard: 50, heavy: 70, recovery: 20 };
        this.WORK_XP = { deep_work: 40, shipped: 30, learning: 25, admin: 10 };

        // Fatigue gain (Neutral metrics)
        this.FATIGUE_GAIN = {
            light: 5, standard: 10, heavy: 15, recovery: -10,
            deep_work: 8, shipped: 5, learning: 3, admin: 2
        };

        this.FATIGUE_CAP = 100;
    }

    /**
     * Calculate Gym XP with protocol modifiers
     */
    calculateGymXP(quest, dailyLog, weekLogs = [], profile = null) {
        const modifiers = profile ? profile.protocol.modifiers : { strength_training: 1, cardio: 1 };
        let xp = this.GYM_XP[quest.type] || 0;

        // Protocol-based optimization
        if (quest.type === 'heavy' || quest.type === 'standard') {
            xp *= modifiers.strength_training;
        } else if (quest.type === 'light' || quest.type === 'recovery') {
            xp *= (modifiers.cardio || 1);
        }

        // Fatigue adjustment (0.5 to 1.0 multiplier, no aggression)
        const fatigueMult = this.getOptimizationModifier(dailyLog.fatigue_level, profile);
        xp *= fatigueMult;

        return {
            xp: Math.floor(xp),
            fatigue_gain: this.FATIGUE_GAIN[quest.type] || 0,
            breakdown: { base: xp, modifiers: { fatigue: fatigueMult } }
        };
    }

    /**
     * Calculate Work XP
     */
    calculateWorkXP(quest, dailyLog, weekLogs = [], profile = null) {
        const modifiers = profile ? profile.protocol.modifiers : { deep_work: 1 };
        let xp = this.WORK_XP[quest.type] || 0;

        // Apply Focus Multipliers
        if (quest.type === 'deep_work') {
            xp *= modifiers.deep_work;
            // Habit Replacement bonus (from user request v2)
            xp *= (modifiers.bad_habit_replacement || 1.1);
        }

        const fatigueMult = this.getOptimizationModifier(dailyLog.fatigue_level, profile);
        xp *= fatigueMult;

        return {
            xp: Math.floor(xp),
            fatigue_gain: this.FATIGUE_GAIN[quest.type] || 0,
            breakdown: { base: xp, modifiers: { fatigue: fatigueMult } }
        };
    }

    /**
     * Neutral Fatigue Scaling
     * Framed as 'Optimization Multiplier' instead of penalty
     */
    getOptimizationModifier(fatigue, profile) {
        const threshold = profile ? profile.protocol.fatigue_threshold : 75;
        // Gradual reduction when approaching threshold
        if (fatigue > threshold) return 0.6;
        if (fatigue > 50) return 0.85;
        return 1.0;
    }

    updateFatigue(current, gain) {
        return Math.max(0, Math.min(this.FATIGUE_CAP, current + gain));
    }

    previewXP(questType, category, dailyLog, weekLogs = [], profile = null) {
        if (category === 'gym') return this.calculateGymXP({ type: questType }, dailyLog, weekLogs, profile);
        return this.calculateWorkXP({ type: questType }, dailyLog, weekLogs, profile);
    }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { XPEngine };
}

/**
 * Life OS - Storage System
 * Handles persistent data storage with localStorage fallback
 */

class StorageManager {
    constructor() {
        this.STORAGE_KEY = 'life_os_data';
        this.useLocalStorage = true; // Default to localStorage

        // Check if we can use localStorage
        this.checkStorage();
    }

    /**
     * Check storage availability
     */
    checkStorage() {
        try {
            const test = '__storage_test__';
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            this.useLocalStorage = true;
        } catch (e) {
            console.warn('localStorage not available, data will not persist');
            this.useLocalStorage = false;
        }
    }

    /**
     * Get all data from storage
     * @returns {Object} - { profile, dailyLogs, weeklySummaries, onboarded }
     */
    loadData() {
        if (!this.useLocalStorage) {
            return this.getEmptyData();
        }

        try {
            const data = localStorage.getItem(this.STORAGE_KEY);
            if (!data) {
                return this.getEmptyData();
            }

            const parsed = JSON.parse(data);

            // Reconstruct class instances
            return {
                profile: this.reconstructProfile(parsed.profile),
                dailyLogs: this.reconstructDailyLogs(parsed.dailyLogs),
                weeklySummaries: this.reconstructWeeklySummaries(parsed.weeklySummaries),
                onboarded: parsed.onboarded || false
            };
        } catch (e) {
            console.error('Error loading data:', e);
            return this.getEmptyData();
        }
    }

    /**
     * Save all data to storage
     * @param {Object} data - { profile, dailyLogs, weeklySummaries, onboarded }
     */
    saveData(data) {
        if (!this.useLocalStorage) {
            console.warn('Cannot save: localStorage not available');
            return false;
        }

        try {
            // Convert to plain objects for JSON
            const toSave = {
                profile: data.profile,
                dailyLogs: data.dailyLogs,
                weeklySummaries: data.weeklySummaries,
                onboarded: data.onboarded,
                lastSaved: new Date().toISOString()
            };

            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(toSave));
            return true;
        } catch (e) {
            console.error('Error saving data:', e);
            return false;
        }
    }

    /**
     * Get empty data structure
     */
    getEmptyData() {
        return {
            profile: new UserProfile(),
            dailyLogs: {}, // Keyed by date (YYYY-MM-DD)
            weeklySummaries: {}, // Keyed by week start date
            onboarded: false
        };
    }

    /**
     * Reconstruct UserProfile from plain object
     */
    reconstructProfile(data) {
        if (!data) return new UserProfile();

        const profile = new UserProfile();
        Object.assign(profile, data);
        return profile;
    }

    /**
     * Reconstruct dailyLogs from plain objects
     */
    reconstructDailyLogs(data) {
        if (!data) return {};

        const logs = {};
        for (const [date, logData] of Object.entries(data)) {
            const log = new DailyLog(date);
            Object.assign(log, logData);

            // Reconstruct GymQuest
            if (logData.gym_quest) {
                log.gym_quest = new GymQuest(logData.gym_quest.type);
                Object.assign(log.gym_quest, logData.gym_quest);
            }

            // Reconstruct WorkQuests
            log.work_quests = (logData.work_quests || []).map(questData => {
                const quest = new WorkQuest(questData.type, questData.duration);
                Object.assign(quest, questData);
                return quest;
            });

            logs[date] = log;
        }

        return logs;
    }

    /**
     * Reconstruct weeklySummaries from plain objects
     */
    reconstructWeeklySummaries(data) {
        if (!data) return {};

        const summaries = {};
        for (const [date, summaryData] of Object.entries(data)) {
            const summary = new WeeklySummary(date);
            Object.assign(summary, summaryData);
            summaries[date] = summary;
        }

        return summaries;
    }

    /**
     * Get or create today's daily log
     * @param {Object} dailyLogs - All daily logs
     * @returns {DailyLog} - Today's log
     */
    getTodayLog(dailyLogs) {
        const today = this.getTodayDate();

        if (!dailyLogs[today]) {
            dailyLogs[today] = new DailyLog(today);
        }

        return dailyLogs[today];
    }

    /**
     * Get daily log by date
     * @param {Object} dailyLogs - All daily logs
     * @param {string} date - Date in YYYY-MM-DD format
     * @returns {DailyLog|null}
     */
    getLogByDate(dailyLogs, date) {
        return dailyLogs[date] || null;
    }

    /**
     * Get logs for current week
     * @param {Object} dailyLogs - All daily logs
     * @returns {Array<DailyLog|null>} - 7 logs (Mon-Sun), null if missing
     */
    getCurrentWeekLogs(dailyLogs) {
        const logs = [];
        const today = new Date();

        // Get Monday of current week
        const monday = new Date(today);
        const day = monday.getDay();
        const diff = monday.getDate() - day + (day === 0 ? -6 : 1);
        monday.setDate(diff);

        // Get 7 days starting from Monday
        for (let i = 0; i < 7; i++) {
            const date = new Date(monday);
            date.setDate(monday.getDate() + i);
            const dateStr = this.formatDate(date);
            logs.push(dailyLogs[dateStr] || null);
        }

        return logs;
    }

    /**
     * Get week start date (Monday)
     * @param {Date} date - Any date in the week
     * @returns {string} - Monday's date in YYYY-MM-DD format
     */
    getWeekStartDate(date = new Date()) {
        const monday = new Date(date);
        const day = monday.getDay();
        const diff = monday.getDate() - day + (day === 0 ? -6 : 1);
        monday.setDate(diff);
        return this.formatDate(monday);
    }

    /**
     * Get today's date in YYYY-MM-DD format
     */
    getTodayDate() {
        return this.formatDate(new Date());
    }

    /**
     * Format date to YYYY-MM-DD
     */
    formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    /**
     * Clear all data (for testing/reset)
     */
    clearAll() {
        if (this.useLocalStorage) {
            localStorage.removeItem(this.STORAGE_KEY);
        }
    }

    /**
     * Export data as JSON (for backup)
     */
    exportData() {
        const data = this.loadData();
        return JSON.stringify(data, null, 2);
    }

    /**
     * Import data from JSON (for restore)
     */
    importData(jsonString) {
        try {
            const data = JSON.parse(jsonString);
            this.saveData(data);
            return true;
        } catch (e) {
            console.error('Error importing data:', e);
            return false;
        }
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { StorageManager };
}

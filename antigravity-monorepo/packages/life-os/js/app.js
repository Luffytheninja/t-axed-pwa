/**
 * Life OS - Application Core v2.0
 * System Orchestrator
 */

class App {
    constructor() {
        this.themeManager = new ThemeManager();
        this.storage = new StorageManager();
        this.xpEngine = new XPEngine(this.themeManager);
        this.ui = new UIManager(this);

        // Data Load
        this.data = this.storage.loadData();
        this.profile = this.data.profile;
        this.todayLog = this.storage.getTodayLog(this.data.dailyLogs);

        this.init();
    }

    init() {
        // Initial Theme Application
        this.themeManager.applyTheme();

        // Trigger Onboarding if no protocol found
        if (!this.profile.protocol || !this.data.onboarded) {
            this.ui.showOnboarding();
        } else {
            this.ui.render();
        }

        // Save on exit
        window.addEventListener('beforeunload', () => this.save());
    }

    completeQuest(category, type = null) {
        if (category === 'gym') {
            const questType = type || 'standard';
            const result = this.xpEngine.calculateGymXP({ type: questType }, this.todayLog, [], this.profile);
            this.todayLog.addGymQuest(new GymQuest(questType));
            this.todayLog.fatigue_level = this.xpEngine.updateFatigue(this.todayLog.fatigue_level, result.fatigue_gain);
            this.profile.addBodyXP(result.xp);
        } else {
            const questType = type || 'deep_work';
            const result = this.xpEngine.calculateWorkXP({ type: questType }, this.todayLog, [], this.profile);
            this.todayLog.addWorkQuest(new WorkQuest(questType));
            this.todayLog.fatigue_level = this.xpEngine.updateFatigue(this.todayLog.fatigue_level, result.fatigue_gain);
            this.profile.addWorkXP(result.xp);
        }

        this.save();
        this.ui.render();
    }

    updateSleep(hours) {
        this.todayLog.sleep_hours = hours;
        this.save();
    }

    updateNutrition(level) {
        this.todayLog.fuel_level = level;
        this.save();
        this.ui.render(); // Re-render to show active state
    }

    save() {
        this.storage.saveData(this.data);
    }

    reset() {
        if (confirm("System data reset requested. All protocols and logs will be purged. Confirm?")) {
            this.storage.clearAll();
            window.location.reload();
        }
    }
}

// Global hook
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new App();
    window.app = app;
});

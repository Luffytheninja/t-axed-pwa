/**
 * Life OS - UI Module v2.0
 * Quiet Luxury Edition / Control Panel Design
 */

class UIManager {
    constructor(app) {
        this.app = app;
        this.container = document.getElementById('app');
        this.currentTab = 'home';
        this.onboardingStep = 0;
        this.onboardingData = {};
    }

    render() {
        this.container.innerHTML = `
            <div class="main-content" id="nav-content">
                ${this.renderCurrentTab()}
            </div>
            ${this.renderBottomNav()}
        `;
        this.attachEventListeners();
    }

    renderCurrentTab() {
        switch (this.currentTab) {
            case 'home': return this.renderHome();
            case 'log': return this.renderLog();
            case 'history': return this.renderHistory();
            case 'protocol': return this.renderProtocol();
            case 'settings': return this.renderSettings();
            case 'onboarding': return this.renderOnboarding();
            default: return this.renderHome();
        }
    }

    /**
     * Screen: Home (Dashboard)
     */
    renderHome() {
        const { profile, todayLog } = this.app;
        const dateStr = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });

        const bodyProgress = (profile.body_xp / profile.getBodyXPToLevel()) * 100;
        const workProgress = (profile.work_xp / profile.getWorkXPToLevel()) * 100;

        return `
            <div class="fade-in">
                <header class="home-header">
                    <div class="text-xs text-secondary weight-medium">${dateStr.toUpperCase()}</div>
                    <div class="weight-semibold text-lg"><span class="system-dot active"></span>System state: Active</div>
                    
                    <div class="mt-md">
                        <div style="display: flex; justify-content: space-between;" class="text-xs text-secondary weight-medium">
                            <span>Energy ${todayLog.energy_remaining}%</span>
                            <span>Fatigue ${todayLog.fatigue_level}%</span>
                        </div>
                        <div style="display: flex; gap: 8px;">
                            <div style="flex: 1;" class="bar-container">
                                <div class="bar-fill" style="width: ${todayLog.energy_remaining}%; background: var(--work-accent);"></div>
                            </div>
                            <div style="flex: 1;" class="bar-container">
                                <div class="bar-fill" style="width: ${todayLog.fatigue_level}%; background: var(--fatigue-accent);"></div>
                            </div>
                        </div>
                    </div>
                </header>

                <div class="progress-rings-container">
                    ${this.renderProgressSVG(bodyProgress, workProgress)}
                    <div style="position: absolute; text-align: center;">
                        <div class="metric-label">SYNERGY</div>
                        <div class="metric-value">84%</div>
                    </div>
                </div>

                <div style="padding: 0 var(--space-lg); display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-md);">
                    <div class="glass-card">
                        <div class="text-xs text-secondary mb-xs">Level ${profile.body_level}</div>
                        <div class="weight-semibold">Body</div>
                        <div class="text-mono text-sm mt-sm" style="color: var(--body-accent);">${profile.body_xp} XP</div>
                    </div>
                    <div class="glass-card">
                        <div class="text-xs text-secondary mb-xs">Level ${profile.work_level}</div>
                        <div class="weight-semibold">Work</div>
                        <div class="text-mono text-sm mt-sm" style="color: var(--work-accent);">${profile.work_xp} XP</div>
                    </div>
                </div>

                <div style="padding: var(--space-lg);">
                    <div class="glass-card" style="display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <div class="weight-medium">Focus Priority</div>
                            <div class="text-sm text-secondary">Awaiting next deployment.</div>
                        </div>
                        <button class="btn btn-primary" onclick="app.ui.switchTab('log')">Log</button>
                    </div>
                </div>
            </div>
        `;
    }

    renderProgressSVG(bodyProgress, workProgress) {
        const radius = 80;
        const circumference = 2 * Math.PI * radius;
        const offsetBody = circumference - (Math.min(100, bodyProgress) / 100) * circumference;

        const radiusInner = 65;
        const circumferenceInner = 2 * Math.PI * radiusInner;
        const offsetWork = circumferenceInner - (Math.min(100, workProgress) / 100) * circumferenceInner;

        return `
            <svg width="200" height="200" viewBox="0 0 200 200">
                <circle cx="100" cy="100" r="${radius}" fill="none" stroke="rgba(255,255,255,0.02)" stroke-width="8" />
                <circle cx="100" cy="100" r="${radiusInner}" fill="none" stroke="rgba(255,255,255,0.02)" stroke-width="8" />
                
                <circle class="metric-ring" cx="100" cy="100" r="${radius}" 
                    fill="none" stroke="var(--body-accent)" stroke-width="8" stroke-linecap="round"
                    stroke-dasharray="${circumference}" stroke-dashoffset="${offsetBody}" />
                
                <circle class="metric-ring" cx="100" cy="100" r="${radiusInner}" 
                    fill="none" stroke="var(--work-accent)" stroke-width="8" stroke-linecap="round"
                    stroke-dasharray="${circumferenceInner}" stroke-dashoffset="${offsetWork}" />
            </svg>
        `;
    }

    /**
     * AI Onboarding v2
     */
    showOnboarding() {
        this.currentTab = 'onboarding';
        this.onboardingStep = 0;
        this.render();
    }

    renderOnboarding() {
        const questions = [
            "Welcome, Spartan. Describe your current lifestyle and tech stack.",
            "Identify your fitness gaps and current body goals.",
            "Identify your work gaps and income goals.",
            "What is the one habit you intend to eliminate?"
        ];

        return `
            <div class="fade-in" style="height: 100%; display: flex; flex-direction: column; justify-content: center; padding: var(--space-lg);">
                <div class="glass-card">
                    <div class="text-xs text-secondary text-mono mb-md">SYSTEM_INIT_STEP_${this.onboardingStep + 1}_OF_4</div>
                    <p class="weight-medium text-lg mb-lg">${questions[this.onboardingStep]}</p>
                    <textarea id="onboarding-input" style="width: 100%; height: 120px; background: rgba(0,0,0,0.2); border: 1px solid var(--surface-glass-border); border-radius: 12px; color: white; padding: 12px; font-family: inherit; margin-bottom: 24px; outline: none;"></textarea>
                    <button class="btn btn-primary btn-block" onclick="app.ui.nextOnboardingStep()" style="width: 100%; height: 50px;">CONTINUE</button>
                </div>
            </div>
        `;
    }

    nextOnboardingStep() {
        const val = document.getElementById('onboarding-input').value;
        if (!val) return;
        const keys = ['lifestyle', 'fitness', 'work', 'habit'];
        this.onboardingData[keys[this.onboardingStep]] = val;

        if (this.onboardingStep < 3) {
            this.onboardingStep++;
            this.render();
        } else {
            this.finalizeOnboarding();
        }
    }

    finalizeOnboarding() {
        this.container.innerHTML = `
            <div class="fade-in" style="height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center;">
                <div class="metric-ring" style="width: 40px; height: 40px; border: 4px solid var(--work-accent); border-top-color: transparent; border-radius: 50%; animation: spin 1s linear infinite;"></div>
                <div class="mt-lg text-mono text-sm text-secondary">SYNTHESIZING_PROTOCOL...</div>
            </div>
            <style>@keyframes spin { to { transform: rotate(360deg); } }</style>
        `;

        setTimeout(() => {
            // Simplified logic as previously implemented
            this.app.profile.protocol = {
                protocol_name: "Operation_X",
                persona: "Strategist",
                modifiers: { strength_training: 1.2, cardio: 1.1, deep_work: 1.3, bad_habit_replacement: 1.5 },
                fatigue_threshold: 70
            };
            this.app.data.onboarded = true;
            this.app.save();
            this.currentTab = 'home';
            this.render();
        }, 2000);
    }

    /**
     * Other Tabs
     */
    /**
     * Screen: Log (Action Input)
     */
    renderLog() {
        const { todayLog } = this.app;

        return `
            <div class="fade-in" style="padding: var(--space-lg);">
                <header class="mb-lg">
                    <div class="text-xs text-secondary weight-medium mb-xs">INITIALIZING_INPUTS</div>
                    <h1 style="font-size: 24px;">Log Activity</h1>
                </header>
                
                <div style="display: flex; flex-direction: column; gap: var(--space-md);">
                    <!-- Recovery Logic -->
                    <section class="glass-card">
                        <div class="text-xs text-secondary weight-medium mb-md">RECOVERY_LEVELS</div>
                        
                        <div class="mb-lg">
                            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                                <span class="text-sm weight-medium">Daily Sleep</span>
                                <span class="text-mono text-sm" id="sleep-value">${todayLog.sleep_hours}h</span>
                            </div>
                            <input type="range" id="sleep-slider" min="4" max="12" step="0.5" value="${todayLog.sleep_hours}" 
                                style="width: 100%; height: 4px; background: rgba(255,255,255,0.1); border-radius: 2px; appearance: none; outline: none; cursor: pointer;"
                                oninput="app.ui.updateSleepValue(this.value)">
                        </div>

                        <div>
                            <div class="text-sm weight-medium mb-sm">Nutrition Intake</div>
                            <div style="display: flex; gap: 8px;">
                                ${['low', 'medium', 'high'].map(level => `
                                    <button class="btn btn-secondary ${todayLog.fuel_level === level ? 'active' : ''}" 
                                        style="flex: 1; font-size: 11px; padding: 10px 4px; ${todayLog.fuel_level === level ? 'border-color: var(--work-accent); background: rgba(16, 185, 129, 0.05);' : ''}"
                                        onclick="app.updateNutrition('${level}')">
                                        ${level.toUpperCase()}
                                    </button>
                                `).join('')}
                            </div>
                        </div>
                    </section>

                    <!-- Discipline Quest -->
                    <section class="glass-card">
                        <div class="text-xs text-secondary weight-medium mb-md">DISCIPLINE_EXECUTION</div>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
                            <button class="btn btn-secondary" onclick="app.completeQuest('gym', 'standard')">
                                <span class="text-xs">Train Session</span>
                            </button>
                            <button class="btn btn-secondary" onclick="app.completeQuest('gym', 'recovery')">
                                <span class="text-xs">Active Recovery</span>
                            </button>
                        </div>
                    </section>

                    <!-- Asset Quest -->
                    <section class="glass-card">
                        <div class="text-xs text-secondary weight-medium mb-md">ASSET_ACQUISITION</div>
                        <div style="display: flex; flex-direction: column; gap: 8px;">
                            <button class="btn btn-secondary" style="text-align: left; position: relative;" onclick="app.completeQuest('work', 'deep_work')">
                                <div class="weight-medium text-sm">Deep Work Block</div>
                                <div class="text-xs text-secondary">Focused Output Mod: 1.3x</div>
                            </button>
                            <button class="btn btn-secondary" style="text-align: left;" onclick="app.completeQuest('work', 'shipped')">
                                <div class="weight-medium text-sm">Ship Feature</div>
                                <div class="text-xs text-secondary">Direct Progress Update</div>
                            </button>
                        </div>
                    </section>
                </div>
            </div>
        `;
    }

    updateSleepValue(val) {
        document.getElementById('sleep-value').innerText = val + 'h';
        this.app.updateSleep(parseFloat(val));
    }

    renderHistory() {
        return `
            <div class="fade-in" style="padding: var(--space-lg);">
                <h1 style="font-size: 24px; margin-bottom: 24px;">Trends</h1>
                <div class="glass-card text-center text-secondary text-sm">Historical analytics active in next deployment.</div>
            </div>
        `;
    }

    renderProtocol() {
        const { profile } = this.app;
        return `
            <div class="fade-in" style="padding: var(--space-lg);">
                <h1 style="font-size: 24px; margin-bottom: 8px;">Active Protocol</h1>
                <div class="text-sm text-secondary mb-lg">Optimized: Jan 26, 2026</div>
                <div class="glass-card" style="display: flex; flex-direction: column; gap: 16px;">
                    <div style="display: flex; justify-content: space-between;"><span class="text-sm text-secondary">System Persona</span><span class="text-mono text-sm">${profile.protocol.persona}</span></div>
                    <div style="display: flex; justify-content: space-between;"><span class="text-sm text-secondary">Fatigue Threshold</span><span class="text-mono text-sm">${profile.protocol.fatigue_threshold}%</span></div>
                    <div style="display: flex; justify-content: space-between;"><span class="text-sm text-secondary">Focus Multiplier</span><span class="text-mono text-sm">${profile.protocol.modifiers.deep_work}x</span></div>
                </div>
            </div>
        `;
    }

    renderSettings() {
        return `
            <div class="fade-in" style="padding: var(--space-lg);">
                <h1 style="font-size: 24px; margin-bottom: 24px;">Settings</h1>
                <div class="glass-card" style="display: flex; flex-direction: column; gap: 8px;">
                    <button class="btn btn-secondary" style="text-align: left;" onclick="app.reset()">Wipe Local Data</button>
                </div>
            </div>
        `;
    }

    renderBottomNav() {
        if (this.currentTab === 'onboarding') return '';
        const tabs = [
            { id: 'home', icon: '⌂', label: 'Home' },
            { id: 'log', icon: '+', label: 'Log' },
            { id: 'history', icon: '📊', label: 'Trends' },
            { id: 'protocol', icon: '⚡', label: 'Protocol' },
            { id: 'settings', icon: '⚙', label: 'Prefs' }
        ];

        let navItems = tabs.map(tab => `
            <div class="nav-item ${this.currentTab === tab.id ? 'active' : ''}" onclick="app.ui.switchTab('${tab.id}')">
                <span class="nav-icon">${tab.icon}</span>
                <span>${tab.label}</span>
            </div>
        `).join('');

        return `<nav class="bottom-nav">${navItems}</nav>`;
    }

    switchTab(tabId) { this.currentTab = tabId; this.render(); }
    attachEventListeners() { }
    closeModal() { }
    capitalize(str) { return str.charAt(0).toUpperCase() + str.slice(1); }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { UIManager };
}

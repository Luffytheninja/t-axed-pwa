# Life OS v1 - MVP

> Level up your life through balanced progression

## What is Life OS?

Life OS is a gamified life management system that helps you maintain balance between **Body** (fitness) and **Work** (productivity) through an XP-based progression system. It's designed around a simple philosophy:

- **Train to unlock your best work**
- **Rest to sustain both**
- **Balance, not perfection**

## Features Implemented

### ✅ Sprint 1: Core Data + XP Engine (COMPLETE)

The foundation is solid:

- **Data Model**: User profiles, daily logs, weekly summaries
- **XP Calculation Engine**: All modifiers working
  - Sleep multipliers (0.7x - 1.15x)
  - Fuel modifiers (gym only)
  - Protein bonus (+5 XP flat)
  - Balance Gate (50% work penalty without gym)
  - Fatigue system (0-100, affects XP)
- **Storage System**: localStorage with auto-save
- **Level Up Logic**: Dynamic XP thresholds (Level × 100)

### ✅ Sprint 2: Home Dashboard & Quest Logging (COMPLETE)

The core loop works:

- Home dashboard with level progress bars
- Today's status display (sleep, fuel, energy, fatigue)
- Quest logging modal with:
  - Gym quest tab (4 types)
  - Work quest tab (4 types)
  - Real-time XP preview with breakdown
  - Fatigue warnings
  - Balance gate indicators
- Quest completion feedback
- Level-up celebration modal

### ✅ Sprint 3: Visual Feedback (COMPLETE)

Feels good to use:

- Animated XP progress bars
- Color-coded fatigue status
- Balance gate warnings
- Level-up modal with animations
- Smooth transitions and hover effects

### ✅ Sprint 4: Weekly Review (COMPLETE)

Understand your patterns:

- Balance overview (Body vs Work XP)
- Balance score (0-100)
- Recovery stats (sleep, fuel, rest days)
- Weekly quest progress
- Goal completion indicators

## How to Use

### First Time

1. Open `index.html` in your browser
2. You start at Level 1 / Level 1 (Body / Work)
3. Click "Log Activity" to begin

### Daily Flow

1. **Morning**: The app defaults to 7h sleep & medium fuel
2. **Log Gym Quest**: Choose your workout type
   - Light (+30 XP)
   - Standard (+50 XP)
   - Heavy/PR (+70 XP)
   - Recovery (+20 XP, -10 fatigue)
3. **Log Work Quests**: After gym, log focused work
   - Deep work (+40 XP)
   - Shipped task (+30 XP)
   - Learning (+25 XP)
   - Admin (+10 XP)

### The Rules

- **Sleep** affects ALL XP (< 6h = 0.7x, 8+ h = 1.15x)
- **Fuel** affects gym XP (low = 0.75x, high = 1.15x)
- **Balance Gate**: Work XP capped at 50% without gym quest
- **Fatigue** reduces XP and increases with each quest
- **Rest days** reduce fatigue by -20

## File Structure

```
life-os/
├── index.html              # Main HTML file
├── styles.css              # Complete design system
├── js/
│   ├── models.js           # Data structures
│   ├── xp-engine.js        # XP calculation logic
│   ├── storage.js          # localStorage management
│   ├── ui.js               # Screen rendering
│   └── app.js              # Main app controller
└── README.md               # This file
```

## Design System

### Colors

- **Body (Gym)**: Red (#E63946)
- **Work**: Blue (#457B9D)
- **Sleep**: Purple (#8E7CC3)
- **Fuel**: Orange (#F77F00)
- **Energy**: Green (#06D6A0)
- **Fatigue**: Pink-Red (#EF476F)

### Typography

- **Font**: Inter (from Google Fonts)
- **Mono**: SF Mono, Monaco

## Technical Details

### XP Calculation Formula

```javascript
// Gym Quest
base_xp = GYM_XP[quest_type];
xp *= fuel_modifier; // 0.75x (low), 1.0x (medium), 1.15x (high)
xp += protein_bonus; // +5 if checked
xp *= sleep_multiplier; // 0.7x - 1.15x based on hours
xp *= fatigue_modifier; // 1.0 - (fatigue / 200)
final_xp = floor(xp);

// Work Quest
base_xp = WORK_XP[quest_type];
xp *= balance_gate; // 0.5x if no gym quest today
xp *= balance_bonus; // 1.1x if body_xp >= 50 today
xp *= sleep_multiplier;
xp *= fatigue_modifier;
final_xp = floor(xp);
```

### Fatigue System

```javascript
// Gain
light_workout: +5
standard_workout: +10
heavy_workout: +15
recovery: -10

// Reduction
rest_day: -20
8+ hours sleep: -5 (next morning)

// Cap: 0-100
```

### Level Up Thresholds

```javascript
XP_to_level = current_level * 100;

// Examples:
// Level 1 → 2: 100 XP
// Level 2 → 3: 200 XP
// Level 5 → 6: 500 XP
```

## Browser Console Commands

Open the browser console (F12) to access debug commands:

```javascript
app.reset(); // Reset all data
app.profile; // View user profile
app.todayLog; // View today's log
app.storage.exportData(); // Export data as JSON
```

## What's Next?

### Future Enhancements (Not in v1)

- **Onboarding flow**: 3-screen introduction
- **Sleep/fuel logging**: Dedicated morning modal
- **Historical data**: View past days/weeks
- **Graphs**: Visual progress over time
- **Achievements**: Unlock badges for milestones
- **Mobile PWA**: Install as app on phone
- **Dark/Light mode**: Toggle themes
- **Export/Import**: Backup your data

## Data Persistence

All data is saved to `localStorage` automatically:

- On every quest completion
- Before page unload
- Manual save via `app.save()`

**Important**: Clearing browser data will delete your progress. Use `app.storage.exportData()` to backup.

## Browser Compatibility

- **Chrome**: ✅ Full support
- **Firefox**: ✅ Full support
- **Safari**: ✅ Full support
- **Edge**: ✅ Full support

## Credits

Built with:

- Vanilla JavaScript (no frameworks)
- Google Fonts (Inter)
- localStorage API
- Pure CSS animations

---

**Life OS v1.0** - Built from the complete MVP specification

# Antigravity Experiments - Project Portfolio

**Last Updated:** 2026-02-04
**Status:** Active Development

---

## 🚀 Active Projects

### 1. Polished Purfection
**Directory:** `antigravity-monorepo/apps/polished-purfection`
**Type:** Beauty/Luxury Service Website
**Status:** ✅ **Migrated to Monorepo**
**Tech Stack:** Next.js, Tailwind CSS, Framer Motion

**Current State:**
- Rebranded to "Dark, Glossy, Intentional" luxury aesthetic.
- Updated pricing, services (Signature Set), and location (OAU Campus).
- Instagram feed integration complete.
- "Selected Works" section temporarily removed due to missing assets.

**Suggestions for Improvement:**
- **Booking Integration**: Replace the external Instagram DM link with a dedicated booking form (e.g., Calendly or custom form) to capture leads directly.
- **SEO Optimization**: Add local schema markup for "Nail Technician in Ile-Ife" to capture campus traffic.
- **Performance**: Optimize the new high-res luxury assets (convert to AVIF/WebP) to ensure fast loading on mobile data.

---

### 2. Payski
**Directory:** `antigravity-monorepo/apps/payski`
**Type:** Fintech / Digital Banking App
**Status:** ✅ **Migrated to Monorepo**
**Tech Stack:** Next.js (Web), Flutter (Mobile - planned), Supabase (assumed)

**Current State:**
- Dashboard and Authentication pages built.
- Navigation structure recently fixed.
- "Send Money" and "Request Money" flows in development.
- Mobile PWA adaptation in progress.

**Suggestions for Improvement:**
- **User Onboarding**: Implement a guided tour for new users to explain key features (Send, Request, Virtual Cards).
- **Transaction Simulator**: Build a "Sandbox Mode" for users to test features without real money, building trust.
- **Security**: Add 2FA (Two-Factor Authentication) implementation plan for the "Security" page.

---

### 3. T-Axed
**Directory:** `T-Axed_iOS_PWA_Final`
**Type:** Tax & Finance Automation PWA
**Status:** 🔄 **Refactor / Overhaul**
**Tech Stack:** React, PWA, Tax Engine Logic

**Current State:**
- undergoing overhaul to comply with 2025 Nigeria Tax Reforms.
- Focus on simplifying complex tax jargon ("Chaos into Clarity").
- PWA functionality for offline access.

**Suggestions for Improvement:**
- **Localization**: Add a toggle for Pidgin English to make tax education more accessible to a wider Nigerian audience.
- **Offline-First**: Ensure the tax calculator logic works 100% offline using Service Workers.
- **Export Feature**: Allow users to export their generated tax breakdown as a branded PDF.

---

### 4. OPN WRLD
**Directory:** `opn-wrld`
**Type:** Creative Studio / Portfolio
**Status:** 🎨 **In Design**
**Tech Stack:** Next.js, Framer Motion, GSAP

**Current State:**
- Redesigning with "Lagos Noir" aesthetic (Dark, Industrial).
- Moving away from previous yellow color scheme.
- Focus on high-fidelity animations.

**Suggestions for Improvement:**
- **Micro-Interactions**: Implement custom cursor effects (e.g., blend modes) to enhance the "noir" feel.
- **Sound Design**: Add subtle ambient audio (streets of Lagos, low-fi beats) with a mute toggle to increase immersion.
- **Showreel**: Create a high-energy video showreel for the hero section instead of static text.

---

### 5. Luffy World
**Directory:** `luffy world`
**Type:** 3D Experiential Site
**Status:** 🧩 **MVP / Prototype**
**Tech Stack:** React Three Fiber, Next.js

**Current State:**
- 3D-heavy experience.
- Focusing on performance and mobile optimization.

**Suggestions for Improvement:**
- **Loading State**: Implement a creative "Devil Fruit" loading animation while 3D assets fetch.
- **Low-Power Mode**: Detect low-battery devices and automatically switch to a static version to save user battery.
- **Gamification**: Add hidden easter eggs (collectibles) in the 3D world to increase time-on-site.

---

### 6. R3my Jay Portfolio
**Directory:** `r3my-jay-portfolio`
**Type:** Music Artist Portfolio
**Status:** 🎵 **Maintenance**
**Tech Stack:** Next.js, YouTube API

**Current State:**
- Integrated official YouTube media to replace placeholders.
- Focus on media playback and artist touring info.

**Suggestions for Improvement:**
- **Spotify Integration**: Add a "Now Playing" or "Top Tracks" widget directly from Spotify.
- **Merch Drop**: Add a simple "notify me" form for future merchandise releases to build a mailing list.
- **Press Kit**: Add a downloadable EPK (Electronic Press Kit) zip file for promoters/blogs.

---

## 🔮 General Ecosystem Suggestions

1.  **Unified Design System**: Create a shared UI library (`@antigravity/ui`) for buttons, inputs, and cards to speed up development across all projects.
2.  **Analytics**: Install privacy-friendly analytics (e.g., Plausible or PostHog) on all live projects to understand real user behavior.
3.  **Monorepo Migration**: Consider moving these separate folders into a TurboRepo setup for better dependency management and code sharing.

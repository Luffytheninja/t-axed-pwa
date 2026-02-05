# Luffy World — Full Website Hand-Off Specification

**Project Name:** Luffy World  
**Type:** Personal experiential website  
**Primary Devices:** Desktop / Web first, iPhone / Mobile optimized  
**Core Constraint:** One active 3D asset at a time, utilitarian staging and sequencing

---

## 1. Project Overview

Luffy World is an interactive, 3D-driven personal website showcasing Luffy's lifestyle, hobbies, and influences. The site uses 3D assets as primary visual and interactive elements, with supporting copy. The design is **web-first** but must perform and scale correctly on **iPhones and mobile devices**.

**High-Level Goal:**
- Smooth performance on all devices
- Clear visual hierarchy: only one 3D asset active at a time
- Sequential staging of assets for dramatic focus
- Supporting copy that is restrained, readable, and complementary

**Do Not:**
- Render multiple active 3D assets simultaneously
- Overload the GPU on mobile
- Animate all assets at once
- Create a “tech demo” effect

---

## 2. Global Rules

### 2.1 Asset Concurrency
- Only **one 3D asset active at a time** (mounted, visible, interactive, animated)
- All other assets must be **dormant** (fully unmounted or represented by static placeholder)
- Dormant assets must not consume GPU or memory

### 2.2 Asset Formats & Textures
- Format: GLB
- Default textures: 1K
- 2K textures only for hero assets on desktop, never for mobile
- KTX2 / Basis compression recommended

### 2.3 Motion & Staging
- Enter: 800ms max, allowed fade in, Z-drift, camera dolly; no fast rotations or scale pops
- Active: micro-rotation ≤0.2 rad/sec, subtle breathing, light modulation; no multiple axes movement
- Exit: 600ms max, reverse of enter, asset must fully exit before next enters

### 2.4 Mobile / iPhone Considerations
- All assets must scale and maintain framerate on iPhone 14/15 equivalent
- Camera movements must be tighter on mobile
- Touch input: scroll triggers asset transitions; tap/hold optional and subtle
- Text must remain readable and proportionally scaled

### 2.5 Copy Rules
- Short, first-person, observational tone
- Headlines: 3–7 words, body: 1–3 short paragraphs
- Copy complements assets, does not explain them
- Fade in with asset entry, fade out with asset exit

---

## 3. Website Structure

### 3.1 Pre-Homepage Loader
**Purpose:** Briefly occupy user while loading assets; preview tone
**Assets:** 1 fragment at a time, reused from later pages
**Motion:** Slow drift only, no interaction
**Copy:**
- Option A: “Loading fragments of a life.”
- Option B: “Assembling memory. Rendering presence.”
**Rules:** Sequential appearance, no simultaneous assets, no heavy shaders, optimized for mobile

### 3.2 Homepage (Full-Screen Environment)
**Purpose:** Establish identity, mood, navigation entry
**Assets:** 1 full-screen 3D environment
**Camera:** Allowed subtle pans and dolly movements
**Text Overlay:** Hero text appears after environment settles
- Hero: “I’m Luffy. This is how I spend my time when nothing is required of me.”
- Supporting: “Sound, screens, solitude, and motion.”
- Navigation prompt: “Enter the habits.” or “Explore the signals.”
**Rules:** No additional 3D assets in focus, minimal micro-interactions

### 3.3 Navigation / Hobby Landing
- Links to: Music, Bass, Tech, Altered State, Anime / Influences
- Clicking triggers exit of current scene, full unmount, then load first asset of selected page
- Scroll or touch triggers sequential asset entry

### 3.4 Hobby Pages
**Pattern:** One hero 3D asset at a time, with supporting copy
**Scroll / Sequence:**
- Asset enters fully (Enter motion)
- Copy fades in
- Scroll progresses
- Asset exits fully (Exit motion)
- Next asset enters if page has multiple assets
**Example: Tech Page (3 assets)**
1. Asset 1: Scroll 0–30%
2. Asset 2: Asset 1 exits, enters 31–60%
3. Asset 3: Asset 2 exits, enters 61–100%

**Other Hobby Assets:**
- Altered State: 3 assets, staged sequentially
- Anime / Influences: 2 assets
- Bass Fantasy: 2 assets
- Music: 1 asset
**Dormant Assets:** Use static placeholders or remain unloaded

**Copy Template per Page:**
- Section label: “A habit” / “An influence” / “A ritual”
- Page title: evocative, e.g., “Altered State” / “Bass Fantasy”
- Body: short 1–3 paragraph reflection, no instructions, minimalism

### 3.5 Exit / Return Navigation
- Any page can navigate back to homepage
- Exit sequence: current asset exits fully, scene unmounts
- Transition to homepage environment (already staged)

---

## 4. Performance & Optimization
- Mobile Safari target: ≥55fps continuous
- Dispose geometry, materials, textures on exit
- Only preload **one upcoming asset** at a time
- Cap textures: 1K default, 2K hero desktop-only
- KTX2 / Basis recommended
- Simplify shaders and motion for iPhone / low-end devices

---

## 5. Developer Notes / Reminders
- Single-asset rule is non-negotiable
- Preloader must never have multiple active assets at once
- All enter/exit timing is critical for dramatic staging
- Camera movements must adjust for mobile viewport
- Copy fades in/out with asset enter/exit; never overlap next asset
- Dormant assets are **fully unloaded**, not hidden
- Always test on desktop first, then on iPhone to verify performance

---

**Summary:**
The website is a staged, sequential 3D experience. Desktop-first design with iPhone optimization. Performance, focus, and visual hierarchy override quantity or speed. Assets are never concurrent; copy and motion support narrative without competing with visuals. This document is the single source of truth for development.


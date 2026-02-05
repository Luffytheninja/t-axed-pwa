# Vibe-OS Portfolio

> A nostalgic desktop operating system experience built as a personal portfolio. Where bass guitar meets WebGL, and your process becomes the product.

![Vibe-OS Preview](./assets/preview.png)

---

## 🎯 Philosophy

This isn't just a portfolio—it's a **statement about how you work**. By treating the browser as an operating system, you've created a space where design work, "lazy" automations, and bass guitar passion coexist in one cohesive, beautiful environment.

**The Vibecoder Ethos:**
- **Lazy Efficiency**: Update content via CMS, never touch code
- **Technical Depth**: WebGL, Web Audio API, advanced React patterns
- **Aesthetic Precision**: Every color, font, and spacing is deliberate
- **Human Touch**: Bass guitar, rants, easter eggs = personality
- **Attention to Detail**: Sounds, animations, tooltips = craft

---

## 🎨 The Aesthetic

### Muted Crayola Palette
```
Manila    #F3E5AB  →  Background (like old paper)
Cadet     #5B92E5  →  Primary blue (headers, icons)
Sunset    #E97451  →  Warm accent (close buttons)
Sage      #8A9A5B  →  Success green (highlights)
Charcoal  #36454F  →  Text and borders
```

### Typography
- **JetBrains Mono** - All UI, technical text, code
- **EB Garamond** - Long-form reading in rants

### Visual Texture
- **Grain Shader** - Subtle film grain (5% opacity)
- **Paper Feel** - Manila backgrounds with charcoal borders
- **Spring Animations** - Everything bounces slightly on interaction

---

## 🏗️ Architecture

### Tech Stack
```
Next.js 14      →  App Router, TypeScript
Framer Motion   →  Drag, animations, springs
React Three     →  Grain shader + bass visualizer
Web Audio API   →  Sound effects + frequency analysis
Sanity CMS      →  Dynamic content management
Zustand         →  Window state management
```

### System Components

**Desktop Environment**
- Draggable, focusable windows with minimize/maximize/close
- Desktop icons (folders and files)
- System taskbar with clock and status indicators
- Grain texture overlay

**The Three Engines**
1. **PDF Gallery** - Print-style project portfolios with snap scroll
2. **Terminal** - Auto-typed process logs showing your vibecoding
3. **Signal Reader** - Editorial-style rants with sidenotes

**Special Features**
- **Bass Visualizer** - WebGL strings that vibrate to low frequencies
- **Toast Notifications** - Positive reinforcement for interactions
- **Sound System** - Mechanical clicks and whoosh effects
- **Easter Eggs** - Konami code, terminal commands, pluckable bass string

---

## 🚀 Quick Start

### For Developers

```bash
# Clone and install
git clone https://github.com/yourusername/vibe-os
cd vibe-os
npm install

# Set up Sanity CMS
cd sanity
npm install
npm run dev

# Run the development server
cd ..
npm run dev
```

### For AI Agents

Want to build this from scratch? Start with the implementation guides:

1. **[Part 1: Foundation](./implementation/PART-1-FOUNDATION.md)** - Colors, fonts, state, grain shader
2. **[Part 2: Windows & Desktop](./implementation/PART-2-WINDOWS.md)** - Dragging, sounds, icons, tooltips
3. **[Part 3: Content Renderers](./implementation/PART-3-CONTENT.md)** - PDF, Terminal, Prose
4. **[Part 4: Special Features](./implementation/PART-4-FEATURES.md)** - Bass visualizer, toasts, utilities
5. **[Part 5: CMS Integration](./implementation/PART-5-CMS.md)** - Sanity schemas and queries
6. **[Part 6: Polish & Deploy](./implementation/PART-6-POLISH.md)** - Easter eggs, SEO, Vercel

---

## 📁 Project Structure

```
vibe-os/
├── app/
│   ├── layout.tsx              # Root layout with grain shader
│   ├── page.tsx                # Main desktop view
│   └── globals.css             # Crayola palette + utilities
├── components/
│   ├── Desktop.tsx             # Main desktop container
│   ├── DraggableWindow.tsx     # Window component
│   ├── DesktopIcon.tsx         # File/folder icons
│   ├── Taskbar.tsx             # System status bar
│   ├── PDFViewer.tsx           # Project gallery renderer
│   ├── TerminalView.tsx        # Process logs renderer
│   ├── SignalReader.tsx        # Rant/manifesto renderer
│   ├── BassVisualizer.tsx      # WebGL bass strings
│   └── ToastProvider.tsx       # Notification system
├── stores/
│   └── useOSStore.ts           # Zustand window management
├── utils/
│   └── soundEngine.ts          # Web Audio API utilities
├── sanity/
│   ├── schemas/
│   │   ├── project.ts          # Project content schema
│   │   ├── rant.ts             # Signal/rant schema
│   │   └── systemSettings.ts   # Global settings
│   └── lib/
│       ├── client.ts           # Sanity client
│       └── queries.ts          # GROQ queries
└── docs/
    ├── vision/                 # High-level philosophy
    │   ├── PHILOSOPHY.md
    │   └── AESTHETIC.md
    └── implementation/         # Detailed build guides
        ├── PART-1-FOUNDATION.md
        ├── PART-2-WINDOWS.md
        ├── PART-3-CONTENT.md
        ├── PART-4-FEATURES.md
        ├── PART-5-CMS.md
        └── PART-6-POLISH.md
```

---

## 🎮 Features Overview

### Core Desktop Experience
- ✅ Draggable windows constrained to viewport
- ✅ Click-to-focus with z-index management
- ✅ Minimize/maximize/close buttons
- ✅ Desktop icons with single-click highlight, double-click open
- ✅ Post-it style tooltips (1.5s hover delay)
- ✅ Spring animations on all transitions
- ✅ Mechanical sound effects

### Content Windows

**PDF Gallery (Projects)**
- Snap scroll between pages
- Page counter (01 / 04)
- Full-bleed images with captions
- Technical specs sidebar
- Print-style A4 layout

**Terminal (Process)**
- Auto-typing animation
- ASCII art headers
- Syntax highlighted prompts vs code
- Copy button with success flash
- Dark charcoal + sage green aesthetic

**Signal Reader (Rants)**
- EB Garamond body text
- Sidenotes in right margin
- "Vibe Check" header with mood + track
- Single-column editorial layout

### Bass Visualizer
- 4 horizontal strings (E-A-D-G)
- Vibrates based on low frequencies (20-250Hz)
- Boss pedal aesthetic
- Draggable volume/tone knobs

### Easter Eggs
- **Konami Code**: ↑↑↓↓←→←→BA - Swaps to cyberpunk theme
- **Terminal Commands**: Type `help` for hidden commands
- **Pluckable String**: Hover footer 3s to play E1 note

---

## 🎓 Philosophy Deep-Dives

Want to understand the "why" behind the design decisions?

- **[The Vibecoder Manifesto](./vision/PHILOSOPHY.md)** - Why this approach to portfolios
- **[Aesthetic System](./vision/AESTHETIC.md)** - Color theory, typography, texture choices
- **[Technical Architecture](./vision/ARCHITECTURE.md)** - Why these specific technologies

---

## 🛠️ Implementation Guides

Need step-by-step instructions to build each part?

### Part 1: Foundation (30 min)
**What you'll build:** Color palette, fonts, Zustand store, grain shader, taskbar

[→ Read Part 1: Foundation Guide](./implementation/PART-1-FOUNDATION.md)

### Part 2: Windows & Desktop (45 min)
**What you'll build:** Draggable windows, desktop icons, sounds, tooltips, content renderer

[→ Read Part 2: Windows & Desktop Guide](./implementation/PART-2-WINDOWS.md)

### Part 3: Content Renderers (60 min)
**What you'll build:** PDF viewer, Terminal view, Signal reader

[→ Read Part 3: Content Renderers Guide](./implementation/PART-3-CONTENT.md)

### Part 4: Special Features (45 min)
**What you'll build:** Bass visualizer, toast system, README view

[→ Read Part 4: Special Features Guide](./implementation/PART-4-FEATURES.md)

### Part 5: CMS Integration (30 min)
**What you'll build:** Sanity schemas, GROQ queries, data fetching

[→ Read Part 5: CMS Integration Guide](./implementation/PART-5-CMS.md)

### Part 6: Polish & Deploy (30 min)
**What you'll build:** Boot sequence, easter eggs, SEO, Vercel deployment

[→ Read Part 6: Polish & Deploy Guide](./implementation/PART-6-POLISH.md)

---

## 📊 Implementation Checklist

### Phase 1: Foundation (Complete Part 1)
- [ ] Initialize Next.js 14 + TypeScript
- [ ] Configure Tailwind with Crayola palette
- [ ] Add Google Fonts (JetBrains Mono + EB Garamond)
- [ ] Create Zustand store for window management
- [ ] Build Taskbar component
- [ ] Add grain shader overlay

### Phase 2: Windows & Desktop (Complete Part 2)
- [ ] Build DraggableWindow component with Framer Motion
- [ ] Create DesktopIcon component
- [ ] Implement sound system (Web Audio API)
- [ ] Add tooltip system
- [ ] Build ContentRenderer switch

### Phase 3: Content Renderers (Complete Part 3)
- [ ] Build PDFViewer with snap scroll
- [ ] Create TerminalView with auto-typing
- [ ] Build SignalReader with sidenotes
- [ ] Add ReadmeView component

### Phase 4: Special Features (Complete Part 4)
- [ ] Build BassVisualizer with React Three Fiber
- [ ] Create Toast notification system
- [ ] Add system status indicators

### Phase 5: CMS Integration (Complete Part 5)
- [ ] Set up Sanity project
- [ ] Define schemas (project, rant, settings)
- [ ] Create GROQ queries
- [ ] Connect to Next.js

### Phase 6: Polish (Complete Part 6)
- [ ] Add boot sequence
- [ ] Implement Konami code
- [ ] Add terminal commands
- [ ] Create pluckable footer
- [ ] Configure SEO metadata
- [ ] Deploy to Vercel

---

## 🎯 Usage Scenarios

### Scenario 1: Quick Reference
> "I forgot how the color palette works"

**Solution:** Check this README's "Aesthetic" section for quick color codes.

### Scenario 2: Building From Scratch
> "I want to build this entire portfolio from zero"

**Solution:** Follow the [Implementation Guides](./implementation/) in order, Parts 1-6.

### Scenario 3: Adding a Feature
> "I want to add a new window type for my photography"

**Solution:**
1. Read [Part 2](./implementation/PART-2-WINDOWS.md) to understand window system
2. Read [Part 3](./implementation/PART-3-CONTENT.md) to see how content renderers work
3. Create your PhotoGallery component following the same pattern

### Scenario 4: Understanding Design Decisions
> "Why use this specific color palette?"

**Solution:** Read the [Aesthetic System](./vision/AESTHETIC.md) philosophy document.

### Scenario 5: AI Code Generation
> "I want Claude/Cursor/v0 to build a component for me"

**Solution:** Copy the specific implementation guide section and paste it into your AI tool.

---

## 🤝 Contributing

This is a personal portfolio, but the architecture can inspire your own projects:

1. Fork the repository
2. Study the [Implementation Guides](./implementation/)
3. Adapt the system to your own aesthetic and content
4. Share your "Vibe-OS" variant!

---

## 📝 License

MIT License - Feel free to use this architecture for your own portfolio.

---

## 🎸 Credits

**Design & Development**: [Your Name]  
**Philosophy**: Vibecoding - where lazy efficiency meets technical depth  
**Inspiration**: Desktop operating systems, print portfolios, bass guitar aesthetics

---

## 🔗 Links

- [Live Site](https://your-vibe-os.vercel.app)
- [Sanity Studio](https://your-project.sanity.studio)
- [Twitter/X](https://x.com/yourhandle)
- [Email](mailto:you@email.com)

---

**Built with Vibe-OS** - Where your desktop is your portfolio, and your process is your product.

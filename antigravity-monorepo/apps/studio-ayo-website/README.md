# Studio Ayo — Design with Purpose

A high-end, minimal, editorial website for Studio Ayo, built with React, Tailwind CSS, and Framer Motion.

## 🎯 Overview

Studio Ayo is a design studio that crafts visual identity, web, and product design for founders and creative brands. This website communicates calm confidence, seniority, and taste through curated work, philosophy, and services.

## 🛠️ Tech Stack

- **React** - UI framework
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Router** - Client-side routing
- **Vite** - Build tool and dev server

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The development server will run at:

- Local: http://localhost:5173/ (or next available port)

## 📁 Project Structure

```
studio-ayo-website/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Services.jsx
│   │   ├── Portfolio.jsx
│   │   ├── Philosophy.jsx
│   │   ├── ClientFilter.jsx
│   │   ├── Contact.jsx
│   │   ├── Footer.jsx
│   │   └── Navigation.jsx
│   ├── pages/              # Page components
│   │   ├── HomePage.jsx
│   │   ├── CaseStudiesPage.jsx
│   │   └── CaseStudyDetail.jsx
│   ├── data/               # Data files
│   │   └── caseStudies.js
│   ├── App.jsx             # Main app with routing
│   ├── main.jsx            # Entry point
│   └── index.css           # Global styles
├── public/                 # Static assets
├── index.html              # HTML template
├── tailwind.config.js      # Tailwind configuration
├── vite.config.js          # Vite configuration
└── package.json            # Dependencies
```

## 🎨 Design Philosophy

The website follows these core principles:

- **Minimal & Editorial**: Whitespace-first layout with editorial typography
- **Calm Confidence**: Subtle animations that reinforce hierarchy without distraction
- **Strategic Design**: Every element serves a purpose, no decoration for decoration's sake
- **Premium Feel**: High-quality imagery, generous spacing, and refined interactions

## 📄 Pages

### Home (`/`)

- Hero section with background imagery
- Positioning/About
- Services overview
- Featured portfolio
- Philosophy
- Client filter
- Contact form
- Footer

### Work (`/work`)

Tiered case study listing:

- **Core Case Studies**: Full end-to-end projects
- **Studio Proof**: Smaller scope projects showing capability
- **Research & Exploration**: Ongoing investigations
- **Selected Works**: Archive of earlier projects

### Case Study Detail (`/work/:id`)

Individual case study pages with:

- Hero with full-screen imagery
- Project snapshot
- Challenge section
- Approach (multiple pillars)
- Reflection
- CTA to start conversation

## 🎭 Animation System

All animations use Framer Motion with consistent easing:

- **Entrance**: fade + translateY
- **Buttons**: subtle scale + opacity
- **Images**: lift + scale on hover
- **Form inputs**: underline animation on focus
- **Easing**: `[0.22, 1, 0.36, 1]` (custom cubic-bezier)

## 📝 Content Management

### Adding a Case Study

Edit `src/data/caseStudies.js`:

```javascript
{
  id: 'project-slug',
  tier: 'hero', // or 'proof', 'research'
  title: 'Project Name',
  descriptor: 'Short description',
  tags: ['Tag1', 'Tag2'],
  hero: {
    tagline: 'One-line tagline',
    services: ['Service 1', 'Service 2'],
    bgImage: 'https://unsplash.com/...'
  },
  snapshot: {
    client: 'Client Name',
    industry: 'Industry',
    audience: 'Target audience',
    timeline: 'X weeks',
    deliverables: ['Item 1', 'Item 2']
  },
  challenge: 'Description of the challenge...',
  approach: [
    {
      title: 'Pillar 1',
      description: 'What you did...',
      image: 'https://unsplash.com/...'
    }
  ],
  reflection: 'Why it worked...',
  status: 'launched' // or 'research'
}
```

## 📮 Form Data Storage

**Important**: The contact form currently doesn't save data anywhere. See `FORM_STORAGE_GUIDE.md` for implementation options:

- Formspree (Recommended for quick launch)
- Netlify Forms
- Google Sheets
- Custom Backend

## 🎨 Customization

### Colors

Edit `tailwind.config.js`:

```javascript
colors: {
  'warm-white': '#FAFAF9',
  'near-black': '#1A1A1A',
}
```

### Typography

The site uses **Inter** font from Google Fonts. To change:

1. Update `index.html` font link
2. Update `tailwind.config.js` font family

### Background Images

Replace placeholder Unsplash images with your own:

- Hero: `src/components/Hero.jsx`
- Case studies: `src/data/caseStudies.js`

## 🚢 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Netlify

```bash
# Build command
npm run build

# Publish directory
dist
```

### Environment Setup

No environment variables required for basic functionality. If implementing form storage, add necessary API keys.

## 📱 Responsive Design

The site is fully responsive:

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## ♿ Accessibility

- Semantic HTML structure
- Proper heading hierarchy
- Alt text for images (update with actual content)
- Keyboard navigation support
- Focus visible states

## 🔧 Development Notes

### Scroll Behavior

The site uses `scroll-snap` for full-height sections. To adjust:

```css
/* src/index.css */
html {
  scroll-snap-type: y mandatory;
}
```

### Performance

- Images use Unsplash with optimized parameters
- Framer Motion animations are GPU-accelerated
- Code splitting via React Router

## 📊 SEO

Update `index.html` for production:

- Title tag
- Meta description
- Open Graph tags
- Twitter Card
- Favicon

## 🐛 Known Issues

- Form submissions don't persist (see FORM_STORAGE_GUIDE.md)
- Background images are placeholders from Unsplash
- No actual logo file (uses text logo)

## 📝 TODO

- [ ] Implement form data storage
- [ ] Replace placeholder images with actual project imagery
- [ ] Add actual studio logo
- [ ] Set up analytics
- [ ] Add loading states for images
- [ ] Implement error boundaries
- [ ] Add 404 page
- [ ] Set up CI/CD pipeline

## 📄 License

Proprietary - Studio Ayo

## 🤝 Contributing

This is a private project for Studio Ayo. Contact the studio for collaboration inquiries.

---

Built with intention. Designed with purpose.

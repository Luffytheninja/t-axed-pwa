# Refined Jiji - Modern Classifieds Platform

A refined version of Jiji.ng built for young professionals with AI-powered recommendations, modern UI/UX, and mobile-first design.

## Architecture

```
refined-jiji/
├── ios-app/           # Flutter iOS application
├── backend/           # Node.js/Express API
├── web-app/           # Next.js PWA
├── docs/              # Documentation
└── README.md
```

## Features

- 🎨 **Modern UI/UX**: Clean, minimalist design with dark mode
- 🤖 **AI Recommendations**: Personalized listings and smart pricing
- 📱 **Mobile-First**: Flutter iOS app with PWA web version
- 🔒 **Trust & Safety**: ID verification, reviews, escrow payments
- 💬 **Community**: In-app messaging and social features
- 📊 **Analytics**: Usage tracking and seller insights

## Tech Stack

### iOS App (Flutter)
- Flutter 3.0+ with Dart
- Riverpod for state management
- Dio for networking
- CachedNetworkImage for media
- Google Maps integration

### Backend (Node.js)
- Express.js with TypeScript
- PostgreSQL with Prisma ORM
- Redis for caching
- JWT authentication
- Multer for file uploads

### Web App (Next.js)
- Next.js 14 with App Router
- Tailwind CSS + shadcn/ui
- TanStack Query for data fetching
- PWA capabilities

### AI/ML (Python)
- FastAPI microservices
- Scikit-learn for recommendations
- TensorFlow for image processing

## Getting Started

### Prerequisites
- Flutter SDK (3.0+)
- Node.js (18+)
- PostgreSQL
- Redis
- Python 3.9+

### Quick Start

1. **Clone and setup**:
   ```bash
   git clone <repo-url>
   cd refined-jiji
   ```

2. **iOS App**:
   ```bash
   cd ios-app
   flutter pub get
   flutter run
   ```

3. **Backend**:
   ```bash
   cd backend
   npm install
   npm run dev
   ```

4. **Web App**:
   ```bash
   cd web-app
   npm install
   npm run dev
   ```

## Development Roadmap

- [ ] Phase 1: iOS MVP (3 months)
- [ ] Phase 2: Backend & AI (2 months)
- [ ] Phase 3: Web App (2 months)
- [ ] Phase 4: Advanced Features (2 months)

## Target Audience

Young professionals (25-40) in urban Nigeria seeking:
- Quality second-hand items
- Local services and experiences
- Community connections
- Trustworthy transactions

## Monetization

- Premium listings
- Business accounts with analytics
- Transaction commissions
- Targeted advertising
- API access for integrations
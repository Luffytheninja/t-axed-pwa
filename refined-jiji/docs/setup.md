# Refined Jiji - Development Setup Guide

## Prerequisites
- Flutter SDK (3.0+)
- Node.js (18+)
- PostgreSQL
- Redis (optional, for caching)
- Git

## 1. Clone and Setup

```bash
git clone <repository-url>
cd refined-jiji
```

## 2. iOS App Setup

```bash
cd ios-app

# Install dependencies
flutter pub get

# Run on iOS simulator
flutter run
```

## 3. Backend Setup

```bash
cd ../backend

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Edit .env with your database credentials

# Setup database
npx prisma generate
npx prisma db push

# Start development server
npm run dev
```

## 4. Web App Setup

```bash
cd ../web-app

# Install dependencies
npm install

# Start development server
npm run dev
```

## 5. Environment Configuration

### Backend (.env)
```
PORT=5000
NODE_ENV=development
JWT_SECRET=your_super_secret_jwt_key_here
DATABASE_URL="postgresql://username:password@localhost:5432/refined_jiji"
REDIS_URL=redis://localhost:6379
PAYSTACK_SECRET_KEY=sk_test_your_paystack_secret_key
FRONTEND_URL=http://localhost:3000
```

### iOS App (lib/core/config/app_config.dart)
Update API endpoints and configuration as needed.

## 6. Database Setup

```bash
# Create PostgreSQL database
createdb refined_jiji

# Run Prisma migrations
cd backend
npx prisma db push
```

## 7. Testing

### Backend Tests
```bash
cd backend
npm test
```

### iOS Tests
```bash
cd ios-app
flutter test
```

## 8. Production Deployment

### Backend
```bash
cd backend
npm run build
npm start
```

### Web App
```bash
cd web-app
npm run build
npm start
```

### iOS App
```bash
cd ios-app
flutter build ios
```

## API Documentation

The backend provides RESTful APIs for:
- User authentication and profiles
- Listings management
- Chat/messaging
- Payments and escrow
- Reviews and ratings

See backend README for detailed API documentation.

## Architecture Overview

- **iOS App**: Flutter with Riverpod state management
- **Backend**: Node.js/Express with TypeScript and Prisma ORM
- **Database**: PostgreSQL with Redis caching
- **Web App**: Next.js with React and Tailwind CSS
- **Real-time**: Socket.io for chat functionality
- **Payments**: Paystack integration for Nigerian payments

## Development Workflow

1. Create feature branch from `main`
2. Implement changes across relevant components
3. Test thoroughly on all platforms
4. Submit pull request with detailed description
5. Code review and merge

## Contributing

See CONTRIBUTING.md for detailed contribution guidelines.
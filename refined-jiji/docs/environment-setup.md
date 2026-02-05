# Refined Jiji - Environment Setup Guide

## Overview
This guide helps you set up the complete development environment for Refined Jiji Phase 3.

## Prerequisites

### System Requirements
- **Node.js**: 18.0 or higher
- **PostgreSQL**: 13.0 or higher
- **Flutter**: 3.0 or higher (for iOS development)
- **Git**: Latest version
- **Docker**: Optional (for containerized database)

### Development Tools
- **VS Code** or preferred IDE
- **Postman** or **Insomnia** for API testing
- **GitHub Desktop** (optional)
- **Xcode** (for iOS development on macOS)

## 1. Database Setup

### Option A: Local PostgreSQL Installation

#### Windows
```bash
# Download and install PostgreSQL from postgresql.org
# Or use chocolatey:
choco install postgresql
```

#### macOS
```bash
# Using Homebrew
brew install postgresql
brew services start postgresql

# Create database
createdb refined_jiji
```

#### Linux (Ubuntu/Debian)
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib

# Start service
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Create database
sudo -u postgres createdb refined_jiji
```

### Option B: Docker (Recommended for Development)
```bash
# Start PostgreSQL container
docker run --name refined-jiji-db \
  -e POSTGRES_DB=refined_jiji \
  -e POSTGRES_USER=refined_user \
  -e POSTGRES_PASSWORD=refined_password \
  -p 5432:5432 \
  -d postgres:15

# Verify container is running
docker ps
```

## 2. Backend Setup

### Environment Configuration
```bash
cd refined-jiji/backend

# Copy environment template
cp .env.example .env

# Edit .env with your settings
# For Docker PostgreSQL:
DATABASE_URL="postgresql://refined_user:refined_password@localhost:5432/refined_jiji"

# For local PostgreSQL:
DATABASE_URL="postgresql://your_username:your_password@localhost:5432/refined_jiji"
```

### Install Dependencies
```bash
npm install
```

### Database Migration
```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push
```

### Start Backend Server
```bash
npm run dev
```

**Expected Output:**
```
🚀 Server running on port 5000
📱 Socket.io enabled for real-time chat
✅ Database connected successfully
```

## 3. Web App Setup

### Install Dependencies
```bash
cd ../web-app
npm install
```

### Environment Configuration
```bash
# Create .env.local
echo "API_URL=http://localhost:5000/api" > .env.local
```

### Start Development Server
```bash
npm run dev
```

**Access at:** http://localhost:3000

## 4. iOS App Setup (macOS only)

### Install Flutter
```bash
# Download Flutter SDK from flutter.dev
# Add to PATH
export PATH="$PATH:/path/to/flutter/bin"

# Verify installation
flutter doctor
```

### iOS Dependencies
```bash
cd ../ios-app

# Install Flutter dependencies
flutter pub get

# For iOS development, ensure Xcode is installed
# Open Xcode and accept license
sudo xcodebuild -license accept

# Install CocoaPods (iOS dependency manager)
sudo gem install cocoapods
```

### Run iOS App
```bash
# For iOS Simulator
flutter run

# For physical device (connected via USB)
flutter run --device-id YOUR_DEVICE_ID
```

## 5. Testing Setup

### Backend Testing
```bash
cd backend

# Run tests
npm test

# Or run API tests manually
../test-api.sh
```

### Web App Testing
```bash
cd web-app

# Run tests
npm run test

# Build for production
npm run build
```

### iOS App Testing
```bash
cd ios-app

# Run Flutter tests
flutter test

# Analyze code
flutter analyze
```

## 6. Development Workflow

### Daily Development
1. **Start services** (in separate terminals):
   ```bash
   # Terminal 1: Database (if using Docker)
   docker start refined-jiji-db

   # Terminal 2: Backend
   cd backend && npm run dev

   # Terminal 3: Web App
   cd web-app && npm run dev

   # Terminal 4: iOS App (optional)
   cd ios-app && flutter run
   ```

2. **API Testing**:
   ```bash
   # In another terminal
   ./test-api.sh
   ```

3. **Code Changes**:
   - Backend: Auto-reloads on save
   - Web App: Auto-reloads on save
   - iOS App: Hot reload in simulator

### Database Changes
When you modify `backend/prisma/schema.prisma`:
```bash
cd backend
npx prisma db push  # For development
npx prisma migrate dev  # For production-ready migrations
```

## 7. Troubleshooting

### Common Issues

#### Backend Won't Start
```bash
# Check if port 5000 is available
lsof -i :5000

# Check database connection
cd backend && npx prisma studio
```

#### Database Connection Issues
```bash
# Test database connection
psql -h localhost -p 5432 -U refined_user -d refined_jiji

# Reset database (WARNING: destroys data)
cd backend && npx prisma db push --force-reset
```

#### iOS Build Issues
```bash
# Clean Flutter build
cd ios-app
flutter clean
flutter pub get

# For iOS-specific issues
cd ios && pod install
```

#### Web App Build Issues
```bash
# Clear cache and reinstall
cd web-app
rm -rf node_modules .next
npm install
```

### Port Conflicts
If ports are in use, update `.env` files:
- Backend: Change `PORT` in `backend/.env`
- Web App: Update `API_URL` in `web-app/.env.local`

## 8. Production Deployment Preparation

### Environment Variables
Create production `.env` files with:
- Real database credentials
- JWT secrets
- Payment API keys
- CDN URLs
- Monitoring service keys

### Build Commands
```bash
# Backend
cd backend && npm run build

# Web App
cd web-app && npm run build

# iOS App
cd ios-app && flutter build ios
```

### Deployment Checklist
- [ ] Environment variables set
- [ ] Database migrations run
- [ ] SSL certificates configured
- [ ] CDN set up for images
- [ ] Monitoring tools configured
- [ ] Backup procedures tested

## 9. Team Development

### Git Workflow
```bash
# Create feature branch
git checkout -b feature/user-authentication

# Make changes, commit
git add .
git commit -m "Add user authentication"

# Push and create PR
git push origin feature/user-authentication
```

### Code Quality
```bash
# Backend linting
cd backend && npm run lint

# Web app linting
cd web-app && npm run lint

# iOS analysis
cd ios-app && flutter analyze
```

## 10. Getting Help

### Documentation
- `docs/setup.md` - Complete setup guide
- `docs/api.md` - API documentation
- `docs/phase3-testing.md` - Testing procedures

### Support
- Check GitHub Issues for known problems
- Review error logs in terminal
- Test with minimal setup first

---

**🎉 You're now ready for Phase 3 development!**

Start with the setup script:
```bash
./setup-phase3.sh
```

Then test each component individually before integration testing.
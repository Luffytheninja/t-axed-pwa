#!/bin/bash

# Refined Jiji - Phase 3 Setup Script

echo "🚀 Starting Refined Jiji Phase 3: Testing & Integration"
echo "======================================================"

# Check if we're in the right directory
if [ ! -d "backend" ] || [ ! -d "ios-app" ] || [ ! -d "web-app" ]; then
    echo "❌ Error: Please run this script from the refined-jiji root directory"
    exit 1
fi

echo "📁 Project structure check: OK"

# Backend setup
echo ""
echo "🔧 Setting up Backend..."
cd backend

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing backend dependencies..."
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ Backend dependency installation failed"
        exit 1
    fi
else
    echo "✅ Backend dependencies already installed"
fi

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "⚙️  Creating .env file..."
    cp .env.example .env
    echo "⚠️  Please edit .env file with your actual configuration"
else
    echo "✅ Environment file exists"
fi

# Generate Prisma client
echo "🗃️  Generating Prisma client..."
npx prisma generate
if [ $? -ne 0 ]; then
    echo "❌ Prisma client generation failed"
    exit 1
fi

echo "✅ Backend setup complete"
cd ..

# Web app setup
echo ""
echo "🌐 Setting up Web App..."
cd web-app

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing web app dependencies..."
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ Web app dependency installation failed"
        exit 1
    fi
else
    echo "✅ Web app dependencies already installed"
fi

echo "✅ Web app setup complete"
cd ..

# iOS app setup
echo ""
echo "📱 Setting up iOS App..."
cd ios-app

# Check if Flutter dependencies are installed
if [ ! -f "pubspec.lock" ]; then
    echo "📦 Installing Flutter dependencies..."
    flutter pub get
    if [ $? -ne 0 ]; then
        echo "❌ Flutter dependency installation failed (this is normal if Flutter is not installed)"
        echo "   You can install Flutter later and run: flutter pub get"
    fi
else
    echo "✅ Flutter dependencies already installed"
fi

echo "✅ iOS app setup complete"
cd ..

echo ""
echo "🎉 Phase 3 setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Set up PostgreSQL database"
echo "2. Update .env files with real credentials"
echo "3. Run database migrations: cd backend && npx prisma db push"
echo "4. Start backend: cd backend && npm run dev"
echo "5. Test API endpoints"
echo "6. Start web app: cd web-app && npm run dev"
echo "7. Test iOS app: cd ios-app && flutter run"
echo ""
echo "For detailed testing instructions, see docs/phase3-testing.md"
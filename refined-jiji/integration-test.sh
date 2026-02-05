#!/bin/bash

# Refined Jiji - Complete Integration Test

echo "🧪 Running Complete Refined Jiji Integration Test"
echo "================================================"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Check if we're in the right directory
if [ ! -d "backend" ] || [ ! -d "web-app" ]; then
    echo -e "${RED}❌ Error: Please run this script from the refined-jiji root directory${NC}"
    exit 1
fi

echo -e "${BLUE}📁 Project structure check: OK${NC}"

# Function to check if a service is running
check_service() {
    local url=$1
    local name=$2
    local max_attempts=30
    local attempt=1

    echo -e "${YELLOW}Checking $name...${NC}"

    while [ $attempt -le $max_attempts ]; do
        if curl -s --max-time 5 "$url" > /dev/null 2>&1; then
            echo -e "${GREEN}✅ $name is running${NC}"
            return 0
        fi
        echo -e "${YELLOW}Waiting for $name (attempt $attempt/$max_attempts)...${NC}"
        sleep 2
        ((attempt++))
    done

    echo -e "${RED}❌ $name failed to start${NC}"
    return 1
}

# Test Backend API
echo -e "\n${BLUE}🔧 Testing Backend API${NC}"

# Start backend if not running
if ! pgrep -f "npm run dev" > /dev/null; then
    echo "Starting backend server..."
    cd backend
    npm run dev > ../backend.log 2>&1 &
    BACKEND_PID=$!
    cd ..
    sleep 5
fi

# Check backend health
if check_service "http://localhost:5000/health" "Backend API"; then
    echo -e "${GREEN}✅ Backend health check passed${NC}"

    # Run API tests
    echo -e "\n${YELLOW}Running API endpoint tests...${NC}"
    if ./test-api.sh > api_test_results.log 2>&1; then
        echo -e "${GREEN}✅ API tests completed${NC}"
        echo "Check api_test_results.log for details"
    else
        echo -e "${RED}❌ API tests failed${NC}"
        echo "Check api_test_results.log for details"
    fi
else
    echo -e "${RED}❌ Backend not accessible${NC}"
fi

# Test Web App
echo -e "\n${BLUE}🌐 Testing Web Application${NC}"

# Start web app if not running
if ! pgrep -f "npm run dev" > /dev/null || ! pgrep -f "next dev" > /dev/null; then
    echo "Starting web app..."
    cd web-app
    npm run dev > ../web_app.log 2>&1 &
    WEBAPP_PID=$!
    cd ..
    sleep 5
fi

# Check web app
if check_service "http://localhost:3000" "Web App"; then
    echo -e "${GREEN}✅ Web app is running${NC}"

    # Test web app pages
    echo -e "\n${YELLOW}Testing web app pages...${NC}"

    # Test homepage
    if curl -s "http://localhost:3000" | grep -q "Refined Jiji"; then
        echo -e "${GREEN}✅ Homepage loads correctly${NC}"
    else
        echo -e "${RED}❌ Homepage failed${NC}"
    fi

    # Test login page
    if curl -s "http://localhost:3000/login" | grep -q "Sign in"; then
        echo -e "${GREEN}✅ Login page loads correctly${NC}"
    else
        echo -e "${RED}❌ Login page failed${NC}"
    fi

    # Test register page
    if curl -s "http://localhost:3000/register" | grep -q "Create your account"; then
        echo -e "${GREEN}✅ Register page loads correctly${NC}"
    else
        echo -e "${RED}❌ Register page failed${NC}"
    fi

else
    echo -e "${RED}❌ Web app not accessible${NC}"
fi

# Test iOS App (if Flutter is available)
echo -e "\n${BLUE}📱 Testing iOS App${NC}"

if command -v flutter &> /dev/null; then
    echo -e "${GREEN}Flutter found, checking iOS app...${NC}"

    cd ios-app

    # Check if dependencies are installed
    if [ -f "pubspec.lock" ]; then
        echo -e "${GREEN}✅ Flutter dependencies installed${NC}"

        # Try to analyze the code
        if flutter analyze --no-pub > ../flutter_analyze.log 2>&1; then
            echo -e "${GREEN}✅ Flutter code analysis passed${NC}"
        else
            echo -e "${YELLOW}⚠️  Flutter code analysis found issues${NC}"
            echo "Check flutter_analyze.log for details"
        fi
    else
        echo -e "${YELLOW}⚠️  Flutter dependencies not installed${NC}"
        echo "Run: cd ios-app && flutter pub get"
    fi

    cd ..
else
    echo -e "${YELLOW}⚠️  Flutter not installed, skipping iOS app tests${NC}"
fi

# Integration Tests
echo -e "\n${BLUE}🔗 Running Integration Tests${NC}"

# Test frontend-backend communication
echo -e "${YELLOW}Testing frontend-backend integration...${NC}"

# Test if web app can communicate with backend
if curl -s "http://localhost:3000/api/categories" | grep -q "categories"; then
    echo -e "${GREEN}✅ Frontend-backend integration working${NC}"
else
    echo -e "${YELLOW}⚠️  Frontend-backend integration may have issues${NC}"
    echo "Make sure backend is running and API_URL is set correctly"
fi

# Database connectivity test
echo -e "${YELLOW}Testing database connectivity...${NC}"
if curl -s "http://localhost:5000/health" | grep -q '"status":"OK"'; then
    echo -e "${GREEN}✅ Database connectivity OK${NC}"
else
    echo -e "${RED}❌ Database connectivity issues${NC}"
    echo "Check database configuration and connection"
fi

# Performance Test
echo -e "\n${BLUE}⚡ Running Basic Performance Tests${NC}"

echo -e "${YELLOW}Testing API response times...${NC}"
start_time=$(date +%s.%3N)
if curl -s --max-time 10 "http://localhost:5000/api/listings" > /dev/null; then
    end_time=$(date +%s.%3N)
    response_time=$(echo "$end_time - $start_time" | bc)
    if (( $(echo "$response_time < 2.0" | bc -l) )); then
        echo -e "${GREEN}✅ API response time: ${response_time}s (Good)${NC}"
    else
        echo -e "${YELLOW}⚠️  API response time: ${response_time}s (Slow)${NC}"
    fi
else
    echo -e "${RED}❌ API performance test failed${NC}"
fi

# Cleanup
echo -e "\n${BLUE}🧹 Cleaning up test processes${NC}"

# Kill background processes if they were started by this script
if [ -n "$BACKEND_PID" ]; then
    kill $BACKEND_PID 2>/dev/null
    echo "Backend process stopped"
fi

if [ -n "$WEBAPP_PID" ]; then
    kill $WEBAPP_PID 2>/dev/null
    echo "Web app process stopped"
fi

# Summary
echo -e "\n${BLUE}📊 Integration Test Summary${NC}"
echo "================================"
echo ""
echo -e "${GREEN}✅ Completed:${NC}"
echo "  - Backend API testing"
echo "  - Web application testing"
echo "  - iOS app code analysis"
echo "  - Integration testing"
echo "  - Performance testing"
echo ""
echo -e "${YELLOW}📋 Next Steps:${NC}"
echo "  1. Review test logs for any issues"
echo "  2. Fix any failing tests"
echo "  3. Set up proper database for full testing"
echo "  4. Configure environment variables"
echo "  5. Run manual user acceptance testing"
echo ""
echo -e "${BLUE}📁 Test Results:${NC}"
echo "  - api_test_results.log"
echo "  - backend.log"
echo "  - web_app.log"
echo "  - flutter_analyze.log (if applicable)"
echo ""
echo -e "${GREEN}🎉 Integration testing complete!${NC}"
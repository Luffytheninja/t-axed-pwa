#!/bin/bash

# Refined Jiji - API Testing Script

echo "🧪 Testing Refined Jiji Backend API"
echo "==================================="

BASE_URL="http://localhost:5000/api"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to make API calls and check responses
test_endpoint() {
    local method=$1
    local endpoint=$2
    local data=$3
    local description=$4

    echo -e "\n${YELLOW}Testing: $description${NC}"
    echo "Method: $method"
    echo "Endpoint: $endpoint"

    if [ -n "$data" ]; then
        response=$(curl -s -X $method "$BASE_URL$endpoint" \
            -H "Content-Type: application/json" \
            -d "$data")
    else
        response=$(curl -s -X $method "$BASE_URL$endpoint")
    fi

    # Check if response is valid JSON
    if echo "$response" | jq . >/dev/null 2>&1; then
        echo -e "${GREEN}✅ Response: Valid JSON${NC}"
        echo "$response" | jq '.message // .error // .' | head -5
    else
        echo -e "${RED}❌ Response: Invalid or no response${NC}"
        echo "Raw response: $response"
        return 1
    fi
}

# Test health check
echo -e "\n${YELLOW}1. Testing Health Check${NC}"
health_response=$(curl -s "$BASE_URL/../health")
if echo "$health_response" | jq -e '.status == "OK"' >/dev/null 2>&1; then
    echo -e "${GREEN}✅ Health check passed${NC}"
else
    echo -e "${RED}❌ Health check failed${NC}"
    echo "Response: $health_response"
fi

# Test categories endpoint
test_endpoint "GET" "/categories" "" "Categories endpoint"

# Test listings endpoint
test_endpoint "GET" "/listings" "" "Listings endpoint"

# Test user registration
echo -e "\n${YELLOW}Testing User Registration${NC}"
register_data='{
    "email": "test-'$(date +%s)'@example.com",
    "password": "password123",
    "firstName": "Test",
    "lastName": "User",
    "phone": "+2341234567890",
    "location": "Lagos, Nigeria"
}'

register_response=$(curl -s -X POST "$BASE_URL/auth/register" \
    -H "Content-Type: application/json" \
    -d "$register_data")

if echo "$register_response" | jq -e '.token' >/dev/null 2>&1; then
    echo -e "${GREEN}✅ User registration successful${NC}"
    token=$(echo "$register_response" | jq -r '.token')
    echo "Token received: ${token:0:50}..."
else
    echo -e "${RED}❌ User registration failed${NC}"
    echo "Response: $register_response"
fi

# Test user login
if [ -n "$token" ]; then
    echo -e "\n${YELLOW}Testing User Login${NC}"
    login_data='{
        "email": "test@example.com",
        "password": "password123"
    }'

    login_response=$(curl -s -X POST "$BASE_URL/auth/login" \
        -H "Content-Type: application/json" \
        -d "$login_data")

    if echo "$login_response" | jq -e '.token' >/dev/null 2>&1; then
        echo -e "${GREEN}✅ User login successful${NC}"
        login_token=$(echo "$login_response" | jq -r '.token')
    else
        echo -e "${RED}❌ User login failed${NC}"
        echo "Response: $login_response"
    fi
fi

# Test authenticated endpoints
if [ -n "$login_token" ]; then
    echo -e "\n${YELLOW}Testing Authenticated Endpoints${NC}"

    # Test profile endpoint
    profile_response=$(curl -s -X GET "$BASE_URL/auth/profile" \
        -H "Authorization: Bearer $login_token")

    if echo "$profile_response" | jq -e '.user' >/dev/null 2>&1; then
        echo -e "${GREEN}✅ Profile endpoint works${NC}"
    else
        echo -e "${RED}❌ Profile endpoint failed${NC}"
    fi

    # Test creating a listing
    listing_data='{
        "title": "Test iPhone 15 Pro",
        "description": "Brand new iPhone for testing",
        "price": 1500000,
        "categoryId": "mobile-phones-tablets",
        "condition": "new",
        "location": "Lagos, Nigeria",
        "images": ["https://example.com/test.jpg"]
    }'

    create_listing_response=$(curl -s -X POST "$BASE_URL/listings" \
        -H "Content-Type: application/json" \
        -H "Authorization: Bearer $login_token" \
        -d "$listing_data")

    if echo "$create_listing_response" | jq -e '.listing' >/dev/null 2>&1; then
        echo -e "${GREEN}✅ Listing creation successful${NC}"
        listing_id=$(echo "$create_listing_response" | jq -r '.listing.id')
    else
        echo -e "${RED}❌ Listing creation failed${NC}"
        echo "Response: $create_listing_response"
    fi
fi

echo -e "\n${YELLOW}API Testing Complete${NC}"
echo "Check the results above for any failed tests."
echo "If backend is not running, start it with: cd backend && npm run dev"
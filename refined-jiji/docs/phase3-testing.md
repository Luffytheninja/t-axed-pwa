# Refined Jiji - Phase 3 Testing Guide

## Overview
This guide covers testing procedures for Phase 3 development.

## 1. Backend API Testing

### Prerequisites
- PostgreSQL database running
- Environment variables configured
- Backend dependencies installed

### Setup Database
```bash
cd backend
npx prisma db push
```

### Start Backend Server
```bash
npm run dev
```

### Test API Endpoints

#### Authentication Tests
```bash
# Register a new user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "firstName": "Test",
    "lastName": "User",
    "phone": "+2341234567890",
    "location": "Lagos, Nigeria"
  }'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

#### Listings Tests
```bash
# Get listings
curl http://localhost:5000/api/listings

# Create a listing (requires auth token)
curl -X POST http://localhost:5000/api/listings \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "iPhone 15 Pro",
    "description": "Brand new iPhone 15 Pro",
    "price": 1500000,
    "categoryId": "mobile-phones",
    "condition": "new",
    "location": "Lagos, Nigeria",
    "images": ["https://example.com/image.jpg"]
  }'
```

## 2. Web App Testing

### Start Development Server
```bash
cd web-app
npm run dev
```

### Test Pages
- **Homepage**: http://localhost:3000
- **Login**: http://localhost:3000/login
- **Register**: http://localhost:3000/register
- **Dashboard**: http://localhost:3000/dashboard (requires login)

### API Integration Testing
1. Try registering a new account
2. Login with the account
3. Check if dashboard loads correctly
4. Test navigation between pages

## 3. iOS App Testing

### Prerequisites
- Flutter SDK installed
- iOS Simulator or physical device
- Xcode (for iOS development)

### Run App
```bash
cd ios-app
flutter pub get
flutter run
```

### Test Scenarios
1. **Onboarding Flow**
   - Swipe through 3 onboarding screens
   - Tap "Get Started" to go to login

2. **Authentication**
   - Try invalid login (should show error)
   - Register new account
   - Login with registered account
   - Should navigate to home screen

3. **Home Screen**
   - Check welcome message
   - Test quick action buttons
   - Try navigation menu

4. **UI Responsiveness**
   - Test on different screen sizes
   - Check dark/light mode toggle
   - Test text scaling

## 4. Integration Testing

### End-to-End Scenarios

#### User Registration Flow
1. User opens web app
2. Clicks "Sign up"
3. Fills registration form
4. Submits form
5. Receives confirmation
6. Can login immediately

#### Listing Creation Flow
1. User logs in
2. Clicks "Sell" button
3. Fills listing form
4. Uploads images
5. Sets price and category
6. Publishes listing
7. Listing appears in feed

#### Mobile App Flow
1. User downloads iOS app
2. Goes through onboarding
3. Registers account
4. Sees personalized home screen
5. Can browse listings
6. Can start conversations

## 5. Performance Testing

### Backend Performance
```bash
# Load testing with artillery
npm install -g artillery
artillery quick --count 10 --num 50 http://localhost:5000/api/listings
```

### Web App Performance
- Use Lighthouse in Chrome DevTools
- Check Core Web Vitals
- Test on slow connections
- Mobile performance testing

### iOS App Performance
- Use Xcode Instruments
- Memory leak testing
- CPU usage monitoring
- Battery impact testing

## 6. Security Testing

### API Security
- Test JWT token validation
- Check rate limiting
- Test input validation
- SQL injection prevention

### Authentication Security
- Password strength requirements
- Session management
- Logout functionality
- Remember me feature

## 7. Cross-Platform Testing

### Web App Browsers
- Chrome (primary)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

### iOS App Devices
- iPhone SE (small screen)
- iPhone 14 Pro (standard)
- iPad (tablet experience)
- Different iOS versions (14, 15, 16, 17)

## 8. Automated Testing

### Backend Tests
```bash
cd backend
npm test
```

### Web App Tests
```bash
cd web-app
npm run test
```

### iOS App Tests
```bash
cd ios-app
flutter test
```

## 9. User Acceptance Testing

### Beta Testing Setup
1. Deploy staging environment
2. Invite beta users
3. Collect feedback
4. Fix critical issues
5. Iterate on UX

### Feedback Collection
- In-app feedback forms
- User interviews
- Analytics tracking
- Crash reporting

## 10. Deployment Readiness Checklist

- [ ] All API endpoints tested
- [ ] Web app works on all browsers
- [ ] iOS app tested on multiple devices
- [ ] Database migrations ready
- [ ] Environment variables configured
- [ ] SSL certificates ready
- [ ] CDN configured for images
- [ ] Monitoring tools set up
- [ ] Backup procedures in place
- [ ] Rollback plan prepared

## Common Issues & Solutions

### Backend Issues
- **Database connection fails**: Check PostgreSQL is running and credentials are correct
- **Prisma errors**: Run `npx prisma generate` after schema changes
- **Port conflicts**: Change PORT in .env file

### Web App Issues
- **API calls fail**: Check backend is running and CORS is configured
- **Build fails**: Clear node_modules and reinstall
- **Styling issues**: Check Tailwind configuration

### iOS App Issues
- **Flutter not found**: Install Flutter SDK and add to PATH
- **iOS simulator issues**: Reset simulator or use physical device
- **Build fails**: Run `flutter clean` and rebuild

## Next Steps After Testing

Once all tests pass:
1. Deploy to staging environment
2. Conduct user acceptance testing
3. Fix any remaining issues
4. Prepare production deployment
5. Launch beta version
6. Monitor and iterate
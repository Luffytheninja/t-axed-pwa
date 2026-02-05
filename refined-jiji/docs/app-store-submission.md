# Refined Jiji - App Store Submission Guide

## Overview
This guide covers the complete process for submitting the Refined Jiji iOS app to the Apple App Store.

## Prerequisites

### Apple Developer Account
- [ ] Active Apple Developer Program membership ($99/year)
- [ ] App Store Connect access
- [ ] Two-factor authentication enabled
- [ ] Legal agreements accepted

### App Preparation
- [ ] Flutter app built for iOS
- [ ] App icons (1024x1024px)
- [ ] Screenshots (various device sizes)
- [ ] App Store description and keywords
- [ ] Privacy policy URL
- [ ] Support URL

### Technical Requirements
- [ ] Xcode 15.0+ installed
- [ ] iOS 12.0+ deployment target
- [ ] Valid code signing certificates
- [ ] App Store distribution provisioning profile

## 1. App Store Connect Setup

### Create App Record
1. Log into [App Store Connect](https://appstoreconnect.apple.com)
2. Click "My Apps" → "+" → "New App"
3. Fill app information:
   - **Platforms**: iOS
   - **Name**: Refined Jiji
   - **Primary Language**: English
   - **Bundle ID**: `com.refinedjiji.app` (must match Xcode)
   - **SKU**: `RJ001`
   - **User Access**: Full Access

### App Information
- **Description**: Write compelling description highlighting AI features
- **Keywords**: "classifieds, marketplace, buy, sell, Nigeria, AI, smart"
- **Support URL**: https://refined-jiji.com/support
- **Marketing URL**: https://refined-jiji.com
- **Privacy Policy URL**: https://refined-jiji.com/privacy

### Pricing and Availability
- **Price**: Free
- **Availability**: All territories (or select specific countries)
- **Education Store**: No
- **Content Rights**: Full rights

## 2. Build Preparation

### Xcode Configuration
```bash
# Open iOS project
cd ios-app
flutter build ios --release

# Open in Xcode
open ios/Runner.xcworkspace
```

### Code Signing
1. In Xcode: Select project → Signing & Capabilities
2. Select your development team
3. Ensure "Automatically manage signing" is checked
4. Select appropriate provisioning profile

### Bundle Configuration
1. **Bundle Identifier**: `com.refinedjiji.app`
2. **Version**: 1.0.0
3. **Build**: 1
4. **Deployment Target**: iOS 12.0
5. **Device Orientation**: Portrait only
6. **Status Bar Style**: Default

### App Icons and Launch Screen
1. Prepare app icons in all required sizes (20pt to 1024pt)
2. Create launch screen storyboard
3. Test icons on different devices

## 3. App Store Assets

### Screenshots
Create 5-10 screenshots showing:
- Onboarding flow
- Home screen with recommendations
- Search and filtering
- Product details
- Chat interface
- Profile and settings

**Requirements**:
- iPhone 6.5" (iPhone 13 Pro Max, 14 Plus, etc.)
- iPhone 5.5" (iPhone 8 Plus, etc.)
- iPad Pro (12.9-inch)
- PNG format, 72 DPI, RGB color space

### App Preview Video (Optional but Recommended)
- 15-30 seconds showing app usage
- MP4 format, H.264 codec
- 1920x1080 resolution (portrait)
- Include voiceover and text overlays

### App Icon
- 1024x1024 pixels
- PNG format
- No transparency
- Square corners (App Store adds rounded corners)

## 4. Build and Upload

### Archive Build
```bash
# In Xcode
Product → Archive

# Wait for archiving to complete
# Click "Distribute App"
# Select "App Store Connect"
# Choose "Upload"
```

### Alternative: Command Line
```bash
# Build archive
xcodebuild -workspace ios/Runner.xcworkspace -scheme Runner -configuration Release -destination generic/platform=iOS -archivePath build/Runner.xcarchive archive

# Export for App Store
xcodebuild -exportArchive -archivePath build/Runner.xcarchive -exportPath build/Runner -exportOptionsPlist exportOptions.plist
```

### Upload to App Store Connect
1. Use Transporter app or Xcode
2. Select the exported .ipa file
3. Upload to App Store Connect
4. Wait for processing (usually 10-30 minutes)

## 5. App Review Process

### Before Submission
- [ ] Test app thoroughly on multiple devices
- [ ] Test all app flows and edge cases
- [ ] Verify no crashes or bugs
- [ ] Check app size and performance
- [ ] Validate all links and URLs work

### Submission Checklist
- [ ] App icons and screenshots uploaded
- [ ] App description and keywords entered
- [ ] Privacy policy and support URLs provided
- [ ] Age rating selected (4+)
- [ ] Content rights confirmed
- [ ] Advertising identifier usage declared
- [ ] Beta testing information (if applicable)

### Common Rejection Reasons & Fixes

#### Guideline 2.1 - App Completeness
- **Issue**: App crashes or has bugs
- **Fix**: Thorough testing, crash reporting enabled

#### Guideline 4.1 - Copycats
- **Issue**: App too similar to existing apps
- **Fix**: Emphasize unique AI features, differentiate UI/UX

#### Guideline 5.1.1 - Legal - Privacy
- **Issue**: Privacy policy missing or incomplete
- **Fix**: Complete privacy policy, accurate data collection disclosure

#### Guideline 5.1.2 - Legal - Payments
- **Issue**: In-app purchases not configured properly
- **Fix**: Set up proper payment processing, clear terms

## 6. Post-Submission

### Review Timeline
- **Initial Review**: 24-48 hours
- **Full Review**: 1-2 weeks
- **Potential Rejections**: May require fixes and resubmission

### Monitoring
- Check App Store Connect regularly for status updates
- Respond promptly to any review questions
- Monitor crash reports and user feedback

### Release Options
- **Manual Release**: Control when to release after approval
- **Automatic Release**: Release immediately after approval
- **Phased Release**: Roll out to 1% of users first

## 7. Marketing Preparation

### App Store Optimization (ASO)
- **Title**: Include relevant keywords
- **Subtitle**: Highlight key features
- **Description**: Use keywords naturally
- **Screenshots**: Show value propositions clearly
- **Keywords**: "classifieds marketplace nigeria ai smart buy sell"

### Pre-Launch Assets
- [ ] App website: https://refined-jiji.com
- [ ] Social media accounts
- [ ] Press kit with screenshots and app icon
- [ ] Beta testing program
- [ ] Influencer partnerships

## 8. Launch Strategy

### Soft Launch
1. **Limited Release**: Launch in 1-2 countries first
2. **Gather Feedback**: Monitor reviews and analytics
3. **Fix Issues**: Address any discovered problems
4. **Optimize**: Improve based on real user data

### Full Launch
1. **Global Release**: Expand to all target markets
2. **Marketing Push**: Execute comprehensive marketing campaign
3. **User Acquisition**: Run paid advertising campaigns
4. **Community Building**: Engage with early users

## 9. Maintenance & Updates

### Regular Updates
- Submit updates every 2-3 months
- Include bug fixes and new features
- Maintain high app store rating (>4.5 stars)

### Monitoring & Analytics
- Track app store performance
- Monitor crash reports
- Analyze user behavior
- Update based on user feedback

## 10. Troubleshooting

### Build Issues
- Ensure Flutter version compatibility
- Check iOS deployment target
- Verify code signing certificates
- Clean build folder and rebuild

### Upload Issues
- Check internet connection
- Verify app bundle ID matches
- Ensure provisioning profile is valid
- Try uploading with Transporter app

### Review Issues
- Read rejection reason carefully
- Make requested changes
- Provide additional information if needed
- Appeal if you disagree with rejection

---

## 📋 App Store Submission Checklist

### Pre-Submission
- [ ] Apple Developer account active
- [ ] App Store Connect app created
- [ ] App icons prepared (all sizes)
- [ ] Screenshots created (all devices)
- [ ] App description written
- [ ] Keywords researched and selected
- [ ] Privacy policy URL ready
- [ ] Support URL ready

### Technical
- [ ] Flutter app builds successfully
- [ ] iOS deployment target set correctly
- [ ] Code signing configured
- [ ] Bundle ID matches App Store Connect
- [ ] No crashes or bugs in testing
- [ ] Performance optimized

### App Store Assets
- [ ] App icon uploaded (1024x1024)
- [ ] Screenshots uploaded (5-10 per device type)
- [ ] App preview video (optional)
- [ ] Description and keywords entered
- [ ] Age rating selected
- [ ] Content rights confirmed

### Post-Upload
- [ ] Build uploaded successfully
- [ ] App Store Connect shows "Ready for Review"
- [ ] All required information completed
- [ ] Submit for review
- [ ] Monitor review status
- [ ] Prepare for potential rejections

**🎯 Goal**: App approved and live within 2 weeks of submission!
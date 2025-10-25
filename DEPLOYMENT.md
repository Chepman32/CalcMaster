# CalcMaster - Deployment Guide

## Table of Contents
1. [Pre-Deployment Checklist](#pre-deployment-checklist)
2. [iOS Deployment](#ios-deployment)
3. [Android Deployment](#android-deployment)
4. [App Store Submission](#app-store-submission)
5. [Google Play Submission](#google-play-submission)
6. [Post-Deployment](#post-deployment)

## Pre-Deployment Checklist

### Code Quality
- [ ] All unit tests passing
- [ ] No console errors or warnings
- [ ] Code linted and formatted
- [ ] TypeScript compilation successful
- [ ] No unused dependencies

### Assets
- [ ] App icons created (all required sizes)
- [ ] Splash screen images prepared
- [ ] Screenshots prepared (all required sizes)
- [ ] App preview video (optional but recommended)

### Configuration
- [ ] Version number updated in package.json
- [ ] Build number incremented
- [ ] Environment variables configured
- [ ] API endpoints configured (if applicable)

### Legal & Compliance
- [ ] Privacy Policy prepared
- [ ] Terms of Service prepared
- [ ] GDPR compliance (if targeting EU)
- [ ] COPPA compliance (if targeting children)

### Testing
- [ ] Tested on minimum supported iOS version (13.4)
- [ ] Tested on minimum supported Android version (6.0)
- [ ] Tested on multiple device sizes
- [ ] Accessibility testing completed
- [ ] Performance testing completed

## iOS Deployment

### 1. Setup Apple Developer Account

1. Enroll in Apple Developer Program ($99/year)
2. Create App ID in Apple Developer Portal
   - Bundle ID: `com.calcmaster.app`
   - Capabilities: In-App Purchase (if using IAP)

### 2. Certificates & Provisioning

```bash
# Using Xcode automatic signing (recommended)
# 1. Open Xcode
# 2. Select project in navigator
# 3. Select target
# 4. Signing & Capabilities tab
# 5. Enable "Automatically manage signing"
# 6. Select your team
```

Or manual setup:
```bash
# Create certificates
# 1. Go to developer.apple.com
# 2. Certificates, Identifiers & Profiles
# 3. Create App Store distribution certificate
# 4. Create provisioning profile
```

### 3. App Icons

Required sizes (all @1x, @2x, @3x):
- 20pt, 29pt, 40pt, 60pt (iPhone)
- 20pt, 29pt, 40pt, 76pt, 83.5pt (iPad)
- 1024x1024 (App Store)

Place in `ios/CalcMaster/Images.xcassets/AppIcon.appiconset/`

### 4. Update Info.plist

```xml
<key>CFBundleDisplayName</key>
<string>CalcMaster</string>
<key>CFBundleShortVersionString</key>
<string>1.0.0</string>
<key>CFBundleVersion</key>
<string>1</string>
```

### 5. Build for Release

```bash
cd ios

# Clean build folder
xcodebuild clean -workspace CalcMaster.xcworkspace -scheme CalcMaster

# Archive
xcodebuild archive \
  -workspace CalcMaster.xcworkspace \
  -scheme CalcMaster \
  -configuration Release \
  -archivePath build/CalcMaster.xcarchive

# Export IPA
xcodebuild -exportArchive \
  -archivePath build/CalcMaster.xcarchive \
  -exportPath build \
  -exportOptionsPlist ExportOptions.plist
```

Or use Xcode:
1. Product → Archive
2. Wait for archive to complete
3. Window → Organizer
4. Select archive → Distribute App
5. App Store Connect → Upload

### 6. Create ExportOptions.plist

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>method</key>
    <string>app-store</string>
    <key>teamID</key>
    <string>YOUR_TEAM_ID</string>
    <key>uploadBitcode</key>
    <false/>
    <key>uploadSymbols</key>
    <true/>
    <key>compileBitcode</key>
    <false/>
</dict>
</plist>
```

## Android Deployment

### 1. Setup Google Play Console

1. Create Google Play Developer account ($25 one-time)
2. Create new application
3. Fill in store listing details

### 2. Generate Signing Key

```bash
cd android/app

# Generate upload key
keytool -genkeypair -v \
  -storetype PKCS12 \
  -keystore calcmaster-upload-key.keystore \
  -alias calcmaster-key-alias \
  -keyalg RSA \
  -keysize 2048 \
  -validity 10000

# Move keystore to secure location
mv calcmaster-upload-key.keystore ~/.android/keystores/
```

### 3. Configure Gradle

Edit `android/gradle.properties`:

```properties
CALCMASTER_UPLOAD_STORE_FILE=~/.android/keystores/calcmaster-upload-key.keystore
CALCMASTER_UPLOAD_KEY_ALIAS=calcmaster-key-alias
CALCMASTER_UPLOAD_STORE_PASSWORD=your-store-password
CALCMASTER_UPLOAD_KEY_PASSWORD=your-key-password
```

Edit `android/app/build.gradle`:

```gradle
android {
    ...
    defaultConfig {
        ...
        versionCode 1
        versionName "1.0.0"
    }

    signingConfigs {
        release {
            if (project.hasProperty('CALCMASTER_UPLOAD_STORE_FILE')) {
                storeFile file(CALCMASTER_UPLOAD_STORE_FILE)
                storePassword CALCMASTER_UPLOAD_STORE_PASSWORD
                keyAlias CALCMASTER_UPLOAD_KEY_ALIAS
                keyPassword CALCMASTER_UPLOAD_KEY_PASSWORD
            }
        }
    }

    buildTypes {
        release {
            signingConfig signingConfigs.release
            minifyEnabled true
            shrinkResources true
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }
}
```

### 4. App Icons

Required sizes:
- mipmap-mdpi: 48x48
- mipmap-hdpi: 72x72
- mipmap-xhdpi: 96x96
- mipmap-xxhdpi: 144x144
- mipmap-xxxhdpi: 192x192

Place in `android/app/src/main/res/mipmap-*/`

### 5. Build Release APK/AAB

```bash
cd android

# Clean
./gradlew clean

# Build AAB (preferred for Play Store)
./gradlew bundleRelease

# Or build APK
./gradlew assembleRelease

# Output location:
# AAB: android/app/build/outputs/bundle/release/app-release.aab
# APK: android/app/build/outputs/apk/release/app-release.apk
```

### 6. Test Release Build

```bash
# Install release APK
adb install android/app/build/outputs/apk/release/app-release.apk

# Or test AAB using bundletool
bundletool build-apks --bundle=app-release.aab --output=app.apks
bundletool install-apks --apks=app.apks
```

## App Store Submission (iOS)

### 1. App Store Connect Setup

1. Go to appstoreconnect.apple.com
2. My Apps → + → New App
3. Fill in app information:
   - Name: CalcMaster
   - Primary Language: English
   - Bundle ID: com.calcmaster.app
   - SKU: CALCMASTER001

### 2. App Information

- **Name**: CalcMaster
- **Subtitle**: Scientific Calculator Pro
- **Category**: Productivity > Utilities
- **Content Rights**: Check if you own rights

### 3. Pricing & Availability

- **Price**: Free (with IAP)
- **Availability**: All countries
- **In-App Purchases**: Configure if using IAP

### 4. Prepare for Submission

**Screenshots** (required for all sizes):
- 6.7" Display (iPhone 14 Pro Max): 1290 x 2796
- 6.5" Display (iPhone 11 Pro Max): 1284 x 2778
- 5.5" Display (iPhone 8 Plus): 1242 x 2208
- iPad Pro (12.9" 3rd gen): 2048 x 2732

**App Preview Video** (optional):
- Max 30 seconds
- Show key features
- No audio required

**Description**:
```
CalcMaster is the ultimate scientific calculator app for iOS. Featuring a beautiful, intuitive interface with powerful calculation capabilities.

FEATURES:
• Basic, Scientific, and Programmer calculator modes
• Graphing calculator with function plotting
• Comprehensive unit converter (10+ categories)
• Calculation history with search
• Beautiful dark and light themes
• Gesture controls for enhanced productivity
• Haptic feedback
• 100% offline functionality

CALCULATOR MODES:
• Basic: Standard arithmetic with memory functions
• Scientific: Trigonometry, logarithms, powers, and more
• Programmer: Binary, hex, octal with bitwise operations
• Graphing: Plot functions with advanced features (Premium)

UNIT CONVERTER:
Length, Weight, Temperature, Area, Volume, Speed, Time, Energy, Pressure, Data

Perfect for students, engineers, scientists, and anyone who needs reliable calculations on the go.

Download CalcMaster today and calculate with confidence!
```

**Keywords**: calculator, scientific calculator, graphing, converter, math, engineering

**Support URL**: https://yourdomain.com/support
**Privacy Policy URL**: https://yourdomain.com/privacy

### 5. Submit for Review

1. Upload build via Xcode or Transporter app
2. Select build in App Store Connect
3. Fill in review information
4. Add review notes (optional)
5. Submit for review

**Review Notes**:
```
Thank you for reviewing CalcMaster!

TEST ACCOUNT (if IAP implemented):
Email: test@calcmaster.com
Password: TestPassword123

FEATURES TO TEST:
- All calculator modes work offline
- Gesture controls on display (swipe left/right)
- Premium features locked behind paywall
- Settings persist correctly

No special configuration needed. The app works 100% offline.
```

## Google Play Submission (Android)

### 1. Store Listing

**Title**: CalcMaster - Scientific Calculator

**Short Description** (80 chars):
```
Powerful scientific calculator with graphing, unit converter & more
```

**Full Description** (4000 chars):
```
CalcMaster is a powerful, feature-rich scientific calculator designed for Android. With its beautiful interface and comprehensive functionality, it's perfect for students, professionals, and anyone who needs reliable calculations.

🔢 MULTIPLE CALCULATOR MODES
• Basic Calculator - Standard arithmetic operations
• Scientific Calculator - Advanced mathematical functions
• Programmer Calculator - Binary, hex, octal conversions
• Graphing Calculator - Plot functions and analyze graphs

📊 GRAPHING CAPABILITIES (Premium)
• Plot multiple functions simultaneously
• Zoom and pan to explore graphs
• Trace mode to find specific values
• Calculate intersections and critical points

🔄 UNIT CONVERTER
Convert between units in 10+ categories:
• Length, Weight, Temperature
• Area, Volume, Speed
• Time, Energy, Pressure, Data

✨ FEATURES
• Beautiful dark and light themes
• Gesture controls for productivity
• Haptic feedback
• Calculation history with search
• 100% offline functionality
• No ads (with premium)

📱 PERFECT FOR
• Students and teachers
• Engineers and scientists
• Developers and programmers
• Anyone needing calculations

🎨 MODERN DESIGN
• Smooth 60fps animations
• Intuitive gesture controls
• Material Design guidelines
• Accessible interface

🔒 PRIVACY FOCUSED
• All calculations performed locally
• No data collection
• Works completely offline

Download CalcMaster today and experience the future of mobile calculations!

Premium features available via in-app purchase.
```

**Screenshots**: Upload 2-8 screenshots (minimum 2)

**Feature Graphic**: 1024 x 500

**App Category**: Tools > Productivity

**Tags**: calculator, scientific, math, converter, graphing

### 2. Content Rating

Complete content rating questionnaire:
- Violence: None
- Sexual Content: None
- Language: None
- Controlled Substances: None
- Gambling: None

Expected Rating: Everyone

### 3. Privacy Policy

- **Privacy Policy URL**: https://yourdomain.com/privacy
- **Data Safety**: Complete data safety form
  - Does app collect data? No
  - Does app share data? No

### 4. Upload AAB

1. Go to Release → Production
2. Create new release
3. Upload AAB file
4. Set version name and release notes
5. Save and review

### 5. Release Notes

```
CalcMaster v1.0.0 - Initial Release

• Three powerful calculator modes
• Graphing capabilities
• Comprehensive unit converter
• Beautiful themes
• Gesture controls
• 100% offline functionality

Thank you for choosing CalcMaster!
```

### 6. Submit for Review

1. Review release details
2. Check all requirements met
3. Submit for review
4. Wait for approval (typically 1-3 days)

## Post-Deployment

### Monitoring

**iOS:**
- Monitor crashes in Xcode Organizer
- Check reviews in App Store Connect
- Monitor download numbers

**Android:**
- Check Google Play Console for crashes
- Monitor ANRs (Application Not Responding)
- Review user feedback

### Analytics (Optional)

Integrate analytics to track:
- Active users
- Feature usage
- Crash reports
- User retention

Recommended tools:
- Firebase Analytics
- Sentry (crash reporting)
- Amplitude (user analytics)

### Marketing

1. **Social Media**:
   - Share launch announcement
   - Post feature highlights
   - Engage with users

2. **Website**:
   - Create landing page
   - Add download links
   - Include feature list

3. **App Store Optimization**:
   - Monitor keyword rankings
   - Update screenshots based on feedback
   - Respond to reviews

### Updates

**Version Planning**:
- v1.1: Bug fixes and performance improvements
- v1.2: New themes and customization
- v1.3: Cloud sync (premium)
- v2.0: AR calculator features

**Update Frequency**:
- Bug fixes: As needed
- Minor updates: Every 2-4 weeks
- Major updates: Every 3-6 months

### Support

**Support Channels**:
- Email: support@calcmaster.com
- Twitter/X: @CalcMasterApp
- GitHub Issues: For technical bugs

**Response Time**:
- Critical bugs: 24 hours
- General inquiries: 48-72 hours
- Feature requests: Weekly review

## Conclusion

Following this deployment guide ensures CalcMaster reaches users smoothly on both iOS and Android platforms. Regular updates and responsive support maintain a high-quality user experience.

**Next Steps**:
1. Complete pre-deployment checklist
2. Build and test release versions
3. Submit to app stores
4. Monitor for issues
5. Engage with users
6. Plan future updates

Good luck with your launch! 🚀

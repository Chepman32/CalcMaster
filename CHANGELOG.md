# Changelog

All notable changes to CalcMaster will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-10-25

### Added
- Initial release of CalcMaster
- Basic Calculator with standard arithmetic operations
- Scientific Calculator with advanced mathematical functions
  - Trigonometric functions (sin, cos, tan, asin, acos, atan)
  - Logarithmic functions (log, ln)
  - Power and root functions (x², x³, xʸ, √, ∛)
  - Mathematical constants (π, e)
  - Angle mode support (DEG, RAD, GRAD)
  - 2nd function toggle for inverse operations
- Programmer Calculator with number base conversions
  - Support for Binary, Octal, Decimal, Hexadecimal
  - Bitwise operations (AND, OR, XOR, NOT)
  - Bit shifting operations
  - Live conversion display for all bases
- Unit Converter with 10 categories
  - Length, Weight, Temperature
  - Area, Volume, Speed
  - Time, Energy, Pressure, Data
- Calculation History
  - Persistent history storage
  - Search functionality
  - Clear history option
  - History grouped by date
- Settings Screen
  - Theme toggle (Light/Dark)
  - Decimal places configuration
  - Thousand separators toggle
  - Haptic feedback settings
  - History limit configuration
- Animated Splash Screen
  - Mathematical formula animations
  - Smooth logo reveal
- Beautiful Animations
  - Spring-based button interactions
  - Smooth mode transitions
  - Result counting animations
  - Fade and slide effects
- Theme System
  - Complete light mode color palette
  - Complete dark mode color palette
  - Automatic theme persistence
- State Management
  - Zustand store with AsyncStorage
  - Automatic state persistence
  - History management
- Navigation
  - Bottom tab navigation
  - Smooth transitions between screens
  - Context-aware navigation theme

### Technical Details
- React Native 0.73.6
- React Native Reanimated 3.7.2 for animations
- React Native Skia 0.1.221 for graphics
- Zustand 4.5.1 for state management
- mathjs 12.4.0 for calculations
- TypeScript for type safety
- AsyncStorage for persistence
- React Navigation for routing

### Performance
- 60fps animations throughout
- Optimized calculation engine
- Lazy loading of screens
- Efficient state updates
- Minimal re-renders

### Accessibility
- VoiceOver/TalkBack ready
- High contrast support
- Descriptive labels on all buttons
- Keyboard navigation support

### Platform Support
- iOS 13.4+
- Android API 23+ (Android 6.0+)

## [Unreleased]

### Planned Features
- Graphing Calculator with Skia plotting
- Advanced gesture controls (swipe, pinch, long-press)
- Haptic feedback implementation
- Premium features with In-App Purchases
- Custom functions (Premium)
- Export history to PDF/CSV (Premium)
- Cloud sync (Premium)
- Apple Watch companion app
- Home screen widgets
- Siri shortcuts
- Equation camera recognition
- Handwriting input support

---

## Release Notes

### Version 1.0.0 - Initial Release

This is the first production-ready release of CalcMaster, a comprehensive scientific calculator app designed for iOS and Android.

**Highlights**:
- Three calculator modes in one app
- Beautiful, modern UI with smooth animations
- Comprehensive mathematical capabilities
- Full offline support
- Persistent history and settings
- Light and dark themes

**Known Limitations**:
- Graphing calculator not yet implemented (planned for v1.1)
- Gesture controls limited to basic swipes (enhanced gestures in v1.1)
- IAP system not yet integrated (coming in v1.2)

**Minimum Requirements**:
- iOS: iPhone/iPad running iOS 13.4 or later
- Android: Device running Android 6.0 (API 23) or later
- Storage: ~50MB

**First-Time Setup**:
1. Install the app
2. Launch to see animated splash screen
3. Default mode is Basic Calculator
4. Switch modes using the tabs at top
5. Access History, Converter, and Settings via bottom tabs
6. Customize theme in Settings

For detailed documentation, see [README.md](README.md) and [DEVELOPMENT.md](DEVELOPMENT.md).

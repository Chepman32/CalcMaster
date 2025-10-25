# CalcMaster - Scientific Calculator App

A production-ready, feature-rich scientific calculator built with React Native, featuring beautiful animations, comprehensive mathematical functions, and an intuitive gesture-driven interface.

## Features

### Calculator Modes
- **Basic Calculator**: Standard arithmetic operations with memory functions
- **Scientific Calculator**: Advanced functions including trigonometry, logarithms, powers, and constants
- **Programmer Calculator**: Binary, Octal, Decimal, Hexadecimal conversions with bitwise operations
- **Graphing Calculator** (Premium): Function plotting with advanced calculus features

### Core Features
- **Beautiful Animations**: Smooth 60fps animations using React Native Reanimated
- **Mathematical Expressions**: Full expression parsing with PEMDAS/BODMAS support
- **Calculation History**: Persistent history with search and export capabilities
- **Unit Converter**: 10 categories including length, weight, temperature, and more
- **Dark Mode**: Automatic theme switching with beautiful color palettes
- **Offline Support**: 100% offline functionality

### Advanced Capabilities
- Multiple angle modes (Degrees, Radians, Gradians)
- Number base conversions (Binary, Octal, Decimal, Hexadecimal)
- Bitwise operations (AND, OR, XOR, NOT, Shifts)
- Scientific notation for large/small numbers
- Customizable decimal places and display options
- Haptic feedback for enhanced user experience

## Technology Stack

- **Framework**: React Native 0.73+
- **Animations**: React Native Reanimated 3.x
- **Graphics**: React Native Skia
- **State Management**: Zustand with AsyncStorage persistence
- **Math Engine**: mathjs library
- **Navigation**: React Navigation
- **Language**: TypeScript

## Project Structure

```
/src
  /components
    /animated       - Animated UI components
    /display        - Display panel components
    /common         - Shared components
  /screens
    /splash         - Animated splash screen
    /calculator     - Calculator mode screens
    /history        - Calculation history
    /settings       - App settings
    /converter      - Unit converter
  /engine           - Calculation logic
  /utils            - Helper functions
  /constants        - Button layouts and constants
  /store            - Zustand state management
  /types            - TypeScript definitions
  /theme            - Color themes
```

## Installation

### Prerequisites
- Node.js >= 18
- React Native development environment setup
- iOS: Xcode and CocoaPods
- Android: Android Studio and SDK

### Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd CalcMaster
```

2. Install dependencies:
```bash
npm install
```

3. iOS setup:
```bash
cd ios
pod install
cd ..
```

4. Run the app:

**iOS:**
```bash
npm run ios
```

**Android:**
```bash
npm run android
```

## Usage

### Basic Calculator
- Tap numbers and operators to build expressions
- Use AC to clear, ← for backspace
- Press = to calculate result
- Swipe gestures on display for quick actions

### Scientific Calculator
- Toggle between DEG/RAD/GRAD modes
- Use 2nd button to access inverse functions
- Support for complex expressions with parentheses
- Constants: π (pi) and e (Euler's number)

### Programmer Calculator
- Switch between number bases (HEX, DEC, OCT, BIN)
- Live conversion display for all bases
- Bitwise operations (AND, OR, XOR, NOT)
- Bit shifting operations

### Unit Converter
- Select category (Length, Weight, Temperature, etc.)
- Choose from and to units
- Real-time conversion as you type
- Swap units with single tap

## Key Components

### CalculatorEngine
Core calculation logic using mathjs:
- Expression evaluation
- Function calculations (sin, cos, tan, log, etc.)
- Base conversions
- Bitwise operations

### State Management
Zustand store with persistence:
- Current calculation state
- History management
- User settings
- Theme preferences

### Animations
React Native Reanimated animations:
- Spring-based button interactions
- Smooth transitions between modes
- Result counting animations
- Gesture-driven interactions

## Configuration

### Settings
Users can customize:
- Theme (Light/Dark/Auto)
- Decimal places (0-15)
- Thousand separators
- Default angle mode
- Haptic feedback
- History limit

### Theme Customization
Edit `/src/theme/colors.ts` to customize color palettes.

## Development

### Run in development mode:
```bash
npm start
```

### Run tests:
```bash
npm test
```

### Lint code:
```bash
npm run lint
```

## Build for Production

### iOS:
```bash
cd ios
xcodebuild -workspace CalcMaster.xcworkspace -scheme CalcMaster -configuration Release
```

### Android:
```bash
cd android
./gradlew assembleRelease
```

## Premium Features

The app includes a freemium model with premium features:
- Graphing calculator with function plotting
- Unlimited calculation history
- Export history to PDF/CSV
- Custom functions
- Premium themes
- Advanced statistics

## Performance Optimization

- Lazy loading of screens
- Virtualized history list
- Optimized Reanimated worklets
- Efficient state updates
- Memory management for large calculations

## Accessibility

- Full VoiceOver/TalkBack support
- Dynamic type scaling
- High contrast mode
- Keyboard navigation
- ARIA labels on all interactive elements

## Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## Future Enhancements

- Apple Watch companion app
- Home screen widgets
- Siri shortcuts integration
- Equation recognition via camera
- Handwriting input
- Cloud sync for premium users
- Multi-window support for iPad

## License

MIT License - see LICENSE file for details

## Credits

- **Math Engine**: mathjs library
- **Animations**: React Native Reanimated
- **Graphics**: React Native Skia
- **Icons**: React Native Vector Icons

## Support

For issues, questions, or feature requests:
- Open an issue on GitHub
- Contact: support@calcmaster.app

## Version

Current Version: 1.0.0

---

**CalcMaster** - Calculate with Confidence

Built with ❤️ using React Native

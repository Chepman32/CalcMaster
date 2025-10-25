# CalcMaster - Development Guide

## Quick Start

### Prerequisites
- Node.js >= 18
- npm or yarn
- For iOS: macOS with Xcode 14+
- For Android: Android Studio with SDK 34

### Installation

1. **Clone and Install**
```bash
git clone <repository-url>
cd CalcMaster
npm install
```

2. **iOS Setup**
```bash
cd ios
pod install
cd ..
npm run ios
```

3. **Android Setup**
```bash
npm run android
```

## Project Architecture

### Core Technologies
- **React Native 0.73**: Cross-platform framework
- **TypeScript**: Type-safe development
- **Zustand**: State management with persistence
- **React Navigation**: Screen navigation
- **Reanimated 3**: 60fps animations
- **Skia**: Advanced graphics rendering
- **mathjs**: Mathematical computation engine

### Folder Structure

```
src/
├── components/          # Reusable UI components
│   ├── animated/        # Animated components (buttons, transitions)
│   ├── display/         # Display panel components
│   └── common/          # Shared components
├── screens/             # Screen components
│   ├── splash/          # Animated splash screen
│   ├── calculator/      # Calculator modes (Basic, Scientific, Programmer)
│   ├── history/         # Calculation history
│   ├── settings/        # App settings
│   └── converter/       # Unit converter
├── engine/              # Calculation logic
│   └── calculator.ts    # Math engine using mathjs
├── store/               # State management
│   └── calculatorStore.ts  # Zustand store with persistence
├── theme/               # Theme system
│   ├── colors.ts        # Light/Dark color palettes
│   └── index.ts         # Theme utilities
├── types/               # TypeScript definitions
│   └── index.ts         # Type definitions
├── utils/               # Helper utilities
│   ├── conversions.ts   # Unit conversion logic
│   └── formatters.ts    # Number and date formatters
├── constants/           # App constants
│   └── calculatorLayouts.ts  # Button layouts for each mode
└── App.tsx              # Main app component
```

## Key Components

### 1. CalculatorEngine (`src/engine/calculator.ts`)

The core calculation engine using mathjs:

```typescript
import { calculatorEngine } from './engine/calculator';

// Basic calculations
calculatorEngine.evaluate('2 + 2 * 3'); // Returns '8'

// Scientific functions
calculatorEngine.setAngleMode('deg');
calculatorEngine.evaluateFunction('sin', 90); // Returns 1

// Base conversions
calculatorEngine.convertBase('FF', 'hex', 'dec'); // Returns '255'
```

### 2. State Management (`src/store/calculatorStore.ts`)

Zustand store with AsyncStorage persistence:

```typescript
import { useCalculatorStore } from './store/calculatorStore';

// In component
const { currentInput, appendInput, calculate } = useCalculatorStore();

// Update state
appendInput('5');
calculate();
```

State structure:
- Current calculation state (input, operator, result)
- Calculator mode (basic, scientific, programmer)
- Calculation history
- User settings
- Theme preference

### 3. Animated Components

#### CalculatorButton (`src/components/animated/CalculatorButton.tsx`)

Spring-based button with haptic feedback:

```typescript
<CalculatorButton
  config={{ label: '5', value: '5', type: 'number' }}
  onPress={(value) => handlePress(value)}
/>
```

Features:
- Spring animation on press (scale to 0.95)
- Color-coded by type (number, operator, function, special)
- Haptic feedback integration ready
- Shadow effects for depth

#### DisplayPanel (`src/components/display/DisplayPanel.tsx`)

Animated display with equation rendering:

```typescript
<DisplayPanel />
```

Features:
- Live equation display
- Result preview
- Horizontal scrolling for long expressions
- Fade animations for updates
- Thousand separator formatting

## Calculator Modes

### Basic Calculator

**Location**: `src/screens/calculator/BasicCalculator.tsx`

**Features**:
- Standard arithmetic (+, −, ×, ÷)
- Percentage calculations
- Sign negation
- Clear and backspace

**Button Layout**: 4×5 grid (defined in `src/constants/calculatorLayouts.ts`)

### Scientific Calculator

**Location**: `src/screens/calculator/ScientificCalculator.tsx`

**Features**:
- Trigonometric functions (sin, cos, tan + inverses)
- Logarithms (log, ln)
- Powers and roots (x², x³, xʸ, √, ∛)
- Constants (π, e)
- Parentheses for complex expressions
- Angle mode toggle (DEG/RAD/GRAD)
- 2nd function mode

**Advanced Usage**:
```typescript
// Angle mode affects trig functions
setAngleMode('rad');
sin(π/2) // Returns 1

// 2nd mode enables inverse functions
toggle2ndMode();
// sin button becomes asin
```

### Programmer Calculator

**Location**: `src/screens/calculator/ProgrammerCalculator.tsx`

**Features**:
- Number bases: Binary, Octal, Decimal, Hexadecimal
- Live conversion display for all bases
- Bitwise operations (AND, OR, XOR, NOT)
- Bit shifting (<< >>)
- Word size selection (8, 16, 32, 64 bit)

**Usage**:
```typescript
// Convert between bases
convertBase('1010', 'bin', 'hex'); // Returns 'A'

// Bitwise operations
bitwiseAnd(0b1100, 0b1010); // Returns 0b1000 (8)
```

## Unit Converter

**Location**: `src/screens/converter/UnitConverter.tsx`

**Categories**:
1. Length (mm, cm, m, km, in, ft, yd, mi)
2. Weight (mg, g, kg, oz, lb, ton)
3. Temperature (°C, °F, K)
4. Area (m², ft², acre, hectare)
5. Volume (ml, L, gal, qt, pt)
6. Speed (m/s, km/h, mph, knots)
7. Time (s, min, hr, day, week, year)
8. Energy (J, kJ, cal, kcal, Wh, kWh)
9. Pressure (Pa, bar, psi, atm)
10. Data (bit, byte, KB, MB, GB, TB)

**Conversion Logic** (`src/utils/conversions.ts`):
```typescript
import { convert, conversionUnits } from './utils/conversions';

const lengthUnits = conversionUnits.length;
convert(1, lengthUnits[2], lengthUnits[3]); // 1m to km = 0.001
```

## Theme System

**Light & Dark Themes** (`src/theme/colors.ts`):

```typescript
import { getTheme } from './theme';
import { useCalculatorStore } from './store/calculatorStore';

const isDarkMode = useCalculatorStore(state => state.isDarkMode);
const theme = getTheme(isDarkMode);

// Use theme colors
<View style={{ backgroundColor: theme.background }}>
  <Text style={{ color: theme.textPrimary }}>Hello</Text>
</View>
```

**Theme Colors**:
- Primary: Action colors
- Secondary: Operators
- Success: Equals button
- Danger: Clear button
- Accent: Special functions
- Background: Screen background
- Display backgrounds
- Button backgrounds (by type)

## Animation Guidelines

### Using Reanimated

**Button Press Animation**:
```typescript
const scale = useSharedValue(1);

const animatedStyle = useAnimatedStyle(() => ({
  transform: [{ scale: scale.value }],
}));

const handlePress = () => {
  scale.value = withSpring(0.95);
  setTimeout(() => {
    scale.value = withSpring(1);
  }, 100);
};
```

**Layout Transitions**:
```typescript
import { Layout, FadeIn, FadeOut } from 'react-native-reanimated';

<Animated.View
  entering={FadeIn}
  exiting={FadeOut}
  layout={Layout.springify()}
>
```

### Performance Tips

1. **Use worklets for animations**:
```typescript
const animatedValue = useSharedValue(0);
// Runs on UI thread
const style = useAnimatedStyle(() => {
  'worklet';
  return { opacity: animatedValue.value };
});
```

2. **Avoid re-renders**:
- Use Zustand selectors
- Memoize components
- Use React.memo for static components

3. **Optimize calculations**:
- Cache results when possible
- Debounce expensive operations
- Use Web Workers for heavy computation (future)

## State Management Best Practices

### Zustand Store Structure

```typescript
// Good: Granular selectors
const currentInput = useCalculatorStore(state => state.currentInput);
const appendInput = useCalculatorStore(state => state.appendInput);

// Avoid: Selecting entire state
const store = useCalculatorStore(); // Re-renders on any change
```

### Persistence

State is automatically persisted to AsyncStorage:
- Calculation history
- User settings
- Theme preference

**Manual Save**:
```typescript
useCalculatorStore.getState().saveState();
```

**Manual Load**:
```typescript
useCalculatorStore.getState().loadPersistedState();
```

## Testing

### Run Tests
```bash
npm test
```

### Test Structure
```
__tests__/
├── engine/
│   └── calculator.test.ts
├── components/
│   └── CalculatorButton.test.tsx
└── utils/
    └── conversions.test.ts
```

### Example Test
```typescript
import { calculatorEngine } from '../src/engine/calculator';

describe('CalculatorEngine', () => {
  it('should evaluate basic expressions', () => {
    expect(calculatorEngine.evaluate('2 + 2')).toBe('4');
  });

  it('should handle order of operations', () => {
    expect(calculatorEngine.evaluate('2 + 2 * 3')).toBe('8');
  });
});
```

## Debugging

### React Native Debugger

1. Install React Native Debugger
2. Run app in dev mode
3. Press `Cmd+D` (iOS) or `Cmd+M` (Android)
4. Select "Debug"

### Flipper

Flipper is configured for:
- Network inspection
- AsyncStorage viewer
- Layout inspector
- Performance monitoring

### Logging

```typescript
// Development logging
if (__DEV__) {
  console.log('Current input:', currentInput);
}

// Store debugging
console.log(useCalculatorStore.getState());
```

## Common Issues

### iOS Build Errors

**Pod install fails**:
```bash
cd ios
pod deintegrate
pod install
```

**Xcode build fails**:
- Clean build folder (Cmd+Shift+K)
- Delete DerivedData
- Restart Xcode

### Android Build Errors

**Gradle issues**:
```bash
cd android
./gradlew clean
cd ..
```

**Metro bundler cache**:
```bash
npm start -- --reset-cache
```

## Contributing

### Code Style

Follow the project's ESLint and Prettier configuration:

```bash
# Check linting
npm run lint

# Format code
npm run format
```

### Commit Guidelines

Use conventional commits:
```
feat: Add graphing calculator
fix: Resolve calculation precision issue
docs: Update README
style: Format code
refactor: Simplify state management
test: Add unit tests for converter
```

### Pull Request Process

1. Create feature branch
2. Implement changes
3. Add tests
4. Update documentation
5. Submit PR with description

## Roadmap

### Phase 1 (Current)
- ✅ Basic Calculator
- ✅ Scientific Calculator
- ✅ Programmer Calculator
- ✅ Unit Converter
- ✅ History
- ✅ Settings
- ✅ Themes

### Phase 2 (Future)
- [ ] Graphing Calculator with Skia
- [ ] Advanced gesture controls
- [ ] Haptic feedback
- [ ] Custom functions (Premium)
- [ ] In-App Purchases
- [ ] Cloud sync (Premium)

### Phase 3 (Future)
- [ ] Apple Watch app
- [ ] Widgets
- [ ] Siri shortcuts
- [ ] Equation camera recognition
- [ ] Handwriting input

## Resources

- [React Native Docs](https://reactnative.dev)
- [Reanimated Docs](https://docs.swmansion.com/react-native-reanimated/)
- [Zustand Docs](https://docs.pmnd.rs/zustand)
- [mathjs Docs](https://mathjs.org/docs/)
- [React Navigation](https://reactnavigation.org/)

## Support

For issues or questions:
- GitHub Issues: [Repository Issues]
- Documentation: See README.md
- Email: dev@calcmaster.app

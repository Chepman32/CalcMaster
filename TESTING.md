# CalcMaster - Testing Guide

## Table of Contents
1. [Testing Strategy](#testing-strategy)
2. [Unit Tests](#unit-tests)
3. [Integration Tests](#integration-tests)
4. [Manual Testing](#manual-testing)
5. [Accessibility Testing](#accessibility-testing)
6. [Performance Testing](#performance-testing)
7. [Device Testing](#device-testing)

## Testing Strategy

CalcMaster uses a comprehensive testing approach to ensure reliability and quality across all features.

### Test Pyramid
- **Unit Tests** (70%): Test individual functions and components
- **Integration Tests** (20%): Test feature interactions
- **E2E Tests** (10%): Test complete user flows

### Testing Tools
- **Jest**: Unit and integration testing
- **React Native Testing Library**: Component testing
- **Detox** (Optional): E2E testing on devices

## Unit Tests

### Calculator Engine Tests

Create `/CalcMaster/__tests__/engine/calculator.test.ts`:

```typescript
import { calculatorEngine } from '../../src/engine/calculator';

describe('CalculatorEngine', () => {
  describe('Basic Operations', () => {
    test('should add numbers correctly', () => {
      expect(calculatorEngine.evaluate('2 + 2')).toBe('4');
      expect(calculatorEngine.evaluate('10 + 5.5')).toBe('15.5');
    });

    test('should subtract numbers correctly', () => {
      expect(calculatorEngine.evaluate('10 - 3')).toBe('7');
      expect(calculatorEngine.evaluate('5.5 - 2.2')).toBe('3.3');
    });

    test('should multiply numbers correctly', () => {
      expect(calculatorEngine.evaluate('3 * 4')).toBe('12');
      expect(calculatorEngine.evaluate('2.5 * 2')).toBe('5');
    });

    test('should divide numbers correctly', () => {
      expect(calculatorEngine.evaluate('10 / 2')).toBe('5');
      expect(calculatorEngine.evaluate('7 / 2')).toBe('3.5');
    });

    test('should handle division by zero', () => {
      expect(() => calculatorEngine.evaluate('5 / 0')).toThrow();
    });
  });

  describe('Order of Operations', () => {
    test('should follow PEMDAS', () => {
      expect(calculatorEngine.evaluate('2 + 2 * 3')).toBe('8');
      expect(calculatorEngine.evaluate('(2 + 2) * 3')).toBe('12');
      expect(calculatorEngine.evaluate('10 - 2 * 3')).toBe('4');
    });

    test('should handle nested parentheses', () => {
      expect(calculatorEngine.evaluate('((2 + 3) * 4) - 1')).toBe('19');
    });
  });

  describe('Scientific Functions', () => {
    beforeEach(() => {
      calculatorEngine.setAngleMode('deg');
    });

    test('should calculate trigonometric functions', () => {
      expect(calculatorEngine.evaluateFunction('sin', 0)).toBeCloseTo(0);
      expect(calculatorEngine.evaluateFunction('sin', 90)).toBeCloseTo(1);
      expect(calculatorEngine.evaluateFunction('cos', 0)).toBeCloseTo(1);
      expect(calculatorEngine.evaluateFunction('cos', 90)).toBeCloseTo(0);
    });

    test('should calculate logarithms', () => {
      expect(calculatorEngine.evaluateFunction('log10', 100)).toBeCloseTo(2);
      expect(calculatorEngine.evaluateFunction('log', Math.E)).toBeCloseTo(1);
    });

    test('should calculate powers and roots', () => {
      expect(calculatorEngine.evaluateFunction('square', 5)).toBe(25);
      expect(calculatorEngine.evaluateFunction('cube', 3)).toBe(27);
      expect(calculatorEngine.evaluateFunction('sqrt', 16)).toBe(4);
    });
  });

  describe('Base Conversions', () => {
    test('should convert binary to decimal', () => {
      expect(calculatorEngine.convertBase('1010', 'bin', 'dec')).toBe('10');
    });

    test('should convert decimal to hexadecimal', () => {
      expect(calculatorEngine.convertBase('255', 'dec', 'hex')).toBe('FF');
    });

    test('should convert hexadecimal to binary', () => {
      expect(calculatorEngine.convertBase('F', 'hex', 'bin')).toBe('1111');
    });
  });

  describe('Bitwise Operations', () => {
    test('should perform AND operation', () => {
      expect(calculatorEngine.bitwiseAnd(0b1100, 0b1010)).toBe(0b1000);
    });

    test('should perform OR operation', () => {
      expect(calculatorEngine.bitwiseOr(0b1100, 0b1010)).toBe(0b1110);
    });

    test('should perform XOR operation', () => {
      expect(calculatorEngine.bitwiseXor(0b1100, 0b1010)).toBe(0b0110);
    });

    test('should perform NOT operation', () => {
      const result = calculatorEngine.bitwiseNot(0b1010, 8);
      expect(result).toBe(0b11110101);
    });
  });
});
```

### Conversion Tests

Create `/__tests__/utils/conversions.test.ts`:

```typescript
import { convert, conversionUnits } from '../../src/utils/conversions';

describe('Unit Conversions', () => {
  describe('Length Conversions', () => {
    const units = conversionUnits.length;
    const meter = units.find(u => u.symbol === 'm')!;
    const kilometer = units.find(u => u.symbol === 'km')!;
    const mile = units.find(u => u.symbol === 'mi')!;

    test('should convert meters to kilometers', () => {
      expect(convert(1000, meter, kilometer)).toBeCloseTo(1);
    });

    test('should convert kilometers to meters', () => {
      expect(convert(1, kilometer, meter)).toBeCloseTo(1000);
    });

    test('should convert miles to kilometers', () => {
      expect(convert(1, mile, kilometer)).toBeCloseTo(1.60934, 2);
    });
  });

  describe('Temperature Conversions', () => {
    const units = conversionUnits.temperature;
    const celsius = units.find(u => u.symbol === '°C')!;
    const fahrenheit = units.find(u => u.symbol === '°F')!;
    const kelvin = units.find(u => u.symbol === 'K')!;

    test('should convert Celsius to Fahrenheit', () => {
      expect(convert(0, celsius, fahrenheit)).toBeCloseTo(32);
      expect(convert(100, celsius, fahrenheit)).toBeCloseTo(212);
    });

    test('should convert Fahrenheit to Celsius', () => {
      expect(convert(32, fahrenheit, celsius)).toBeCloseTo(0);
      expect(convert(212, fahrenheit, celsius)).toBeCloseTo(100);
    });

    test('should convert Celsius to Kelvin', () => {
      expect(convert(0, celsius, kelvin)).toBeCloseTo(273.15);
    });
  });
});
```

### Component Tests

Create `/__tests__/components/CalculatorButton.test.tsx`:

```typescript
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { CalculatorButton } from '../../src/components/animated/CalculatorButton';

// Mock Reanimated
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

describe('CalculatorButton', () => {
  const mockOnPress = jest.fn();

  beforeEach(() => {
    mockOnPress.mockClear();
  });

  test('should render button with correct label', () => {
    const config = { label: '5', value: '5', type: 'number' as const };
    const { getByText } = render(
      <CalculatorButton config={config} onPress={mockOnPress} />
    );

    expect(getByText('5')).toBeTruthy();
  });

  test('should call onPress with correct value', () => {
    const config = { label: '5', value: '5', type: 'number' as const };
    const { getByText } = render(
      <CalculatorButton config={config} onPress={mockOnPress} />
    );

    fireEvent.press(getByText('5'));
    expect(mockOnPress).toHaveBeenCalledWith('5');
  });

  test('should have accessibility label', () => {
    const config = { label: '+', value: '+', type: 'operator' as const };
    const { getByLabelText } = render(
      <CalculatorButton config={config} onPress={mockOnPress} />
    );

    expect(getByLabelText(/\+ operator/)).toBeTruthy();
  });
});
```

## Integration Tests

### Calculator Flow Tests

```typescript
import { useCalculatorStore } from '../../src/store/calculatorStore';

describe('Calculator Integration', () => {
  beforeEach(() => {
    // Reset store
    useCalculatorStore.setState({
      currentInput: '0',
      previousInput: '',
      currentOperator: null,
      result: '0',
    });
  });

  test('should perform complete calculation', () => {
    const store = useCalculatorStore.getState();

    // Enter 2
    store.appendInput('2');
    expect(store.currentInput).toBe('2');

    // Press +
    store.setOperator('+');

    // Enter 3
    store.appendInput('3');
    expect(store.currentInput).toBe('3');

    // Press =
    store.calculate();
    expect(store.result).toBe('5');
  });

  test('should save calculation to history', () => {
    const store = useCalculatorStore.getState();

    store.appendInput('5');
    store.setOperator('*');
    store.appendInput('3');
    store.calculate();

    expect(store.history.length).toBeGreaterThan(0);
    expect(store.history[0].result).toBe('15');
  });
});
```

## Manual Testing

### Calculator Modes Testing

#### Basic Calculator
- [ ] Test all number inputs (0-9)
- [ ] Test all operators (+, −, ×, ÷)
- [ ] Test percentage calculations
- [ ] Test sign negation (+/−)
- [ ] Test decimal point
- [ ] Test clear (AC) and backspace
- [ ] Test equals (=)
- [ ] Verify proper order of operations

#### Scientific Calculator
- [ ] Test trigonometric functions (sin, cos, tan)
- [ ] Test inverse trig functions (asin, acos, atan)
- [ ] Test logarithms (log, ln)
- [ ] Test powers (x², x³, xʸ)
- [ ] Test roots (√, ∛)
- [ ] Test constants (π, e)
- [ ] Test parentheses
- [ ] Verify angle mode (DEG/RAD/GRAD) affects calculations
- [ ] Test 2nd function toggle

#### Programmer Calculator
- [ ] Test number input in different bases
- [ ] Verify base conversions (BIN, OCT, DEC, HEX)
- [ ] Test hex letter inputs (A-F)
- [ ] Test bitwise operations (AND, OR, XOR, NOT)
- [ ] Test bit shifting (<<, >>)
- [ ] Verify live conversion display

### Features Testing

#### History
- [ ] Verify calculations are saved
- [ ] Test search functionality
- [ ] Test clear history
- [ ] Verify date grouping
- [ ] Test reusing calculations from history

#### Unit Converter
- [ ] Test all 10 categories
- [ ] Verify conversions are accurate
- [ ] Test swap functionality
- [ ] Test real-time conversion updates

#### Settings
- [ ] Test theme toggle
- [ ] Test haptic feedback toggle
- [ ] Test decimal places configuration
- [ ] Test thousand separators toggle
- [ ] Verify settings persist

#### Graphing Calculator
- [ ] Test function plotting
- [ ] Test multiple functions
- [ ] Test zoom in/out
- [ ] Test trace mode
- [ ] Test function visibility toggle
- [ ] Verify premium lock for non-premium users

### Gestures Testing

- [ ] Swipe left on display (backspace)
- [ ] Swipe right on display (clear)
- [ ] Two-finger swipe down (clear all)
- [ ] Long-press display (copy)
- [ ] Pinch display (zoom)

### Haptic Feedback Testing

- [ ] Verify light haptic for number presses
- [ ] Verify medium haptic for operators
- [ ] Verify heavy haptic for equals
- [ ] Verify warning haptic for clear
- [ ] Test haptic enable/disable in settings

## Accessibility Testing

### VoiceOver/TalkBack Testing

- [ ] Enable VoiceOver (iOS) or TalkBack (Android)
- [ ] Navigate through all buttons
- [ ] Verify all buttons have descriptive labels
- [ ] Test calculator operation using voice
- [ ] Verify results are announced
- [ ] Test navigation between screens

### Dynamic Type

- [ ] Change system font size to smallest
- [ ] Verify UI adapts correctly
- [ ] Change system font size to largest
- [ ] Verify all text remains readable

### Color Contrast

- [ ] Enable high contrast mode
- [ ] Verify all text meets WCAG AA standards
- [ ] Test both light and dark themes

## Performance Testing

### Animation Performance

- [ ] Monitor frame rate during button presses (target: 60fps)
- [ ] Test splash screen animation (should be smooth)
- [ ] Test mode switching animations
- [ ] Test display updates with long numbers

### Calculation Performance

- [ ] Test with very large numbers (10^100)
- [ ] Test with very small numbers (10^-100)
- [ ] Test complex expressions (multiple parentheses)
- [ ] Test rapid button presses

### Memory Testing

- [ ] Create 1000+ history items
- [ ] Monitor memory usage
- [ ] Verify no memory leaks

## Device Testing

### iOS Testing

**Minimum Supported**: iOS 13.4

Test Devices:
- [ ] iPhone SE (small screen)
- [ ] iPhone 14/15 (standard)
- [ ] iPhone 14 Pro Max (large screen)
- [ ] iPad (tablet layout)

### Android Testing

**Minimum Supported**: Android 6.0 (API 23)

Test Devices:
- [ ] Android 6.0 device
- [ ] Android 10+ device
- [ ] Various screen sizes (small, normal, large)
- [ ] Different Android manufacturers (Samsung, Google, etc.)

### Edge Cases

- [ ] Test on devices with notches
- [ ] Test landscape orientation
- [ ] Test with system animations disabled
- [ ] Test with low battery mode
- [ ] Test with poor network (for future cloud features)

## Regression Testing Checklist

After any code changes, run through this checklist:

- [ ] Basic arithmetic still works
- [ ] Scientific functions still accurate
- [ ] Programmer mode conversions correct
- [ ] History saves and loads
- [ ] Settings persist
- [ ] Theme switching works
- [ ] Gestures still functional
- [ ] Haptics still trigger
- [ ] No console errors
- [ ] No crashes during normal usage

## Test Automation

### Run All Tests

```bash
# Unit tests
npm test

# Test with coverage
npm test -- --coverage

# Watch mode for development
npm test -- --watch
```

### CI/CD Integration

Add to `.github/workflows/test.yml`:

```yaml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      - name: Install dependencies
        run: npm install
      - name: Run tests
        run: npm test -- --coverage
      - name: Upload coverage
        uses: codecov/codecov-action@v2
```

## Bug Reporting Template

When reporting bugs during testing:

```markdown
**Environment:**
- Device: [iPhone 15 / Samsung Galaxy S21]
- OS Version: [iOS 17 / Android 13]
- App Version: [1.0.0]

**Steps to Reproduce:**
1. Open calculator
2. Enter "2 + 2"
3. Press equals

**Expected Result:**
Should display "4"

**Actual Result:**
Displays "5"

**Screenshots:**
[Attach if applicable]

**Additional Context:**
[Any other relevant information]
```

## Test Coverage Goals

- **Overall**: >80%
- **Critical paths** (calculations): >95%
- **UI components**: >70%
- **Utilities**: >90%

## Conclusion

Thorough testing ensures CalcMaster delivers a reliable, accessible, and performant experience across all devices and use cases. Regular testing during development and before releases maintains high quality standards.

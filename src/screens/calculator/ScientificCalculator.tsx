import React from 'react';
import { View, StyleSheet, SafeAreaView, Text, TouchableOpacity } from 'react-native';
import { DisplayPanel } from '../../components/display/DisplayPanel';
import { ButtonGrid } from '../../components/common/ButtonGrid';
import { scientificLayout } from '../../constants/calculatorLayouts';
import { useCalculatorStore } from '../../store/calculatorStore';
import { getTheme } from '../../theme';
import { calculatorEngine } from '../../engine/calculator';

export const ScientificCalculator: React.FC = () => {
  const {
    currentInput,
    appendInput,
    setOperator,
    calculate,
    clear,
    backspace,
    isDarkMode,
    angleMode,
    setAngleMode,
    is2ndMode,
    toggle2ndMode,
  } = useCalculatorStore();

  const theme = getTheme(isDarkMode);

  const handleButtonPress = (value: string) => {
    if (value === '2nd') {
      toggle2ndMode();
      return;
    }

    // Handle scientific functions
    const scientificFunctions = ['sin', 'cos', 'tan', 'asin', 'acos', 'atan', 'log10', 'log', 'sqrt', 'cbrt', 'square', 'cube'];

    if (scientificFunctions.includes(value)) {
      try {
        calculatorEngine.setAngleMode(angleMode);
        const currentValue = parseFloat(currentInput);
        const result = calculatorEngine.evaluateFunction(value, currentValue);
        useCalculatorStore.setState({ currentInput: result.toString() });
      } catch (error) {
        useCalculatorStore.setState({ currentInput: 'Error' });
      }
      return;
    }

    switch (value) {
      case 'clear':
        clear();
        break;
      case 'backspace':
        backspace();
        break;
      case 'equals':
        calculate();
        break;
      case '+':
      case '-':
      case '*':
      case '/':
        setOperator(value);
        break;
      case 'pi':
        useCalculatorStore.setState({ currentInput: Math.PI.toString() });
        break;
      case 'e':
        useCalculatorStore.setState({ currentInput: Math.E.toString() });
        break;
      case 'negate':
        if (currentInput !== '0') {
          const negated = (parseFloat(currentInput) * -1).toString();
          useCalculatorStore.setState({ currentInput: negated });
        }
        break;
      case 'percent':
        const percentage = parseFloat(currentInput) / 100;
        useCalculatorStore.setState({ currentInput: percentage.toString() });
        break;
      case 'pow':
        appendInput('^');
        break;
      case '(':
      case ')':
        appendInput(value);
        break;
      default:
        appendInput(value);
        break;
    }

    // Reset 2nd mode after function use
    if (is2ndMode && value !== '2nd') {
      toggle2ndMode();
    }
  };

  const cycleAngleMode = () => {
    const modes: Array<'deg' | 'rad' | 'grad'> = ['deg', 'rad', 'grad'];
    const currentIndex = modes.indexOf(angleMode);
    const nextIndex = (currentIndex + 1) % modes.length;
    setAngleMode(modes[nextIndex]);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <TouchableOpacity
          style={[styles.angleModeButton, { backgroundColor: theme.accent }]}
          onPress={cycleAngleMode}
        >
          <Text style={styles.angleModeText}>{angleMode.toUpperCase()}</Text>
        </TouchableOpacity>
      </View>
      <DisplayPanel />
      <ButtonGrid layout={scientificLayout} onButtonPress={handleButtonPress} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 10,
  },
  angleModeButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  angleModeText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});

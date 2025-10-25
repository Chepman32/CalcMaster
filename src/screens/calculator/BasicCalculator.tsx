import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { DisplayPanel } from '../../components/display/DisplayPanel';
import { ButtonGrid } from '../../components/common/ButtonGrid';
import { basicLayout } from '../../constants/calculatorLayouts';
import { useCalculatorStore } from '../../store/calculatorStore';
import { getTheme } from '../../theme';
import { calculatorEngine } from '../../engine/calculator';

export const BasicCalculator: React.FC = () => {
  const {
    currentInput,
    appendInput,
    setOperator,
    calculate,
    clear,
    backspace,
    isDarkMode,
  } = useCalculatorStore();

  const theme = getTheme(isDarkMode);

  const handleButtonPress = (value: string) => {
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
      default:
        appendInput(value);
        break;
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <DisplayPanel />
      <ButtonGrid layout={basicLayout} onButtonPress={handleButtonPress} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

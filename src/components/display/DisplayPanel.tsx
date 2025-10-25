import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Animated, {
  FadeInDown,
  FadeOutUp,
} from 'react-native-reanimated';
import { useCalculatorStore } from '../../store/calculatorStore';
import { getTheme } from '../../theme';
import { formatNumberWithSeparators } from '../../utils/formatters';

export const DisplayPanel: React.FC = () => {
  const currentInput = useCalculatorStore((state) => state.currentInput);
  const previousInput = useCalculatorStore((state) => state.previousInput);
  const currentOperator = useCalculatorStore((state) => state.currentOperator);
  const result = useCalculatorStore((state) => state.result);
  const isDarkMode = useCalculatorStore((state) => state.isDarkMode);
  const settings = useCalculatorStore((state) => state.settings);

  const theme = getTheme(isDarkMode);

  const displayEquation = previousInput && currentOperator
    ? `${previousInput} ${currentOperator}`
    : '';

  const formattedInput = formatNumberWithSeparators(
    currentInput,
    settings.thousandSeparators
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.displayBg }]}>
      {/* Previous equation line */}
      {displayEquation && (
        <Animated.View entering={FadeInDown} exiting={FadeOutUp}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <Text style={[styles.equationText, { color: theme.textSecondary }]}>
              {displayEquation}
            </Text>
          </ScrollView>
        </Animated.View>
      )}

      {/* Main display */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Animated.Text
          key={currentInput}
          entering={FadeInDown}
          style={[styles.displayText, { color: theme.textPrimary }]}
        >
          {formattedInput}
        </Animated.Text>
      </ScrollView>

      {/* Result preview (if different from current input) */}
      {result !== currentInput && result !== '0' && (
        <Animated.View entering={FadeInDown}>
          <Text style={[styles.resultPreview, { color: theme.textSecondary }]}>
            = {formatNumberWithSeparators(result, settings.thousandSeparators)}
          </Text>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 40,
    minHeight: 180,
    justifyContent: 'flex-end',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  equationText: {
    fontSize: 20,
    marginBottom: 8,
    fontWeight: '400',
  },
  displayText: {
    fontSize: 56,
    fontWeight: '300',
    textAlign: 'right',
  },
  resultPreview: {
    fontSize: 24,
    marginTop: 8,
    textAlign: 'right',
    fontWeight: '300',
  },
});

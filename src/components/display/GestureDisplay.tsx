import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Animated, {
  FadeInDown,
  FadeOutUp,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { useCalculatorStore } from '../../store/calculatorStore';
import { getTheme } from '../../theme';
import { formatNumberWithSeparators } from '../../utils/formatters';
import { HapticService } from '../../utils/haptics';

export const GestureDisplay: React.FC = () => {
  const currentInput = useCalculatorStore((state) => state.currentInput);
  const previousInput = useCalculatorStore((state) => state.previousInput);
  const currentOperator = useCalculatorStore((state) => state.currentOperator);
  const result = useCalculatorStore((state) => state.result);
  const isDarkMode = useCalculatorStore((state) => state.isDarkMode);
  const settings = useCalculatorStore((state) => state.settings);
  const backspace = useCalculatorStore((state) => state.backspace);
  const clear = useCalculatorStore((state) => state.clear);

  const theme = getTheme(isDarkMode);
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const displayEquation = previousInput && currentOperator
    ? `${previousInput} ${currentOperator}`
    : '';

  const formattedInput = formatNumberWithSeparators(
    currentInput,
    settings.thousandSeparators
  );

  // Swipe left gesture - Backspace
  const swipeLeftGesture = Gesture.Fling()
    .direction(Gesture.FLING_LEFT)
    .onEnd(() => {
      runOnJS(HapticService.selection)();
      runOnJS(backspace)();
    });

  // Swipe right gesture - Clear
  const swipeRightGesture = Gesture.Fling()
    .direction(Gesture.FLING_RIGHT)
    .onEnd(() => {
      runOnJS(HapticService.clearPress)();
      runOnJS(clear)();
    });

  // Swipe down gesture - Clear all
  const swipeDownGesture = Gesture.Fling()
    .direction(Gesture.FLING_DOWN)
    .numberOfPointers(2)
    .onEnd(() => {
      runOnJS(HapticService.clearPress)();
      runOnJS(clear)();
    });

  // Long press gesture - Copy result
  const longPressGesture = Gesture.LongPress()
    .minDuration(500)
    .onStart(() => {
      scale.value = withSpring(0.98);
      runOnJS(HapticService.heavy)();
    })
    .onEnd(() => {
      scale.value = withSpring(1);
      // In a real app, this would copy to clipboard
      runOnJS(HapticService.success)();
      runOnJS(() => console.log('Copied:', currentInput))();
    });

  // Pinch gesture - Zoom display (visual feedback only)
  const pinchGesture = Gesture.Pinch()
    .onUpdate((event) => {
      scale.value = Math.max(0.8, Math.min(1.2, event.scale));
    })
    .onEnd(() => {
      scale.value = withSpring(1);
    });

  // Combine all gestures
  const composedGesture = Gesture.Simultaneous(
    swipeLeftGesture,
    swipeRightGesture,
    swipeDownGesture,
    longPressGesture,
    pinchGesture
  );

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <GestureDetector gesture={composedGesture}>
      <Animated.View style={[styles.container, { backgroundColor: theme.displayBg }, animatedStyle]}>
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

        {/* Result preview */}
        {result !== currentInput && result !== '0' && (
          <Animated.View entering={FadeInDown}>
            <Text style={[styles.resultPreview, { color: theme.textSecondary }]}>
              = {formatNumberWithSeparators(result, settings.thousandSeparators)}
            </Text>
          </Animated.View>
        )}

        {/* Gesture hints */}
        <View style={styles.hintsContainer}>
          <Text style={[styles.hintText, { color: theme.textSecondary }]}>
            ← Swipe left to delete • Swipe right to clear →
          </Text>
        </View>
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 40,
    minHeight: 200,
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
  hintsContainer: {
    marginTop: 8,
    alignItems: 'center',
  },
  hintText: {
    fontSize: 10,
    opacity: 0.6,
  },
});

import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { ButtonConfig } from '../../constants/calculatorLayouts';
import { useCalculatorStore } from '../../store/calculatorStore';
import { getTheme } from '../../theme';
import { HapticService } from '../../utils/haptics';

interface CalculatorButtonProps {
  config: ButtonConfig;
  onPress: (value: string) => void;
  style?: ViewStyle;
}

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export const CalculatorButton: React.FC<CalculatorButtonProps> = ({
  config,
  onPress,
  style,
}) => {
  const scale = useSharedValue(1);
  const isDarkMode = useCalculatorStore((state) => state.isDarkMode);
  const settings = useCalculatorStore((state) => state.settings);
  const theme = getTheme(isDarkMode);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.95, {
      damping: 15,
      stiffness: 150,
    });

    // Trigger haptic feedback based on button type
    if (settings.hapticEnabled) {
      switch (config.type) {
        case 'number':
          HapticService.numberPress();
          break;
        case 'operator':
          HapticService.operatorPress();
          break;
        case 'function':
          HapticService.functionPress();
          break;
        case 'special':
          if (config.value === 'equals') {
            HapticService.equalsPress();
          } else if (config.value === 'clear') {
            HapticService.clearPress();
          } else {
            HapticService.operatorPress();
          }
          break;
      }
    }
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, {
      damping: 15,
      stiffness: 150,
    });
  };

  const getButtonColor = () => {
    switch (config.type) {
      case 'number':
        return theme.numberButtons;
      case 'operator':
        return theme.operatorButtons;
      case 'function':
        return theme.functionButtons;
      case 'special':
        if (config.value === 'clear') return theme.danger;
        if (config.value === 'equals') return theme.success;
        return theme.accent;
      default:
        return theme.buttonBg;
    }
  };

  const getTextColor = () => {
    if (config.type === 'special') return '#FFFFFF';
    return theme.textPrimary;
  };

  return (
    <AnimatedTouchable
      style={[
        styles.button,
        {
          backgroundColor: getButtonColor(),
          borderColor: theme.border,
        },
        animatedStyle,
        style,
      ]}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={() => onPress(config.value)}
      activeOpacity={0.9}
      accessible={true}
      accessibilityLabel={`${config.label} ${config.type === 'operator' ? 'operator' : config.type === 'number' ? 'number' : 'function'}`}
      accessibilityRole="button"
      accessibilityHint={`Tap to input ${config.label}`}
    >
      <Text style={[styles.buttonText, { color: getTextColor() }]}>
        {config.label}
      </Text>
    </AnimatedTouchable>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    aspectRatio: 1,
    margin: 4,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: '600',
  },
});

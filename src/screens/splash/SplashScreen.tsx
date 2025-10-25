import React, { useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withSpring,
  Easing,
} from 'react-native-reanimated';
import { useCalculatorStore } from '../../store/calculatorStore';

interface SplashScreenProps {
  onFinish: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const loadPersistedState = useCalculatorStore((state) => state.loadPersistedState);

  const logoScale = useSharedValue(0);
  const logoOpacity = useSharedValue(0);
  const equationOpacity = useSharedValue(0);
  const equationY = useSharedValue(50);

  useEffect(() => {
    // Load persisted state
    loadPersistedState();

    // Start animations
    logoOpacity.value = withTiming(1, { duration: 500 });
    logoScale.value = withSpring(1, {
      damping: 8,
      stiffness: 100,
    });

    equationOpacity.value = withSequence(
      withTiming(1, { duration: 500, easing: Easing.ease }),
      withTiming(0, { duration: 300, easing: Easing.ease })
    );

    equationY.value = withTiming(-20, { duration: 1500, easing: Easing.ease });

    // Finish after 3 seconds
    const timer = setTimeout(() => {
      onFinish();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const logoAnimatedStyle = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
    transform: [{ scale: logoScale.value }],
  }));

  const equationAnimatedStyle = useAnimatedStyle(() => ({
    opacity: equationOpacity.value,
    transform: [{ translateY: equationY.value }],
  }));

  return (
    <View style={styles.container}>
      {/* Animated equations */}
      <Animated.View style={[styles.equationContainer, equationAnimatedStyle]}>
        <Text style={styles.equation}>E = mc²</Text>
        <Text style={styles.equation}>π = 3.14159...</Text>
        <Text style={styles.equation}>a² + b² = c²</Text>
      </Animated.View>

      {/* Logo */}
      <Animated.View style={[styles.logoContainer, logoAnimatedStyle]}>
        <View style={styles.logoBox}>
          <Text style={styles.logoText}>CM</Text>
        </View>
        <Text style={styles.appName}>CalcMaster</Text>
        <Text style={styles.tagline}>Calculate with Confidence</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  equationContainer: {
    position: 'absolute',
    alignItems: 'center',
  },
  equation: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 28,
    fontWeight: '300',
    marginVertical: 8,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logoBox: {
    width: 120,
    height: 120,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  logoText: {
    fontSize: 56,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  appName: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 24,
  },
  tagline: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: 8,
    fontWeight: '300',
  },
});

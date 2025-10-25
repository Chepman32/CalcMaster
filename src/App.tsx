import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';

// Screens
import { SplashScreen } from './screens/splash/SplashScreen';
import { MainCalculator } from './screens/calculator/MainCalculator';
import { GraphingCalculator } from './screens/graph/GraphingCalculator';
import { HistoryScreen } from './screens/history/HistoryScreen';
import { UnitConverter } from './screens/converter/UnitConverter';
import { SettingsScreen } from './screens/settings/SettingsScreen';
import { PremiumScreen } from './screens/premium/PremiumScreen';

// Store
import { useCalculatorStore } from './store/calculatorStore';
import { getTheme } from './theme';

const Tab = createBottomTabNavigator();

const App: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);
  const isDarkMode = useCalculatorStore((state) => state.isDarkMode);
  const theme = getTheme(isDarkMode);

  useEffect(() => {
    // Load persisted state on app start
    useCalculatorStore.getState().loadPersistedState();
  }, []);

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <NavigationContainer
        theme={{
          dark: isDarkMode,
          colors: {
            primary: theme.primary,
            background: theme.background,
            card: theme.displayBg,
            text: theme.textPrimary,
            border: theme.border,
            notification: theme.accent,
          },
        }}
      >
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarStyle: {
              backgroundColor: theme.displayBg,
              borderTopColor: theme.border,
            },
            tabBarActiveTintColor: theme.primary,
            tabBarInactiveTintColor: theme.textSecondary,
          }}
        >
          <Tab.Screen
            name="Calculator"
            component={MainCalculator}
            options={{
              tabBarLabel: 'Calculator',
              tabBarIcon: ({ color, size }) => (
                <TabIcon name="calculator" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Graph"
            component={GraphingCalculator}
            options={{
              tabBarLabel: 'Graph',
              tabBarIcon: ({ color, size }) => (
                <TabIcon name="graph" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="History"
            component={HistoryScreen}
            options={{
              tabBarLabel: 'History',
              tabBarIcon: ({ color, size }) => (
                <TabIcon name="history" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Converter"
            component={UnitConverter}
            options={{
              tabBarLabel: 'Converter',
              tabBarIcon: ({ color, size }) => (
                <TabIcon name="swap" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Premium"
            component={PremiumScreen}
            options={{
              tabBarLabel: 'Premium',
              tabBarIcon: ({ color, size }) => (
                <TabIcon name="premium" color={color} size={size} />
              ),
            }}
          />
          <Tab.Screen
            name="Settings"
            component={SettingsScreen}
            options={{
              tabBarLabel: 'Settings',
              tabBarIcon: ({ color, size }) => (
                <TabIcon name="settings" color={color} size={size} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

// Simple tab icon component (using text as placeholder)
const TabIcon: React.FC<{ name: string; color: string; size: number }> = ({
  name,
  color,
  size,
}) => {
  const { Text } = require('react-native');
  const icons: Record<string, string> = {
    calculator: '🔢',
    graph: '📊',
    history: '📋',
    swap: '🔄',
    premium: '⭐',
    settings: '⚙️',
  };

  return (
    <Text style={{ fontSize: size, color }}>
      {icons[name] || '•'}
    </Text>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;

import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { BasicCalculator } from './BasicCalculator';
import { ScientificCalculator } from './ScientificCalculator';
import { ProgrammerCalculator } from './ProgrammerCalculator';
import { useCalculatorStore } from '../../store/calculatorStore';
import { getTheme } from '../../theme';
import { CalculatorMode } from '../../types';

export const MainCalculator: React.FC = () => {
  const { mode, setMode, isDarkMode } = useCalculatorStore();
  const theme = getTheme(isDarkMode);

  const modes: { key: CalculatorMode; label: string }[] = [
    { key: 'basic', label: 'Basic' },
    { key: 'scientific', label: 'Scientific' },
    { key: 'programmer', label: 'Programmer' },
  ];

  const renderCalculator = () => {
    switch (mode) {
      case 'basic':
        return <BasicCalculator />;
      case 'scientific':
        return <ScientificCalculator />;
      case 'programmer':
        return <ProgrammerCalculator />;
      default:
        return <BasicCalculator />;
    }
  };

  return (
    <View style={styles.container}>
      {/* Mode selector */}
      <View style={[styles.modeSelector, { backgroundColor: theme.background, borderBottomColor: theme.border }]}>
        {modes.map((modeItem) => (
          <TouchableOpacity
            key={modeItem.key}
            style={[
              styles.modeButton,
              {
                backgroundColor: mode === modeItem.key ? theme.primary : 'transparent',
                borderColor: theme.border,
              },
            ]}
            onPress={() => setMode(modeItem.key)}
          >
            <Text
              style={[
                styles.modeText,
                { color: mode === modeItem.key ? '#FFFFFF' : theme.textPrimary },
              ]}
            >
              {modeItem.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Calculator */}
      {renderCalculator()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modeSelector: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    justifyContent: 'space-around',
    borderBottomWidth: 1,
  },
  modeButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  modeText: {
    fontSize: 14,
    fontWeight: '600',
  },
});

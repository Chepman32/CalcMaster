import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, Text, TouchableOpacity, ScrollView } from 'react-native';
import { ButtonGrid } from '../../components/common/ButtonGrid';
import { programmerLayout } from '../../constants/calculatorLayouts';
import { useCalculatorStore } from '../../store/calculatorStore';
import { getTheme } from '../../theme';
import { calculatorEngine } from '../../engine/calculator';
import { NumberBase } from '../../types';

export const ProgrammerCalculator: React.FC = () => {
  const { currentInput, appendInput, clear, backspace, isDarkMode, currentBase, setBase } = useCalculatorStore();
  const theme = getTheme(isDarkMode);

  const handleButtonPress = (value: string) => {
    switch (value) {
      case 'hex':
      case 'dec':
      case 'oct':
      case 'bin':
        setBase(value as NumberBase);
        break;
      case 'clear':
        clear();
        break;
      case 'backspace':
        backspace();
        break;
      case 'and':
      case 'or':
      case 'xor':
      case 'not':
      case 'lshift':
      case 'rshift':
        // Handle bitwise operations
        break;
      default:
        // Validate input based on current base
        if (isValidForBase(value, currentBase)) {
          appendInput(value);
        }
        break;
    }
  };

  const isValidForBase = (value: string, base: NumberBase): boolean => {
    switch (base) {
      case 'bin':
        return /^[01]$/.test(value);
      case 'oct':
        return /^[0-7]$/.test(value);
      case 'dec':
        return /^[0-9]$/.test(value);
      case 'hex':
        return /^[0-9A-F]$/i.test(value);
      default:
        return false;
    }
  };

  const convertToAllBases = (value: string, fromBase: NumberBase) => {
    try {
      return {
        hex: calculatorEngine.convertBase(value, fromBase, 'hex'),
        dec: calculatorEngine.convertBase(value, fromBase, 'dec'),
        oct: calculatorEngine.convertBase(value, fromBase, 'oct'),
        bin: calculatorEngine.convertBase(value, fromBase, 'bin'),
      };
    } catch {
      return { hex: '0', dec: '0', oct: '0', bin: '0' };
    }
  };

  const allBases = convertToAllBases(currentInput || '0', currentBase);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.displayContainer, { backgroundColor: theme.displayBg }]}>
        <DisplayRow
          label="HEX"
          value={allBases.hex}
          isActive={currentBase === 'hex'}
          theme={theme}
          onPress={() => setBase('hex')}
        />
        <DisplayRow
          label="DEC"
          value={allBases.dec}
          isActive={currentBase === 'dec'}
          theme={theme}
          onPress={() => setBase('dec')}
        />
        <DisplayRow
          label="OCT"
          value={allBases.oct}
          isActive={currentBase === 'oct'}
          theme={theme}
          onPress={() => setBase('oct')}
        />
        <DisplayRow
          label="BIN"
          value={allBases.bin}
          isActive={currentBase === 'bin'}
          theme={theme}
          onPress={() => setBase('bin')}
        />
      </View>
      <ButtonGrid layout={programmerLayout} onButtonPress={handleButtonPress} />
    </SafeAreaView>
  );
};

interface DisplayRowProps {
  label: string;
  value: string;
  isActive: boolean;
  theme: any;
  onPress: () => void;
}

const DisplayRow: React.FC<DisplayRowProps> = ({ label, value, isActive, theme, onPress }) => (
  <TouchableOpacity style={styles.displayRow} onPress={onPress}>
    <Text style={[styles.baseLabel, { color: isActive ? theme.primary : theme.textSecondary }]}>
      {label}
    </Text>
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <Text
        style={[
          styles.displayValue,
          {
            color: isActive ? theme.textPrimary : theme.textSecondary,
            fontWeight: isActive ? '600' : '400',
          },
        ]}
      >
        {value}
      </Text>
    </ScrollView>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  displayContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  displayRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  baseLabel: {
    fontSize: 16,
    fontWeight: '600',
    width: 50,
  },
  displayValue: {
    fontSize: 20,
    fontFamily: 'monospace',
  },
});

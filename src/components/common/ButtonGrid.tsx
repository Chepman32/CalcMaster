import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CalculatorButton } from '../animated/CalculatorButton';
import { ButtonConfig } from '../../constants/calculatorLayouts';

interface ButtonGridProps {
  layout: ButtonConfig[][];
  onButtonPress: (value: string) => void;
}

export const ButtonGrid: React.FC<ButtonGridProps> = ({ layout, onButtonPress }) => {
  return (
    <View style={styles.container}>
      {layout.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((button, colIndex) => (
            <CalculatorButton
              key={`${rowIndex}-${colIndex}`}
              config={button}
              onPress={onButtonPress}
              style={button.span ? { flex: button.span } : undefined}
            />
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
});

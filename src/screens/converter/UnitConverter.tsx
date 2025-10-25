import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useCalculatorStore } from '../../store/calculatorStore';
import { getTheme } from '../../theme';
import { ConversionCategory, conversionUnits, convert, UnitDefinition } from '../../utils/conversions';

export const UnitConverter: React.FC = () => {
  const isDarkMode = useCalculatorStore((state) => state.isDarkMode);
  const theme = getTheme(isDarkMode);

  const categories: ConversionCategory[] = ['length', 'weight', 'temperature', 'area', 'volume', 'speed', 'time', 'energy', 'pressure', 'data'];

  const [selectedCategory, setSelectedCategory] = useState<ConversionCategory>('length');
  const [fromValue, setFromValue] = useState('1');
  const [fromUnit, setFromUnit] = useState(conversionUnits.length[0]);
  const [toUnit, setToUnit] = useState(conversionUnits.length[1]);
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);

  const units = conversionUnits[selectedCategory];

  const handleCategoryChange = (category: ConversionCategory) => {
    setSelectedCategory(category);
    const newUnits = conversionUnits[category];
    setFromUnit(newUnits[0]);
    setToUnit(newUnits[1]);
  };

  const getConvertedValue = (): string => {
    try {
      const value = parseFloat(fromValue);
      if (isNaN(value)) return '0';
      const result = convert(value, fromUnit, toUnit);
      return result.toFixed(6).replace(/\.?0+$/, '');
    } catch {
      return 'Error';
    }
  };

  const swapUnits = () => {
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.textPrimary }]}>Unit Converter</Text>
      </View>

      {/* Category selector */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              {
                backgroundColor: selectedCategory === category ? theme.primary : theme.buttonBg,
                borderColor: theme.border,
              },
            ]}
            onPress={() => handleCategoryChange(category)}
          >
            <Text
              style={[
                styles.categoryText,
                { color: selectedCategory === category ? '#FFFFFF' : theme.textPrimary },
              ]}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* From unit */}
      <View style={[styles.conversionBox, { backgroundColor: theme.displayBg }]}>
        <TouchableOpacity
          style={styles.unitSelector}
          onPress={() => setShowFromPicker(!showFromPicker)}
        >
          <Text style={[styles.unitLabel, { color: theme.textSecondary }]}>From</Text>
          <Text style={[styles.unitName, { color: theme.primary }]}>
            {fromUnit.name} ({fromUnit.symbol})
          </Text>
        </TouchableOpacity>
        <TextInput
          style={[styles.input, { color: theme.textPrimary, borderColor: theme.border }]}
          value={fromValue}
          onChangeText={setFromValue}
          keyboardType="numeric"
          placeholder="Enter value"
          placeholderTextColor={theme.textSecondary}
        />
      </View>

      {showFromPicker && (
        <ScrollView style={[styles.picker, { backgroundColor: theme.displayBg }]}>
          {units.map((unit) => (
            <TouchableOpacity
              key={unit.symbol}
              style={styles.pickerItem}
              onPress={() => {
                setFromUnit(unit);
                setShowFromPicker(false);
              }}
            >
              <Text style={[styles.pickerText, { color: theme.textPrimary }]}>
                {unit.name} ({unit.symbol})
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      {/* Swap button */}
      <View style={styles.swapContainer}>
        <TouchableOpacity
          style={[styles.swapButton, { backgroundColor: theme.accent }]}
          onPress={swapUnits}
        >
          <Text style={styles.swapIcon}>⇅</Text>
        </TouchableOpacity>
      </View>

      {/* To unit */}
      <View style={[styles.conversionBox, { backgroundColor: theme.displayBg }]}>
        <TouchableOpacity
          style={styles.unitSelector}
          onPress={() => setShowToPicker(!showToPicker)}
        >
          <Text style={[styles.unitLabel, { color: theme.textSecondary }]}>To</Text>
          <Text style={[styles.unitName, { color: theme.primary }]}>
            {toUnit.name} ({toUnit.symbol})
          </Text>
        </TouchableOpacity>
        <View style={[styles.input, { borderColor: theme.border }]}>
          <Text style={[styles.resultText, { color: theme.textPrimary }]}>
            {getConvertedValue()}
          </Text>
        </View>
      </View>

      {showToPicker && (
        <ScrollView style={[styles.picker, { backgroundColor: theme.displayBg }]}>
          {units.map((unit) => (
            <TouchableOpacity
              key={unit.symbol}
              style={styles.pickerItem}
              onPress={() => {
                setToUnit(unit);
                setShowToPicker(false);
              }}
            >
              <Text style={[styles.pickerText, { color: theme.textPrimary }]}>
                {unit.name} ({unit.symbol})
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  categoryScroll: {
    maxHeight: 60,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
  },
  conversionBox: {
    margin: 16,
    padding: 16,
    borderRadius: 12,
  },
  unitSelector: {
    marginBottom: 12,
  },
  unitLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  unitName: {
    fontSize: 18,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 24,
    fontWeight: '600',
  },
  resultText: {
    fontSize: 24,
    fontWeight: '600',
  },
  swapContainer: {
    alignItems: 'center',
    marginVertical: -20,
    zIndex: 1,
  },
  swapButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  swapIcon: {
    fontSize: 24,
    color: '#FFFFFF',
  },
  picker: {
    maxHeight: 200,
    marginHorizontal: 16,
    borderRadius: 12,
  },
  pickerItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  pickerText: {
    fontSize: 16,
  },
});

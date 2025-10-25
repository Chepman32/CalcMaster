import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Animated, { FadeInRight, FadeOutLeft } from 'react-native-reanimated';
import { useCalculatorStore } from '../../store/calculatorStore';
import { getTheme } from '../../theme';
import { formatTimestamp } from '../../utils/formatters';
import { CalculationHistoryItem } from '../../types';

export const HistoryScreen: React.FC = () => {
  const { history, clearHistory, isDarkMode } = useCalculatorStore();
  const theme = getTheme(isDarkMode);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredHistory = history.filter((item) =>
    item.equation.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.result.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleClearHistory = () => {
    Alert.alert(
      'Clear History',
      'Are you sure you want to clear all calculation history?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: clearHistory,
        },
      ]
    );
  };

  const renderHistoryItem = ({ item }: { item: CalculationHistoryItem }) => (
    <Animated.View
      entering={FadeInRight}
      exiting={FadeOutLeft}
      style={[styles.historyCard, { backgroundColor: theme.displayBg, borderColor: theme.border }]}
    >
      <View style={styles.cardHeader}>
        <Text style={[styles.modeLabel, { color: theme.accent }]}>
          {item.mode.toUpperCase()}
        </Text>
        <Text style={[styles.timestamp, { color: theme.textSecondary }]}>
          {formatTimestamp(item.timestamp)}
        </Text>
      </View>
      <Text style={[styles.equation, { color: theme.textPrimary }]}>{item.equation}</Text>
      <Text style={[styles.result, { color: theme.primary }]}>= {item.result}</Text>
    </Animated.View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.textPrimary }]}>History</Text>
        {history.length > 0 && (
          <TouchableOpacity onPress={handleClearHistory}>
            <Text style={[styles.clearButton, { color: theme.danger }]}>Clear All</Text>
          </TouchableOpacity>
        )}
      </View>

      {history.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
            No calculation history yet
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredHistory}
          renderItem={renderHistoryItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  clearButton: {
    fontSize: 16,
    fontWeight: '600',
  },
  listContent: {
    padding: 16,
  },
  historyCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  modeLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
  timestamp: {
    fontSize: 12,
  },
  equation: {
    fontSize: 18,
    marginBottom: 4,
  },
  result: {
    fontSize: 22,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
  },
});

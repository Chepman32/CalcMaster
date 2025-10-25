import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CalculatorMode, AngleMode, NumberBase, CalculationHistoryItem, AppSettings, PremiumFeatures } from '../types';

interface CalculatorState {
  // Current state
  currentInput: string;
  previousInput: string;
  currentOperator: string | null;
  result: string;
  mode: CalculatorMode;
  angleMode: AngleMode;
  is2ndMode: boolean;
  currentBase: NumberBase;

  // History
  history: CalculationHistoryItem[];

  // Settings
  settings: AppSettings;

  // Premium
  premium: PremiumFeatures;

  // Theme
  isDarkMode: boolean;

  // Actions
  setInput: (input: string) => void;
  appendInput: (value: string) => void;
  setOperator: (operator: string) => void;
  calculate: () => void;
  clear: () => void;
  backspace: () => void;
  setMode: (mode: CalculatorMode) => void;
  setAngleMode: (mode: AngleMode) => void;
  toggle2ndMode: () => void;
  setBase: (base: NumberBase) => void;
  addToHistory: (item: CalculationHistoryItem) => void;
  clearHistory: () => void;
  updateSettings: (settings: Partial<AppSettings>) => void;
  toggleTheme: () => void;
  loadPersistedState: () => Promise<void>;
  saveState: () => Promise<void>;
}

const defaultSettings: AppSettings = {
  theme: 'auto',
  hapticEnabled: true,
  soundEnabled: false,
  decimalPlaces: 10,
  angleMode: 'deg',
  scientificNotationThreshold: 1e15,
  thousandSeparators: true,
  defaultNumberBase: 'dec',
  defaultWordSize: 32,
  historyLimit: 100,
  autoSaveCalculations: true,
};

const defaultPremium: PremiumFeatures = {
  isPremium: false,
  graphingUnlocked: false,
  unlimitedHistory: false,
  exportUnlocked: false,
  customFunctions: false,
  premiumThemes: false,
};

export const useCalculatorStore = create<CalculatorState>((set, get) => ({
  // Initial state
  currentInput: '0',
  previousInput: '',
  currentOperator: null,
  result: '0',
  mode: 'basic',
  angleMode: 'deg',
  is2ndMode: false,
  currentBase: 'dec',
  history: [],
  settings: defaultSettings,
  premium: defaultPremium,
  isDarkMode: false,

  // Actions
  setInput: (input: string) => set({ currentInput: input }),

  appendInput: (value: string) => {
    const { currentInput } = get();
    if (currentInput === '0' && value !== '.') {
      set({ currentInput: value });
    } else {
      set({ currentInput: currentInput + value });
    }
  },

  setOperator: (operator: string) => {
    const { currentInput, calculate } = get();
    calculate();
    set({
      previousInput: currentInput,
      currentOperator: operator,
      currentInput: '0'
    });
  },

  calculate: () => {
    const { currentInput, previousInput, currentOperator } = get();
    if (!currentOperator || !previousInput) return;

    try {
      const prev = parseFloat(previousInput);
      const current = parseFloat(currentInput);
      let result = 0;

      switch (currentOperator) {
        case '+':
          result = prev + current;
          break;
        case '-':
          result = prev - current;
          break;
        case '*':
          result = prev * current;
          break;
        case '/':
          if (current === 0) throw new Error('Cannot divide by zero');
          result = prev / current;
          break;
      }

      const resultStr = result.toString();
      set({
        result: resultStr,
        currentInput: resultStr,
        previousInput: '',
        currentOperator: null
      });

      // Add to history
      const { mode, addToHistory } = get();
      addToHistory({
        id: Date.now().toString(),
        equation: `${previousInput} ${currentOperator} ${currentInput}`,
        result: resultStr,
        mode,
        timestamp: Date.now(),
      });

    } catch (error) {
      set({ result: 'Error' });
    }
  },

  clear: () => set({
    currentInput: '0',
    previousInput: '',
    currentOperator: null,
    result: '0'
  }),

  backspace: () => {
    const { currentInput } = get();
    if (currentInput.length > 1) {
      set({ currentInput: currentInput.slice(0, -1) });
    } else {
      set({ currentInput: '0' });
    }
  },

  setMode: (mode: CalculatorMode) => set({ mode }),

  setAngleMode: (angleMode: AngleMode) => set({ angleMode }),

  toggle2ndMode: () => set((state) => ({ is2ndMode: !state.is2ndMode })),

  setBase: (base: NumberBase) => set({ currentBase: base }),

  addToHistory: (item: CalculationHistoryItem) => {
    const { history, settings } = get();
    const newHistory = [item, ...history];

    // Limit history based on settings
    const limitedHistory = newHistory.slice(0, settings.historyLimit);

    set({ history: limitedHistory });
    get().saveState();
  },

  clearHistory: () => {
    set({ history: [] });
    get().saveState();
  },

  updateSettings: (newSettings: Partial<AppSettings>) => {
    set((state) => ({
      settings: { ...state.settings, ...newSettings }
    }));
    get().saveState();
  },

  toggleTheme: () => {
    set((state) => ({ isDarkMode: !state.isDarkMode }));
    get().saveState();
  },

  loadPersistedState: async () => {
    try {
      const historyData = await AsyncStorage.getItem('calculator_history');
      const settingsData = await AsyncStorage.getItem('calculator_settings');
      const themeData = await AsyncStorage.getItem('calculator_theme');

      if (historyData) {
        set({ history: JSON.parse(historyData) });
      }
      if (settingsData) {
        set({ settings: JSON.parse(settingsData) });
      }
      if (themeData) {
        set({ isDarkMode: JSON.parse(themeData) });
      }
    } catch (error) {
      console.error('Failed to load persisted state:', error);
    }
  },

  saveState: async () => {
    try {
      const { history, settings, isDarkMode } = get();
      await AsyncStorage.setItem('calculator_history', JSON.stringify(history));
      await AsyncStorage.setItem('calculator_settings', JSON.stringify(settings));
      await AsyncStorage.setItem('calculator_theme', JSON.stringify(isDarkMode));
    } catch (error) {
      console.error('Failed to save state:', error);
    }
  },
}));

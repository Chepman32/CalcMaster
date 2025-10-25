// Type definitions for CalcMaster

export type CalculatorMode = 'basic' | 'scientific' | 'programmer' | 'graphing';

export type AngleMode = 'deg' | 'rad' | 'grad';

export type NumberBase = 'bin' | 'oct' | 'dec' | 'hex';

export type WordSize = 8 | 16 | 32 | 64;

export interface CalculationHistoryItem {
  id: string;
  equation: string;
  result: string;
  mode: CalculatorMode;
  timestamp: number;
}

export interface ThemeColors {
  primary: string;
  secondary: string;
  success: string;
  danger: string;
  accent: string;
  background: string;
  displayBg: string;
  buttonBg: string;
  numberButtons: string;
  operatorButtons: string;
  functionButtons: string;
  textPrimary: string;
  textSecondary: string;
  border: string;
}

export interface AppSettings {
  theme: 'light' | 'dark' | 'auto';
  hapticEnabled: boolean;
  soundEnabled: boolean;
  decimalPlaces: number;
  angleMode: AngleMode;
  scientificNotationThreshold: number;
  thousandSeparators: boolean;
  defaultNumberBase: NumberBase;
  defaultWordSize: WordSize;
  historyLimit: number;
  autoSaveCalculations: boolean;
}

export interface PremiumFeatures {
  isPremium: boolean;
  graphingUnlocked: boolean;
  unlimitedHistory: boolean;
  exportUnlocked: boolean;
  customFunctions: boolean;
  premiumThemes: boolean;
}

import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Switch,
  ScrollView,
} from 'react-native';
import { useCalculatorStore } from '../../store/calculatorStore';
import { getTheme } from '../../theme';

export const SettingsScreen: React.FC = () => {
  const { settings, updateSettings, isDarkMode, toggleTheme } = useCalculatorStore();
  const theme = getTheme(isDarkMode);

  const SettingRow = ({
    title,
    value,
    onValueChange,
    type = 'switch',
  }: {
    title: string;
    value: any;
    onValueChange: (value: any) => void;
    type?: 'switch' | 'text';
  }) => (
    <View style={[styles.settingRow, { borderBottomColor: theme.border }]}>
      <Text style={[styles.settingTitle, { color: theme.textPrimary }]}>{title}</Text>
      {type === 'switch' ? (
        <Switch value={value} onValueChange={onValueChange} />
      ) : (
        <Text style={[styles.settingValue, { color: theme.textSecondary }]}>{value}</Text>
      )}
    </View>
  );

  const SettingSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>{title}</Text>
      <View style={[styles.sectionContent, { backgroundColor: theme.displayBg }]}>
        {children}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.textPrimary }]}>Settings</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        <SettingSection title="APPEARANCE">
          <SettingRow
            title="Dark Mode"
            value={isDarkMode}
            onValueChange={toggleTheme}
          />
          <SettingRow
            title="Haptic Feedback"
            value={settings.hapticEnabled}
            onValueChange={(value) => updateSettings({ hapticEnabled: value })}
          />
          <SettingRow
            title="Sound Effects"
            value={settings.soundEnabled}
            onValueChange={(value) => updateSettings({ soundEnabled: value })}
          />
        </SettingSection>

        <SettingSection title="CALCULATOR">
          <SettingRow
            title="Decimal Places"
            value={settings.decimalPlaces.toString()}
            onValueChange={() => {}}
            type="text"
          />
          <SettingRow
            title="Thousand Separators"
            value={settings.thousandSeparators}
            onValueChange={(value) => updateSettings({ thousandSeparators: value })}
          />
          <SettingRow
            title="Auto-Save Calculations"
            value={settings.autoSaveCalculations}
            onValueChange={(value) => updateSettings({ autoSaveCalculations: value })}
          />
        </SettingSection>

        <SettingSection title="HISTORY">
          <SettingRow
            title="History Limit"
            value={settings.historyLimit === Infinity ? 'Unlimited' : settings.historyLimit.toString()}
            onValueChange={() => {}}
            type="text"
          />
        </SettingSection>

        <SettingSection title="ABOUT">
          <SettingRow title="Version" value="1.0.0" onValueChange={() => {}} type="text" />
          <TouchableOpacity style={styles.settingRow}>
            <Text style={[styles.settingTitle, { color: theme.primary }]}>Privacy Policy</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingRow}>
            <Text style={[styles.settingTitle, { color: theme.primary }]}>Support</Text>
          </TouchableOpacity>
        </SettingSection>
      </ScrollView>
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
  scrollView: {
    flex: 1,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 16,
    marginBottom: 8,
  },
  sectionContent: {
    borderRadius: 12,
    marginHorizontal: 16,
    overflow: 'hidden',
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
  },
  settingTitle: {
    fontSize: 16,
  },
  settingValue: {
    fontSize: 16,
  },
});

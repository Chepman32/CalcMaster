import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useCalculatorStore } from '../../store/calculatorStore';
import { getTheme } from '../../theme';

interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  savings?: string;
  popular?: boolean;
}

const pricingPlans: PricingPlan[] = [
  {
    id: 'monthly',
    name: 'Monthly',
    price: '$2.99',
    period: '/month',
  },
  {
    id: 'yearly',
    name: 'Yearly',
    price: '$19.99',
    period: '/year',
    savings: 'Save 44%',
    popular: true,
  },
  {
    id: 'lifetime',
    name: 'Lifetime',
    price: '$49.99',
    period: 'one-time',
    savings: 'Best Value',
  },
];

const premiumFeatures = [
  {
    icon: '📊',
    title: 'Graphing Calculator',
    description: 'Plot multiple functions with zoom, pan, and trace capabilities',
  },
  {
    icon: '∞',
    title: 'Unlimited History',
    description: 'Store unlimited calculations with advanced search',
  },
  {
    icon: '📤',
    title: 'Export & Share',
    description: 'Export history to PDF/CSV and share calculations',
  },
  {
    icon: '🎨',
    title: 'Premium Themes',
    description: 'Access 10+ exclusive themes and customize colors',
  },
  {
    icon: '⚡',
    title: 'Custom Functions',
    description: 'Create and save your own custom functions',
  },
  {
    icon: '📊',
    title: 'Statistics',
    description: 'Advanced usage statistics and calculation insights',
  },
  {
    icon: '🔧',
    title: 'Equation Solver',
    description: 'Solve complex equations and systems automatically',
  },
  {
    icon: '📐',
    title: 'Matrix Calculator',
    description: 'Perform matrix operations and transformations',
  },
  {
    icon: '☁️',
    title: 'Cloud Sync',
    description: 'Sync your data across all your devices',
  },
  {
    icon: '🚫',
    title: 'Ad-Free Experience',
    description: 'Enjoy CalcMaster without any interruptions',
  },
];

export const PremiumScreen: React.FC = () => {
  const { isDarkMode, premium } = useCalculatorStore();
  const theme = getTheme(isDarkMode);
  const [selectedPlan, setSelectedPlan] = useState('yearly');

  const handlePurchase = () => {
    // In a real app, this would integrate with react-native-iap
    Alert.alert(
      'Purchase',
      `Purchase ${pricingPlans.find(p => p.id === selectedPlan)?.name} plan?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Confirm',
          onPress: () => {
            // Simulate purchase success
            useCalculatorStore.setState({
              premium: {
                isPremium: true,
                graphingUnlocked: true,
                unlimitedHistory: true,
                exportUnlocked: true,
                customFunctions: true,
                premiumThemes: true,
              },
            });
            Alert.alert('Success', 'Welcome to CalcMaster Premium!');
          },
        },
      ]
    );
  };

  const handleRestore = () => {
    // In a real app, this would restore purchases via IAP
    Alert.alert('Restore Purchases', 'Checking for previous purchases...');
  };

  if (premium.isPremium) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
        <View style={styles.activeContainer}>
          <Text style={[styles.activeTitle, { color: theme.primary }]}>✓ Premium Active</Text>
          <Text style={[styles.activeMessage, { color: theme.textPrimary }]}>
            You have full access to all premium features!
          </Text>

          <View style={styles.featureGrid}>
            {premiumFeatures.map((feature, index) => (
              <Animated.View
                key={index}
                entering={FadeInDown.delay(index * 50)}
                style={[styles.activeFeature, { backgroundColor: theme.displayBg }]}
              >
                <Text style={styles.featureIcon}>{feature.icon}</Text>
                <Text style={[styles.featureTitle, { color: theme.textPrimary }]}>
                  {feature.title}
                </Text>
              </Animated.View>
            ))}
          </View>

          <TouchableOpacity
            style={[styles.manageButton, { backgroundColor: theme.accent }]}
            onPress={() => Alert.alert('Manage', 'Subscription management coming soon')}
          >
            <Text style={styles.manageButtonText}>Manage Subscription</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.headerTitle, { color: theme.textPrimary }]}>
            Unlock Premium
          </Text>
          <Text style={[styles.headerSubtitle, { color: theme.textSecondary }]}>
            Get access to powerful features and take your calculations to the next level
          </Text>
        </View>

        {/* Pricing Plans */}
        <View style={styles.pricingContainer}>
          {pricingPlans.map((plan) => (
            <TouchableOpacity
              key={plan.id}
              style={[
                styles.planCard,
                {
                  backgroundColor: theme.displayBg,
                  borderColor: selectedPlan === plan.id ? theme.primary : theme.border,
                  borderWidth: selectedPlan === plan.id ? 2 : 1,
                },
              ]}
              onPress={() => setSelectedPlan(plan.id)}
            >
              {plan.popular && (
                <View style={[styles.popularBadge, { backgroundColor: theme.primary }]}>
                  <Text style={styles.popularText}>MOST POPULAR</Text>
                </View>
              )}
              <Text style={[styles.planName, { color: theme.textPrimary }]}>{plan.name}</Text>
              <View style={styles.priceRow}>
                <Text style={[styles.price, { color: theme.primary }]}>{plan.price}</Text>
                <Text style={[styles.period, { color: theme.textSecondary }]}>
                  {plan.period}
                </Text>
              </View>
              {plan.savings && (
                <Text style={[styles.savings, { color: theme.success }]}>{plan.savings}</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Features */}
        <View style={styles.featuresContainer}>
          <Text style={[styles.featuresTitle, { color: theme.textPrimary }]}>
            Premium Features
          </Text>
          {premiumFeatures.map((feature, index) => (
            <Animated.View
              key={index}
              entering={FadeInDown.delay(index * 50)}
              style={[styles.featureCard, { backgroundColor: theme.displayBg }]}
            >
              <Text style={styles.featureIcon}>{feature.icon}</Text>
              <View style={styles.featureContent}>
                <Text style={[styles.featureTitle, { color: theme.textPrimary }]}>
                  {feature.title}
                </Text>
                <Text style={[styles.featureDescription, { color: theme.textSecondary }]}>
                  {feature.description}
                </Text>
              </View>
            </Animated.View>
          ))}
        </View>

        {/* Purchase Button */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={[styles.purchaseButton, { backgroundColor: theme.primary }]}
            onPress={handlePurchase}
          >
            <Text style={styles.purchaseButtonText}>
              Subscribe Now - {pricingPlans.find(p => p.id === selectedPlan)?.price}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.restoreButton} onPress={handleRestore}>
            <Text style={[styles.restoreButtonText, { color: theme.primary }]}>
              Restore Purchases
            </Text>
          </TouchableOpacity>

          <Text style={[styles.disclaimer, { color: theme.textSecondary }]}>
            Subscription automatically renews unless auto-renew is turned off at least 24 hours
            before the end of the current period. Terms and Privacy Policy available in Settings.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 24,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
  pricingContainer: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  planCard: {
    padding: 20,
    borderRadius: 12,
    marginBottom: 12,
    position: 'relative',
  },
  popularBadge: {
    position: 'absolute',
    top: -8,
    right: 16,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 4,
  },
  popularText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  planName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  price: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  period: {
    fontSize: 16,
    marginLeft: 4,
  },
  savings: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 4,
  },
  featuresContainer: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  featuresTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  featureCard: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  featureIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
  },
  footer: {
    padding: 16,
    paddingBottom: 32,
  },
  purchaseButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  purchaseButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  restoreButton: {
    padding: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  restoreButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  disclaimer: {
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
  },
  activeContainer: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeTitle: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  activeMessage: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 32,
  },
  featureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 32,
  },
  activeFeature: {
    width: '45%',
    padding: 16,
    borderRadius: 12,
    margin: 4,
    alignItems: 'center',
  },
  manageButton: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
  },
  manageButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

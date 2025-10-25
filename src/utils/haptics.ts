import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

// Haptic feedback options
const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

export enum HapticPattern {
  LIGHT = 'impactLight',
  MEDIUM = 'impactMedium',
  HEAVY = 'impactHeavy',
  SUCCESS = 'notificationSuccess',
  WARNING = 'notificationWarning',
  ERROR = 'notificationError',
  SELECTION = 'selection',
}

export class HapticService {
  private static enabled: boolean = true;

  static setEnabled(enabled: boolean) {
    HapticService.enabled = enabled;
  }

  static trigger(pattern: HapticPattern) {
    if (!HapticService.enabled) return;

    try {
      ReactNativeHapticFeedback.trigger(pattern, options);
    } catch (error) {
      // Haptic feedback not available on this device
      console.log('Haptic feedback not available');
    }
  }

  // Convenience methods for common interactions
  static numberPress() {
    HapticService.trigger(HapticPattern.LIGHT);
  }

  static operatorPress() {
    HapticService.trigger(HapticPattern.MEDIUM);
  }

  static equalsPress() {
    HapticService.trigger(HapticPattern.HEAVY);
  }

  static clearPress() {
    HapticService.trigger(HapticPattern.WARNING);
  }

  static functionPress() {
    HapticService.trigger(HapticPattern.MEDIUM);
  }

  static success() {
    HapticService.trigger(HapticPattern.SUCCESS);
  }

  static error() {
    HapticService.trigger(HapticPattern.ERROR);
  }

  static selection() {
    HapticService.trigger(HapticPattern.SELECTION);
  }
}

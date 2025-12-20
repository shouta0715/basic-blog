import * as Haptics from "expo-haptics";

export const notificationHaptics = {
  success: () => {
    void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  },
  error: () => {
    void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
  },
  warning: () => {
    void Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
  },
} as const satisfies Record<Haptics.NotificationFeedbackType, () => void>;

export const impactHaptics = {
  light: () => {
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  },
  medium: () => {
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  },
  heavy: () => {
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  },
  soft: () => {
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft);
  },
  rigid: () => {
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid);
  },
} as const satisfies Record<Haptics.ImpactFeedbackStyle, () => void>;

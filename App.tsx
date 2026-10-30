import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import {
  SafeAreaProvider,
  SafeAreaView,
} from 'react-native-safe-area-context';

const colors = {
  background: '#F2F2F7',
  card: '#FFFFFF',
  text: '#1C1C1E',
  secondaryText: '#8E8E93',
  accent: '#0A84FF',
  accentPressed: '#0070D8',
  neutral: '#E9E9EE',
  neutralPressed: '#DCDCE2',
};

function CounterScreen() {
  const [count, setCount] = useState(0);
  const { width } = useWindowDimensions();

  const digits = String(count).replace('-', '').length;
  const counterFontSize = digits <= 4 ? 104 : digits <= 6 ? 84 : 64;
  const cardWidth = Math.min(width - 32, 460);

  const increment = () => setCount((value) => value + 1);
  const decrement = () => setCount((value) => value - 1);
  const reset = () => setCount(0);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <View style={styles.screen}>
        <View style={styles.header}>
          <Text style={styles.eyebrow}>IPHONE COUNTER</Text>
          <Text style={styles.title}>Counter</Text>
        </View>

        <View style={[styles.card, { width: cardWidth }]}>
          <Text
            accessibilityLabel={`Current count: ${count}`}
            accessibilityLiveRegion="polite"
            adjustsFontSizeToFit
            minimumFontScale={0.5}
            numberOfLines={1}
            style={[styles.count, { fontSize: counterFontSize }]}
          >
            {count}
          </Text>
          <Text style={styles.countLabel}>CURRENT COUNT</Text>

          <View style={styles.controls}>
            <Pressable
              accessibilityHint="Subtracts one from the current count"
              accessibilityLabel="Decrease count"
              accessibilityRole="button"
              hitSlop={8}
              onPress={decrement}
              style={({ pressed }) => [
                styles.roundButton,
                styles.secondaryButton,
                pressed && styles.secondaryButtonPressed,
              ]}
            >
              <Text style={[styles.roundButtonText, styles.secondaryButtonText]}>
                −
              </Text>
            </Pressable>

            <Pressable
              accessibilityHint="Adds one to the current count"
              accessibilityLabel="Increase count"
              accessibilityRole="button"
              hitSlop={8}
              onPress={increment}
              style={({ pressed }) => [
                styles.roundButton,
                styles.primaryButton,
                pressed && styles.primaryButtonPressed,
              ]}
            >
              <Text style={[styles.roundButtonText, styles.primaryButtonText]}>
                +
              </Text>
            </Pressable>
          </View>

          <Pressable
            accessibilityHint="Sets the current count back to zero"
            accessibilityLabel="Reset count"
            accessibilityRole="button"
            hitSlop={8}
            onPress={reset}
            style={({ pressed }) => [
              styles.resetButton,
              pressed && styles.resetButtonPressed,
            ]}
          >
            <Text style={styles.resetButtonText}>Reset</Text>
          </Pressable>
        </View>

        <Text style={styles.footer}>A tiny standalone iOS app</Text>
      </View>
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <CounterScreen />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 16,
  },
  header: {
    width: '100%',
    maxWidth: 460,
    paddingHorizontal: 8,
  },
  eyebrow: {
    color: colors.secondaryText,
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 1.4,
  },
  title: {
    color: colors.text,
    fontSize: 40,
    fontWeight: '700',
    letterSpacing: -1,
    marginTop: 4,
  },
  card: {
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 32,
    paddingHorizontal: 28,
    paddingTop: 44,
    paddingBottom: 32,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    ...Platform.select({
      android: { elevation: 6 },
      default: {},
    }),
  },
  count: {
    color: colors.text,
    fontWeight: '700',
    letterSpacing: -3,
    fontVariant: ['tabular-nums'],
    includeFontPadding: false,
    textAlign: 'center',
  },
  countLabel: {
    color: colors.secondaryText,
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1.6,
    marginTop: 8,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 40,
    paddingHorizontal: 4,
  },
  roundButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 76,
    height: 76,
    borderRadius: 38,
  },
  secondaryButton: {
    backgroundColor: colors.neutral,
  },
  secondaryButtonPressed: {
    backgroundColor: colors.neutralPressed,
    transform: [{ scale: 0.96 }],
  },
  primaryButton: {
    backgroundColor: colors.accent,
    shadowColor: colors.accent,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.32,
    shadowRadius: 12,
    ...Platform.select({
      android: { elevation: 4 },
      default: {},
    }),
  },
  primaryButtonPressed: {
    backgroundColor: colors.accentPressed,
    transform: [{ scale: 0.96 }],
  },
  roundButtonText: {
    fontSize: 40,
    fontWeight: '500',
    lineHeight: 44,
  },
  secondaryButtonText: {
    color: colors.text,
  },
  primaryButtonText: {
    color: '#FFFFFF',
  },
  resetButton: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
    backgroundColor: colors.neutral,
    borderRadius: 26,
    marginTop: 28,
    minHeight: 52,
  },
  resetButtonPressed: {
    backgroundColor: colors.neutralPressed,
  },
  resetButtonText: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '600',
  },
  footer: {
    color: colors.secondaryText,
    fontSize: 13,
  },
});

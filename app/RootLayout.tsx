/**
 * @file RootLayout.tsx
 * @description Root application layout with global providers and animated background
 * @features - Theme provider, framework initialization, animated background, navigation setup
 * @developer Dhyan Bhandari
 */

import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import ThemeProvider from '@/context/ThemeContext';
import { useTheme } from '@/context/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View, Animated, Easing, Dimensions } from 'react-native';
import { useRef } from 'react';

const { width, height } = Dimensions.get('window');

function AppBackground() {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const { theme } = useTheme();

  useEffect(() => {
    const animate = () => {
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 8000,
          easing: Easing.ease,
          useNativeDriver: false,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 8000,
          easing: Easing.ease,
          useNativeDriver: false,
        }),
      ]).start(() => animate());
    };
    animate();
  }, []);

  const animatedStyle = {
    transform: [
      {
        translateX: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 50],
        }),
      },
      {
        translateY: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -30],
        }),
      },
    ],
  };

  return (
    <View style={StyleSheet.absoluteFillObject}>
      {theme.blur ? (
        <LinearGradient
          colors={['rgba(120, 120, 120, 0.3)', 'rgba(180, 180, 180, 0.25)', 'rgba(200, 200, 200, 0.35)']}
          style={StyleSheet.absoluteFillObject}
        />
      ) : (
        <LinearGradient
          colors={['#f0f9ff', '#e0f2fe', '#f8fafc']}
          style={StyleSheet.absoluteFillObject}
        />
      )}
      <Animated.View style={[
        styles.orb1, 
        animatedStyle,
        { backgroundColor: theme.blur ? 'rgba(255, 255, 255, 0.1)' : 'rgba(59, 130, 246, 0.1)' }
      ]} />
      <Animated.View style={[
        styles.orb2, 
        animatedStyle,
        { backgroundColor: theme.blur ? 'rgba(255, 255, 255, 0.08)' : 'rgba(16, 185, 129, 0.08)' }
      ]} />
      <Animated.View style={[
        styles.orb3, 
        animatedStyle,
        { backgroundColor: theme.blur ? 'rgba(255, 255, 255, 0.12)' : 'rgba(245, 158, 11, 0.12)' }
      ]} />
    </View>
  );
}

export default function RootLayout() {
  useFrameworkReady();

  return (
    <ThemeProvider>
      <AppBackground />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(main-tabs)" />
        <Stack.Screen name="NotFoundScreen" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  orb1: {
    position: 'absolute',
    top: height * 0.2,
    left: width * 0.1,
    width: 150,
    height: 150,
    borderRadius: 75,
    opacity: 0.6,
  },
  orb2: {
    position: 'absolute',
    top: height * 0.6,
    right: width * 0.1,
    width: 120,
    height: 120,
    borderRadius: 60,
    opacity: 0.5,
  },
  orb3: {
    position: 'absolute',
    top: height * 0.4,
    right: width * 0.3,
    width: 100,
    height: 100,
    borderRadius: 50,
    opacity: 0.4,
  },
});
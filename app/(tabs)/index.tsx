import { Tabs } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';
import { Chrome as Home, User, Heart, Rss } from 'lucide-react-native';
import { View, StyleSheet, Animated } from 'react-native';
import { BlurView } from 'expo-blur';
import { useRef, useEffect } from 'react';

export default function TabLayout() {
  const { theme, currentTheme } = useTheme();

  const TabBarBackground = () => {
    if (theme.blur) {
      return (
        <BlurView
          style={StyleSheet.absoluteFillObject}
          intensity={theme.blurIntensity}
          tint={currentTheme === 'dark' ? 'dark' : 'light'}
        />
      );
    }
    return (
      <View 
        style={[
          StyleSheet.absoluteFillObject,
          { backgroundColor: theme.colors.surface }
        ]} 
      />
    );
  };

  const AnimatedTabIcon = ({ icon: Icon, size, color, focused }: any) => {
    const scaleAnim = useRef(new Animated.Value(focused ? 1.1 : 1)).current;
    const glowAnim = useRef(new Animated.Value(focused ? 1 : 0)).current;

    useEffect(() => {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: focused ? 1.1 : 1,
          useNativeDriver: true,
          tension: 300,
          friction: 10,
        }),
        Animated.timing(glowAnim, {
          toValue: focused ? 1 : 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }, [focused]);

    return (
      <View style={styles.iconContainer}>
        <Animated.View 
          style={[
            styles.iconGlow,
            {
              backgroundColor: theme.colors.primary + '20',
              opacity: glowAnim,
              transform: [{ scale: scaleAnim }],
            }
          ]}
        />
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <Icon size={focused ? size + 2 : size} color={color} />
        </Animated.View>
      </View>
    );
  };

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 35,
          left: 20,
          right: 20,
          height: 70,
          borderRadius: 25,
          borderTopWidth: 0,
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.15,
          shadowRadius: 12,
          paddingBottom: 10,
          paddingTop: 10,
          backgroundColor: 'transparent',
        },
        tabBarBackground: () => <TabBarBackground />,
        tabBarActiveTintColor: '#3b82f6',
        tabBarInactiveTintColor: theme.colors.textSecondary,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: 4,
        },
        tabBarIconStyle: {
          marginTop: 4,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ size, color, focused }) => (
            <AnimatedTabIcon icon={Home} size={size} color={focused ? '#14b8a6' : color} focused={focused} />
          ),
          tabBarActiveTintColor: '#14b8a6',
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favorites',
          tabBarIcon: ({ size, color, focused }) => (
            <AnimatedTabIcon icon={Heart} size={size} color={focused ? '#ef4444' : color} focused={focused} />
          ),
          tabBarActiveTintColor: '#ef4444',
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ size, color, focused }) => (
            <AnimatedTabIcon icon={User} size={size} color={focused ? '#8b5cf6' : color} focused={focused} />
          ),
          tabBarActiveTintColor: '#8b5cf6',
        }}
      />
      <Tabs.Screen
        name="feed"
        options={{
          title: 'Feed',
          tabBarIcon: ({ size, color, focused }) => (
            <AnimatedTabIcon icon={Rss} size={size} color={focused ? '#60a5fa' : color} focused={focused} />
          ),
          tabBarActiveTintColor: '#60a5fa',
        }}
      />
      <Tabs.Screen name="settings" options={{ href: null }} />
      <Tabs.Screen name="invite" options={{ href: null }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  iconGlow: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});
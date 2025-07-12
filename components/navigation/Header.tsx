import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';
import { ChevronLeft, Menu } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import { router } from 'expo-router';

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  showMenuButton?: boolean;
  onMenuPress?: () => void;
}

export default function Header({ 
  title, 
  showBackButton = false, 
  showMenuButton = false,
  onMenuPress 
}: HeaderProps) {
  const { theme, currentTheme } = useTheme();

  return (
    <View style={[styles.header, theme.blur && styles.headerBlur]}>
      {theme.blur ? (
        <BlurView
          style={StyleSheet.absoluteFillObject}
          intensity={theme.blurIntensity}
          tint={currentTheme === 'dark' ? 'dark' : 'light'}
        />
      ) : (
        <View style={[StyleSheet.absoluteFillObject, { backgroundColor: theme.colors.surface }]} />
      )}
      
      {showBackButton ? (
        <TouchableOpacity 
          onPress={() => router.back()}
          style={[styles.actionButton, { backgroundColor: theme.colors.button }]}
        >
          <ChevronLeft size={24} color={theme.colors.buttonText} />
        </TouchableOpacity>
      ) : (
        <View style={styles.spacer} />
      )}
      
      <Text style={[
        styles.title, 
        { 
          color: theme.colors.text,
          textShadowColor: theme.blur ? 'rgba(0, 0, 0, 0.3)' : 'transparent',
          textShadowOffset: { width: 0, height: 1 },
          textShadowRadius: theme.blur ? 2 : 0,
        }
      ]}>
        {title}
      </Text>
      
      {showMenuButton ? (
        <TouchableOpacity 
          onPress={onMenuPress}
          style={[styles.actionButton, { backgroundColor: theme.colors.button }]}
        >
          <Menu size={24} color={theme.colors.buttonText} />
        </TouchableOpacity>
      ) : (
        <View style={styles.spacer} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  headerBlur: {
    backgroundColor: 'transparent',
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  spacer: {
    width: 40,
  },
});
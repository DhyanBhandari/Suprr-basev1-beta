/**
 * @file colors.ts
 * @description Centralized color palette and theme definitions
 * @features - Light/dark/liquid glass themes, color constants, accessibility colors
 * @developer Dhyan Bhandari
 */

export const COLORS = {
  // Primary Brand Colors
  PRIMARY: '#3b82f6',
  PRIMARY_LIGHT: '#60a5fa',
  PRIMARY_DARK: '#1d4ed8',
  
  // Semantic Colors
  SUCCESS: '#10b981',
  WARNING: '#f59e0b',
  ERROR: '#ef4444',
  INFO: '#06b6d4',
  
  // Neutral Colors
  WHITE: '#ffffff',
  BLACK: '#000000',
  GRAY_50: '#f9fafb',
  GRAY_100: '#f3f4f6',
  GRAY_200: '#e5e7eb',
  GRAY_300: '#d1d5db',
  GRAY_400: '#9ca3af',
  GRAY_500: '#6b7280',
  GRAY_600: '#4b5563',
  GRAY_700: '#374151',
  GRAY_800: '#1f2937',
  GRAY_900: '#111827',
  
  // Social Media Colors
  WHATSAPP: '#25d366',
  EMAIL: '#ea4335',
  TWITTER: '#1da1f2',
  FACEBOOK: '#1877f2',
  
  // Transparency Levels
  TRANSPARENT: 'transparent',
  SEMI_TRANSPARENT: 'rgba(0, 0, 0, 0.5)',
  LIGHT_OVERLAY: 'rgba(255, 255, 255, 0.1)',
  DARK_OVERLAY: 'rgba(0, 0, 0, 0.3)',
} as const;

export const THEME_COLORS = {
  light: {
    background: COLORS.WHITE,
    surface: 'rgba(255, 255, 255, 0.9)',
    card: 'rgba(249, 250, 251, 0.95)',
    text: COLORS.GRAY_800,
    textSecondary: COLORS.GRAY_500,
    primary: COLORS.PRIMARY,
    primaryLight: COLORS.PRIMARY_LIGHT,
    border: COLORS.GRAY_200,
    input: COLORS.GRAY_50,
    button: COLORS.GRAY_100,
    buttonText: COLORS.GRAY_700,
  },
  dark: {
    background: COLORS.GRAY_900,
    surface: 'rgba(31, 41, 55, 0.9)',
    card: 'rgba(55, 65, 81, 0.95)',
    text: COLORS.GRAY_50,
    textSecondary: COLORS.GRAY_400,
    primary: COLORS.PRIMARY,
    primaryLight: COLORS.PRIMARY_LIGHT,
    border: COLORS.GRAY_700,
    input: COLORS.GRAY_700,
    button: COLORS.GRAY_600,
    buttonText: COLORS.GRAY_50,
  },
  liquidGlass: {
    background: 'rgba(120, 120, 120, 0.15)',
    surface: 'rgba(255, 255, 255, 0.08)',
    card: 'rgba(255, 255, 255, 0.06)',
    text: COLORS.GRAY_800,
    textSecondary: COLORS.GRAY_600,
    primary: COLORS.PRIMARY,
    primaryLight: COLORS.PRIMARY_LIGHT,
    border: 'rgba(255, 255, 255, 0.2)',
    input: 'rgba(255, 255, 255, 0.12)',
    button: 'rgba(255, 255, 255, 0.12)',
    buttonText: COLORS.GRAY_800,
  },
} as const;
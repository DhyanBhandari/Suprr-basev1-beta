import React, { createContext, useContext, useState, useEffect } from 'react';
import { Appearance } from 'react-native';

interface ThemeColors {
  background: string;
  surface: string;
  card: string;
  text: string;
  textSecondary: string;
  primary: string;
  primaryLight: string;
  border: string;
  input: string;
  button: string;
  buttonText: string;
}

interface Theme {
  colors: ThemeColors;
  blur: boolean;
  blurIntensity: number;
}

interface ThemeContextType {
  theme: Theme;
  currentTheme: string;
  setCurrentTheme: (theme: string) => void;
  systemTheme: string | null;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

const lightTheme: Theme = {
  colors: {
    background: '#ffffff',
    surface: 'rgba(255, 255, 255, 0.9)',
    card: 'rgba(249, 250, 251, 0.95)',
    text: '#1f2937',
    textSecondary: '#6b7280',
    primary: '#3b82f6',
    primaryLight: '#60a5fa',
    border: '#e5e7eb',
    input: '#f9fafb',
    button: '#f3f4f6',
    buttonText: '#374151',
  },
  blur: false,
  blurIntensity: 0,
};

const darkTheme: Theme = {
  colors: {
    background: '#111827',
    surface: 'rgba(31, 41, 55, 0.9)',
    card: 'rgba(55, 65, 81, 0.95)',
    text: '#f9fafb',
    textSecondary: '#9ca3af',
    primary: '#3b82f6',
    primaryLight: '#60a5fa',
    border: '#374151',
    input: '#374151',
    button: '#4b5563',
    buttonText: '#f9fafb',
  },
  blur: false,
  blurIntensity: 0,
};

const liquidGlassTheme: Theme = {
  colors: {
    background: 'rgba(120, 120, 120, 0.15)',
    surface: 'rgba(255, 255, 255, 0.08)',
    card: 'rgba(255, 255, 255, 0.06)',
    text: '#1f2937',
    textSecondary: '#4b5563',
    primary: '#3b82f6',
    primaryLight: '#60a5fa',
    border: 'rgba(255, 255, 255, 0.2)',
    input: 'rgba(255, 255, 255, 0.12)',
    button: 'rgba(255, 255, 255, 0.12)',
    buttonText: '#1f2937',
  },
  blur: true,
  blurIntensity: 80,
};

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState('light');
  const [systemTheme, setSystemTheme] = useState(Appearance.getColorScheme());

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setSystemTheme(colorScheme);
    });
    return () => subscription?.remove();
  }, []);

  const getTheme = (): Theme => {
    switch (currentTheme) {
      case 'dark':
        return darkTheme;
      case 'liquidGlass':
        return liquidGlassTheme;
      case 'system':
        return systemTheme === 'dark' ? darkTheme : lightTheme;
      default:
        return lightTheme;
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        theme: getTheme(),
        currentTheme,
        setCurrentTheme,
        systemTheme: systemTheme || 'light',
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
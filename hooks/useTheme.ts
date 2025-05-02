import { useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import { ThemeMode } from '@/types';
import { Colors } from '@/constants/Colors';

export function useTheme() {
  const systemTheme = useColorScheme();
  const [themeMode, setThemeMode] = useState<ThemeMode>('system');
  const [isDark, setIsDark] = useState(systemTheme === 'dark');

  // Update theme when system theme or user preference changes
  useEffect(() => {
    if (themeMode === 'system') {
      setIsDark(systemTheme === 'dark');
    } else {
      setIsDark(themeMode === 'dark');
    }
  }, [systemTheme, themeMode]);

  const theme = isDark ? Colors.dark : Colors.light;

  return {
    theme,
    isDark,
    themeMode,
    setThemeMode,
    toggleTheme: () => {
      if (themeMode === 'light') {
        setThemeMode('dark');
      } else if (themeMode === 'dark') {
        setThemeMode('light');
      } else {
        setThemeMode(systemTheme === 'dark' ? 'light' : 'dark');
      }
    },
  };
}
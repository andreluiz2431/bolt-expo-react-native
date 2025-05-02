import React, { ReactNode } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { useThemeContext } from '@/context/ThemeContext';
import { GlobalStyles } from '@/constants/Colors';

interface CardProps {
  children: ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
}

export function Card({ children, style }: CardProps) {
  const { theme } = useThemeContext();

  return (
    <View
      style={[
        GlobalStyles.card,
        {
          backgroundColor: theme.card,
          borderColor: theme.border,
        },
        styles.card,
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
  },
});
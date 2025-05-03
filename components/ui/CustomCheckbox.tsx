import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Check } from 'lucide-react-native';
import { useThemeContext } from '@/context/ThemeContext';

interface CustomCheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export default function CustomCheckbox({ label, checked, onChange }: CustomCheckboxProps) {
  const { theme } = useThemeContext();

  return (
    <TouchableOpacity
      onPress={() => onChange(!checked)}
      style={styles.wrapper}
      activeOpacity={0.8}
    >
      <View
        style={[styles.box, {
          backgroundColor: checked ? theme.primary : theme.card,
          borderColor: theme.border,
        }]}
      >
        {checked && <Check size={14} color="#fff" />}
      </View>
      <Text style={[styles.label, { color: theme.text }]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  box: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
});

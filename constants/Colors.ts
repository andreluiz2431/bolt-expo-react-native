import { StyleSheet } from 'react-native';

export const Colors = {
  light: {
    primary: '#3772FF',
    primaryLight: '#6A95FF',
    primaryDark: '#0F4CCD',
    secondary: '#45B5AA',
    accent: '#FF7E54',
    background: '#FFFFFF',
    card: '#FFFFFF',
    text: '#222222',
    textSecondary: '#6B7280',
    border: '#E5E7EB',
    success: '#10B981',
    warning: '#FBBF24',
    error: '#EF4444',
    muted: '#F3F4F6',
    // Training type colors
    tiro: '#EF4444',
    regenerativo: '#10B981',
    longo: '#6366F1',
    competicao: '#8B5CF6',
  },
  dark: {
    primary: '#4B83FF',
    primaryLight: '#6A95FF',
    primaryDark: '#0F4CCD',
    secondary: '#45B5AA',
    accent: '#FF7E54',
    background: '#111827',
    card: '#1F2937',
    text: '#F3F4F6',
    textSecondary: '#9CA3AF',
    border: '#374151',
    success: '#34D399',
    warning: '#FBBF24',
    error: '#F87171',
    muted: '#374151',
    // Training type colors
    tiro: '#F87171',
    regenerativo: '#34D399',
    longo: '#818CF8',
    competicao: '#A78BFA',
  },
};

export const GlobalStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safePadding: {
    padding: 16,
  },
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
  },
  caption: {
    fontSize: 14,
    lineHeight: 20,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    height: 48,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  // Form styles
  formGroup: {
    marginBottom: 16,
  },
  formLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  // Spacing utility
  mt8: { marginTop: 8 },
  mt16: { marginTop: 16 },
  mb8: { marginBottom: 8 },
  mb16: { marginBottom: 16 },
  ml8: { marginLeft: 8 },
  mr8: { marginRight: 8 },
});
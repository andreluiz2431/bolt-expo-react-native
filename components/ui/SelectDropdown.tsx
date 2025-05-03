import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Modal } from 'react-native';
import { ChevronDown } from 'lucide-react-native';
import { useThemeContext } from '@/context/ThemeContext';

interface Option {
  label: string;
  value: string;
}

interface SelectDropdownProps {
  data: Option[];
  selected: string;
  onSelect: (value: string) => void;
  placeholder?: string;
}

export function SelectDropdown({ data, selected, onSelect, placeholder }: SelectDropdownProps) {
  const { theme } = useThemeContext();
  const [isVisible, setIsVisible] = React.useState(false);

  const selectedLabel = data.find(d => d.value === selected)?.label || placeholder || 'Selecionar';

  return (
    <>
      <TouchableOpacity
        onPress={() => setIsVisible(true)}
        style={[styles.dropdown, { borderColor: theme.border, backgroundColor: theme.card }]}
      >
        <Text style={[styles.selectedText, { color: theme.text }]}>{selectedLabel}</Text>
        <ChevronDown size={18} color={theme.textSecondary} />
      </TouchableOpacity>

      <Modal
        visible={isVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsVisible(false)}
      >
        <TouchableOpacity style={styles.overlay} onPress={() => setIsVisible(false)}>
          <View style={[styles.modalContent, { backgroundColor: theme.background }]}>
            <FlatList
              data={data}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => {
                    onSelect(item.value);
                    setIsVisible(false);
                  }}
                >
                  <Text style={{ color: theme.text }}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  dropdown: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  selectedText: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    marginHorizontal: 32,
    borderRadius: 8,
    padding: 16,
    maxHeight: '60%',
  },
  option: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

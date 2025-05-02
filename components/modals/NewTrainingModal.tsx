import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { useThemeContext } from '@/context/ThemeContext';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { X, Plus } from 'lucide-react-native';
import { Training, TrainingType, TrainingDay } from '@/types';

interface NewTrainingModalProps {
  onClose: () => void;
  onSave: (training: Partial<Training>) => void;
}

export function NewTrainingModal({ onClose, onSave }: NewTrainingModalProps) {
  const { theme } = useThemeContext();
  const [selectedDay, setSelectedDay] = useState<TrainingDay>('Segunda');
  const [selectedType, setSelectedType] = useState<TrainingType>('Normal');
  const [distance, setDistance] = useState('');
  const [pace, setPace] = useState('');
  const [notes, setNotes] = useState('');

  const trainingTypes: TrainingType[] = ['Normal', 'Tiro', 'Regenerativo', 'Longo', 'Competição'];
  const days: TrainingDay[] = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];

  const handleSave = () => {
    const training: Partial<Training> = {
      day: selectedDay,
      type: selectedType,
      distance: Number(distance) || undefined,
      pace: pace || undefined,
      notes: notes || undefined,
    };
    onSave(training);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>Novo Treino</Text>
        <TouchableOpacity onPress={onClose}>
          <X size={24} color={theme.text} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <Card style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Dia da Semana</Text>
          <View style={styles.daysGrid}>
            {days.map((day) => (
              <TouchableOpacity
                key={day}
                style={[
                  styles.dayButton,
                  { borderColor: theme.border },
                  selectedDay === day && { backgroundColor: theme.primary },
                ]}
                onPress={() => setSelectedDay(day)}
              >
                <Text
                  style={[
                    styles.dayButtonText,
                    { color: selectedDay === day ? '#FFFFFF' : theme.text },
                  ]}
                >
                  {day.slice(0, 3)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Card>

        <Card style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Tipo de Treino</Text>
          <View style={styles.typeGrid}>
            {trainingTypes.map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.typeButton,
                  { borderColor: theme.border },
                  selectedType === type && { backgroundColor: theme.primary },
                ]}
                onPress={() => setSelectedType(type)}
              >
                <Text
                  style={[
                    styles.typeButtonText,
                    { color: selectedType === type ? '#FFFFFF' : theme.text },
                  ]}
                >
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Card>

        <Card style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Detalhes do Treino</Text>
          
          <Text style={[styles.label, { color: theme.text }]}>Distância (km)</Text>
          <TextInput
            style={[styles.input, { color: theme.text, borderColor: theme.border }]}
            value={distance}
            onChangeText={setDistance}
            keyboardType="numeric"
            placeholder="Ex: 5"
            placeholderTextColor={theme.textSecondary}
          />

          <Text style={[styles.label, { color: theme.text }]}>Pace (min/km)</Text>
          <TextInput
            style={[styles.input, { color: theme.text, borderColor: theme.border }]}
            value={pace}
            onChangeText={setPace}
            placeholder="Ex: 5:30 - 6:00"
            placeholderTextColor={theme.textSecondary}
          />

          <Text style={[styles.label, { color: theme.text }]}>Observações</Text>
          <TextInput
            style={[styles.textArea, { color: theme.text, borderColor: theme.border }]}
            value={notes}
            onChangeText={setNotes}
            placeholder="Detalhes adicionais do treino..."
            placeholderTextColor={theme.textSecondary}
            multiline
            numberOfLines={4}
          />
        </Card>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title="Cancelar"
          variant="outline"
          onPress={onClose}
          style={styles.footerButton}
        />
        <Button
          title="Salvar Treino"
          onPress={handleSave}
          icon={<Plus size={18} color="#FFFFFF" />}
          iconPosition="left"
          style={styles.footerButton}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  title: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 12,
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  dayButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  dayButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  typeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  typeButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  typeButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  label: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    marginBottom: 8,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  textArea: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingTop: 12,
    marginBottom: 16,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    textAlignVertical: 'top',
  },
  footer: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  footerButton: {
    flex: 1,
    marginHorizontal: 8,
  },
});
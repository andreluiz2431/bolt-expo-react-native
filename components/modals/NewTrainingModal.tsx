import React, { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TextInput, Modal,
} from 'react-native';
import { useThemeContext } from '@/context/ThemeContext';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { X, Plus } from 'lucide-react-native';
import { TrainingDay, TrainingType, Student } from '@/types';
import { addTrainingWeek } from '@/services/trainingWeekService';
import { fetchStudents } from '@/services/studentService';
import { SelectDropdown } from '@/components/ui/SelectDropdown';
import CustomCheckbox from '@/components/ui/CustomCheckbox';

interface NewTrainingModalProps {
  visible: boolean;
  onClose: () => void;
  onSaved: () => void;
}

const daysOfWeek: TrainingDay[] = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];
const trainingTypes: TrainingType[] = ['Normal', 'Tiro', 'Regenerativo', 'Longo', 'Competição'];

export function NewTrainingModal({ visible, onClose, onSaved }: NewTrainingModalProps) {
  const { theme } = useThemeContext();
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudentId, setSelectedStudentId] = useState('');
  const [weekName, setWeekName] = useState('');
  const [trainings, setTrainings] = useState<Record<TrainingDay, {
    rest: boolean;
    type: TrainingType;
    distance: string;
    pace: string;
    notes: string;
  }>>(() => Object.fromEntries(daysOfWeek.map(day => [day, {
    rest: false, type: 'Normal', distance: '', pace: '', notes: ''
  }])) as Record<TrainingDay, any>);

  useEffect(() => {
    const loadStudents = async () => {
      const result = await fetchStudents();
      setStudents(result);
      if (result.length > 0) setSelectedStudentId(result[0].id);
    };
    if (visible) loadStudents();
  }, [visible]);

  const handleSave = async () => {
    const student = students.find(s => s.id === selectedStudentId);
    if (!student) return;

    const trainingArray = daysOfWeek.map((day, index) => ({
      id: (index + 1).toString(),
      day,
      ...trainings[day],
      distance: Number(trainings[day].distance) || undefined,
    })).filter(t => !t.rest && (t.distance || t.pace || t.notes));

    const payload = {
      studentId: student.id,
      studentName: student.name,
      level: student.level,
      weekName,
      delivered: false,
      completed: false,
      trainings: trainingArray,
    };

    await addTrainingWeek(payload);
    onSaved();
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View style={[styles.container, { backgroundColor: theme.background }]}> 
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.text }]}>Novo Plano de Treino</Text>
          <Button
            title=""
            variant="ghost"
            onPress={onClose}
            icon={<X size={24} color={theme.text} />}
          />
        </View>

        <ScrollView style={styles.content}>
          <Card style={styles.section}>
            <Text style={[styles.label, { color: theme.text }]}>Aluno</Text>
            <SelectDropdown
              data={students.map(s => ({ label: s.name, value: s.id }))}
              selected={selectedStudentId}
              onSelect={setSelectedStudentId}
              placeholder="Selecione um aluno"
            />

            <Text style={[styles.label, { color: theme.text }]}>Semana (ex: 06 a 12 de maio)</Text>
            <TextInput
              style={[styles.input, { color: theme.text, borderColor: theme.border }]}
              value={weekName}
              onChangeText={setWeekName}
              placeholder="Ex: 06 a 12 de maio"
              placeholderTextColor={theme.textSecondary}
            />
          </Card>

          {daysOfWeek.map(day => (
            <Card key={day} style={[styles.section, { backgroundColor: theme.card }]}>
              <View style={styles.dayHeader}>
                <Text style={[styles.dayTitle, { color: theme.text }]}>{day}</Text>
                <CustomCheckbox
                  label="Descanso"
                  checked={trainings[day].rest}
                  onChange={(value) => setTrainings(prev => ({ ...prev, [day]: { ...prev[day], rest: value } }))}
                />
              </View>

              {!trainings[day].rest && (
                <>
                  <Text style={[styles.label, { color: theme.text }]}>Tipo</Text>
                  <SelectDropdown
                    data={trainingTypes.map(type => ({ label: type, value: type }))}
                    selected={trainings[day].type}
                    onSelect={(value) => setTrainings(prev => ({ ...prev, [day]: { ...prev[day], type: value } }))}
                  />

                  <Text style={[styles.label, { color: theme.text }]}>Distância (km)</Text>
                  <TextInput
                    style={[styles.input, { color: theme.text, borderColor: theme.border }]}
                    keyboardType="numeric"
                    value={trainings[day].distance}
                    onChangeText={(value) => setTrainings(prev => ({ ...prev, [day]: { ...prev[day], distance: value } }))}
                  />

                  <Text style={[styles.label, { color: theme.text }]}>Pace</Text>
                  <TextInput
                    style={[styles.input, { color: theme.text, borderColor: theme.border }]}
                    value={trainings[day].pace}
                    onChangeText={(value) => setTrainings(prev => ({ ...prev, [day]: { ...prev[day], pace: value } }))}
                  />

                  <Text style={[styles.label, { color: theme.text }]}>Observações</Text>
                  <TextInput
                    style={[styles.textArea, { color: theme.text, borderColor: theme.border }]}
                    multiline
                    numberOfLines={3}
                    value={trainings[day].notes}
                    onChangeText={(value) => setTrainings(prev => ({ ...prev, [day]: { ...prev[day], notes: value } }))}
                  />
                </>
              )}
            </Card>
          ))}
        </ScrollView>

        <View style={styles.footer}>
          <Button
            title="Cancelar"
            variant="outline"
            onPress={onClose}
            style={styles.footerButton}
          />
          <Button
            title="Salvar Plano"
            onPress={handleSave}
            icon={<Plus size={18} color="#FFFFFF" />}
            iconPosition="left"
            style={styles.footerButton}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  title: { fontSize: 20, fontFamily: 'Inter-Bold' },
  content: { flex: 1, padding: 16 },
  section: { marginBottom: 16 },
  label: { fontSize: 14, fontFamily: 'Inter-Medium', marginBottom: 8 },
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
  dayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dayTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  footerButton: { flex: 1, marginHorizontal: 8 },
});
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput } from 'react-native';
import { useThemeContext } from '@/context/ThemeContext';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { X, Plus } from 'lucide-react-native';
import { Student, StudentLevel } from '@/types';

interface NewStudentModalProps {
  onClose: () => void;
  onSave: (student: Partial<Student>) => void;
}

export function NewStudentModal({ onClose, onSave }: NewStudentModalProps) {
  const { theme } = useThemeContext();
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [goals, setGoals] = useState('');
  const [level, setLevel] = useState<StudentLevel>('Iniciante');
  const [monthlyFee, setMonthlyFee] = useState('150');

  const handleSave = () => {
    const student: Partial<Student> = {
      name,
      contact,
      goals,
      level,
      monthlyFee: Number(monthlyFee),
      subscriptionStatus: 'active',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    onSave(student);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>Novo Aluno</Text>
        <Button
          title=""
          variant="ghost"
          onPress={onClose}
          icon={<X size={24} color={theme.text} />}
        />
      </View>

      <ScrollView style={styles.content}>
        <Card style={styles.section}>
          <Text style={[styles.label, { color: theme.text }]}>Nome Completo</Text>
          <TextInput
            style={[styles.input, { color: theme.text, borderColor: theme.border }]}
            value={name}
            onChangeText={setName}
            placeholder="Nome do aluno"
            placeholderTextColor={theme.textSecondary}
          />

          <Text style={[styles.label, { color: theme.text }]}>Contato</Text>
          <TextInput
            style={[styles.input, { color: theme.text, borderColor: theme.border }]}
            value={contact}
            onChangeText={setContact}
            placeholder="(00) 00000-0000"
            placeholderTextColor={theme.textSecondary}
            keyboardType="phone-pad"
          />

          <Text style={[styles.label, { color: theme.text }]}>Objetivos</Text>
          <TextInput
            style={[styles.textArea, { color: theme.text, borderColor: theme.border }]}
            value={goals}
            onChangeText={setGoals}
            placeholder="Objetivos do aluno..."
            placeholderTextColor={theme.textSecondary}
            multiline
            numberOfLines={4}
          />

          <Text style={[styles.label, { color: theme.text }]}>Nível</Text>
          <View style={styles.levelButtons}>
            {(['Iniciante', 'Intermediário', 'Avançado'] as StudentLevel[]).map((l) => (
              <Button
                key={l}
                title={l}
                variant={level === l ? 'primary' : 'outline'}
                onPress={() => setLevel(l)}
                style={styles.levelButton}
              />
            ))}
          </View>

          <Text style={[styles.label, { color: theme.text }]}>Mensalidade (R$)</Text>
          <TextInput
            style={[styles.input, { color: theme.text, borderColor: theme.border }]}
            value={monthlyFee}
            onChangeText={setMonthlyFee}
            placeholder="150"
            placeholderTextColor={theme.textSecondary}
            keyboardType="numeric"
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
          title="Salvar Aluno"
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
    minHeight: 100,
  },
  levelButtons: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  levelButton: {
    flex: 1,
    marginHorizontal: 4,
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
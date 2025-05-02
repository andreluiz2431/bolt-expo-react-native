import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput } from 'react-native';
import { useThemeContext } from '@/context/ThemeContext';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { X, Plus, Search } from 'lucide-react-native';
import { Payment, Student } from '@/types';

interface NewPaymentModalProps {
  onClose: () => void;
  onSave: (payment: Partial<Payment>) => void;
  students: Student[];
}

export function NewPaymentModal({ onClose, onSave, students }: NewPaymentModalProps) {
  const { theme } = useThemeContext();
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSave = () => {
    if (!selectedStudent) return;

    const payment: Partial<Payment> = {
      studentId: selectedStudent.id,
      amount: Number(amount),
      status: 'pending',
      dueDate: new Date(dueDate).getTime(),
      description,
      paymentMethod: 'Mercado Pago',
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    onSave(payment);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>Novo Pagamento</Text>
        <Button
          title=""
          variant="ghost"
          onPress={onClose}
          icon={<X size={24} color={theme.text} />}
        />
      </View>

      <ScrollView style={styles.content}>
        <Card style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Selecionar Aluno</Text>
          
          <View style={[styles.searchContainer, { backgroundColor: theme.muted }]}>
            <Search size={20} color={theme.textSecondary} />
            <TextInput
              style={[styles.searchInput, { color: theme.text }]}
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Buscar aluno..."
              placeholderTextColor={theme.textSecondary}
            />
          </View>

          <View style={styles.studentList}>
            {filteredStudents.map(student => (
              <TouchableOpacity
                key={student.id}
                style={[
                  styles.studentItem,
                  selectedStudent?.id === student.id && { backgroundColor: theme.primary + '20' },
                ]}
                onPress={() => setSelectedStudent(student)}
              >
                <Text style={[styles.studentName, { color: theme.text }]}>{student.name}</Text>
                <Text style={[styles.studentFee, { color: theme.textSecondary }]}>
                  Mensalidade: R$ {student.monthlyFee}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Card>

        {selectedStudent && (
          <Card style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>Detalhes do Pagamento</Text>

            <Text style={[styles.label, { color: theme.text }]}>Valor (R$)</Text>
            <TextInput
              style={[styles.input, { color: theme.text, borderColor: theme.border }]}
              value={amount}
              onChangeText={setAmount}
              placeholder="150,00"
              placeholderTextColor={theme.textSecondary}
              keyboardType="numeric"
            />

            <Text style={[styles.label, { color: theme.text }]}>Descrição</Text>
            <TextInput
              style={[styles.input, { color: theme.text, borderColor: theme.border }]}
              value={description}
              onChangeText={setDescription}
              placeholder="Mensalidade Abril 2024"
              placeholderTextColor={theme.textSecondary}
            />

            <Text style={[styles.label, { color: theme.text }]}>Data de Vencimento</Text>
            <TextInput
              style={[styles.input, { color: theme.text, borderColor: theme.border }]}
              value={dueDate}
              onChangeText={setDueDate}
              placeholder="DD/MM/AAAA"
              placeholderTextColor={theme.textSecondary}
            />
          </Card>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title="Cancelar"
          variant="outline"
          onPress={onClose}
          style={styles.footerButton}
        />
        <Button
          title="Gerar Cobrança"
          onPress={handleSave}
          icon={<Plus size={18} color="#FFFFFF" />}
          iconPosition="left"
          style={styles.footerButton}
          disabled={!selectedStudent || !amount || !description || !dueDate}
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    height: 48,
    borderRadius: 8,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
  },
  studentList: {
    gap: 8,
  },
  studentItem: {
    padding: 12,
    borderRadius: 8,
  },
  studentName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 4,
  },
  studentFee: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
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
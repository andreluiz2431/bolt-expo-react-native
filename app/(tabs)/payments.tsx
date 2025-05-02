import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { useThemeContext } from '@/context/ThemeContext';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { CreditCard, DollarSign, CircleAlert as AlertCircle, CircleCheck as CheckCircle2, Clock, Plus } from 'lucide-react-native';
import { GlobalStyles } from '@/constants/Colors';
import { Payment, Student } from '@/types';

// Mock data
const MOCK_PAYMENTS: Payment[] = [
  {
    id: '1',
    studentId: '1',
    amount: 150,
    status: 'approved',
    paymentDate: Date.now() - 86400000, // yesterday
    dueDate: Date.now() - 86400000,
    paymentMethod: 'Mercado Pago',
    description: 'Mensalidade Abril 2024',
    transactionId: 'mp_123456',
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: '2',
    studentId: '2',
    amount: 150,
    status: 'pending',
    paymentDate: 0,
    dueDate: Date.now() + 172800000, // 2 days from now
    paymentMethod: 'Mercado Pago',
    description: 'Mensalidade Abril 2024',
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
];

const MOCK_STUDENTS: Student[] = [
  {
    id: '1',
    name: 'Maria Silva',
    contact: '(11) 98765-4321',
    goals: 'Completar uma maratona',
    level: 'Intermediário',
    subscriptionStatus: 'active',
    lastPaymentDate: Date.now() - 86400000,
    nextPaymentDate: Date.now() + 2592000000,
    monthlyFee: 150,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: '2',
    name: 'João Oliveira',
    contact: '(11) 91234-5678',
    goals: 'Melhorar condicionamento',
    level: 'Iniciante',
    subscriptionStatus: 'pending',
    lastPaymentDate: Date.now() - 2592000000,
    nextPaymentDate: Date.now() + 172800000,
    monthlyFee: 150,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
];

export default function PaymentsScreen() {
  const { theme } = useThemeContext();
  const [activeTab, setActiveTab] = useState<'pending' | 'history'>('pending');

  const getStatusColor = (status: Payment['status']) => {
    switch (status) {
      case 'approved':
        return theme.success;
      case 'pending':
        return theme.warning;
      case 'rejected':
        return theme.error;
      default:
        return theme.textSecondary;
    }
  };

  const getStatusIcon = (status: Payment['status']) => {
    switch (status) {
      case 'approved':
        return <CheckCircle2 size={20} color={theme.success} />;
      case 'pending':
        return <Clock size={20} color={theme.warning} />;
      case 'rejected':
        return <AlertCircle size={20} color={theme.error} />;
      default:
        return null;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(amount);
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <Text style={[styles.screenTitle, { color: theme.text }]}>Pagamentos</Text>
        <Button
          title="Novo Pagamento"
          onPress={() => {}}
          icon={<Plus size={18} color="#FFFFFF" />}
          iconPosition="left"
        />
      </View>

      {/* Summary Cards */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.summaryScroll}>
        <Card style={styles.summaryCard}>
          <View style={styles.summaryIconContainer}>
            <DollarSign size={24} color={theme.success} />
          </View>
          <View>
            <Text style={[styles.summaryAmount, { color: theme.text }]}>
              {formatCurrency(3600)}
            </Text>
            <Text style={[styles.summaryLabel, { color: theme.textSecondary }]}>
              Recebido este mês
            </Text>
          </View>
        </Card>

        <Card style={styles.summaryCard}>
          <View style={styles.summaryIconContainer}>
            <Clock size={24} color={theme.warning} />
          </View>
          <View>
            <Text style={[styles.summaryAmount, { color: theme.text }]}>
              {formatCurrency(450)}
            </Text>
            <Text style={[styles.summaryLabel, { color: theme.textSecondary }]}>
              Pendente
            </Text>
          </View>
        </Card>

        <Card style={styles.summaryCard}>
          <View style={styles.summaryIconContainer}>
            <CreditCard size={24} color={theme.primary} />
          </View>
          <View>
            <Text style={[styles.summaryAmount, { color: theme.text }]}>12</Text>
            <Text style={[styles.summaryLabel, { color: theme.textSecondary }]}>
              Alunos ativos
            </Text>
          </View>
        </Card>
      </ScrollView>

      {/* Tab Selector */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'pending' && { backgroundColor: theme.primary },
          ]}
          onPress={() => setActiveTab('pending')}
        >
          <Text
            style={[
              styles.tabText,
              { color: activeTab === 'pending' ? '#FFFFFF' : theme.textSecondary },
            ]}
          >
            Pendentes
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'history' && { backgroundColor: theme.primary },
          ]}
          onPress={() => setActiveTab('history')}
        >
          <Text
            style={[
              styles.tabText,
              { color: activeTab === 'history' ? '#FFFFFF' : theme.textSecondary },
            ]}
          >
            Histórico
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {MOCK_PAYMENTS.map((payment) => {
          const student = MOCK_STUDENTS.find((s) => s.id === payment.studentId);
          return (
            <Card key={payment.id} style={styles.paymentCard}>
              <View style={styles.paymentHeader}>
                <View style={styles.studentInfo}>
                  <Text style={[styles.studentName, { color: theme.text }]}>
                    {student?.name}
                  </Text>
                  <Text style={[styles.paymentDescription, { color: theme.textSecondary }]}>
                    {payment.description}
                  </Text>
                </View>
                {getStatusIcon(payment.status)}
              </View>
              
              <View style={styles.paymentDetails}>
                <View style={styles.detailRow}>
                  <Text style={[styles.detailLabel, { color: theme.textSecondary }]}>
                    Valor:
                  </Text>
                  <Text style={[styles.detailValue, { color: theme.text }]}>
                    {formatCurrency(payment.amount)}
                  </Text>
                </View>
                
                <View style={styles.detailRow}>
                  <Text style={[styles.detailLabel, { color: theme.textSecondary }]}>
                    Vencimento:
                  </Text>
                  <Text style={[styles.detailValue, { color: theme.text }]}>
                    {formatDate(payment.dueDate)}
                  </Text>
                </View>

                {payment.status === 'approved' && (
                  <View style={styles.detailRow}>
                    <Text style={[styles.detailLabel, { color: theme.textSecondary }]}>
                      Pago em:
                    </Text>
                    <Text style={[styles.detailValue, { color: theme.text }]}>
                      {formatDate(payment.paymentDate)}
                    </Text>
                  </View>
                )}

                <View style={styles.detailRow}>
                  <Text style={[styles.detailLabel, { color: theme.textSecondary }]}>
                    Método:
                  </Text>
                  <Text style={[styles.detailValue, { color: theme.text }]}>
                    {payment.paymentMethod}
                  </Text>
                </View>
              </View>

              {payment.status === 'pending' && (
                <Button
                  title="Gerar Link de Pagamento"
                  variant="outline"
                  onPress={() => {}}
                  icon={<CreditCard size={18} color={theme.primary} />}
                  iconPosition="left"
                  style={styles.paymentButton}
                />
              )}
            </Card>
          );
        })}
      </ScrollView>
    </SafeAreaView>
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
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  screenTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
  },
  summaryScroll: {
    paddingHorizontal: 16,
    marginVertical: 8,
  },
  summaryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
    minWidth: 200,
  },
  summaryIconContainer: {
    marginRight: 12,
  },
  summaryAmount: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    marginBottom: 4,
  },
  summaryLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginVertical: 12,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
  },
  tabText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  paymentCard: {
    marginBottom: 16,
  },
  paymentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  studentInfo: {
    flex: 1,
  },
  studentName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 4,
  },
  paymentDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  paymentDetails: {
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  detailValue: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  paymentButton: {
    marginTop: 8,
  },
});
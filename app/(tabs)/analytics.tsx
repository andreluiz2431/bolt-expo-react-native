import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { useThemeContext } from '@/context/ThemeContext';
import { Card } from '@/components/ui/Card';
import { Dumbbell, Calendar, Users, Award } from 'lucide-react-native';
import { GlobalStyles } from '@/constants/Colors';

export default function AnalyticsScreen() {
  const { theme } = useThemeContext();
  
  // Mock analytics data
  const progressStats = [
    { 
      title: 'Treinos Completos', 
      value: '85%', 
      icon: <Calendar size={24} color={theme.primary} />,
      description: '34 de 40 treinos concluídos'
    },
    { 
      title: 'Alunos Ativos', 
      value: '92%', 
      icon: <Users size={24} color={theme.primary} />,
      description: '11 de 12 alunos ativos na semana'
    },
    { 
      title: 'Metas Alcançadas', 
      value: '67%', 
      icon: <Award size={24} color={theme.primary} />,
      description: '8 de 12 metas de alunos alcançadas'
    },
    { 
      title: 'Carga Média', 
      value: '32km', 
      icon: <Dumbbell size={24} color={theme.primary} />,
      description: 'Média semanal de todos os alunos'
    },
  ];
  
  // Mock data for most frequent training types
  const topTrainingTypes = [
    { type: 'Normal', count: 48, percentage: 40 },
    { type: 'Regenerativo', count: 24, percentage: 20 },
    { type: 'Tiro', count: 18, percentage: 15 },
    { type: 'Longo', count: 18, percentage: 15 },
    { type: 'Competição', count: 12, percentage: 10 },
  ];
  
  // Mock data for student improvement
  const studentImprovements = [
    { name: 'Maria Silva', progress: 85, improvement: '+12%' },
    { name: 'João Oliveira', progress: 65, improvement: '+8%' },
    { name: 'Ana Lúcia', progress: 92, improvement: '+15%' },
    { name: 'Pedro Mendes', progress: 78, improvement: '+10%' },
    { name: 'Carla Souza', progress: 70, improvement: '+7%' },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <Text style={[styles.screenTitle, { color: theme.text }]}>Análise de Progresso</Text>
        <Text style={[styles.dateRange, { color: theme.textSecondary }]}>Últimos 30 dias</Text>
      </View>
      
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Stats Cards */}
        <View style={styles.statsGrid}>
          {progressStats.map((stat, index) => (
            <Card key={index} style={styles.statCard}>
              <View style={styles.statCardHeader}>
                {stat.icon}
                <Text style={[styles.statValue, { color: theme.primary }]}>{stat.value}</Text>
              </View>
              <Text style={[styles.statTitle, { color: theme.text }]}>{stat.title}</Text>
              <Text style={[styles.statDescription, { color: theme.textSecondary }]}>
                {stat.description}
              </Text>
            </Card>
          ))}
        </View>
        
        {/* Training Type Distribution */}
        <Text style={[GlobalStyles.subtitle, { color: theme.text, marginTop: 8 }]}>
          Distribuição de Tipos de Treino
        </Text>
        <Card>
          {topTrainingTypes.map((item, index) => (
            <View key={index} style={styles.trainingTypeItem}>
              <View style={styles.trainingTypeHeader}>
                <Text style={[styles.trainingTypeName, { color: theme.text }]}>
                  {item.type}
                </Text>
                <Text style={[styles.trainingTypeCount, { color: theme.textSecondary }]}>
                  {item.count} treinos
                </Text>
              </View>
              <View style={styles.progressBarContainer}>
                <View 
                  style={[
                    styles.progressBar, 
                    { 
                      backgroundColor: getProgressColor(item.type, theme),
                      width: `${item.percentage}%`
                    }
                  ]} 
                />
                <Text style={[styles.progressValue, { color: theme.textSecondary }]}>
                  {item.percentage}%
                </Text>
              </View>
            </View>
          ))}
        </Card>
        
        {/* Student Progress */}
        <Text style={[GlobalStyles.subtitle, { color: theme.text, marginTop: 16 }]}>
          Progresso dos Alunos
        </Text>
        <Card>
          {studentImprovements.map((student, index) => (
            <View key={index} style={styles.studentProgressItem}>
              <View style={styles.studentProgressHeader}>
                <Text style={[styles.studentName, { color: theme.text }]}>
                  {student.name}
                </Text>
                <Text style={[styles.improvementValue, { color: theme.success }]}>
                  {student.improvement}
                </Text>
              </View>
              <View style={styles.progressBarContainer}>
                <View 
                  style={[
                    styles.progressBar, 
                    { 
                      backgroundColor: theme.primary,
                      width: `${student.progress}%`
                    }
                  ]} 
                />
                <Text style={[styles.progressValue, { color: theme.textSecondary }]}>
                  {student.progress}%
                </Text>
              </View>
            </View>
          ))}
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

// Helper function to get color based on training type
function getProgressColor(type: string, theme: any) {
  switch(type) {
    case 'Tiro':
      return theme.tiro;
    case 'Regenerativo':
      return theme.regenerativo;
    case 'Longo':
      return theme.longo;
    case 'Competição':
      return theme.competicao;
    default:
      return theme.primary;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  screenTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
  },
  dateRange: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    marginTop: 4,
  },
  scrollContent: {
    padding: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statCard: {
    width: '48%',
    marginBottom: 16,
  },
  statCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
  },
  statTitle: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 4,
  },
  statDescription: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
  },
  trainingTypeItem: {
    marginBottom: 16,
  },
  trainingTypeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  trainingTypeName: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
  },
  trainingTypeCount: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
  },
  progressBarContainer: {
    height: 12,
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 6,
    overflow: 'hidden',
    position: 'relative',
  },
  progressBar: {
    height: '100%',
    borderRadius: 6,
  },
  progressValue: {
    position: 'absolute',
    right: 4,
    top: -3,
    fontSize: 10,
    fontFamily: 'Inter-Medium',
  },
  studentProgressItem: {
    marginBottom: 16,
  },
  studentProgressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  studentName: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
  },
  improvementValue: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
  },
});
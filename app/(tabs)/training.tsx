import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity,
} from 'react-native';
import { useThemeContext } from '@/context/ThemeContext';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Calendar, Clock, Plus, Share2, ClipboardCopy, MessageSquare } from 'lucide-react-native';
import { GlobalStyles } from '@/constants/Colors';
import { TrainingWeek, TrainingType } from '@/types';
import { formatTrainingWeek, copyToClipboard, shareViaWhatsApp } from '@/utils/sharing';
import { fetchTrainingWeekByStudent } from '@/services/trainingWeekService';
import { fetchStudentsWithTrainingWeeks } from '@/services/studentService';
import { Student } from '@/types';
import { NewTrainingModal } from '@/components/modals/NewTrainingModal';

import { CreditCard as Edit } from 'lucide-react-native';

export default function TrainingScreen() {
  const { theme } = useThemeContext();
  const [activeStudentId, setActiveStudentId] = useState<string>('1');
  const [selectedWeek, setSelectedWeek] = useState<TrainingWeek | null>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [isModalVisible, setModalVisible] = useState(false);


  // Carrega os alunos que têm treinos
  useEffect(() => {
    const loadStudents = async () => {
      const list = await fetchStudentsWithTrainingWeeks();
      setStudents(list);
      if (list.length > 0) {
        setActiveStudentId(list[0].id); // ativa o primeiro da lista automaticamente
      }
    };
    loadStudents();
  }, []);

  useEffect(() => {
    const loadWeek = async () => {
      const week = await fetchTrainingWeekByStudent(activeStudentId);
      setSelectedWeek(week);
    };
    loadWeek();
  }, [activeStudentId]);

  const getTrainingTypeColor = (type: TrainingType) => {
    switch (type) {
      case 'Tiro': return theme.tiro;
      case 'Regenerativo': return theme.regenerativo;
      case 'Longo': return theme.longo;
      case 'Competição': return theme.competicao;
      default: return theme.primary;
    }
  };

  const handleCopyToClipboard = async () => {
    if (!selectedWeek) return;
    const formattedText = formatTrainingWeek(selectedWeek);
    await copyToClipboard(formattedText);
    alert('Treino copiado para a área de transferência!');
  };

  const handleShareViaWhatsApp = async () => {
    const student = students.find(s => s.id === activeStudentId);
    if (student && selectedWeek) {
      const formattedText = formatTrainingWeek(selectedWeek);
      const success = await shareViaWhatsApp('', formattedText);
      if (!success) {
        alert('Não foi possível abrir o WhatsApp. Verifique se o aplicativo está instalado.');
      }
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <Text style={[styles.screenTitle, { color: theme.text }]}>Planos de Treino</Text>
          <Button
            title="Novo Treino"
            onPress={() => setModalVisible(true)}
            icon={<Plus size={18} color="#FFFFFF" />}
            iconPosition="left"
          />
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.studentSelector}
      >
        {students.map((student) => (
          <TouchableOpacity
            key={student.id}
            style={[
              styles.studentTab,
              activeStudentId === student.id && { backgroundColor: theme.primary },
            ]}
            onPress={() => setActiveStudentId(student.id)}
          >
            <Text
              style={[
                styles.studentTabText,
                { color: activeStudentId === student.id ? '#FFFFFF' : theme.textSecondary },
              ]}
            >
              {student.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView contentContainerStyle={styles.contentContainer}>
        {!selectedWeek ? (
          <Text style={{ color: theme.textSecondary, textAlign: 'center', marginTop: 40 }}>
            Nenhum plano de treino encontrado para este aluno.
          </Text>
        ) : (
          <>
            <View style={styles.weekHeader}>
              <View style={styles.weekInfo}>
                <Calendar size={20} color={theme.primary} />
                <Text style={[styles.weekName, { color: theme.text }]}>
                  {selectedWeek.weekName}
                </Text>
              </View>
              <View style={styles.shareActions}>
                <TouchableOpacity
                  style={[styles.shareButton, { borderColor: theme.border }]}
                  onPress={handleCopyToClipboard}
                >
                  <ClipboardCopy size={18} color={theme.textSecondary} />
                  <Text style={[styles.shareButtonText, { color: theme.text }]}>Copiar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.shareButton, { borderColor: theme.border }]}
                  onPress={handleShareViaWhatsApp}
                >
                  <MessageSquare size={18} color={theme.textSecondary} />
                  <Text style={[styles.shareButtonText, { color: theme.text }]}>WhatsApp</Text>
                </TouchableOpacity>
              </View>
            </View>

            {['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'].map((day) => {
              const dayTrainings = selectedWeek.trainings.filter(t => t.day === day);
              if (dayTrainings.length === 0) {
                return (
                  <Card key={day} style={styles.emptyDayCard}>
                    <View style={styles.dayHeader}>
                      <Text style={[styles.dayName, { color: theme.textSecondary }]}>{day}</Text>
                    </View>
                    <View style={styles.emptyDay}>
                      <Text style={[styles.emptyDayText, { color: theme.textSecondary }]}>
                        Descanso
                      </Text>
                    </View>
                  </Card>
                );
              }

              return (
                <Card key={day}>
                  <View style={styles.dayHeader}>
                    <Text style={[styles.dayName, { color: theme.text }]}>{day}</Text>
                  </View>
                  {dayTrainings.map((training) => (
                    <View key={training.id} style={styles.trainingItem}>
                      <View style={styles.trainingHeader}>
                        <View style={[
                          styles.trainingTypeBadge,
                          { backgroundColor: getTrainingTypeColor(training.type as TrainingType) },
                        ]}>
                          <Text style={styles.trainingTypeText}>
                            {training.type === 'Normal' ? 'Treino' : training.type}
                          </Text>
                        </View>
                        <TouchableOpacity>
                          <Edit size={16} color={theme.textSecondary} />
                        </TouchableOpacity>
                      </View>
                      {training.distance && (
                        <View style={styles.trainingDetail}>
                          <Share2 size={16} color={theme.textSecondary} />
                          <Text style={[styles.trainingDetailText, { color: theme.text }]}>
                            {training.distance} km
                          </Text>
                        </View>
                      )}
                      {training.pace && (
                        <View style={styles.trainingDetail}>
                          <Clock size={16} color={theme.textSecondary} />
                          <Text style={[styles.trainingDetailText, { color: theme.text }]}>
                            Pace: {training.pace} min/km
                          </Text>
                        </View>
                      )}
                      {training.notes && (
                        <Text style={[styles.trainingNotes, { color: theme.textSecondary }]}>
                          {training.notes}
                        </Text>
                      )}
                    </View>
                  ))}
                </Card>
              );
            })}
          </>
        )}
      </ScrollView>

      <NewTrainingModal
        visible={isModalVisible}
        onClose={() => setModalVisible(false)}
        onSaved={() => {
          setModalVisible(false);
          if (activeStudentId) {
            fetchTrainingWeekByStudent(activeStudentId).then(setSelectedWeek);
          }
        }}
      />

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
  studentSelector: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  studentTab: {
    //paddingHorizontal: 16,
    //paddingVertical: 30,
    padding: 30,
    paddingTop: 15,
    borderRadius: 20,
    marginRight: 12,
    marginBottom: 120,
  },
  studentTabText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
  contentContainer: {
    padding: 16,
    paddingTop: 0,
  },
  weekHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  weekInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  weekName: {
    marginLeft: 8,
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
  },
  shareActions: {
    flexDirection: 'row',
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    marginLeft: 8,
  },
  shareButtonText: {
    marginLeft: 4,
    fontSize: 12,
    fontFamily: 'Inter-Medium',
  },
  dayHeader: {
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
    marginBottom: 12,
  },
  dayName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  emptyDayCard: {
    marginBottom: 16,
  },
  emptyDay: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  emptyDayText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    fontStyle: 'italic',
  },
  trainingItem: {
    marginBottom: 16,
  },
  trainingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  trainingTypeBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  trainingTypeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
  },
  trainingDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  trainingDetailText: {
    marginLeft: 8,
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  trainingNotes: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    marginTop: 4,
  },
});
 
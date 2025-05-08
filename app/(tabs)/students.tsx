import React, { useState } from 'react';
import {
  View, Text, StyleSheet, FlatList, TouchableOpacity,
  TextInput, SafeAreaView,
} from 'react-native';
import { useThemeContext } from '@/context/ThemeContext';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Plus, Search, UserRound, CreditCard as Edit, Trash2 } from 'lucide-react-native';
import { GlobalStyles } from '@/constants/Colors';
import { StudentLevel } from '@/types';
import { studentLevels } from '@/constants/studentLevels';
import { NewStudentModal } from '@/components/modals/NewStudentModal';
import { useStudents } from '@/hooks/useStudents';

export default function StudentsScreen() {
  const { theme } = useThemeContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<StudentLevel | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const { students, reload } = useStudents();

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel = selectedLevel ? student.level === selectedLevel : true;
    return matchesSearch && matchesLevel;
  });

  const getLevelColor = (level: StudentLevel) => {
    switch (level) {
      case 'Iniciante': return theme.success;
      case 'Intermediário': return theme.warning;
      case 'Avançado': return theme.accent;
      default: return theme.textSecondary;
    }
  };

  const renderStudentItem = ({ item }) => (
    <Card style={styles.studentCard}>
      <View style={styles.studentHeader}>
        <View style={styles.studentInfo}>
          <UserRound size={32} color={theme.primary} />
          <View style={styles.studentNameContainer}>
            <Text style={[styles.studentName, { color: theme.text }]}>{item.name}</Text>
            <View style={[styles.levelBadge, { backgroundColor: getLevelColor(item.level) }]}>
              <Text style={styles.levelText}>{item.level}</Text>
            </View>
          </View>
        </View>
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.iconButton}>
            <Edit size={18} color={theme.textSecondary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Trash2 size={18} color={theme.error} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.studentDetails}>
        <Text style={[styles.detailLabel, { color: theme.textSecondary }]}>Contato:</Text>
        <Text style={[styles.detailValue, { color: theme.text }]}>{item.contact}</Text>
      </View>
      <View style={styles.studentDetails}>
        <Text style={[styles.detailLabel, { color: theme.textSecondary }]}>Objetivos:</Text>
        <Text style={[styles.detailValue, { color: theme.text }]}>{item.goals}</Text>
      </View>
    </Card>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <Text style={[styles.screenTitle, { color: theme.text }]}>Seus Alunos</Text>
        <Button
          title="Novo Aluno"
          onPress={() => setModalVisible(true)}
          icon={<Plus size={18} color="#FFFFFF" />}
          iconPosition="left"
        />
      </View>

      <View style={[styles.searchContainer, { backgroundColor: theme.muted }]}>
        <Search size={20} color={theme.textSecondary} />
        <TextInput
          style={[styles.searchInput, { color: theme.text }]}
          placeholder="Buscar alunos"
          placeholderTextColor={theme.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <View style={styles.filterTabs}>
        {studentLevels.map((nivel) => {
          const isSelected = nivel === (selectedLevel || 'Todos');
          const nivelKey = nivel === 'Todos' ? null : nivel as StudentLevel;
          const bg = nivel === 'Iniciante' ? theme.success
            : nivel === 'Intermediário' ? theme.warning
            : nivel === 'Avançado' ? theme.accent
            : theme.primary;

          return (
            <TouchableOpacity
              key={nivel}
              style={[styles.filterTab, isSelected && { backgroundColor: bg }]}
              onPress={() => setSelectedLevel(nivelKey)}
            >
              <Text style={[styles.filterTabText, { color: isSelected ? '#fff' : theme.textSecondary }]}>
                {nivel}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <FlatList
        data={filteredStudents}
        renderItem={renderStudentItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />

      <NewStudentModal
        visible={isModalVisible}
        onClose={() => setModalVisible(false)}
        onStudentAdded={reload}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginVertical: 12,
    paddingHorizontal: 12,
    height: 48,
    borderRadius: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    marginLeft: 8,
    fontFamily: 'Inter-Regular',
  },
  filterTabs: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  filterTab: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
  },
  filterTabText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  listContent: {
    padding: 16,
    paddingTop: 8,
  },
  studentCard: {
    marginBottom: 16,
  },
  studentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  studentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  studentNameContainer: {
    marginLeft: 12,
  },
  studentName: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 4,
  },
  levelBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  levelText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'Inter-Medium',
  },
  actionButtons: {
    flexDirection: 'row',
  },
  iconButton: {
    padding: 8,
    marginLeft: 8,
  },
  studentDetails: {
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
});

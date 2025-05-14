// hooks/useTrainingData.ts
import { useEffect, useState } from 'react';
import { fetchTrainingWeeksByStudent } from '@/services/trainingWeekService';
import { fetchStudentsWithTrainingWeeks } from '@/services/studentService';
import { Student, TrainingWeek } from '@/types';

export function useTrainingData() {
  const [students, setStudents] = useState<Student[]>([]);
  const [weeks, setWeeks] = useState<TrainingWeek[]>([]);
  const [activeStudentId, setActiveStudentId] = useState<string>('');
  const [selectedWeekIndex, setSelectedWeekIndex] = useState(0);

  useEffect(() => {
    const loadStudents = async () => {
      const list = await fetchStudentsWithTrainingWeeks();
      setStudents(list);
      if (list.length > 0) setActiveStudentId(list[0].id);
    };
    loadStudents();
  }, []);

  useEffect(() => {
    const loadWeeks = async () => {
      if (!activeStudentId) return;
      const studentWeeks = await fetchTrainingWeeksByStudent(activeStudentId);
      setWeeks(studentWeeks);
      setSelectedWeekIndex(0);
    };
    loadWeeks();
  }, [activeStudentId]);

  const reloadWeeks = async () => {
    if (activeStudentId) {
      const studentWeeks = await fetchTrainingWeeksByStudent(activeStudentId);
      setWeeks(studentWeeks);
      setSelectedWeekIndex(0);
    }
  };

  const getSelectedWeek = () => weeks[selectedWeekIndex] || null;

  return {
    students,
    weeks,
    activeStudentId,
    setActiveStudentId,
    selectedWeekIndex,
    setSelectedWeekIndex,
    reloadWeeks,
    selectedWeek: getSelectedWeek(),
  };
}

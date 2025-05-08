import { useEffect, useState } from 'react';
import { fetchStudents } from '@/services/studentService';
import { StudentLevel, Student } from '@/types';

export function useStudents() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  const loadStudents = async () => {
    setLoading(true);
    try {
      const list = await fetchStudents();
      setStudents(list);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  return { students, loading, reload: loadStudents };
}

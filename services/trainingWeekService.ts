// trainingWeekService.ts

import { db } from "../firebase/config";
import { TrainingWeek } from '@/types';
import { collection, addDoc, query, where, getDocs, orderBy, deleteDoc, doc } from 'firebase/firestore';

export async function addTrainingWeek(trainingWeek: TrainingWeek): Promise<void> {
  const trainingWeeksRef = collection(db, 'trainingWeeks');
  await addDoc(trainingWeeksRef, trainingWeek);
}

export async function fetchTrainingWeekByStudent(studentId: string): Promise<TrainingWeek | null> {
  const q = query(
    collection(db, 'trainingWeeks'),
    where('studentId', '==', studentId),
    orderBy('weekName', 'desc')
  );

  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;

  // Retorna a semana mais recente
  return {
    id: snapshot.docs[0].id,
    ...snapshot.docs[0].data(),
  } as TrainingWeek;  
}

// ✅ Nova função: busca todas as semanas de treino do aluno
export async function fetchTrainingWeeksByStudent(studentId: string): Promise<TrainingWeek[]> {
  const q = query(
    collection(db, 'trainingWeeks'),
    where('studentId', '==', studentId),
    //orderBy('createdAt', 'desc')
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  } as TrainingWeek));
}

export async function deleteTrainingWeek(weekId: string) {
  const weekRef = doc(db, 'trainingWeeks', weekId);
  await deleteDoc(weekRef);
}
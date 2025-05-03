import { collection, query, where, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';

export type Training = {
  id: string;
  day: string;
  type: string;
  distance?: number;
  pace?: string;
  notes?: string;
};

export type TrainingWeek = {
  id: string;
  studentId: string;
  weekName: string;
  trainings: Training[];
  delivered: boolean;
  completed: boolean;
  createdAt: any;
  updatedAt: any;
};

export async function fetchTrainingWeekByStudent(studentId: string): Promise<TrainingWeek | null> {
  const q = query(collection(db, 'trainingWeeks'), where('studentId', '==', studentId));
  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;
  const doc = snapshot.docs[0];
  return {
    id: doc.id,
    ...doc.data(),
  } as TrainingWeek;
}

export const addTrainingWeek = async (trainingWeek: any) => {
  const ref = collection(db, 'trainingWeeks');
  await addDoc(ref, {
    ...trainingWeek,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
};
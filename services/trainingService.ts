import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/config";

export type Training = {
  id: string;
  studentId: string;
  titulo: string;
  descricao: string;
  data: string;
  duracao: number;
  intensidade: string;
  createdAt: any;
  updatedAt: any;
};

export async function fetchTrainingsByStudent(studentId: string): Promise<Training[]> {
  const q = query(collection(db, "trainings"), where("studentId", "==", studentId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Training[];
}

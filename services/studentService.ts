import { collection, getDocs, addDoc, serverTimestamp  } from "firebase/firestore";
import { db } from "../firebase/config";
import { Student } from '@/types';

export async function fetchStudents() {
  const snapshot = await getDocs(collection(db, "students"));
  return snapshot.docs.map(doc => ({
    id: doc.id,
    name: doc.data().nome,
    contact: doc.data().contato,
    goals: doc.data().objetivo || "",
    level: doc.data().nivel,
    createdAt: doc.data().createdAt,
    updatedAt: doc.data().updatedAt,
  }));
}

export async function fetchStudentsWithTrainingWeeks() {
  const snapshot = await getDocs(collection(db, "trainingWeeks"));

  // Extrair IDs únicos
  const studentMap = new Map<string, { id: string; name: string; level: string }>();

  snapshot.docs.forEach((doc) => {
    const data = doc.data();
    const id = data.studentId;
    const name = data.studentName || "Aluno";
    const level = data.level || "Nível não definido";

    if (!studentMap.has(id)) {
      studentMap.set(id, { id, name, level });
    }
  });

  return Array.from(studentMap.values());
}

export const addStudent = async (student: Partial<Student>) => {
  const studentsRef = collection(db, 'students');
  const payload = {
    nome: student.name,
    contato: student.contact,
    objetivo: student.goals,
    nivel: student.level,
    situacao: student.subscriptionStatus || 'ativo',
    mensalidade: student.monthlyFee || 0,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };
  await addDoc(studentsRef, payload);
};
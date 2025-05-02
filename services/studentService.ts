import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";

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

const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const weeks = [
  {
    studentId: "LSjx8DVlRlsU8AF0pVEV",
    studentName: "Maria Silva",
    level: "Intermediário",
    weekName: "06 a 12 de maio",
    delivered: false,
    completed: false,
    trainings: [
      {
        id: "1",
        day: "Segunda",
        type: "Regenerativo",
        distance: 4,
        pace: "6:30 - 7:00",
        notes: "Corrida leve",
      },
      {
        id: "2",
        day: "Quarta",
        type: "Tiro",
        distance: 6,
        pace: "5:00 - 5:30",
        notes: "6x400m com 1min descanso",
      },
      {
        id: "3",
        day: "Sábado",
        type: "Longo",
        distance: 12,
        pace: "6:00 - 6:30",
        notes: "Foco em resistência",
      },
    ],
  },
  {
    studentId: "pjOlShnX9exROCMtcodc",
    studentName: "João Oliveira",
    level: "Iniciante",
    weekName: "06 a 12 de maio",
    delivered: false,
    completed: false,
    trainings: [
      {
        id: "1",
        day: "Terça",
        type: "Normal",
        distance: 3,
        pace: "7:00 - 7:30",
        notes: "Começando leve",
      },
      {
        id: "2",
        day: "Quinta",
        type: "Regenerativo",
        distance: 2,
        pace: "7:30 - 8:00",
        notes: "Caminhada e trote",
      },
      {
        id: "3",
        day: "Domingo",
        type: "Longo",
        distance: 5,
        pace: "7:00 - 7:30",
        notes: "Primeiro longão",
      },
    ],
  },
  {
    studentId: "9kvJsjlyaylAL8e7tTdA",
    studentName: "Ana Lúcia",
    level: "Avançado",
    weekName: "06 a 12 de maio",
    delivered: false,
    completed: false,
    trainings: [
      {
        id: "1",
        day: "Segunda",
        type: "Tiro",
        distance: 10,
        pace: "4:30 - 5:00",
        notes: "8x800m com 400m descanso",
      },
      {
        id: "2",
        day: "Quarta",
        type: "Normal",
        distance: 12,
        pace: "5:30 - 6:00",
      },
      {
        id: "3",
        day: "Sexta",
        type: "Longo",
        distance: 20,
        pace: "5:50 - 6:10",
        notes: "Treino base maratona",
      },
    ],
  },
];

async function populate() {
  const collection = db.collection("trainingWeeks");

  for (const week of weeks) {
    await collection.add({
      ...week,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });
  }

  console.log("✅ Semanas de treino inseridas para 3 alunos.");
}

populate().catch(console.error);

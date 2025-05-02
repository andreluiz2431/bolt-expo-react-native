const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const alunosComTreinos = [
  {
    studentId: "9kvJsjlyaylAL8e7tTdA",
    treinos: [
      {
        titulo: "Resistência",
        descricao: "5km corrida leve",
        data: "2024-05-01",
        duracao: 40,
        intensidade: "Leve",
      },
      {
        titulo: "Força",
        descricao: "Treino de perna e core",
        data: "2024-05-02",
        duracao: 50,
        intensidade: "Alta",
      },
    ],
  },
  {
    studentId: "LSjx8DVlRlsU8AF0pVEV",
    treinos: [
      {
        titulo: "Recuperação ativa",
        descricao: "Caminhada e alongamento",
        data: "2024-05-01",
        duracao: 30,
        intensidade: "Leve",
      },
    ],
  },
];

async function populate() {
  const collection = db.collection("trainings");

  for (const aluno of alunosComTreinos) {
    for (const treino of aluno.treinos) {
      await collection.add({
        ...treino,
        studentId: aluno.studentId,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });
    }
  }

  console.log("✅ Treinos inseridos com sucesso!");
}

populate().catch(console.error);

const admin = require("firebase-admin");
const fs = require("fs");

// Inicializa o Firebase Admin com a chave de serviço
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const students = [
  {
    nome: "Maria Silva",
    contato: "(11) 98765-4321",
    objetivo: "Completar uma maratona",
    nivel: "Intermediário",
    situacao: "ativo",
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  },
  {
    nome: "João Oliveira",
    contato: "(11) 91234-5678",
    objetivo: "Melhorar condicionamento",
    nivel: "Iniciante",
    situacao: "ativo",
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  },
  {
    nome: "Ana Lúcia",
    contato: "(11) 99876-5432",
    objetivo: "Preparação para ultramaratona",
    nivel: "Avançado",
    situacao: "ativo",
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  },
  {
    nome: "Pedro Mendes",
    contato: "(11) 97654-3210",
    objetivo: "Perda de peso",
    nivel: "Iniciante",
    situacao: "ativo",
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  },
  {
    nome: "Carla Souza",
    contato: "(11) 95432-1098",
    objetivo: "Melhorar tempo em 10km",
    nivel: "Intermediário",
    situacao: "ativo",
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  },
];

async function populate() {
  const batch = db.batch();
  const collectionRef = db.collection("students");

  students.forEach((student) => {
    const docRef = collectionRef.doc(); // gera ID automaticamente
    batch.set(docRef, student);
  });

  await batch.commit();
  console.log("✅ Alunos adicionados com sucesso ao Firestore!");
}

populate().catch((err) => {
  console.error("Erro ao popular alunos:", err);
});

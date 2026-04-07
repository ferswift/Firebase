import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import type { Plan } from "../../types/Plan";

// Referência para a coleção "plans" no Firestore
const plansReference = collection(db, "plans");

// criando função asincrona para adicionar um plano no banco de dados

export async function getPlan() {
  // Obtém os documentos da coleção "plans"
  const snapshot = await getDocs(plansReference);

  // Retorna um array de objetos, onde cada objeto representa um plano com seu ID e dados
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Plan, "id">),
  }));
}

export async function addPlan() {
  // Adiciona um novo plano à coleção "plans" com os campos "text" e "price"
  console.log("Adicionando plano...");
  // Tratamento de erros para garantir que o processo de adição seja robusto
  try {
    await addDoc(plansReference, { text: "mensal", price: 29.99 });
  } catch (error) {
    console.error("Erro ao adicionar plano:", error);
  }
}

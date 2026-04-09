import { useEffect, useState } from "react";
import type { Plan } from "./types/Plan";
import {
  addPlan,
  getPlan,
  deletePlan,
  updatePlan,
} from "./services/Data/plansData";

export const App = () => {
  const [plans, setPlans] = useState<Plan[]>([]);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const [editPrice, setEditPrice] = useState(0);

  useEffect(() => {
    async function loadPlans() {
      const data = await getPlan();
      setPlans(data);
    }
    loadPlans();
  }, []);

  // 🔥 delete
  async function handleDelete(id: string) {
    await deletePlan(id);
    const data = await getPlan();
    setPlans(data);
  }

  // 🔥 iniciar edição
  function handleEdit(plan: Plan) {
    setEditingId(plan.id);
    setEditText(plan.text);
    setEditPrice(plan.price);
  }

  // 🔥 salvar edição
  async function handleUpdate(id: string) {
    await updatePlan(id, {
      text: editText,
      price: editPrice,
    });

    const data = await getPlan();
    setPlans(data);

    // sair do modo edição
    setEditingId(null);
  }

  return (
    <div>
      Testando firebase
      <button
        onClick={async () => {
          await addPlan();
          const data = await getPlan();
          setPlans(data);
        }}
      >
        Adicionar planos
      </button>
      <h1>Planos</h1>
      <ul>
        {plans.map((plan) => (
          <li key={plan.id}>
            {editingId === plan.id ? (
              <>
                {/* 🔥 INPUTS */}
                <input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />

                <input
                  type="number"
                  value={editPrice}
                  onChange={(e) => setEditPrice(Number(e.target.value))}
                />

                {/* 🔥 SALVAR */}
                <button onClick={() => handleUpdate(plan.id)}>Salvar</button>

                {/* cancelar */}
                <button onClick={() => setEditingId(null)}>Cancelar</button>
              </>
            ) : (
              <>
                {plan.text} - ${plan.price.toFixed(2)}
                {/* editar */}
                <button onClick={() => handleEdit(plan)}>Editar</button>
                {/* deletar */}
                <button onClick={() => handleDelete(plan.id)}>Excluir</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

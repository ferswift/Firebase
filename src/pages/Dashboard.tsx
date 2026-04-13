import { useEffect, useState } from "react";

import type { Plan } from "../types/Plan";
import {
  addPlan,
  deletePlan,
  getPlan,
  updatePlan,
} from "../services/Data/plansData";

import "../style/app.css";

export const Dashboard = () => {
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
    setPlans((prev) => prev.filter((plan) => plan.id !== id));
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

    setPlans((prev) =>
      prev.map((plan) =>
        plan.id === id ? { ...plan, text: editText, price: editPrice } : plan,
      ),
    );

    // sair do modo edição
    setEditingId(null);
  }

  return (
    <div className="container">
      <h1>🔥 Planos Firebase</h1>

      <button
        className="btn-add"
        onClick={async () => {
          await addPlan();
          const data = await getPlan();
          setPlans(data);
        }}
      >
        Adicionar plano
      </button>

      {plans.map((plan) => (
        <div key={plan.id} className="card">
          {editingId === plan.id ? (
            <>
              <input
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />

              <input
                type="number"
                value={editPrice}
                onChange={(e) => setEditPrice(Number(e.target.value))}
              />

              <div className="row">
                <button
                  className="btn-save"
                  onClick={() => handleUpdate(plan.id)}
                >
                  Salvar
                </button>

                <button
                  className="btn-cancel"
                  onClick={() => setEditingId(null)}
                >
                  Cancelar
                </button>
              </div>
            </>
          ) : (
            <div className="row">
              <span>
                {plan.text} - ${plan.price.toFixed(2)}
              </span>

              <div style={{ display: "flex", gap: "6px" }}>
                <button className="btn-edit" onClick={() => handleEdit(plan)}>
                  Editar
                </button>

                <button
                  className="btn-delete"
                  onClick={() => handleDelete(plan.id)}
                >
                  Excluir
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

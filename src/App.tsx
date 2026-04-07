import { useEffect, useState } from "react";
import type { Plan } from "./types/Plan";
import { addPlan, getPlan } from "./services/Data/plansData";

export const App = () => {
  const [plans, setPlans] = useState<Plan[]>([]);

  useEffect(() => {
    async function loadPlans() {
      const data = await getPlan();
      setPlans(data);
    }
    loadPlans();
  }, []);

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
            {plan.text} - ${plan.price.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
};

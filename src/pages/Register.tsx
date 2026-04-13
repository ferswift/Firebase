import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../services/firebaseConfig";
import { useNavigate } from "react-router-dom";

import "../style/app.css";

export const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handlRegister = async () => {
    if (!email || !password) {
      alert("Preencha todos os campos");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email.trim(), password);
      alert("Registro bem-sucedido!");

      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Erro ao registrar");
    }
  };

  return (
    <div className="container">
      <h1>Tela de Registro</h1>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handlRegister}>Registrar</button>
    </div>
  );
};

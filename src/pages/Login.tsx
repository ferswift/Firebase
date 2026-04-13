import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebaseConfig";

import "../style/app.css";
import { Link } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Preencha todos os campos");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      alert("Login bem-sucedido!");
    } catch (error) {
      console.error(error);
      alert("Erro ao logar");
    }
  };

  return (
    <div className="container">
      <h1>Tela de Login</h1>

      <input
        type="email"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Enviar</button>

      <p>
        Não possui uma conta?? <Link to="/register">Criar conta</Link>
      </p>
    </div>
  );
};

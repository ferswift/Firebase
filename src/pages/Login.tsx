import { useContext, useState } from "react";

import "../style/app.css";
import { Link } from "react-router-dom";
import { loginFirebase } from "../services/Auth";
import { AuthContext } from "../Context/AuthContext";
import { auth } from "../services/firebaseConfig";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setUser } = useContext(AuthContext)!;

  if (!auth) {
    throw new Error("AuthContext não encontrado");
  }

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Preencha todos os campos");
      return;
    }

    try {
      const user = await loginFirebase(email, password);

      setUser(user);
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

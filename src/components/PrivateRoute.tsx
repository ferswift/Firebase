import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

export const PrivateRoute = ({ children }: React.PropsWithChildren) => {
  const authContext = useContext(AuthContext);

  if (!authContext?.user) {
    return <Navigate to="/" />;
  }

  return children;
};

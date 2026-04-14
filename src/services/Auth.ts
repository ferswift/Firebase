import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebaseConfig";

export const loginFirebase = async (email: string, password: string) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email.trim(),
    password,
  );
  return userCredential.user;
};

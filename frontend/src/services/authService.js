import { auth } from "./firebase";
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut, 
  onAuthStateChanged, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail
} from "firebase/auth";

// Définition des providers
const GoogleProvider = new GoogleAuthProvider();

/**
 * Connexion avec Google
 */
export const GoogleHandleLogin = async () => {
  try {
    await signInWithPopup(auth, GoogleProvider);
  } catch (error) {
    console.error("Erreur lors de la connexion avec Google :", error);
  }
};

/**
 * Inscription avec email et mot de passe
 * @param {string} email
 * @param {string} password
 */
export const registerWithEmail = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("Utilisateur inscrit :", userCredential.user);
  } catch (error) {
    console.error("Erreur d'inscription :", error.message);
  }
};

/**
 * Connexion avec email et mot de passe
 * @param {string} email
 * @param {string} password
 */
export const loginWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("Utilisateur connecté :", userCredential.user);
  } catch (error) {
    console.error("Erreur de connexion :", error.message);
  }
};

/**
 * Envoie un email de réinitialisation du mot de passe
 * @param {string} email
 */
export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    console.log("Email de réinitialisation envoyé !");
  } catch (error) {
    console.error("Erreur lors de la réinitialisation du mot de passe :", error.message);
  }
};

/**
 * Déconnexion
 */
export const handleLogout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Erreur lors de la déconnexion :", error);
  }
};

/**
 * Écouteur d'état d'authentification
 * @param {function} setUser - Met à jour l'état utilisateur
 */
export const listenToAuthChanges = (setUser) => {
  return onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });
};

import { auth, db } from "./firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut, 
  onAuthStateChanged, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail
} from "firebase/auth";
import { useState, useEffect } from "react";
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
export const registerWithEmail = async (email, password, name) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Ajouter les infos dans Firestore (seulement si ce n'est pas un compte Google)
    await setDoc(doc(db, "users", user.uid), {
      displayName: name,  // Nom saisi par l'utilisateur
      photoURL: "",       // Peut être mis à jour plus tard
      role: "user",       // Rôle par défaut
      email: user.email
    });

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


export const useUserInfo = () => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        let displayName = user.displayName;  // Google Users ont déjà un nom
        let photoURL = user.photoURL;        // Google Users ont déjà une photo
        let role = "user";                   // Valeur par défaut

        if (!displayName || !photoURL) {
          // Si c'est un compte email/password, récupérer les infos Firestore
          const userRef = doc(db, "users", user.uid);
          const userSnap = await getDoc(userRef);

          if (userSnap.exists()) {
            const userData = userSnap.data();
            displayName = userData.displayName || "Utilisateur";
            photoURL = userData.photoURL || "https://www.w3schools.com/howto/img_avatar.png"; // Image par défaut
            role = userData.role || "user";
          }
        }

        setUserInfo({ displayName, photoURL, role });
      } else {
        setUserInfo(null);
      }
    });

    return () => unsubscribe(); // Nettoyer l'écouteur Firebase
  }, []);

  return userInfo;
};
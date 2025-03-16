import { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../services/firebase"; // Assure-toi que les imports sont corrects

const UserContext = createContext({ userInfo: null, reloadUser: () => {} });

let globalReloadUser = () => {}; // ✅ Variable globale pour stocker `reloadUser`

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(() => {
    const storedUser = sessionStorage.getItem("userInfo");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const reloadUser = async () => {
    const user = auth.currentUser;
    if (user) {
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      let displayName = user.displayName || "Utilisateur";
      let photoURL = user.photoURL || "https://www.w3schools.com/howto/img_avatar.png";
      let role = "user"; // Valeur par défaut

      if (userSnap.exists()) {
        const userData = userSnap.data();
        displayName = userData.displayName || displayName;
        photoURL = userData.photoURL || photoURL;
        role = userData.role || role;
      }

      const newUserInfo = { displayName, photoURL, role, uid: user.uid };
      setUserInfo(newUserInfo);
      sessionStorage.setItem("userInfo", JSON.stringify(newUserInfo));
    }
  };

  globalReloadUser = reloadUser; // ✅ Stocker `reloadUser` globalement

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        reloadUser(); // 🔹 Recharge les données utilisateur au premier chargement
      } else {
        setUserInfo(null);
        sessionStorage.removeItem("userInfo");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ userInfo }}>
      {children}
    </UserContext.Provider>
  );
};

export const getGlobalReloadUser = () => globalReloadUser; // ✅ Fonction pour récupérer `reloadUser`

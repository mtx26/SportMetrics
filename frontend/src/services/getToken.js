import { auth } from "./services/firebase";

const getToken = async () => {
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken();
    console.log("🔥 Token Firebase :", token);
    return token;
  } else {
    console.error("🚫 Aucun utilisateur connecté !");
    return null;
  }
};

export default getToken;

import axios from "axios";
import getToken from "./getToken";

const API_URL = "http://127.0.0.1:5000";

export const getProtectedData = async () => {
  const token = await getToken();
  if (!token) {
    console.log("❌ Pas de token, accès refusé !");
    return null;
  }

  try {
    const response = await axios.get(`${API_URL}/protected`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("✅ Réponse Flask :", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Erreur d'accès :", error.response?.data || error);
    return null;
  }
};

export const getStatus = async () => {
    try {
        const response = await axios.get(`${API_URL}/status`);
        return response.data;
    } catch (error) {
        console.error("Erreur API :", error);
    }
};
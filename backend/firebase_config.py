import firebase_admin
from firebase_admin import credentials, auth

# 🔥 Charge la clé privée Firebase
cred = credentials.Certificate("backend/serviceAccountKey.json")
firebase_admin.initialize_app(cred)

def verify_firebase_token(token):
    """ Vérifie le token Firebase et retourne les infos de l'utilisateur """
    try:
        decoded_token = auth.verify_id_token(token)
        return decoded_token
    except Exception:
        return None

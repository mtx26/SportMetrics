from flask import Blueprint, jsonify, request
from firebase_admin import auth
from firebase_config import verify_firebase_token

auth = Blueprint('auth', __name__)

@auth.route('/protected', methods=['GET'])
def protected():
    token = request.headers.get('Authorization')  # 🔥 Récupérer le token Firebase

    if not token:
        return jsonify({"error": "Token manquant"}), 401

    user_data = verify_firebase_token(token.replace("Bearer ", ""))  # 🔥 Vérifier le token
    if not user_data:
        return jsonify({"error": "Token invalide"}), 401

    return jsonify({"message": "✅ Accès autorisé !", "user": user_data})
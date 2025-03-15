from flask import Flask, jsonify, request
from flask_cors import CORS
from config import Config
from flask_sqlalchemy import SQLAlchemy
from routes import api
from firebase_admin import auth
from firebase_config import verify_firebase_token



app = Flask(__name__)
CORS(app)  # Autorise les requêtes du frontend
app.config.from_object(Config)
app.register_blueprint(api)

db = SQLAlchemy(app)

# Exemple de modèle
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), nullable=False)

# Créer la base de données si elle n'existe pas
with app.app_context():
    db.create_all()

@app.route('/protected', methods=['GET'])
def protected():
    token = request.headers.get('Authorization')  # 🔥 Récupérer le token Firebase

    if not token:
        return jsonify({"error": "Token manquant"}), 401

    user_data = verify_firebase_token(token.replace("Bearer ", ""))  # 🔥 Vérifier le token
    if not user_data:
        return jsonify({"error": "Token invalide"}), 401

    return jsonify({"message": "✅ Accès autorisé !", "user": user_data})


if __name__ == '__main__':
    app.run(debug=True)

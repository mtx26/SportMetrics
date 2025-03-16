from flask import Flask, jsonify, request
from flask_cors import CORS
from config import Config
from flask_sqlalchemy import SQLAlchemy
from routes import api
"from test.admin_route import routes_test"


app = Flask(__name__)
CORS(app)  # Autorise les requêtes du frontend
app.config.from_object(Config)
app.register_blueprint(api)
"app.register_blueprint(routes_test)"

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


if __name__ == '__main__':
    app.run(debug=True)

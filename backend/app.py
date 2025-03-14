from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Autorise les requêtes du frontend

@app.route('/api/status', methods=['GET'])
def status():
    return jsonify({"message": "API SportMetrics en ligne 🚀"})

if __name__ == '__main__':
    app.run(debug=True)

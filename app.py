from flask import Flask, request, jsonify
from flask_cors import CORS
import openai
import os
from dotenv import load_dotenv

load_dotenv()
openai.api_key = os.getenv("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")

app = Flask(__name__)
CORS(app)

@app.route("/api/chat", methods=["POST"])
def chat():
    data = request.get_json()
    messages = data.get("messages", [])

    try:
        response = openai.ChatCompletion.create(
            model="gpt-4o",
            messages=messages,
            temperature=0.7
        )
        return jsonify(response)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)

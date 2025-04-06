
from flask import Flask, request, jsonify
from flask_cors import CORS
from textblob import TextBlob

app = Flask(__name__)
CORS(app)

@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.get_json()
    text = data['text']
    blob = TextBlob(text)
    polarity = blob.sentiment.polarity
    mood = "positive" if polarity > 0 else "negative" if polarity < 0 else "neutral"
    return jsonify({"mood": mood, "score": polarity})

if __name__ == '__main__':
    app.run(port=5001)
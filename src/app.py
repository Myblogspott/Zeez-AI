from flask import Flask, request, jsonify
from flask_cors import CORS
from groq_integration import get_quiz_questions

app = Flask(__name__)
CORS(app)  # Enable CORS for the entire app

@app.route('/quiz', methods=['POST'])
def generate_quiz():
    # Get data from the frontend request (JSON payload)
    data = request.json

    # Extract the relevant information from the request
    topic = data.get('topic')
    grade = data.get('grade')
    difficulty = data.get('difficulty')
    num_questions = data.get('num_questions', 15)

    # Call the quiz generation function from groq_integration.py
    questions = get_quiz_questions(topic, grade, difficulty, num_questions)

    # If quiz questions are successfully generated, return them as JSON
    if questions:
        return jsonify(questions), 200
    else:
        return jsonify({"error": "Unable to generate quiz questions"}), 500

if __name__ == '__main__':
    app.run(debug=True)

from flask import Flask, request, jsonify
from flask_cors import CORS
import fitz  # PyMuPDF
import os
import json
from werkzeug.utils import secure_filename
import ollama  # Python SDK for Ollama

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'uploads'
HIGHLIGHT_FILE = 'highlights.json'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route('/upload', methods=['POST'])
def upload_file():
    file = request.files['file']
    filename = secure_filename(file.filename)
    filepath = os.path.join(UPLOAD_FOLDER, filename)
    file.save(filepath)

    text = extract_text(filepath)
    return jsonify({'text': text})


def extract_text(path):
    ext = os.path.splitext(path)[1].lower()
    if ext == '.pdf':
        doc = fitz.open(path)
        text = ""
        for page in doc:
            text += page.get_text()
        return text
    elif ext == '.docx':
        import docx
        doc = docx.Document(path)
        return "\n".join([para.text for para in doc.paragraphs])
    return ""


@app.route('/save-highlight', methods=['POST'])
def save_highlight():
    data = request.json
    highlight = {
        "text": data.get("text"),
        "page": data.get("page")
    }
    all_highlights = []
    if os.path.exists(HIGHLIGHT_FILE):
        with open(HIGHLIGHT_FILE, 'r') as f:
            all_highlights = json.load(f)
    all_highlights.append(highlight)
    with open(HIGHLIGHT_FILE, 'w') as f:
        json.dump(all_highlights, f)
    return jsonify({"status": "saved"})


@app.route('/get-highlights', methods=['GET'])
def get_highlights():
    if not os.path.exists(HIGHLIGHT_FILE):
        return jsonify([])
    with open(HIGHLIGHT_FILE, 'r') as f:
        highlights = json.load(f)
    return jsonify(highlights)


@app.route('/generate-mcq', methods=['POST'])
def generate_mcq():
    content = request.json.get("text")
    count = request.json.get("count", 5)

    prompt = f"Generate {count} MCQs with 4 options and answers from the following text:\n\n{content}"
    response = ollama.chat(model='llama2', messages=[{"role": "user", "content": prompt}])

    return jsonify({"mcqs": response['message']['content']})


if __name__ == '__main__':
    app.run(debug=True)

from flask import Flask, request, jsonify
from flask_cors import cross_origin
from analyzer import get_stemmed_word_frequencies

app = Flask(__name__)

@app.route('/analyze_text', methods=['POST'])
@cross_origin()
def analyze_text():
    data = request.get_json()
    user_text = data.get('text', '')
    word_frequencies = get_stemmed_word_frequencies(user_text)
    sorted_frequencies = word_frequencies.most_common()
    return jsonify(sorted_frequencies)

if __name__ == '__main__':
    app.run(debug=True)

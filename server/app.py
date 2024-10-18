from flask import Flask, request, jsonify, render_template
import util
import warnings


warnings.filterwarnings('ignore', category=UserWarning, append=True)

app = Flask(__name__, template_folder="../templates", static_folder="../static")

@app.route('/')
def index():
    return render_template('app.html')

@app.route('/classify_image', methods=['POST'])
def classify_image():
    
    # print("Received request:", request.data)
    
    # Get JSON data
    data = request.get_json()
    
    # print("Received JSON data:", data)  # Log parsed JSON data

    if not data or 'image_data' not in data:
        # print("No image data provided or invalid request")  # Log missing data error
        return jsonify({"error": "No image data provided"}), 400

    image_data = data['image_data']
    try:
        response = jsonify(util.classify_image(image_data))
    except Exception as e:
        print(f"Error during classification: {e}")  # Log any errors during processing
        return jsonify({"error": "Classification error"}), 500

    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


if __name__ == "__main__":
    print("Starting Python Flask Server For Sports Celebrity Image Classification")
    try:
        util.load_saved_artifacts()
    except Exception as e:
        print(f"Error loading artifacts: {e}")
    app.run(port=5000, debug=True)

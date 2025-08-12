from flask import Flask, request, jsonify
from train_model import CarbonEstimator
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/predict_co2', methods=['POST'])
def predict_co2():
    data = request.get_json()
    transport_type = data.get('transport_type')
    distance = data.get('distance')

    if not transport_type or distance is None:
        return jsonify({"error": "Missing transport_type or distance"}), 400

    try:
        estimator = CarbonEstimator(transport_type, float(distance))
        return jsonify(estimator.get_summary())
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)


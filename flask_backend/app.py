from flask import Flask, jsonify, request
from flask_cors import CORS
import ttg
import re


app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})  # Allow CORS for all origins for the /api/* endpoints


def parse_input(data):
    variables = re.findall(r'\b[a-zA-Z]+\b', data)
    logical_ops = {'and', 'not', 'or', 'xor', 'nor', 'nand'}
    filtered_variables = [var for var in variables if var.lower() not in logical_ops]
    return filtered_variables




@app.route('/api/eqdata', methods=['POST'])
def get_data():
    data = request.get_json()
    eq_input = data.get("equation", "")

    if not eq_input:
        return jsonify({"error": "No equation provided"}), 400
    
    eq_variables = parse_input(eq_input)
    tt_table = ttg.Truths(eq_variables, [eq_input], ints=False, ascending=True).as_pandas
    tt_table_dict = tt_table.to_dict(orient='records')
    return jsonify(tt_table_dict)

if __name__ == '__main__' : 
    app.run(host='0.0.0.0', debug=True)



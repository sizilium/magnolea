
try:
    import RPi.GPIO as GPIO
except RuntimeError:
    print("Error importing RPi.GPIO!  This is probably because you need superuser privileges.  You can achieve this by using 'sudo' to run your script")

import time

from time import sleep
from flask import Flask, abort, jsonify
from flask_cors import CORS

# key=name value=port
GPIO_mappings = {
    'EG-1': 32,
    'EG-2': 18,
    'EG-3': 12,
    'EG-4': 16,
    'OG-1': 37,
    'OG-2': 11,
    'OG-3': 23,
    'OG-4': 36,
    }

GPIO_states = {} # key=port value=0|1 (on|off)
GPIO.setmode(GPIO.BOARD)
for key, value in GPIO_mappings.items():
    print("initialize GPIO " + key + " - " + str(value))
    GPIO.setup(value, GPIO.OUT)
    GPIO_states[value] = 0

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
    return "Relay Control"

@app.route('/switch', methods=['GET'])
def switch_status():
    return jsonify(GPIO_states)

@app.route('/switch/<string:id>/on', methods=['POST'])
def switch_on(id):
    if id in GPIO_mappings:
        port = GPIO_mappings[id]
        GPIO.output(port, False)
        GPIO_states[port] = 1
        return jsonify({'id': id})

    abort(404) # not found

@app.route('/switch/<string:id>/off', methods=['POST'])
def switch_off(id):
    if id in GPIO_mappings:
        port = GPIO_mappings[id]
        GPIO.output(port, True)
        GPIO_states[port] = 0
        return jsonify({'id': id})

    abort(400)

if __name__ == '__main__':
    app.run(debug=True)

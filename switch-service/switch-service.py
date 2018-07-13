
try:
    import RPi.GPIO as GPIO
except RuntimeError:
    print("Error importing RPi.GPIO!  This is probably because you need superuser privileges.  You can achieve this by using 'sudo' to run your script")

import time

from time import sleep
from flask import Flask, abort, jsonify

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

GPIO.setmode(GPIO.BOARD)
for key, value in GPIO_mappings.iteritems():
    print("initialize GPIO " + key + " - " + str(value))
    GPIO.setup(value, GPIO.OUT)

app = Flask(__name__)

@app.route('/')
def index():
    return "Relay Control"

@app.route('/switch-on/<string:id>', methods=['POST'])
def switch_on(id):
    if id in GPIO_mappings:
        GPIO.output(GPIO_mappings[id], False)
        return jsonify({'id': id})

    abort(404) # not found

@app.route('/switch-off/<string:id>', methods=['POST'])
def switch_off(id):
    if id in GPIO_mappings:
        GPIO.output(GPIO_mappings[id], True)
        return jsonify({'id': id})

    abort(400)

if __name__ == '__main__':
    app.run(debug=True)

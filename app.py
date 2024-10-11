import os
from flask import Flask, jsonify, request, abort
from flask_cors import CORS, cross_origin
import timeit
import threading

app = Flask(__name__)

#CORS(app)
#CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True, allow_headers=["Authorization"])

@app.route("/")
def index():
    return "index"


@app.route("/health-check", methods=["GET"])
def health_check():
    return "healthy"


@app.route("/msg", methods=["POST"])
def msg():
    """
    Process an incoming message and generate a response.

    This function parses the incoming message from a JSON request,
    generates a response using the `generate_answer` function,
    logs the interaction, and returns the response in JSON format.

    Returns:
        tuple: A tuple containing a JSON response and an HTTP status code.
               The JSON response includes the following fields:
               - recipient_id: The ID of the message recipient "None" (type: str)
               - text: The text of the response message (type: str)
               - codificacion: Answer with or without image "0"/"1" (type: str)
               - img_url: The URL of the image associated with the response (type: str)
               - api_it: The API interaction type "None" (type: str)
               - next_msg: The next message to be sent (type: str)
               - audio_url: The URL of the audio response (type: str)
               - conversation_status: The status of the conversation (type: str)
               - duration_audio: The duration of the audio response (type: str)
               - msg_polly: The Polly-processed message (type: str)

    Raises:
        400: Bad Request if an error occurs during processing.
    """
    data = request.json
    print(data)
    result_json = { 
        "text": "Este es un mensaje de prueba el principal",
        "audio_url": r"https://dn720308.ca.archive.org/0/items/chrono-trigger-corridors-of-time-square-1995-snes/%C2%ABChrono%20Trigger%C2%BB%20-%20Corridors%20of%20Time%20%28Square%2C1995%2CSNES%29.mp3",
        "fragment_distance": [
            ['TEXTO POR DEFECTO','Libro_test.pdf', 1, 1,'https://manybooks.net/titles/poeedgaretext00poe1v10.html'],
            ['TEXTO POR DEFECTO','Libro_test.pdf', 2, 1,'https://manybooks.net/titles/poeedgaretext00poe1v10.html'],
            ['TEXTO POR DEFECTO','Libro_test.pdf', 3, 1,'https://manybooks.net/titles/poeedgaretext00poe1v10.html']
        ]
    }
    if data["generateAudio"] == "0":
        result_json["audio_url"]= None

    if data["message"] == "none":
        result_json["fragment_distance"] = "None"

    return jsonify(result_json), 200

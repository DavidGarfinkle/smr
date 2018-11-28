import os
from flask import Flask, request, Response, jsonify, send_from_directory
from flask_cors import CORS

from server.exceptions import *

app = Flask(__name__)
CORS(app)
app.config.from_object("config")

@app.route("/<path>")
def angular_src(path):
    return send_from_directory(app.config["ANGULAR"], path)

@app.route("/")
def root():
    return search()

@app.route("/search")
def search():

    if "text/html" in request.accept_mimetypes:
        return send_from_directory(app.config["ANGULAR"], "index.html")

    if request.accept_mimetypes.accept_json:
        return search_json()

def search_json():
    from server.controllers.search import search_controller

    music_encoding = request.args.get('encoding')
    query_string = request.args.get('query')

    app.logger.info("Got request with query: \n{}".format(query_string))
    try:
        results = search_controller(music_encoding, query_string)
    except BadQueryError as e:
        return e.html_response, e.status_code

    app.logger.info("Jsonifying results...")
    jsonresults = jsonify(results)

    app.logger.info("Returning application/json")
    return jsonresults

@app.route("/piece/<piece_name>")
def get_piece(piece_name):
    from server.controllers.piece import piece_excerpt_svg, highlighted_excerpt_xml

    if not request.args.get("n"):
        return send_from_directory(app.config["PALESTRINA_XML"], "{}.mid.xml".format(piece_name))

    # TODO application/svg appears in accept_mimetypes even when not declared by requesting client?
    #if "application/svg" in request.accept_mimetypes:
    #    return piece_excerpt_svg()

    # Assuming unique piece names...
    found = ""
    for root, dirs, files in os.walk(os.path.join(app.config["DATABASE_PATH"], "music")):
        for f in files:
            cur = f.split('.')[0]
            if piece_name == cur:
                found = os.path.join(root, f)

    print("CAN YOU SEE ME")
    print(found)
    return Response(
        highlighted_excerpt_xml(found, note_indices = request.args.get("n").split(","), color = request.args.get("c")),
        mimetype="application/xml")

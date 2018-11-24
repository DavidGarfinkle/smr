import os
from flask import Flask, request, jsonify, send_from_directory

from server.exceptions import *

app = Flask(__name__)
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
        print("Yes")
        print(app.config["ANGULAR"])
        return send_from_directory(app.config["ANGULAR"], "index.html")

    if request.accept_mimetypes.accept_json:
        return search_json()

def search_json():
    from server.controllers.search import search_controller

    music_encoding = request.args.get('encoding')
    query_string = request.args.get('query')

    app.logger.info("Got request with query: \n{}".format(query_string))
    try:
        results = search_controller(music_encoding, query_string, app.config["PALESTRINA_VECTOR_INDEXED"])
    except BadQueryError as e:
        return e.html_response, e.status_code

    app.logger.info("Jsonifying results...")
    jsonresults = jsonify(results)

    app.logger.info("Returning application/json")
    return jsonresults

@app.route("/piece/<piece_name>")
def get_piece(piece_name):
    from server.controllers.piece import piece_excerpt_svg, piece_excerpt_xml

    if not request.args.get("n"):
        return send_from_directory(app.config["PALESTRINA_XML"], "{}.mid.xml".format(piece_name))

    if "application/svg" in request.accept_mimetypes:
        return piece_excerpt_svg()

    return Response(
        highlighted_excerpt_xml(piece_name, note_indices = request.args.get("n"), color = request.args.get("c")),
        mimetype="application/xml")

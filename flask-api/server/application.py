from flask import Flask, request, jsonify

from server.controllers.search import search_controller

app = Flask(__name__)
app.config.from_object("config")

@app.route("/search")
def search():
    input_type = request.args.get('input_type')
    query_string = request.args.get('query_string')

    results = search_controller(input_type, query_string, app.config["MUSIC_FILES"])

    return jsonify(results)

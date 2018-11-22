from flask import Flask, request, jsonify, send_from_directory

ANGULAR = "../../angular-app/dist/angular-app"

app = Flask(__name__, static_folder=ANGULAR, template_folder=ANGULAR)
app.config.from_object("config")

@app.route("/<path>")
def angular_src(path):
        return send_from_directory(ANGULAR, path)

@app.route("/search")
def search():
    if (request.headers.get("accept") == "application/json"):
        return search_json()

    return send_from_directory(ANGULAR, "index.html")

def search_json():
    from server.controllers.search import search_controller

    music_encoding = request.args.get('music_encoding')
    query_string = request.args.get('query_string')

    results = search_controller(input_type, query_string, app.config["MUSIC_FILES"])

    return jsonify(results)

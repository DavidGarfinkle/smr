from flask import Flask
from flask import request

from server.controllers import search

app = Flask(__name__)
app.config.from_object("config")

@app.route("/search")
def search():
    input_type = request.args.get('input_type')
    query_string = request.args.get('query_string')

    return search(input_type, query_string, app.config["MUSIC_FILES"])

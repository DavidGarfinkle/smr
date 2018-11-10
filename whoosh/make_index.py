import os
from whoosh.fields import Schema, STORED, ID, KEYWORD, TEXT
from whoosh.index import create_in

INDEX_PATH = "/usr/share/smr-db/whoosh-index"

schema = Schema(title=TEXT(stored=True), content=TEXT, path=ID(stored=True), tags=KEYWORD, icon=STORED)

if not os.path.exists(INDEX_PATH):
    os.mkdir(INDEX_PATH)
ix = create_in(INDEX_PATH, schema)


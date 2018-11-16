import os
import music21
from whoosh.fields import Schema, STORED, ID, KEYWORD, TEXT
from whoosh.index import create_in

us = music21.environment.UserSettings()
us.restoreDefaults()

DATA_PATH = os.path.abspath(os.path.join(os.sep, 'usr', 'share', 'smr-db'))
INDEX_PATH = os.path.join(DATA_PATH, 'whoosh-index')

schema = Schema(title=TEXT(stored=True), content=STORED, path=ID(stored=True), tags=KEYWORD)

if not os.path.exists(INDEX_PATH):
    os.mkdir(INDEX_PATH)
ix = create_in(INDEX_PATH, schema)

writer = ix.writer()

# PALESTRINA MASSES
palestrina_path = os.path.join(DATA_PATH, 'palestrina-masses-xml')
palestrina_masses = os.listdir(palestrina_path)
for mass in palestrina_masses:
    with open(os.path.join(palestrina_path, mass), 'r') as f:
        xml = f.read()
    writer.add_document(
        title=mass,
        content=xml,
        path=os.path.join(palestrina_path, mass),
        tags="mass,palestrina"
    )


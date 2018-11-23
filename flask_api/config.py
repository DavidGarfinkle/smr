import os

# basedir is one level up from flask-api/config.py
BASEDIR = os.path.join(os.path.abspath(os.path.dirname(__file__)), os.path.pardir)

DEBUG = True

PALESTRINA_VECTOR_INDEXED = "/usr/share/smr-db/palestrina-masses-vectors"
PALESTRINA_XML = "/usr/share/smr-db/palestrina-masses-xml"

static_folder = os.path.join(BASEDIR, "angular-app", "dist", "angular-app")
STATIC_FOLDER = os.path.join(BASEDIR, "angular-app", "dist", "angular-app")
TEMPLATES_FOLDER = STATIC_FOLDER
ANGULAR = os.path.join(BASEDIR, "angular_app", "dist", "angular-app")

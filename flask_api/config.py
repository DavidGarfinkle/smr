import os

# basedir is one level up from flask-api/config.py
smr_basedir = os.path.join(os.path.abspath(os.path.dirname(__file__)), os.path.pardir)

DEBUG = True

MUSIC_FILES = "/usr/share/smr-db/palestrina-masses-vectors"

static_folder = os.path.join(smr_basedir, "angular-app", "dist", "angular-app")
STATIC_FOLDER = os.path.join(smr_basedir, "angular-app", "dist", "angular-app")
TEMPLATES_FOLDER = STATIC_FOLDER
ANGULAR = os.path.join(smr_basedir, "angular-app", "dist", "angular-app")

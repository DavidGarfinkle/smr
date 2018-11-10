import os

# basedir is one level up from flask-api/config.py
basedir = os.path.join(os.path.abspath(os.path.dirname(__file__)), os.path.pardir)

DEBUG = True

MUSIC_FILES = "/usr/share/smr-db/Palestrina"

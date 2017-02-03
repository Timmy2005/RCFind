from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import os

ON_HEROKU = os.environ.get('ON_HEROKU')

if ON_HEROKU:
    # get the heroku port
    port = int(os.environ.get('PORT', 17995))  # as per OP comments default is 17995
    on_heroku = True
else:
    port = 3000
    on_heroku = False
app = Flask(__name__)
app.config.from_object('config')
db = SQLAlchemy(app)

from app import views, models

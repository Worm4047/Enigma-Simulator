from flask import Flask

app = Flask(__name__)
from app import routes
app.config['TEMPLATES_AUTO_RELOAD'] = True
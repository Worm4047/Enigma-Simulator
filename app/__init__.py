from flask import Flask

global app
def create_app():
	global app
	try:
		app
		return app
	except:
		app = Flask(__name__)
		return app

from app import routes
from flask import render_template, request, json
from app import app
from Enigma import Enigma

obj = ''
r1,r2,r3 = '', '', ''
p1,p2,p3 = '', '', ''

@app.route('/')
@app.route('/index')
def index():
	return render_template("index.html")

@app.route('/encrypt', methods = ['POST'])
def encrypt():
	global obj
	if request.method == 'POST':
		ch=request.json['data']
		encryptCh = obj.processChar(ch)
		data = getRotorInfo()
		print(data)
		return json.dumps({'ch':encryptCh, 'data':data})

@app.route('/getRotorInfo', methods = ['GET'])
def getRotorInfo():
	setupMachine()
	data = getRotorInfo()
	print(data)
	return json.dumps({'data':data})

def getRotorInfo():
	global obj
	global r1,r2,r3,p1,p2,p3
	r1,r2,r3 = obj.r1.rotorNo,obj.r2.rotorNo,obj.r3.rotorNo
	p1,p2,p3 = obj.r1.position,obj.r2.position,obj.r3.position
	return json.dumps({'r1' : [r1,p1], 'r2' : [r2,p2], 'r3' : [r3,p3]})

def setupMachine():
	global obj
	obj = Enigma()
	obj.setRotors()
	data = getRotorInfo()
	return json.dumps(data)


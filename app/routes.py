from flask import render_template, request, json, Blueprint
from app import create_app
from Enigma import Enigma
app = create_app()
obj = ''
r1,r2,r3 = '', '', ''
p1,p2,p3 = '', '', ''
plugboard = ''

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
		return json.dumps({'ch':encryptCh, 'data':data})

@app.route('/getRotorInfo', methods = ['GET'])
def getInfo():
	setupMachine()
	data = getRotorInfo()
	print(data)
	return json.dumps({'data':data})


@app.route('/changerotor', methods = ['POST'])
def changerotor():
	curr =  request.json['curr']
	ids =  request.json['ids']
	data = replacerotor(curr, ids)
	return json.dumps({'data':data})

@app.route('/editrotor', methods = ['POST'])
def editrotor():
	value =  request.json['value']
	id =  request.json['id']
	data = editrotor(id, value)
	return json.dumps({'data':data})

@app.route('/scramble', methods = ['GET'])
def scramble():
	data = scramblePlugs()
	return json.dumps({'data':data})


@app.route('/editplugs', methods = ['POST'])
def editplugs():
	plugconns =  request.json['plugconns']
	data = editplugconns(plugconns)
	return json.dumps({'data':data})


def editplugconns(plugconns):
	global obj
	obj.editplugconns(plugconns)
	return getRotorInfo()
	


def scramblePlugs():
	global obj
	obj.scramblePlugs()
	return getRotorInfo()

def editrotor(id, value):
	global obj
	obj.editrotor(id, value)
	return getRotorInfo()

def replacerotor(curr, ids):
	global obj
	obj.replacerotor(curr, ids)
	return getRotorInfo()

def getPlugConnInfo():
	plugconns = []
	for item in obj.plugBoard.plugConnections:
		plugconns.append([item.c1, item.c2])
	return json.dumps(plugconns)

def getRotorInfo():
	global obj
	global r1,r2,r3,p1,p2,p3, plugboard
	r1,r2,r3 = obj.r1.rotorNo,obj.r2.rotorNo,obj.r3.rotorNo
	p1,p2,p3 = obj.r1.position,obj.r2.position,obj.r3.position
	plugconns = getPlugConnInfo()
	return json.dumps({'r1' : [r1,p1], 'r2' : [r2,p2], 'r3' : [r3,p3], 'plugconns' : plugconns})

def setupMachine():
	global obj
	global plugboard
	obj = Enigma()
	plugboard = obj.plugBoard
	obj.setRotors()
	data = getRotorInfo()
	return json.dumps(data)


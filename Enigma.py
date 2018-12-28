from random import randint
from math import *
from Rotor import Rotor
from EndStep import EndStep
from PlugBoard import PlugBoard
class Enigma:
	r1 = ''
	r2 = ''
	r3 = ''
	end = ''
	plugBoard = ''
	def __init__(self):
		self.end = EndStep()
		self.plugBoard = PlugBoard()

	def setRotors(self):
		rand1 = randint(0, 4)
		rand2 = randint(0, 4)
		while rand1 == rand2:
			rand2 = randint(0, 4)
		rand3 = floor(randint(0, 4))
		while rand1 == rand3 or rand2 == rand3:
			rand3 = randint(0,4)
		self.r1 = Rotor(rand1, randint(0,25))
		self.r2 = Rotor(rand2, randint(0,25))
		self.r3 = Rotor(rand3, randint(0,25))

	def runMachine(self,inp, flag=True):
		#inp is in the form of integers
		curr = inp
		# curr = self.plugBoard.run(curr)
		curr = self.r1.run(curr, flag)
		curr = self.r2.run(curr, flag)
		curr = self.r3.run(curr, flag)
		curr = self.end.run(curr, flag)
		curr = self.r3.run(curr, not flag)
		curr = self.r2.run(curr, not flag)
		curr = self.r1.run(curr, not flag)
		# curr = self.plugBoard.run(curr)
		self.moveRotors()
		# print(curr,self.r1.position, self.r2.position, self.r3.position)
		return curr

	def moveRotors(self):
		self.r1.position += 1
		if self.r1.position == 26:
			self.r1.position = 0
			self.r2.position += 1
			if self.r2.position == 26:
				self.r2.position = 0
				self.r3.position += 1
				if self.r3.position == 26:
					self.r3.position = 0

	def processChar(self, inp):
		li = 'abcdefghijklmnopqrstuvwxyz'
		ind = li.index(inp)
		retInd = self.runMachine(ind)
		return li[retInd]

	def processWord(self,inp,flag):
		res = ''
		for item in inp:
			res += processChar(item)
		return res

	def replacerotor(self,curr, ids):
		newRotorNo = randint(0, 4)
		while newRotorNo == curr or newRotorNo in ids:
			newRotorNo = randint(0, 4)
		if curr == self.r1.rotorNo:
			self.r1 = Rotor(newRotorNo, randint(0,25))
		elif curr == self.r2.rotorNo:
			self.r2 = Rotor(newRotorNo, randint(0,25))
		else:
			self.r3 = Rotor(newRotorNo, randint(0,25))

	def editrotor(self,curr, value):
		newRotorVal = value
		if curr == self.r1.rotorNo:
			self.r1.position = newRotorVal
		elif curr == self.r2.rotorNo:
			self.r2.position = newRotorVal
		else:
			self.r3.position = newRotorVal









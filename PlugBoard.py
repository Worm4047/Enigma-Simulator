from random import randint
from Plug import Plug
from PlugConnection import PlugConnection
class PlugBoard:
	plugPoints = []
	#size of plugs is 10
	plugConnections = []

	def __init__(self):
		self.plugPoints.clear()
		self.plugConnections.clear()
		for i in range(26):
			self.plugPoints.append(Plug(i))

		self.setPlugConnections()

	def setPlugConnections(self):
		li = []
		for i in range(10):
			ind1 = randint(0,25)
			while ind1 in li:
				ind1 = randint(0,25)
			li.append(ind1)
			ind2 = randint(0,25)
			while ind2 in li:
				ind2 = randint(0,25)
			li.append(ind2)
			self.plugConnections.append(PlugConnection(ind1, ind2, self.plugPoints[ind1], self.plugPoints[ind2]))

	def run(self, inp):
		for item in self.plugConnections:
			if inp == item.c1:
				return item.c2
			elif inp == item.c2:
				return item.c1
		return inp

	def editplugconns(self, plugconns):
		li = 'abcdefghijklmnopqrstuvwxyz'
		self.plugConnections.clear()
		for item in plugconns:
			print(item[0], item[1])
			ind1 = li.index(item[0])
			ind2 = li.index(item[1])
			self.plugConnections.append(PlugConnection(ind1, ind2, self.plugPoints[ind1], self.plugPoints[ind2]))






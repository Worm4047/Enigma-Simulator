from Plug import Plug
class PlugConnection:
	c1,c2 = '',''
	p1,p2 = '',''
	def __init__(self, c1,c2,p1,p2):
		self.c1, self.c2 = c1, c2
		self.p1, self.p2 = Plug(p1), Plug(p2)

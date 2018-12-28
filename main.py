from Enigma import Enigma

def encode(obj, word):
	print("Encrypting")
	res = obj.processWord(word, True)
	print(res)
	return res

def decode(obj, cipher):
	print("Decrypting")
	res = obj.processWord(cipher, True)
	print(res)

if __name__ == '__main__':

	word = 'abhishekchaudhary'
	cipher = 'cxymt'
	obj = Enigma()
	obj.setRotors()
	print("Rotor Numbers :: ", obj.r1.rotorNo,obj.r2.rotorNo,obj.r3.rotorNo)
	print("Rotor Positions :: ", obj.r1.position,obj.r2.position,obj.r3.position)
	p1,p2,p3 = obj.r1.position,obj.r2.position,obj.r3.position
	cipher = encode(obj, word)
	obj.r1.position, obj.r2.position, obj.r3.position = p1,p2,p3
	decode(obj, cipher)
	

	

# Enigma Simulator

![Enigma](https://miro.medium.com/max/2100/0*Qz8F37xF4002MS1f)
[Live Demo](https://enigmasim.herokuapp.com/)
# What is Enigma
Basically, an encryption device used during world war by Germans.
The main units consist of a keyboard, the scrambler unit and the lamp board. 
The encoding is done in the scrambler unit. It holds a number of rotors with 26 contacts (A-Z) left and right of the rotor. 
Each left contact is connected to a contact on the right by an internal wiring scheme. 
Rotors are connected with each other by sliding contacts. A reflecting rotor mirrors the connection backwards. 
Depending on the relative position of the rotors, a current flows on a certain path from right to left through all the rotors is 
reflected and passed back to the right side. The entry point corresponds to a letter in plain text, the exit point accordingly to a 
letter in the ciphertext.

# Working Of Enigma
![Enigma](https://miro.medium.com/max/716/0*3BRcWAFC7ktMscb6.gif)
<br>
When a key is pressed the rightmost rotor moves 1/26th of a rotation. 
Like in a clock, after a full rotation of the first rotor, the next rotor moves 1/26th of the rotation and so on.
The rotation of the rotor ensures that the same character entered twice will yield a different character in the ciphertext each time.
As each rotor has 26 divisions and rotors are independent. 
we get <b>26x26x26 = 17,576 </b> possible starting states.
The three rotors are chosen from a set of five rotors and can be put at any location. Which gives us 60 possible choices of rotors and for each choice, we have 17,576 starting states giving us 17,576x60 = 1,054,560 possibilities.
Even after this, the Germans were like — “Meh !”.
So to increase the security plug connections were included which swapped the value of the input. Suppose you press A and A is plugged with E so input goes into the machine as E. Now suppose output comes as C and C is plugged to T, the output comes as T and not as C.
The possible combinations obtained ( by use of some heavy mathematics ) are :
<b>(26!)/(10!*6!*²¹⁰) * 1,054,560 </b>
Which gives us the total number of possible settings of an enigma machine 1.58*1⁰²⁰.
# How to use the Enigma Simulator
By using the reflecting rotor, the handling of the machine is simplified. If A is encoded to say E, then the reverse is also true. Therefore the same machine can be used for encoding and decoding without any rewiring necessary.
To decrypt a message, one needs not only an Enigma machine, but also the knowledge of the starting state, i.e. at which positions the wheels were when the text was typed in. To decrypt the message, the machine must be set to the same starting state, and the cipher text is entered. Output is the plain text.
[Enigma](https://enigmasim.herokuapp.com/)
<br>
Note the settings before typing your message — You’ll need them to decrypt the text on the receiver side.
Enter your text message and at the end note down your ciphertext. While you type your text message, you will see the rotor pointer increasing.
Open the simulator again( Yes, that means reload).
<br>
Ensure the same settings are applied to rotors and plugboard i.e click on the rotor name to change it, change the pointer value by editing the value inside the input field. Also, change the plug connections.
After all, is done, enter the ciphertext again. You will be able to get your original message back.
<br>
As an exercise decode this message : xrjyzwnvezjs
<br />
Settings:
- Rotor name = 0,1,2
- Rotor pointers = 1,2,3
- Plug Connections = a b, c d, e f, g h, i j, k l, m n ,o p ,q r, s t

import os
from Crypto.Util.number import bytes_to_long

with open('message.enc', mode='rb') as file:
    bin = file.read()
    dec = bytes_to_long(bin)
    print("decimal\n", dec)
    print("hex\n", hex(dec))

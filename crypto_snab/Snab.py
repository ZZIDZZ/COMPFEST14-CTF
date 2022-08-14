from Crypto.Util.number import*

# s = (p + q) ^ 2
# n = p * q
# a = (s^3) mod r
# b = r(s - q(2p + q))
e = 65537
s = pow(p + q, 2)
n = p*q
a = pow(s, 3, r)
b = (s - q*(2*p + q))*r

m_list = "flag"

c_list = []
for i in range(len(m_list)):
    m = bytes_to_long(m_list[i])
    c = pow(m*r, e, n)

    c_list.append(c)

output = open("output.txt", "w")
output.writelines([str(i) + "\n" for i in [e, s, n, a, b, c_list]])
output.close()

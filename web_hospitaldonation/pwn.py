from aiohttp import request
import requests

host = "http://103.185.38.238:15193/"

req = requests.post(host+"donate", json={
    "items": [{
        "id": 4,
        "quantity": "10.01E23"
    }
    ]})

print(req.text)
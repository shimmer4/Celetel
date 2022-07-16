from urllib import request
import requests, json

res = requests.get('https://jsonplaceholder.typicode.com/todos')

with open('fast_api/data.json', 'w') as f:
    dump_data = json.loads(res.text)
    json.dump(dump_data, f, indent=4)

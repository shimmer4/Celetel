from fastapi import FastAPI
import uvicorn
import json

app = FastAPI()

# this json data remains constant and requires no updation so we can store it globally instead of calling it at every request 
with open('fast_api/data.json', 'r') as f:
    file_data = json.load(f)

@app.get("/")
def root():
    return file_data # returns all the data at root adress

@app.get("/id/{id}")
def item(id):
    
    # finding todo with the specific id from the list
    for todo in file_data:
        if todo['id'] == int(id): # because 'id' is a string
            return todo
    
    return {'error' : 'not found'}

uvicorn.run(app, host="127.0.0.1", port=8000)
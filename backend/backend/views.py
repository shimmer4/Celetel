from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
import os, json, time

from backend.components import dump_data_to_db, validate_login, forgor

os.system('cls')

# - # - # - # - # - # - # - # - # - # - 

@csrf_exempt
def index(request):
    return HttpResponse("backend is up")

# - # - # - # - # - # - # - # - # - # - 

@csrf_exempt
def login(request):
    if request.method == 'POST':
        os.system('cls')
        print("[LOG] POST request made")
        data = json.loads( request.body )
        print(f"login data --> {data}")

        res = validate_login(data)

        if res == True:
            return HttpResponse("login successful")
        else: return HttpResponse(res)

    return HttpResponse("login page")

# - # - # - # - # - # - # - # - # - # - 

@csrf_exempt
def signup(request):
    if request.method == 'POST':
        os.system('cls')
        print("[LOG] POST request made")
        data = json.loads( request.body )
        print(f"signup data --> {data}")

        res = dump_data_to_db(input_data = data, type='signup')

        if res == True:
            return HttpResponse("signup successful")
        else:
            return HttpResponse(res)

    return HttpResponse("signup page")

# - # - # - # - # - # - # - # - # - # - 

@csrf_exempt
def forgot_password(request):
    if request.method == 'POST':
        os.system('cls')
        print("[LOG] POST request made")
        data = json.loads( request.body )
        print(f"forgot password data --> {data}")

        res, email = forgor(data)
        if res == True:
            return HttpResponse(f"mail sent to : {email}")
        else: return HttpResponse("this username/email doesnt have an account yet")

    return HttpResponse("forgot password page")

# - # - # - # - # - # - # - # - # - # - 

@csrf_exempt
def update_password(request):
    if request.method == 'POST':
        os.system('cls')
        print("[LOG] POST request made")
        data = json.loads( request.body )
        print(f"update password data --> {data}")

        res = dump_data_to_db(input_data = data, type='update')

        if res == True:
            return HttpResponse("password updated")
        else:
            return HttpResponse(res)

    return HttpResponse("update password page")

# - # - # - # - # - # - # - # - # - # - 


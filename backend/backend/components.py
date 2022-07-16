import json
import smtplib, ssl
from email.message import EmailMessage

def dump_data_to_db(input_data, type):
    with open('user_data', 'r') as f:

        try: file_data = json.load(f) # read json data if a database exists
        except: file_data = [] # create a new database if the database doesnt exist

        if type == 'signup':
            print('validating signup info')
            if val_signup_info(input_data) == True:
                print('validated')
                # we dont need to store 'confirm-password'
                dump_data = {
                    'email' : input_data['email'],
                    'username' : input_data['username'],
                    'password' : input_data['password'],
                }
                file_data.append(dump_data)
            else: return val_signup_info(input_data)

        if type == 'update':
            user_exists = False  # checking if the user for who we need to update the password exists in the database
            for info in file_data:
                if (input_data['username'] == info["username"]) or (input_data['username'] == info["email"]): # user is found
                    user_exists = True
                    if info['password'] == input_data['old_password']: # the old_password is correct
                        info['password'] = input_data['new_password'] # password updated
                        print(info)
                    else: return "old_password is incorrect"
            if not user_exists: return f"user {input_data['username']} doesnt exist."

    with open('user_data', 'w') as f:
        json.dump(file_data, f, indent=4)

    return True


def val_signup_info(data):
    with open('user_data', 'r') as f:
        file_data = json.load(f)
    for info in file_data:
        if data['username'] == info['username']: return f"already a username '{info['username']}' exists."
        if data['email'] == info['email']: return "already an accounts exists on that email"

    if '@' not in data['email']: return "invalid email id"
    if data['password'] != data['confirm-password']: return "confirm password not the same as password"
    if len(data['password']) < 3: return "password length cannot be less than 3"
    if data['username'] == data['password']: return "username cannot be the same as password"
    return True


# - # - # - # - # - # - # - # - # - # - 


def validate_login(data):
    with open('user_data', 'r') as f:
        try: file_data = json.load(f)
        except: file_data = []

    if not file_data: return "some error occured while logging in (db is empty)"
    
    for info in file_data:
        if info['password'] == data['password'] and info['username'] == data['username']:
            return True
    
    return "wrong username or password"


# - # - # - # - # - # - # - # - # - # - 

def forgor(data):
    with open('user_data', 'r') as f:
        file_data = json.load(f)

    for info in file_data:
        if data['email'] == info['email'] or data['email'] == info['username']:
            send_mail(info['email'], info['password'])
            return (True, info['email'])
    
    else: return (False, "")




def send_mail(email, passw):
    print(f"sending mail to {email}")

    try:
        msg = EmailMessage()
        msg["From"] = "tempmaildevesh@gmail.com"
        msg["To"] = email
        msg["Subject"] = "Recover Password"
        msg.set_content(f"your password is : {passw}")

        context=ssl.create_default_context()

        with smtplib.SMTP_SSL("smtp.example.com", port=587, context=context) as smtp:
            smtp.login(msg["From"], "password")
            smtp.sendmail(msg["From"], msg["To"], msg.as_string())

        print("email sent")

    except:
        print("couldnt send email")
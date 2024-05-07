from flask import Flask , render_template , request , jsonify
from classes import User
from db import get_users , signup
app = Flask(__name__)
app.secret_key = 'guywrffuwfuwg'

@app.route('/')
def welcome():
    return render_template("login.html")

@app.route('/login' , methods = ['POST'])
def log_in():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    if login_info_valid(username , password):
        return jsonify({'redirect' :f'home/{username}'})
    else: 
        return jsonify({'message': 'Wrong username or password'}), 400 
    
def login_info_valid(username , password):

    users_list = get_users()
    return any(user.username == username and user.password == password for user in users_list)
@app.route('/signup' , methods = ['POST'])
def sign_up():
    new_user = request.json 
    response =  signup_info_valid(new_user)
    if response == 'signed up suceesfully':
        signup(new_user)
    return jsonify({'message' : response}, 200)

def signup_info_valid(new_user):
    users_list = get_users()
    for user in users_list:
        if (user.username ==  new_user.get('username')):
            return "select a different username , this one is already used"
        if (user.email == new_user.get('email')):
            return "this email is linked to another account"
        if (user.phone == new_user.get('phone')):
            return "this phone number is linked to another account"
    return "signed up suceesfully"

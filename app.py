from flask import Flask , render_template , request
from db import get_users
app = Flask(__name__)
app.secret_key = 'guywrffuwfuwg'

@app.route('/')
def welcome():
    return render_template("login.html")

@app.route('/login')
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    if login_info_valid(username , password):
        return
    
def login_info_valid(username , password):
    
    users_list = get_users()
    return any(user.username == username and user.password == password for user in users_list)
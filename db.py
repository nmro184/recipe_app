import sqlite3
from classes import User
DB_NAME = "recipe.db"

def query(sql: str = "", data: tuple = ()):
    with sqlite3.connect(DB_NAME) as conn:
        cur = conn.cursor()
        return cur.execute(sql, data).fetchall()

def get_users():
    users_list =[]
    users_tuple_list = query("SELECT * FROM users ")
    for user in users_tuple_list:
       users_list.append(User(user))
    return users_list

def signup(new_user):
    data = (new_user.get('name') , new_user.get('email') , new_user.get('phone') , new_user.get('username') , new_user.get('password'))
    query("INSERT INTO users (name, email , phone, username , password) VALUES (?, ? ,? , ? , ?)", data)
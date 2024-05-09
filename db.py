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

def store_new_recipe(new_recipe):
    data = (new_recipe.get('image') , new_recipe.get('title') , new_recipe.get('description') , new_recipe.get('time') , new_recipe.get('difficulty'), new_recipe.get('kosher') , new_recipe.get('specialDescriptor') , new_recipe.get('author'))
    query("INSERT INTO recipes (image, title , description, time , difficulty , kosher , special , author) VALUES (?, ? ,? , ? , ? , ? , ? , ?)", data)
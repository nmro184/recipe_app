import sqlite3
from classes import User , Recipe
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

def get_recipes():
    recipes_list =[]
    recipes_tuple_list = query("SELECT * FROM recipes ")
    for recipe in recipes_tuple_list:
       recipes_list.append(Recipe(recipe))
    return recipes_list

def get_recipe(id):
    recipe = query(f"SELECT * FROM recipes WHERE id = {id}")
    return Recipe(recipe[0])

def delete_recipe(id):
    query(f"DELETE FROM recipes WHERE id = {id}")
    return True

def update_recipe(recipe_id , updated_recipe):
    data = (updated_recipe.get('image'), updated_recipe.get('title'), updated_recipe.get('description'), updated_recipe.get('time'), updated_recipe.get('difficulty'), updated_recipe.get('kosher'), updated_recipe.get('specialDescriptor'), updated_recipe.get('author'), recipe_id)
    query("UPDATE recipes SET image=?, title=?, description=?, time=?, difficulty=?, kosher=?, special=?, author=? WHERE id=?", data)
    return True
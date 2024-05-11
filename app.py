from flask import Flask , render_template , request , jsonify
from db import get_users , signup , store_new_recipe , get_recipes , get_recipe , delete_recipe

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

@app.route('/home/<username>')
def Home(username):
    return render_template("home.html" , username = username)

@app.route('/create_recipe/<username>')
def create_recipe(username):
    return render_template("create.html", username = username)

@app.route('/new_recipe' , methods =['POST'])
def new_recipe():
     new_recipe = request.json
     username = new_recipe.get('author')
     store_new_recipe(new_recipe)
     return jsonify({'redirect' : f'/home/{username}' })

@app.route('/get_all_recipes')
def get_all_recipes():
    recipes_tuple_list = get_recipes()
    recipes_list = []
    for recipe in recipes_tuple_list:
        recipes_list.append(recipe.to_dict())
    return jsonify({'recipes' : recipes_list}),200


@app.route('/recipe/<username>/<id>')
def recipe(username , id):
    return render_template("recipe.html" , id = id , username = username)

@app.route('/get_recipe/<id>')
def get_recipe_by_id(id):
    recipe = get_recipe(id)
    return jsonify({'recipe' : recipe.to_dict()})

@app.route('/delete/<id>')
def delete_recipe_by_id(id):
    delete_recipe(id)
    return jsonify({'message': 'Recipe deleted successfully'}), 200
import requests
import json
base_url = "http://127.0.0.1:5000"
from db import delete_recipe

username = "test"
def test_sign_up():
    form_data = {
    'name': 'test',
    'email': 'test@gmail.com',
    'phone': '0000000000',
    'username': 'test',
    'password': 'test123'
}
    headers = {'Content-Type': 'application/json'}
    response = requests.post(url = base_url+'/signup' , data=json.dumps(form_data) , headers= headers)
    assert response.status_code == 200


def test_create():
    test_recipe = {
        'image': 101010,
        'title': 'test',
        'description': 'test',
        'time': 'test',
        'difficulty': 'test',
        'kosher': False,
        'specialDescriptor': 'test',
        'author':'test'
    }
    headers = {'Content-Type': 'application/json'}
    response = requests.post(url = base_url+'/new_recipe' , data=json.dumps(test_recipe) , headers= headers)
    assert response.status_code == 200
    response = requests.get(url = base_url+'/get_all_recipes')
    recipes = response.json()['recipes']
    
    flag = False
    for recipe in recipes:
        if recipe['title'] == test_recipe['title']:
            flag = True
    assert flag == True
    


def test_delete():
    response = requests.get(url = base_url+'/get_all_recipes')
    recipes = response.json()['recipes']
    recipe_id = 0
    flag = False
    for recipe in recipes:
        if recipe['title'] == 'test':
            flag = True
            recipe_id = recipe['id']
    assert flag == True
    delete_recipe(recipe_id)
    response = requests.get(url = base_url+'/get_all_recipes')
    recipes = response.json()['recipes']
    flag = False
    for recipe in recipes:
        if recipe['title'] == 'test':
            flag = True
    assert flag == False
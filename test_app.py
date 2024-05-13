import requests
import json
base_url = "http://127.0.0.1:5000"


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
    recipe = {
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
    response = requests.post(url = base_url+'/new_recipe' , data=json.dumps(recipe) , headers= headers)
    assert response.status_code == 200
    response = requests.get(url = base_url+'/get_all_recipes')
    recipes = response.json()['recipes']
    for recipe in recipes:
        print('s')

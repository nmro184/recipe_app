from flask import Flask , render_template
app = Flask(__name__)
app.secret_key = 'guywrffuwfuwg'

@app.route('/')
def welcome():
    return render_template("login.html")
class User:
    def __init__(self , user_tuple):
        self.id =  user_tuple[0]
        self.name = user_tuple[1]
        self.email = user_tuple[2]
        self.phone = user_tuple[3]
        self.username = user_tuple[4]
        self.password = user_tuple[5]
       
    
    def to_dict(self):
        return {
            'id' : self.id,
            'name' : self.name,
            'username': self.username,
            'email': self.email,
            'phone' : self.phone,
        }
    
class Recipe:
    def __init__(self , recipe_tuple):
        self.id =  recipe_tuple[0]
        self.image = recipe_tuple[1]
        self.title = recipe_tuple[2]
        self.description = recipe_tuple[3]
        self.time = recipe_tuple[4]
        self.difficulty = recipe_tuple[5]
        self.kosher = recipe_tuple[6]
        self.special = recipe_tuple[7]
        self.author = recipe_tuple[8]

       
    
    def to_dict(self):
        return {
            'id' : self.id,
            'image' : self.image,
            'title': self.title,
            'description': self.description,
            'time' : self.time,
            'difficulty' : self.difficulty,
            'kosher' : self.kosher,
            'special' : self.special,
            'author' : self.author

        }
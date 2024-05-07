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
from bson.objectid import ObjectId


DEBUG = False
SECRET_KEY = 'dev'
MONGO_URI = 'mongodb://localhost:27017/feedbacker'


user_id1 = ObjectId()
product_id1 = ObjectId()
testimonial_id1 = ObjectId()


test_data = {
    'users': [
        {
            '_id': user_id1,
            'name': 'user1',
            'email': 'user1@mail.com'
        },
        {
            'name': 'user2',
            'email': 'user2@mail.com'
        },
        {
            'name': 'user3',
            'email': 'user3@mail.com'
        }
    ],
    'products': [
        {
            '_id': product_id1,
            'owner': user_id1,
            'name': 'Feedbacker'
        },
        {
            'owner': user_id1,
            'name': 'Awesome Product'
        }
    ],
    'testimonials': [
        {
            '_id': testimonial_id1,
            'product_id': product_id1,
            'title': 'Wow!',
            'body': 'I did not expect managing testimonials to be this easy!',
            'author': 'Faraaz B',
            'author_img': None
        }
    ]
}

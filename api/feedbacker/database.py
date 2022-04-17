from flask import current_app
from flask.cli import with_appcontext
from flask_pymongo import PyMongo
import click
from pprint import pprint
from pymongo.errors import ConnectionFailure, OperationFailure
from werkzeug.local import LocalProxy
from bson.objectid import ObjectId
from .config import test_data


class Database:
    def __init__(self, app):
        app.cli.add_command(init_db_command)
        self.client, self.db = self.connect(app)
        
    def connect(self, app, uri=None, *args, **kwargs):
        # print(app.json_encoder)
        mongodbc = PyMongo(app)
        client = mongodbc.cx
        db = mongodbc.db
        try:
            client.admin.command('ping')
            app.logger.info('Connected to the database server')
        except (ConnectionFailure, OperationFailure) as e:
            app.logger.error('Unable to connect to the database server')
            raise e
        
        return client, db

def get_db():
    if current_app.db is not None:
        return current_app.db
    return None

   
db = LocalProxy(get_db)


def init_db():
    if db is None:
        return False
    pprint(test_data)
    db.drop_collection('user')
    db.drop_collection('product')
    db.drop_collection('testimonial')
    db.user.insert_many(test_data['users'])
    db.product.insert_many(test_data['products'])
    db.testimonial.insert_many(test_data['testimonials'])


@click.command('init-db')
@with_appcontext
def init_db_command():
    """Clear the existing data and create new tables."""
    result = init_db()
    if result == False:
        click.echo('Please provide the database name as part of MONGO_URI')
        return None
    else:
        click.echo('Initialized the database.')


def get_user(id: ObjectId):
    return db.user.find_one_or_404({'_id': id})


def create_user(user):
    insert_result = db.user.insert_one(user)
    return insert_result.inserted_id


def get_products_by_owner(user_id: ObjectId):
    products = list(db.product.find({'owner': user_id}))
    for product in products:
        product['testimonials'] = db.testimonial.count_documents({'product_id': product['_id']})
        product['testimonials_starred'] = db.testimonial.count_documents({'product_id': product['_id'], 'starred': True})
    return products


def get_product(id: ObjectId):
    return db.product.find_one_or_404({'_id': id})


def create_product(product):
    insert_result = db.product.insert_one(product)
    if insert_result.inserted_id:
        return get_product(insert_result.inserted_id) 


def update_product(id: ObjectId, product):
    update_result = db.product.update_one({'_id': id}, product)
    if update_result.modified_count == 1:
        return get_product(id)


def get_testimonial(id: ObjectId):
    return db.testimonial.find_one_or_404({'_id': id})


def get_testimonials(product_id: ObjectId):
    return list(db.testimonial.find({'product_id': product_id}))

   
def create_testimonial(testimonial):
    insert_result = db.testimonial.insert_one(testimonial)
    return insert_result.inserted_id


def update_testimonial(id: ObjectId, testimonial):
    update_result = db.testimonial.update_one({'_id': id}, {'$set': testimonial})
    if update_result.modified_count == 1:
        return get_testimonial(id) 


def delete_testimonial(id: ObjectId):
    delete_result = db.testimonial.delete_one({'_id': id})
    if delete_result.deleted_count == 1:
        return True
    return False

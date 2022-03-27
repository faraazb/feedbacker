from flask import jsonify, request, Blueprint
from feedbacker import database as db
from bson.objectid import ObjectId


products = Blueprint('products', __name__, url_prefix = '/products')


@products.route('/<ObjectId:id>', methods=['GET', 'PATCH'])
def product(id: ObjectId):
    if request.method == 'GET':
        return jsonify(db.get_product(id))
    elif request.method == 'PATCH':
        return db.update_product(id, request.json)


@products.route('/', methods=['POST'])
def create_product():
    data = request.json
    product = {
        'name': data['name'],
        'owner': data['user_id']
    }
    return jsonify(db.create_product(product))


@products.route('/<ObjectId:product_id>/testimonials', methods=['GET', 'POST'])
def testimonials(product_id: ObjectId):
    if request.method == 'GET':
        return jsonify(db.get_testimonials(product_id))
    elif request.method == 'POST':
        data = request.json
        testimonial = {
            'product_id': product_id,
            'title': data['title'],
            'body': data['body'],
            'author': data['author'],
            'author_img': data['author_img'],
            'starred': data['starred']
        }
        return jsonify(db.create_testimonial(testimonial))

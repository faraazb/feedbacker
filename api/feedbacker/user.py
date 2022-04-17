from flask import jsonify, Blueprint, request
from feedbacker import database as db
from bson.objectid import ObjectId


users = Blueprint("user", __name__, url_prefix='/users')


@users.route('/<ObjectId:user_id>', methods=['GET'])
def user(user_id: ObjectId):
    return jsonify(db.get_user(user_id))


@users.route('/', methods=['POST'])
def create_user():
    data = request.json
    user = {
        'name': data['name'],
        'email': data['email']
    }
    return jsonify(db.create_user(user))


@users.route('/<ObjectId:user_id>/products', methods=['GET'])
def get_products(user_id: ObjectId):
    return jsonify(db.get_products_by_owner(user_id))
from flask import jsonify, request, Blueprint
from feedbacker import database as db
from bson.objectid import ObjectId


testimonials = Blueprint('testimonials', __name__, url_prefix='/testimonials')


@testimonials.route('/<ObjectId:id>', methods=['GET', 'PATCH', 'DELETE'])
def testimonial(id: ObjectId):
    if request.method == 'GET':
        return jsonify(db.get_testimonial(id))
    elif request.method == 'PATCH':
        return jsonify(db.update_testimonial(id, request.json))
    elif request.method == 'DELETE':
        return jsonify(success=db.delete_testimonial(id))

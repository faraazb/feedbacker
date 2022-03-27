import os
from flask import Flask
from flask_cors import CORS
from logging.config import dictConfig


dictConfig({
    'version': 1,
    'disable_existing_loggers': True,
    'formatters': {
        'custom': {
            'format': '[%(asctime)s] %(levelname)s in %(module)s: %(message)s',
        },
        'default': {
            'format': '%(message)s',
        }
    },
    'handlers': {
        'feedbacker': {
            'class': 'logging.StreamHandler',
            'formatter': 'custom'
        },
        'wsgi': {
            'class': 'logging.StreamHandler',
            'stream': 'ext://flask.logging.wsgi_errors_stream',
            'formatter': 'default'
        }
    },
    'root': {
        'level': 'INFO',
        'handlers': ['feedbacker']
    }
})


def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config = True)
    CORS(app)
    
    from feedbacker import config
    app.config.from_object(config)

    if test_config is None:
        # load the instance config, if it exists, when not testing
        app.config.from_pyfile('config.py', silent = True)
    else:
        # load the test config if passed in
        app.config.from_mapping(test_config)

    # ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass
    
    from .utils import JSONEncoder
    app.json_encoder = JSONEncoder
    
    from .database import Database
    mongodbc = Database(app)
    app.mongo, app.db = mongodbc.client, mongodbc.db
    
    from .user import users
    from.product import products
    from .testimonial import testimonials
    
    app.register_blueprint(users)
    app.register_blueprint(products)
    app.register_blueprint(testimonials)

    @app.route('/', methods=['GET'])
    def health():
        return 'OK'

    return app

import os

from flask import Flask
from flask_cors import CORS
from axa_pricing_app import db


def create_app():
    app = Flask(__name__)
    CORS(app)

    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///quotes.db'
    app.config['UPLOAD_FOLDER'] = os.path.join(app.root_path, '../../documents')

    db.init_app(app)

    with app.app_context():
        from axa_pricing_app.routes import bp as quotes_bp
        app.register_blueprint(quotes_bp)
        db.create_all()

    return app


if __name__ == '__main__':
    app = create_app()
    app.run(host="0.0.0.0", port=5000, debug=True)

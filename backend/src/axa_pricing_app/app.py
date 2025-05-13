from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    CORS(app)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///quotes.db'
    app.config['UPLOAD_FOLDER'] = 'documents'
    db.init_app(app)

    with app.app_context():
        from axa_pricing_app.routes import bp as quotes_bp
        app.register_blueprint(quotes_bp)
        db.create_all()
        os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)

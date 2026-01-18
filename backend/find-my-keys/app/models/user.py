from .. import db

class User(db.Model):
    """
    Database model for a user.

    Attributes:
        id (int): Unique identifier for the user.
        email (str): Email address of the user (unique).
        name (str): Name of the user.
        password (str): Hashed password of the user.
        theme (str): User's preferred theme ('light' or 'dark').
        objects (list[Object]): One-to-many relationship with the Object model.
    """
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    name = db.Column(db.String(100), nullable=False)
    password = db.Column(db.String(60), nullable=False)
    theme = db.Column(db.String(10), default='light')
    objects = db.relationship('Object', backref='owner', lazy=True)
from .. import db

class Object(db.Model):
    """
    Database model for an object.

    Attributes:
        id (int): Unique identifier for the object.
        name (str): Name of the object.
        type (str): Type of the object (Phone, Wallet, Keys, Water Bottle, Watch, or Glasses).
        user_id (int): Foreign key referencing the associated user.
        images (list[Image]): One-to-many relationship with the Image model.
    """
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    type = db.Column(db.String(100), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    images = db.relationship('Image', backref='object', lazy=True)
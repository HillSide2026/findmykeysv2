from .. import db

class Image(db.Model):
    """
    Database model for an image.

    Attributes:
        id (int): Unique identifier for the image.
        image_url (str): URL of the image.
        user_object_id (int): Foreign key referencing the associated user object.
    """
    id = db.Column(db.Integer, primary_key=True)
    image_url = db.Column(db.String(120), nullable=False)
    user_object_id = db.Column(db.Integer, db.ForeignKey('object.id'), nullable=False)
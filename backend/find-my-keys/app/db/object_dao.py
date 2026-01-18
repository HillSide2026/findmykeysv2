from .. import db
from ..models import Object, Image
from .image_dao import ImageDAO

class ObjectDAO:
    @staticmethod
    def add_object(name: str, object_type: str, owner) -> Object:
        """
        Adds a new object to the database.

        Args:
            name (str): The name of the object.
            object_type (str): The type of the object (Phone, Wallet, Keys, Water Bottle, Watch, or Glasses).
            owner: The owner of the object, typically a user instance.

        Returns:
            Object: The newly created Object instance.
        """
        new_object = Object(name=name, type=object_type, user_id=owner.id)
        db.session.add(new_object)
        db.session.commit()
        return new_object

    @staticmethod
    def get_objects_by_user(user_id: int) -> list:
        """
        Retrieves all objects associated with a specific user ID.

        Args:
            user_id (int): The ID of the user to retrieve objects for.

        Returns:
            list: A list of Object instances associated with the given user ID.
        """
        return Object.query.filter_by(user_id=user_id).all()

    @staticmethod
    def get_object_by_id(object_id: int, user_id: int) -> Object:
        """
        Retrieves a specific object by its ID and user ID.

        Args:
            object_id (int): The ID of the object to retrieve.
            user_id (int): The ID of the user who owns the object.

        Returns:
            Object: The Object instance if found, otherwise None.
        """
        return Object.query.filter_by(id=object_id, user_id=user_id).first()

    @staticmethod
    def delete_object(object_id: int, user_id: int) -> None:
        """
        Deletes an object and its associated images from the database and S3 storage.

        Args:
            object_id (int): The ID of the object to retrieve.
            user_id (int): The ID of the user who owns the object.

        Returns:
            None
        """
        images = Image.query.filter_by(user_object_id=object_id).all()
        
        for image in images:
            ImageDAO.delete_image_from_s3(image.image_url)
            db.session.delete(image)
        
        db.session.delete(ObjectDAO.get_object_by_id(object_id, user_id))
        db.session.commit()

    @staticmethod
    def edit_object(object_to_edit: Object, type: str, name: str) -> None:
        """
        Edits the details of an existing object.

        Args:
            object_to_edit (Object): The object to edit.
            type (str): The new type for the object.
            name (str): The new name for the object.

        Returns:
            None
        """
        object_to_edit.name = name
        object_to_edit.type = type
        db.session.commit()
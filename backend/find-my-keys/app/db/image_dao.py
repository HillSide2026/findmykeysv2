from .. import db
from ..models import Image
from ..utils import upload_file, delete_image, generate_presigned_url

class ImageDAO:
    @staticmethod
    def add_image(object_id: int, image_file: str) -> str:
        """
        Uploads an image and adds it to the database.

        Args:
            object_id (int): The ID of the user object to associate with the image.
            image_file (str): The file path of the image to upload.

        Returns:
            str: The newly created image link if the upload is successful, otherwise None.
        """
        image_url = upload_file(image_file)
        if image_url:
            new_image = Image(image_url=image_url, user_object_id=object_id)
            db.session.add(new_image)
            db.session.commit()
            return new_image
        return None

    @staticmethod
    def get_images_by_object_id(object_id: int) -> list:
        """
        Retrieves all images associated with a specific user object ID.

        Args:
            object_id (int): The ID of the user object to retrieve images for.

        Returns:
            list: A list of Image objects associated with the given user object ID.
        """
        return Image.query.filter_by(user_object_id=object_id).all()

    @staticmethod
    def delete_image_from_s3(image_url: str) -> None:
        """
        Deletes an image from S3 storage.

        Args:
            image_url (str): The URL of the image to delete.

        Returns:
            None
        """
        delete_image(image_url)

    @staticmethod
    def get_presigned_url_from_s3_url(s3_url: str, expiration: int = 3600) -> str:
        """
        Generates a presigned URL for an S3 object.

        Args:
            s3_url (str): The S3 URL of the object.
            expiration (int, optional): The expiration time in seconds for the presigned URL. Defaults to 3600.

        Returns:
            str: The presigned URL.
        """
        return generate_presigned_url(s3_url, expiration)
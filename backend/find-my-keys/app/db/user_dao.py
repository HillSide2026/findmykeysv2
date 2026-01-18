from .. import db
from ..models import User

class UserDAO:
    @staticmethod
    def create_user(email: str, name: str, password: str) -> User:
        """
        Creates a new user and adds it to the database.

        Args:
            email (str): The email of the new user.
            name (str): The name of the new user.
            password (str): The password of the new user.

        Returns:
            User: The newly created User instance.
        """
        new_user = User(email=email, name=name, password=password)
        db.session.add(new_user)
        db.session.commit()
        return new_user

    @staticmethod
    def get_user_by_email(email: str) -> User:
        """
        Retrieves a user by their email.

        Args:
            email (str): The email of the user to retrieve.

        Returns:
            User: The User instance if found, otherwise None.
        """
        return User.query.filter_by(email=email).first()
    
    @staticmethod
    def set_theme(user_id: int, theme: str) -> User:
        """
        Sets the theme for a user.

        Args:
            user_id (int): The ID of the user to update.
            theme (str): The new theme to set for the user.

        Returns:
            User: The updated User instance if the user is found, otherwise None.
        """
        user = User.query.get(user_id)
        if user:
            user.theme = theme
            db.session.commit()
            return user
        return None
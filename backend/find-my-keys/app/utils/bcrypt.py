import bcrypt

def hash_password(password: str) -> str:
    """
    Hash a password using bcrypt.

    Args:
        password (str): The password to be hashed.

    Returns:
        str: The hashed password.
    """
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

def check_password(password: str, hashed: str) -> bool:
    """
    Check if a password matches a hashed password.

    Args:
        password (str): The password to be checked.
        hashed (str): The hashed password to compare against.

    Returns:
        bool: True if the password matches the hashed password, False otherwise.
    """
    return bcrypt.checkpw(password.encode('utf-8'), hashed.encode('utf-8'))
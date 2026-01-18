from flask import Blueprint, request, jsonify, make_response
from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required, get_jwt_identity, get_jwt, JWTManager
from ..db import UserDAO, ObjectDAO, ImageDAO
from ..utils.bcrypt import hash_password, check_password
from .. import jwt
from datetime import timedelta

accounts = Blueprint('accounts', __name__)
token_blacklist: set = set()

@accounts.route('/register', methods=['POST'])
def register() -> tuple[jsonify, int]:
    """
    Register a new user.

    Returns:
        tuple[jsonify, int]: A JSON response with a success or error message, and the corresponding HTTP status code.
    """
    data = request.get_json()

    if not data or 'email' not in data or 'name' not in data or 'password' not in data:
        return jsonify({'error': 'Missing one or more of required fields: email, name, and password'}), 400
    
    if UserDAO.get_user_by_email(data['email']):
        return jsonify({'error': 'A user with this email already exists.'}), 400

    hashed_password = hash_password(data['password'])
    UserDAO.create_user(data['email'], data['name'], hashed_password)

    return jsonify({'message': 'Successfully registered ' + data['email'] + '.'}), 201

@accounts.route('/login', methods=['POST'])
def login() -> tuple[jsonify, int]:
    """
    Login a user and return access and refresh tokens.

    Returns:
        tuple[jsonify, int]: A JSON response with the access and refresh tokens, or an error message, and the corresponding HTTP status code.
    """
    data = request.get_json()

    if not data or 'email' not in data or 'password' not in data:
        return jsonify({'error': 'Missing one or both of the required fields: email and password.'}), 400

    user = UserDAO.get_user_by_email(data['email'])
    if user and check_password(data['password'], user.password):
        access_token = create_access_token(identity={'email': user.email}, expires_delta=timedelta(hours=1))
        refresh_token = create_refresh_token(identity={'email': user.email}, expires_delta=timedelta(days=7))
        return jsonify(access_token=access_token, refresh_token=refresh_token), 200
    
    return jsonify({'error': 'Email or password incorrect.'}), 401

@accounts.route('/refresh', methods=['POST'])
@jwt_required(refresh=True)
def refresh() -> tuple[jsonify, int]:
    """
    Refresh the access token using a valid refresh token.

    Returns:
        tuple[jsonify, int]: A JSON response with the new access token, and the corresponding HTTP status code.
    """
    current_user = get_jwt_identity()
    access_token = create_access_token(identity=current_user, expires_delta=timedelta(hours=1))
    return jsonify(access_token=access_token), 200

@accounts.route('/logout', methods=['POST'])
@jwt_required()
def logout() -> tuple[jsonify, int]:
    """
    Logout a user by adding the current token to the blacklist.

    Returns:
        tuple[jsonify, int]: A JSON response with a success message, and the corresponding HTTP status code.
    """
    jti = get_jwt()['jti']
    token_blacklist.add(jti)
    return jsonify({"message": "Logged out."}), 200

@accounts.route('/objects', methods=['POST', 'GET', 'PUT'])
@jwt_required()
def manage_objects() -> tuple[jsonify, int]:
    """
    Manage user objects, including creating, retrieving, deleting, and updating.

    Returns:
        tuple[jsonify, int]: A JSON response with the requested object data or a success/error message, and the corresponding HTTP status code.
    """
    current_user = get_jwt_identity()
    user = UserDAO.get_user_by_email(current_user['email'])

    if request.method == 'POST':
        data = request.get_json()
        if not data or 'name' not in data or 'type' not in data:
            return jsonify({'error': 'Object name and object type are required.'}), 400
        
        if data['type'].lower() not in ['phone', 'wallet', 'keys', 'bottle', 'watch', 'glasses']:
            return jsonify({'error': 'Invalid object type. Must be one of: Phone, Wallet, Keys, Bottle, Watch, Glasses.'}), 400

        ObjectDAO.add_object(data['name'], data['type'].lower(), user)
        return jsonify({'message': 'Object added successfully.'}), 201

    elif request.method == 'GET':
        objects = ObjectDAO.get_objects_by_user(user.id)
        object_list = []
        for obj in objects:
            images = ImageDAO.get_images_by_object_id(obj.id)
            image_urls = [ImageDAO.get_presigned_url_from_s3_url(image.image_url) for image in images]
            object_list.append({'id': obj.id, 'type': obj.type, 'name': obj.name, 'images': image_urls})
        
        return jsonify(object_list), 200

    elif request.method == 'PUT':
        data = request.get_json()

        if not data or 'id' not in data or 'type' not in data or 'name' not in data:
            return jsonify({'error': 'Object ID, object type, and name are required.'}), 400

        if data['type'].lower() not in ['phone', 'wallet', 'keys', 'bottle', 'watch', 'glasses']:
            return jsonify({'error': 'Invalid object type. Must be one of: Phone, Wallet, Keys, Bottle, Watch, Glasses.'}), 400

        object_id = data.get('id')
        object_to_edit = ObjectDAO.get_object_by_id(object_id, user.id)
        if not object_to_edit:
            return jsonify({'error': 'Object not found.'}), 404
        
        ObjectDAO.edit_object(object_to_edit, type=data.get('type').lower(), name=data.get('name'))
        return jsonify({'message': 'Object updated successfully.'}), 200

@accounts.route('/objects/<int:object_id>', methods=['DELETE'])
@jwt_required()
def delete_object(object_id):
    current_user = get_jwt_identity()
    user = UserDAO.get_user_by_email(current_user['email'])

    if object_id is None:
        return jsonify({'error': 'Object ID is required.'}), 400

    object_to_delete = ObjectDAO.get_object_by_id(object_id, user.id)
    if not object_to_delete:
        return jsonify({'error': 'Object not found.'}), 404
    
    ObjectDAO.delete_object(object_id, user.id)
    return jsonify({'message': 'Object deleted successfully.'}), 200

@accounts.route('/objects/image', methods=['POST'])
@jwt_required()
def upload_object_image() -> tuple[jsonify, int]:
    """
    Upload an image for a user's object.

    Returns:
        tuple[jsonify, int]: A JSON response with the uploaded image's URL or an error message, and the corresponding HTTP status code.
    """
    current_user = get_jwt_identity()
    user = UserDAO.get_user_by_email(current_user['email'])

    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    object_id = request.form.get('id')
    if not object_id:
        return jsonify({'error': 'Object ID is required'}), 400

    # Check if the object ID is valid and belongs to the current user
    user_object = ObjectDAO.get_object_by_id(object_id, user.id)
    if not user_object:
        return jsonify({'error': 'Object does not exist or you do not have permission to add an image to this object.'}), 403

    new_image = ImageDAO.add_image(object_id, file)
    if not new_image:
        return jsonify({'error': 'Failed to upload file to S3'}), 500

    return jsonify({'file_url': new_image.image_url}), 201

@accounts.route('/theme', methods=['GET', 'PUT'])
@jwt_required()
def manage_theme() -> tuple[jsonify, int]:
    """
    Manage the user's theme (light or dark).

    Returns:
        tuple[jsonify, int]: A JSON response with the user's current theme or a success/error message, and the corresponding HTTP status code.
    """
    current_user = get_jwt_identity()
    user = UserDAO.get_user_by_email(current_user['email'])

    if request.method == 'GET':
        return jsonify({'theme': user.theme}), 200

    elif request.method == 'PUT':
        data = request.get_json()
        if not data or 'theme' not in data or (data['theme'] != 'dark' and data['theme'] != 'light'):
            return jsonify({'error': 'Theme is required and must be "light" or "dark".'}), 400
        
        updated_user = UserDAO.set_theme(user.id, data['theme'])
        if updated_user:
            return jsonify({'error': 'Theme updated successfully.'}), 200
        
        return jsonify({'error': 'User not found.'}), 404

@jwt.token_in_blocklist_loader
def check_if_token_in_blacklist(jwt_header: dict, jwt_payload: dict) -> bool:
    """
    Check if the given JWT token is in the blacklist.

    Args:
        jwt_header (dict): The header of the JWT token.
        jwt_payload (dict): The payload of the JWT token.

    Returns:
        bool: True if the token is in the blacklist, False otherwise.
    """
    jti = jwt_payload['jti']
    return jti in token_blacklist
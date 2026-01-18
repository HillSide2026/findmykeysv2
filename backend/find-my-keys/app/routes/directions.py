from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..utils import get_directions, file_allowed, upload_file
from ..db import UserDAO, ObjectDAO

directions = Blueprint('directions', __name__)
ALLOWED_IMAGE_EXTENSIONS = {'png', 'jpg', 'jpeg', 'heic', 'heif'}
ALLOWED_AUDIO_EXTENSIONS = {'mp3', 'mp4', 'wav', 'flac', 'webm', 'm4a'}

@directions.route('/directions', methods=['POST'])
@jwt_required()
def find_object_in_image():
    """
    Provide directions to object locations in an image given a transcription of a voice command.

    This route processes a POST request with both an image and audio file. It:
    1. Validates the presence and file types of image file
    2. Uploads the image file to an S3 bucket.
    3. Identifies the position of the specified object in the image using OpenAI API.

    @return: JSON response with:
        - 'message': containing relative directions if successful,
        - 'error': describing any issues encountered during processing.

    Status Codes:
        - 200: Successfully retrieved directions for the object.
        - 400: Invalid input (missing files, unsupported file types, or object not found in transcription).
        - 500: Server error (issues with file upload, transcription, or direction retrieval).
    """
    # Get the user's object list
    current_user = get_jwt_identity()
    user = UserDAO.get_user_by_email(current_user['email'])
    object_list = ["#" + str(index) + " " + object.name + " (Type: " + object.type + ")" 
                   for index, object in enumerate(ObjectDAO.get_objects_by_user(user.id))]

    if 'image' not in request.files or 'transcription' not in request.form.keys():
        return jsonify({'error': 'Both an image and voice command are required'}), 400
    
    img_file = request.files['image']
    transcription = request.form.get('transcription')

    if img_file.filename == '':
        return jsonify({'error': 'No selected image file'}), 400


    if not file_allowed(img_file.filename, ALLOWED_IMAGE_EXTENSIONS):
        return jsonify({'error': 'Invalid image file type'}), 400

    try:
        image_url = upload_file(img_file, {"persistence": "temp"})

        if 'Error' in image_url:
            return jsonify({'error': 'Error uploading files to S3'}), 500

        directions = get_directions(image_url, transcription, object_list)

        if directions.startswith('Error occurred'):
            return jsonify({'error': directions}), 500
        
        return jsonify({'message': directions}), 200

    except Exception as e:
        return jsonify({'error': f'Error processing files: {str(e)}'}), 500

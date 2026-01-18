import io
from flask import json
from PIL import Image, ImageDraw
from flask.testing import FlaskClient
from ..models import User
from . import test_client, new_user

def test_directions_no_file(test_client: FlaskClient, new_user: User) -> None:
    """Test case where no files are uploaded"""
    # Register a user and log in to get an access token
    test_client.post('/register', json={
        'email': new_user.email,
        'name': new_user.name,
        'password': new_user.password
    })
    login_response = test_client.post('/login', json={
        'email': new_user.email,
        'password': new_user.password
    })
    tokens = json.loads(login_response.data)
    access_token = tokens['access_token']

    response = test_client.post('/directions', data={}, headers={'Authorization': f'Bearer {access_token}'})
    assert response.status_code == 400
    assert response.json['error'] == 'Both an image and voice command are required'

def test_directions_invalid_image_file_type(test_client: FlaskClient, new_user: User) -> None:
    """Test case with an invalid image file type"""
    # Register a user and log in to get an access token
    # Register a user and log in to get an access token
    test_client.post('/register', json={
        'email': new_user.email,
        'name': new_user.name,
        'password': new_user.password
    })
    login_response = test_client.post('/login', json={
        'email': new_user.email,
        'password': new_user.password
    })
    tokens = json.loads(login_response.data)
    access_token = tokens['access_token']

    data = {
        'image': (io.BytesIO(b"not an image"), 'fake_file.txt'),
        'transcription': 'Where are my keys?'
    }

    response = test_client.post('/directions', data=data, headers={'Authorization': f'Bearer {access_token}'})
    assert response.status_code == 400
    assert response.json['error'] == 'Invalid image file type'

def test_upload_success(test_client: FlaskClient, new_user: User) -> None:
    """Test a successful upload with a valid image"""
    # Register a user and log in to get an access token
    # Register a user and log in to get an access token
    test_client.post('/register', json={
        'email': new_user.email,
        'name': new_user.name,
        'password': new_user.password
    })
    login_response = test_client.post('/login', json={
        'email': new_user.email,
        'password': new_user.password
    })
    tokens = json.loads(login_response.data)
    access_token = tokens['access_token']
    
    # Create a simple image in memory (e.g., a 200x200 pixel image with a water bottle outline on a white background)
    image_size = (200, 200)
    background_color = (255, 255, 255)  # White background
    bottle_color = (0, 0, 0)  # Black outline

    image = Image.new('RGB', image_size, background_color)
    draw = ImageDraw.Draw(image)
    draw.rectangle([80, 50, 120, 150], outline=bottle_color, width=3) # Bottle body
    draw.rectangle([90, 30, 110, 50], outline=bottle_color, width=3) # Bottle neck
    draw.rectangle([85, 20, 115, 30], outline=bottle_color, width=3) # Bottle cap

    # Save the image to a BytesIO object
    image_data = io.BytesIO()
    image.save(image_data, format='JPEG')
    image_data.seek(0)

    data = {
        'image': (image_data, 'test_image.jpg'),
        'transcription': 'Where are my keys?'
    }
    
    response = test_client.post('/directions', data=data, content_type='multipart/form-data', headers={'Authorization': f'Bearer {access_token}'})

    assert response.status_code == 200
    assert 'message' in response.json
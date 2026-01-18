import io
from flask.testing import FlaskClient
from . import test_client

def test_detect_route_no_file(test_client: FlaskClient) -> None:
    """Test detect route without a file provided"""
    response = test_client.post('/detect')
    assert response.status_code == 400
    assert 'An image was not provided for analysis' in response.json['error']

def test_detect_route_with_non_image_file(test_client: FlaskClient) -> None:
    """Test detect route with a non-image file"""
    data = {
        'file': (io.BytesIO(b"not an image"), 'fake_file.txt')
    }
    response = test_client.post('/detect', data=data, content_type='multipart/form-data')
    assert response.status_code == 400
    assert 'Invalid file type. Only PNG, JPG, and JPEG images are allowed.' in response.json['error']


def test_detect_route_with_valid_image(test_client: FlaskClient) -> None:
    """Test detect route with a valid image"""
    # Create a simple image in memory (e.g., a 1x1 pixel white image)
    image_data = io.BytesIO()
    image_data.write(b'\xFF\xFF\xFF')
    image_data.seek(0)

    data = {
        'file': (image_data, 'test_image.jpg')
    }
    
    response = test_client.post('/detect', data=data, content_type='multipart/form-data')
    
    assert response.status_code == 200
    assert 'image' in response.json
    assert response.json['image'].endswith('result.jpg')
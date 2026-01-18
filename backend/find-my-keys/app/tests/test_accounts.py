from flask import json
from flask.testing import FlaskClient
import io
from ..models import User
from . import test_client, new_user

def test_register(test_client: FlaskClient, new_user: User) -> None:
    """
    Test user registration.
    """
    response = test_client.post('/register', json={
        'email': new_user.email,
        'name': new_user.name,
        'password': new_user.password
    })
    assert response.status_code == 201
    assert b'Successfully registered test@example.com.' in response.data

def test_register_existing_user(test_client: FlaskClient, new_user: User) -> None:
    """
    Test registration of an existing user.
    """
    test_client.post('/register', json={
        'email': new_user.email,
        'name': new_user.name,
        'password': new_user.password
    })
    response = test_client.post('/register', json={
        'email': new_user.email,
        'name': new_user.name,
        'password': new_user.password
    })
    assert response.status_code == 400
    assert b'A user with this email already exists.' in response.data

def test_login(test_client: FlaskClient, new_user: User) -> None:
    """
    Test user login.
    """
    test_client.post('/register', json={
        'email': new_user.email,
        'name': new_user.name,
        'password': new_user.password
    })
    response = test_client.post('/login', json={
        'email': new_user.email,
        'password': new_user.password
    })
    assert response.status_code == 200
    assert b'access_token' in response.data
    assert b'refresh_token' in response.data

def test_login_invalid_credentials(test_client: FlaskClient) -> None:
    """
    Test login with invalid credentials.
    """
    response = test_client.post('/login', json={
        'email': 'wrong@example.com',
        'password': 'wrongpassword'
    })
    assert response.status_code == 401
    assert b'Email or password incorrect.' in response.data

def test_refresh_token(test_client: FlaskClient, new_user: User) -> None:
    """
    Test refreshing the access token.
    """
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
    refresh_token = tokens['refresh_token']

    response = test_client.post('/refresh', headers={'Authorization': f'Bearer {refresh_token}'})
    assert response.status_code == 200
    assert b'access_token' in response.data

def test_logout(test_client: FlaskClient, new_user: User) -> None:
    """
    Test user logout.
    """
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

    response = test_client.post('/logout', headers={'Authorization': f'Bearer {access_token}'})
    assert response.status_code == 200
    assert b'Logged out.' in response.data

def test_add_object(test_client: FlaskClient, new_user: User) -> None:
    """
    Test adding a new object.
    """
    # Register and login the user
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

    # Test adding an object
    response = test_client.post('/objects', headers={'Authorization': f'Bearer {access_token}'}, json={'name': 'Red Wallet', 'type': 'wallet'})
    assert response.status_code == 201
    assert b'Object added successfully.' in response.data

def test_retrieve_objects(test_client: FlaskClient, new_user: User) -> None:
    """
    Test retrieving user's objects.
    """
    # Register and login the user
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

    # Add an object first
    test_client.post('/objects', headers={'Authorization': f'Bearer {access_token}'}, json={'name': 'Red Wallet', 'type': 'wallet'})

    # Test retrieving objects
    response = test_client.get('/objects', headers={'Authorization': f'Bearer {access_token}'})
    assert response.status_code == 200
    assert b'Red Wallet' in response.data

def test_update_object(test_client: FlaskClient, new_user: User) -> None:
    """
    Test updating an existing object.
    """
    # Register and login the user
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

    # Add an object first
    test_client.post('/objects', headers={'Authorization': f'Bearer {access_token}'}, json={'name': 'Red Wallet', 'type': 'wallet'})

    # Retrieve the object to get its ID
    response = test_client.get('/objects', headers={'Authorization': f'Bearer {access_token}'})
    assert response.status_code == 200
    objects_data = json.loads(response.data)
    assert len(objects_data) > 0, "No objects found"
    object_id = objects_data[0]['id']

    # Test updating the object
    response = test_client.put('/objects', headers={'Authorization': f'Bearer {access_token}'}, json={'id': object_id, 'name': 'Blue Wallet', 'type': 'wallet'})
    assert response.status_code == 200
    assert b'Object updated successfully.' in response.data

    # Verify the object was updated
    response = test_client.get('/objects', headers={'Authorization': f'Bearer {access_token}'})
    assert response.status_code == 200
    assert b'Blue Wallet' in response.data

def test_delete_object(test_client: FlaskClient, new_user: User) -> None:
    """
    Test deleting an object.
    """
    # Register and login the user
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

    # Add an object first
    test_client.post('/objects', headers={'Authorization': f'Bearer {access_token}'}, json={'name': 'Red Wallet', 'type': 'wallet'})

    # Retrieve the object to get its ID
    response = test_client.get('/objects', headers={'Authorization': f'Bearer {access_token}'})
    assert response.status_code == 200
    objects_data = json.loads(response.data)
    assert len(objects_data) > 0, "No objects found"
    object_id = objects_data[0]['id']

    # Test deleting the object
    response = test_client.delete(f'/objects/{object_id}', headers={'Authorization': f'Bearer {access_token}'})
    assert response.status_code == 200
    assert b'Object deleted successfully.' in response.data

    # Verify the object was deleted
    response = test_client.get('/objects', headers={'Authorization': f'Bearer {access_token}'})
    assert response.status_code == 200
    assert b'[]' in response.data

def test_upload_object_image(test_client: FlaskClient, new_user: User) -> None:
    """
    Test uploading an image for an object.
    """
    # Register the new user
    test_client.post('/register', json={
        'email': new_user.email,
        'name': new_user.name,
        'password': new_user.password
    })
    
    # Log in the user
    login_response = test_client.post('/login', json={
        'email': new_user.email,
        'password': new_user.password
    })
    tokens = json.loads(login_response.data)
    access_token = tokens['access_token']

    response = test_client.post('/objects', headers={'Authorization': f'Bearer {access_token}'}, json={'name': 'My Phone', 'type': 'phone'})
    assert response.status_code == 201, "Failed to create object"
    assert b'Object added successfully.' in response.data

    response = test_client.get('/objects', headers={'Authorization': f'Bearer {access_token}'})
    assert response.status_code == 200, "Failed to retrieve objects"
    objects_data = json.loads(response.data)
    assert len(objects_data) > 0, "No objects found"
    object_id = objects_data[0]['id']

    blank_image = io.BytesIO(b'\x89PNG\r\n\x1a\n' + b'\x00' * 100)  # A minimal PNG header with 100 bytes of blank data
    blank_image.name = 'blank_image.png'  # Set a name for the file-like object
    response = test_client.post('/objects/image', headers={'Authorization': f'Bearer {access_token}'}, data={'id': object_id, 'file': blank_image})
    
    assert response.status_code == 201, "Failed to upload image"
    assert b'file_url' in response.data

def test_manage_theme(test_client: FlaskClient, new_user: User) -> None:
    """
    Test managing the application theme.
    """
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

    # Test getting the current theme
    response = test_client.get('/theme', headers={'Authorization': f'Bearer {access_token}'})
    assert response.status_code == 200
    assert b'theme' in response.data

    # Test updating the theme
    response = test_client.put('/theme', headers={'Authorization': f'Bearer {access_token}'}, json={'theme': 'dark'})
    assert response.status_code == 200
    assert b'Theme updated successfully.' in response.data

    # Verify the theme was updated
    response = test_client.get('/theme', headers={'Authorization': f'Bearer {access_token}'})
    assert response.status_code == 200
    assert b'dark' in response.data
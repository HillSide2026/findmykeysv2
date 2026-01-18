import pytest
from app import create_app, db
from app.models import User

@pytest.fixture(scope='session')
def test_client():
    """
    Fixture to create a test client for the Flask application.
    """
    app = create_app()
    app.config['TESTING'] = True
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
    app.config['JWT_SECRET_KEY'] = 'test_secret'
    app.config['JWT_REFRESH_SECRET_KEY'] = 'test_refresh_secret'

    with app.app_context():
        db.create_all()
        yield app.test_client()
        db.drop_all()

@pytest.fixture(scope='module')
def new_user() -> User:
    """
    Fixture to create a new user instance.
    """
    user = User(email='test@example.com', name='Test User', password='testpassword')
    return user
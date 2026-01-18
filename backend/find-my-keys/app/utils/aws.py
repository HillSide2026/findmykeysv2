import boto3
from botocore.exceptions import NoCredentialsError, ClientError
import os
import uuid
from werkzeug.utils import secure_filename
from urllib.parse import urlparse
from werkzeug.datastructures import FileStorage
from dotenv import load_dotenv

load_dotenv()
aws_region = os.getenv('AWS_REGION')
bucket_name = os.getenv('AWS_BUCKET_NAME')

s3_client = boto3.client(
    's3',
    aws_access_key_id=os.getenv('AWS_ACCESS_KEY_ID'),
    aws_secret_access_key=os.getenv('AWS_SECRET_ACCESS_KEY'),
    region_name=aws_region
)
transcribe_client = boto3.client('transcribe', region_name=aws_region)

def upload_file(image_file: FileStorage, tags: dict = None) -> str:
    """
    Upload an image file to an S3 bucket.

    Args:
        image_file (werkzeug.datastructures.FileStorage): The image file to be uploaded.
        tags (dict, optional): A dictionary of tags to add to the S3 object.

    Returns:
        str: The URL of the uploaded image, or `None` if there's an error.
    """
    try:
        unique_id = str(uuid.uuid4())
        secure_name = secure_filename(image_file.filename)
        file_extension = os.path.splitext(secure_name)[1]
        unique_filename = f"{unique_id}{file_extension}"

        # Upload the file to S3
        s3_client.upload_fileobj(image_file, bucket_name, unique_filename)

        # Add tags if provided
        if tags:
            tagging = '&'.join([f"{key}={value}" for key, value in tags.items()])
            s3_client.put_object_tagging(
                Bucket=bucket_name,
                Key=unique_filename,
                Tagging={
                    'TagSet': [{'Key': key, 'Value': value} for key, value in tags.items()]
                }
            )

        return f'https://{bucket_name}.s3.{aws_region}.amazonaws.com/{unique_filename}'
    except NoCredentialsError:
        return None

def delete_image(image_url: str) -> None:
    """
    Delete an image from an S3 bucket.

    Args:
        image_url (str): The URL of the image to be deleted.
    """
    filename = image_url.split('/')[-1]
    try:
        s3_client.delete_object(Bucket=bucket_name, Key=filename)
    except NoCredentialsError:
        return None

def generate_presigned_url(s3_url: str, expiration: int = 3600) -> str:
    """
    Generate a pre-signed URL for an S3 object.

    Args:
        s3_url (str): The URL of the S3 object.
        expiration (int, optional): The number of seconds the pre-signed URL will be valid for. Defaults to 3600 (1 hour).

    Returns:
        str: The pre-signed URL, or `None` if there's an error.
    """
    try:
        parsed_url = urlparse(s3_url)
        bucket_name = parsed_url.netloc.split('.')[0]
        object_key = parsed_url.path.lstrip('/')

        if object_key.lower().endswith('.png'):
            content_type = 'image/png'
        elif object_key.lower().endswith('.jpg') or object_key.lower().endswith('.jpeg'):
            content_type = 'image/jpeg'
        elif object_key.lower().endswith('.gif'):
            content_type = 'image/gif'
        else:
            content_type = 'application/octet-stream'

        response = s3_client.generate_presigned_url(
            'get_object',
            Params={
                'Bucket': bucket_name,
                'Key': object_key,
                'ResponseContentType': content_type
            },
            ExpiresIn=expiration
        )
        
        return response
    except (NoCredentialsError, ClientError) as e:
        return None
    
def file_allowed(filename, allowed_extensions):
    """
    Check if a file has an allowed extension.

    The function verifies if the file's extension is in the specified set of allowed extensions.

    @param filename: Name of the file to check.
    @param allowed_extensions: Set of allowed file extensions.

    @return: True if the file extension is allowed, False otherwise.
    """

    return '.' in filename and filename.rsplit('.', 1)[1].lower() in allowed_extensions
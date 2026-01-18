from flask import Blueprint, request, jsonify
from ..utils import initialize_model
import cv2
import numpy as np
import os
from ultralytics import YOLO
from flask_socketio import SocketIO, emit
from ..utils import socketio
import base64

detection = Blueprint('detection', __name__)
yolo_model = initialize_model()


@detection.route('/detect', methods=['POST'])
def detect():
    """
    Detect objects in an uploaded image using a YOLO model.
    This function handles file upload, validates the file type, processes the image using a YOLO model,
    and returns the processed image along with its base64 encoded version.
    Returns:
        Response: A JSON response containing the processed image path and its base64 encoded version,
                  or an error message with the appropriate HTTP status code.
    Raises:
        Exception: If there is an error processing the image.
    """
    if 'file' not in request.files:
        return jsonify({'error': 'An image was not provided for analysis'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'An image was not selected for analysis'}), 400

    if not file.filename.lower().endswith(('.png', '.jpg', '.jpeg')):
        return jsonify({'error':'Invalid file type. Only PNG, JPG, and JPEG images are allowed.'}), 400
    try:
        image = np.frombuffer(file.read(), np.uint8)
        image = cv2.imdecode(image, cv2.IMREAD_COLOR)

        flipped_input = cv2.flip(image, 1)
        result = yolo_model(flipped_input)

        result = yolo_model(image)
        # Code from YOLO docs
        boxes = result[0].boxes  # Boxes object for bounding box outputs
        masks = result[0].masks  # Masks object for segmentation masks outputs
        keypoints = result[0].keypoints  # Keypoints object for pose outputs
        probs = result[0].probs  # Probs object for classification outputs
        # result.show()  # display to screen
        result[0].save(filename="result.jpg")
        with open("result.jpg", "rb") as img_file:
            base64_image = base64.b64encode(img_file.read()).decode('utf-8')

        return jsonify({
            'image': os.path.abspath("result.jpg"),
            'processed_image_base64': base64_image
        }), 200
    except Exception as e:
        return jsonify({'error': f'Error processing the image: {str(e)}'}), 500


@socketio.on('start_stream')
def handle_video_stream(data):
    video_source = data.get('video_source', 0)
    cap = cv2.VideoCapture(video_source)
    
    while True:
        ret, frame = cap.read()
        if not ret:
            break
        
        # Process frame with YOLO
        results = yolo_model(frame, stream=True)
        result = next(results)
        
        annotated_frame = result.plot()
        
        # Emit frame
        _, buffer = cv2.imencode('.jpg', annotated_frame)
        frame_base64 = base64.b64encode(buffer).decode('utf-8')
        
        socketio.emit('video_frame', {
            'frame': frame_base64,
            'detections': [
                {
                    'class': result.names[int(box.cls[0])],
                    'confidence': float(box.conf[0]),
                    'bbox': list(map(float, box.xyxy[0]))
                } for box in result.boxes
            ]
        })
        
        # Optional: Control frame rate
        socketio.sleep(0.033)  # Approximate 30 FPS
    
    cap.release()
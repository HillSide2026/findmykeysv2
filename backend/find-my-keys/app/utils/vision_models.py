import torch
from ultralytics import YOLO

def load_yolo_model():
    """
    Loads the YOLO model from a specified file.

    Returns:
        YOLO: An instance of the YOLO model loaded from "yolo11s.pt".
    """
    model = YOLO("yolo11s.pt")
    return model


def initialize_model():
    """
    Initializes the YOLO model.

    This function loads the YOLO model and prints a confirmation message
    indicating that the model has been initialized.

    Returns:
        model: The initialized YOLO model.
    """
    model = load_yolo_model()
    print("YOLO model initialized")
    return model


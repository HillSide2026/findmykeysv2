# Deliverable 2 Subteam 15.1 Project Report

In our project, we developed a user-friendly application designed to assist users in locating personal objects through image recognition. This application integrates advanced object detection technology with a simple and accessible interface, ensuring a smooth experience for all users. Our development efforts were split between the frontend and backend, utilizing React Native for the user interface and a Flask server for image processing. 

For the front-end development of the CameraComponent along with Camera, Home and Live Screen, we used React Native to create a simple and accessible user interface. The CameraScreen enables users to capture images via their device's camera and submit them which sends the image to the backend for object detection and recognition. To handle the camera functionality, we initially considered both expo-camera and react-native-vision-camera packages, but chose expo-camera for its ease of integration with the Expo framework. Additionally, we found that react-native-vision-camera required a bare workflow with Expo which got overly complex as we are still learning react native. 

The UI was designed with accessibility in mind, featuring large, easy-to-use buttons for image capture and submission. Once an image is captured, it is displayed on the screen using React Native’s Image component, allowing users to review the image before submitting it to backend. Users can easily retake the image by pressing the "Capture Another Image" button, which resets the image state. 

A loading state (isLoading) was implemented to provide real-time feedback, ensuring users are aware when the image is being processed. The button label changes to "Processing..." while the app uploads the image to the backend. Overall, the frontend focuses on user simplicity and intuitive interactions, ensuring a smooth experience for the target audience. future enhancements could involve using react-native-camera for more advanced camera controls. 

For the backend development, we decided to implement a Flask server to handle the image processing and communication between the frontend and the object detection model. We set up the backend architecture, integrating a YOLO object detection model to process the images captured from the frontend. The YOLO model was chosen for its real-time detection capabilities, high accuracy, and compatibility with the project’s goals of helping users locate personal objects through image recognition. 

We connected the backend to the frontend using HTTP POST requests, where images captured on the frontend are sent to the Flask server for processing through said POST request. We developed the backend to receive these images as FormData, convert them to a format suitable for the YOLO model, and then analyze the images to detect objects. Once processed, the backend responds with the detection results, including the object's location or confirmation of its presence. Finally, the image with bounding boxes and labels is displayed to the user to show the capabilities of the model. 

In addition, we detailed documentation in the form of a subteam README, which outlines the setup and configuration of the backend components, instructions for running the YOLO model, and integration details with the frontend. This ensures the backend is well-documented and can be easily maintained or extended by future developers. 

For our use case, it did not make sense to use a database as our main focus and energy would be spent on detecting objects with our machine learning model and storing images was part of sub team 3’s use case. Finally, we had the goal of accomplishing live object detection in our live object detection screen but were unable to get the model working in time due to complexity of using web sockets to stream video to the model instead of http requests. However, there is a route written in the backend which uses socket.io to send and receive video streaming that is meant for future iterations of this app. 



# Individual Contributions (as a summary): 

### Rohan:  
I was responsible for developing the entire backend functionality, specifically focusing on integrating object detection capabilities using a YOLO model. My responsibilities included creating a Flask endpoint to handle image uploads, processing images for object detection, and returning the results as base64-encoded strings to the front end. Additionally, I collaborated with the team to ensure seamless communication between the front-end and back-end components, and actively participated in debugging integration and optimizing the application to enhance performance and user experience.  I also wrote the code to make it aesthetically pleasing/added navigation and enhance the user experience using modules which are popups that show up on the app when clicking the take pic button. Additionally, I wrote backend API tests with pytest simulating post requests from the frontend. Finally, I added tasks to the task board and communicated which person is responsible for each task. 

### Burak: 
I was responsible for making the Camera Screen, and trial of unit testing although it wasn’t %100 successful. I also wrote the subteam 1 report. 

### Carol: 
I was responsible for developing the Live Detection function, which due to time constraints is currently based on Camera Screen, but I’m going to change that in the next phase. I also wrote subteam README and collaborated with Burak to write the subteam 1 report. 

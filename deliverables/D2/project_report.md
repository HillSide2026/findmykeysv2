# Summary
Find My Keys is a user-friendly mobile app that assists users with locating commonly misplaced personal belongings using voice commands and object recognition through the user’s phone camera. Traditional solutions, such as key finders that emit a sound when triggered, often feel too impersonal or overly technical, which can alienate users seeking to locate misplaced objects in their surroundings. In particular, the target user of this app includes seniors, disabled persons, tech-phobic, and neurodivergent individuals. The app will provide users with the ability to choose between a range of highly accessible options to locate common objects such as phones or keys, with an emphasis on usability and ease of use. For example, users can ask the app “Where are my keys?” and it will guided instructions like, “Your keys are to the left,” or “Your keys are on the kitchen countertop.” Additionally, the app will allow users to view their surroundings through their camera with their identified object highlighted on-screen. Overall this product is a highly accessible and easy to use method of locating lost items through a simple and intuitive interface.

# Project Breakdown

## Software Architecture Diagram
```
+-------------------+          +--------------------+
|                   |          |                    |
|   Frontend (React-Native)    |   Backend (Flask)  |
|                   |          |                    |
|  - User Interface | <------> |  - RESTful API     |
|  - Voice Commands |          |  - Object Detection|
|  - Camera Access  |          |  - User Management |
|                   |          |                    |
+-------------------+          +--------------------+
          |                               |
          |                               |
          |                               |
          |                               |
          +-------------------------------+
          |
          |
+-------------------+
|                   |
|   Deployment      |
|                   |
|  - Expo Go        |
|  - Docker Compose |
|     (container)   |
|                   |
+-------------------+
```

### Frontend
The front-end of the app will be developed using TypeScript and React-Native which will allow us to leverage its cross-platform capabilities and access to various built-in APIs such as Camera and Voice API for voice command recognition and text-to-speech functionality. This is a crucial component of the app since core features rely heavily upon voice commands and object recognition. As such, being able to use performant APIs within our front-end framework that work in real-time rather than an external API such as Google Cloud Voice API is a necessity. React-Native provides access to the native OS UI components, provides a consistent experience on both Android and iOS, while also allowing us to deploy to both using one codebase. Moreover, using TypeScript in our frontend will be much simpler than using languages such as Dart for Flutter since our team is already familiar with the language and its libraries (e.g. Jest for unit testing).

### Backend
The back-end of the app will be developed using Python and Flask, which provides an easy-to-use lightweight framework for creating RESTful APIs, handling user authentication, data management, and integration with our ML/object detection code which will also be written in Python. Flask also integrates with libraries like Socket.io, which enable real-time communication for live video streaming which will be an important aspect for our object detection features which must be in realtime. Additionally, the object detection features will be implemented using OpenCV and the YOLO computer vision model. The app will also incorporate OpenAI's GPT-4 API to implement voice command features by providing text-to-speech guided responses to voice commands for finding detected objects. Moreover, our app's persistent data will be stored in an SQLite database which will be accessed/manipulated using the SQLAlchemy ORM. This will ensure that our entire back-end is built using Python making it easier to containerize and deploy, and that no knowledge of SQL queries will be needed in order to work with our database. This also provides flexibility to swap for a different database if needed. Lastly, we will be using AWS S3 to store image data, since it will allow us to safely and persistently store image data for objects in the cloud in a way which will be scalable for the future, without having to worry about file sizes. We will be storing references/urls to the images in S3 buckets in our SQLite database, rather than storing the images directly in the SQLite database to allow it to run more optimally.

### Deployment & Integration
The front-end will be deployed using Expo Go, which will allow TAs, end-users, and testers to access the app using the published link/QR code on the Expo Go app which is available on the App Store (iOS) or Google Play Store (Android). 

The back-end Flask server (which includes the computer vision model) will be deployed using Docker. We will create a Dockerfile which creates a docker image, which well then be uploaded to Docker Hub to later be deployed using docker compose on a server. Additionally, the SQLite database will also be stored as a docker volume inside the docker container. All components of the backend will be contained within one docker image and compose file which will be deployed on our own personal server using docker compose, and potentially on a VPS or Cloud in the future.

The app will automatically be deployed with the option to also manually trigger a new build. This will be done by deploying both the frontend and backend simultaneously with using GitHub Actions. We will first build a new docker image using the Dockerfile in our backend, and then deploy it on our server. Then we will also deploy our frontend using Expo as well. 

## Note
While the above paragraphs outline our plan for the app, our subteam submissions may not fully adhere to these plans due to resource or time limitations.

# Sub-teams
### Sub-team 15.1 (Object Recognition)
This sub-team will primarily be responsible for implementing this user story:
- As an older user with memory difficulties, I want to easily use my phone camera to quickly scan my surroundings to locate and find my lost items.

This sub-team will be responsible for detecting objects using a computer vision model. This will include having the ability to use a mobile phone camera to take a picture of the surroundings along with a video, to then receive highlighted object detection through boundary boxes.

**Team Members:**
- Carol
- Rohan
- Burak


### Sub-team 15.2 (Voice Commands)
This sub-team will primarily be responsible for implementing this user story:
- As someone who has difficulty typing and pressing buttons, I want to use voice commands to ask the app where my object is located in order to find it hands-free

This sub-team will be implementing voice commands which will allow the end-user to say a voice command such as "Where is my phone?" which will then use the phone camera to take a photo and analyze it using an LLM to receive a test-to-speech response directing the user to where the relative location of the object is from the image.

**Team Members:**
- Ivan
- Arjun

### Sub-team 15.3 (Accessibility Features and User Account Management)
This sub-team will primarily be responsible for implementing these user stories:
- As a user of Find My Keys, I want to create an account that stores a list of my personal belongings to build a personalized recognition system for my items
- As a user of the app, I want to adjust accessibility settings to customize my method of locating items based on my individual needs

This sub-team will be implementing a sign-up and login page which will allow users to create accounts and log in. Afterwards, they will be able to access an objects page with a list of their personal objects, where they will be able to add new objects to their account's list, delete them, as well as edit them. This will include the ability to upload images for the objects, and add names. Lastly there will be a settings page with various accessibility features to make the app easier to use. While not all of the accessibility settings may be functional within this sub-team's submission due to other missing user stories, it will still include the user interfaces and UI/UX components.

**Team Members:**
- Azlan
- Hadi

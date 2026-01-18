# Find My Keys
---
**Note:** This repository snapshot contains documentation only; application source directories have been removed.
## Partner Intro
 * The partner organization for this project is Russelhill Rd Ventures, which is a wholly owned subsidiary of HillSide Holdings. It is being developed under Dr. Rachel Levine and Matthew Levine.
 * Dr. Rachel Levine is a  legal anthropologist with  expertise in human-non-human interactions and applied/normative and meta-ethics. (**Email:** rachel.levine@utoronto.ca)
 * Matthew Levine is a lawyer with experience advising SaaS, Marketplace and App product teams on corporate and financing matters as well as privacy by design product development (**Email:** matthew@levine-law.ca)
 

## Description about the project
Find My Keys is a user-friendly mobile app available on Android (iOS soon) that assists users with identifying commonly misplaced personal belongings using voice commands and image recognition through the user's phone camera. This app is particularly helpful for older adults, neurodivergent individuals, and users who have difficulties with organization, attention, and executive function, as it provides a more user-friendly solution compared to traditional key finders which emit sounds and often alienate people who are not comfortable with high-tech gadgets. It provides users with a natural way of locating lost personal belongings by highlighting objects around them on-screen and allowing them to ask the app questions through voice commands for further help.
​
## iOS app (MVP)

Find My Keys is an on-device camera app that highlights selected everyday items in real time.  
**Privacy:** No images, video, or detection data leave the device. The app is intended to work offline.

### Supported items (MVP)
- backpack
- handbag
- bottle
- book
- remote (UI may show “TV remote”)
- cell phone
- laptop
- cup

### Run (coming in PR #1)
1. Open `ios/FindMyKeys.xcodeproj` in Xcode.
2. Select a physical iPhone (camera features require a real device).
3. Press Run.

### Privacy + permissions expectations
- The camera permission prompt should appear **only when the user starts scanning**, not on app launch.
- The app should not make network calls.

## Key Features
 * **Account Management:** Users can create new accounts to store personalized inventories of personal belongings and customize their settings to personalize their experience using the app 
 * **Object Location via Voice Commands:** Users can verbally ask the app to find specific items (e.g. "Where are my keys"), and use the camera function to scan their surroundings to receive a clear verbal response of the item's location (e.g. "Your keys are on the right-most side of the 4th rack of the shelf") 
 * **Image Recognition for Object Detection:** Users can point their smartphone camera at a room or area, and the app will scan and highlight the location of a misplaced object with a visual aid (bounding box)
 * **Contextual Verbal Responses:** The app provides detailed, contextually appropriate verbal descriptions of an item's location (e.g. "Your phone is on the kitchen countertop in the living room next to your dish rack)
 * **Simple & Intuitive User Interface:** Users can navigate the app using large buttons, clear and straightforward prompts, and interfaces designed for ease of use and accessibility
​
## Usage
### Accessing the App
To access the app, you can download the app installer for Android from the [GitHub Releases Tab](https://github.com/csc301-2024-f/project-15-levine-law/releases). 

**Note:** This release of the app will not work one week after the completion of deliverable 5 and official project handoff to the partner organization due to the deployed/hosted backend server being taken down. 


### Using the App

1. Account Setup:
   - Create a new account using the "Sign Up" option
  


     ![image](https://github.com/user-attachments/assets/de07d16c-28bf-4914-a3b2-8b2be9b9e8ff)



   - Fill in your email and create a password
   - Log in with your credentials




   
     ![image](https://github.com/user-attachments/assets/2722bbb5-ae43-4cb5-a4f2-1244e8cf22e4)



3. Settings & Customization:
   - Access Settings by tapping the gear icon in the navigation bar
   - Your email address is displayed at the top for easy reference



   ![image](https://github.com/user-attachments/assets/0cc9b6b2-1e17-4421-9b1c-4695a9923c3b)





   
   - **Appearance Settings**:
     - Font Size: Adjust text size by choosing the font size you want


     ![image](https://github.com/user-attachments/assets/d8abea19-12ab-49eb-82a7-a8b823ebe6d7)



     - Dark Mode: Toggle between light and dark themes
    


      ![image](https://github.com/user-attachments/assets/fdef5b91-cc89-4a25-8550-ce200c2a9995)


   
   - **Audio Settings**:
     - Volume Control: Adjust the app's audio feedback volume
       ![image](https://github.com/user-attachments/assets/55c7f95b-71ab-4626-add8-b87007ffaefe)

   
   - **Account Options**:
     - Log Out: Securely sign out of your account
     
   - All settings are automatically saved and persist between sessions
  
3. Managing Objects:
   - **Adding New Objects**:
     - Loging in will take you to the Objects Page



      ![image](https://github.com/user-attachments/assets/51b4abce-8f9b-4adf-8771-409ac2da9248)


   

     - You can enter an item name in the text input, choose an item type and add click the add item button


      ![image](https://github.com/user-attachments/assets/45649f85-b16c-4a08-8016-b65d30cac912)

     ![image](https://github.com/user-attachments/assets/46d8cc58-a58d-427b-ab28-279d9170f552)




   - **Editing Objects**:
     - Use "Rename" to change the item name
    

     ![image](https://github.com/user-attachments/assets/adad3f20-33ce-4238-8b8b-38ffb357ef34)



     - Use "Add Image" to change the item's image
  


   
     - Use "Delete" to delete the object from your objects
   ![image](https://github.com/user-attachments/assets/ff58ab95-509a-4fe8-8300-b74e518d1bcc)

4. Main Functionality:
   - **Object Detection**: 
     - Tap the "Detect" button to open the camera


     ![image](https://github.com/user-attachments/assets/6c0c9269-d530-49d3-bacd-02edc636d13a)






     - Point your camera at the area where you're looking for items and take a picture
    


      ![image](https://github.com/user-attachments/assets/1675df82-e346-4bb9-a5e9-6940b9b69e5e)





     - Click process image and the app will highlight detected objects with boxes and labels




      ![image](https://github.com/user-attachments/assets/8776802a-93f1-4564-8d4d-8c8f5a1b23b4)



   - **Voice Commands**:
     - Tap the "Voice Commands" button to open this screen
    

     ![image](https://github.com/user-attachments/assets/a63f7538-db8c-4a46-b9dc-1d399dde6806)

  




     - You can use the camera to take a picture of your surroundings and click start to record a voice command like "find my water bottle"
    
      - Click stop when you want to stop recording audio. Now you can click submit to submit the image and audio.




     - After submitting, you can click voice the response to get the output audio telling where in the room your item is.
    


     ![image](https://github.com/user-attachments/assets/88d7b1b6-bd03-4d66-b8b8-fed297a70fdf)





5. Navigation:
   - Use the bottom navigation bar to switch between:
     - Home screen
     - Detection screen
     - Settings




      ![image](https://github.com/user-attachments/assets/aaa74db0-a07c-4f1c-bba9-872ba892a5e4)


6. Tips for Best Results:
   - Ensure good lighting in the area
   - Hold the phone steady while taking a picture
   - Keep the camera roughly 3-6 feet from objects
   - Make sure objects are not obscured
   - For best detection results, minimize background clutter

### Troubleshooting
- If the app isn't detecting objects well, try:
  - Improving the lighting
  - Moving closer to or further from the object
  - Ensuring the camera lens is clean
  - Restarting the app
 
## Development Requirements
To begin running and the app locally for development purposes, follow the below steps:
1. Clone this repository to your local directory and go into the root directory of the repository
2. Create a `.env` file in `/backend/find-my-keys` to store the backend environment variables listed in [.env.example](https://github.com/csc301-2024-f/project-15-levine-law/blob/bare_4_UILight/backend/find-my-keys/.env.example). You will need JWT secrets which can be generated [here](https://jwtsecret.com/generate). This will also require you to create an AWS account and create an S3 bucket, and an OpenAI API key using an OpenAI account. More information on how to do those can be found on the official websites for [OpenAI](https://platform.openai.com/docs/overview) and [AWS](https://docs.aws.amazon.com/?nc2=h_ql_doc_do). (Note: Your AWS S3 bucket must also have [CORS enabled](https://stackoverflow.com/questions/17533888/s3-access-control-allow-origin-header))
3. Follow the instructions below to run the backend server
4. Navigate to `/frontend/find-my-keys` and modify the "API_BASE_URL" in `app.json` which is located in expo->extra->API_BASE_URL to the URL of your backend server (if running locally, it will simply be `http://localhost:5000`)
5. Inside of `/frontend/find-my-keys/app.json` also modify the expo->extra->eas->projectId and expo->updates->url to the project ID and update URL of your Expo project. You will need to create an Expo account and create a new project in order to do this. More information on this can be found in the [expo documentation](https://docs.expo.dev/).
6. Follow the instructions below to run the frontend

#### Running the Backend
Docker compose is required to run and deploy the backend server ([Installation guide for Debian/Ubuntu](https://pastebin.com/SmNZy64x)). To run the backend server, run the following commmands (Note: The docker compose setup currently only works with Linux-based systems, refer to the Python setup for MacOS and Windows):
```bash
cd backend/find-my-keys
docker compose up --build
```
Alternatively you can run the backend server with Pip and Python directly by running the following commands (Consider using a [venv](https://docs.python.org/3/library/venv.html) for the requirements and installation of dependencies):
```bash
cd backend/find-my-keys
pip install -r requirements.txt
python3 run.py
```

#### Running the Frontend
The frontend of the app requires [Node.js](https://nodejs.org/en/) and ``npm`` to be installed. To run the frontend, run the following commands:
```bash
cd frontend/find-my-keys
npm install
npx expo start
```
When run locally, the backend server is accessible on http://localhost:5000 and the frontend is accesible through either Android or Web on http://localhost:8081. This method of running the frontend is intended to be used for development purposes only.

**NOTE:** Since this app has been developed using React Native, it is technically compatible with iOS but due to Apple Developer Program fees, it will cost money to be able to run the app through Apple TestFlight or similar after creating an iOS build. As such, this app has only been tested for and currently only officially supports Android.

#### Testing
To test the core features of the app, a suite of unit tests exist in the `/backend/find-my-keys/app/tests` directory. The following commands can be run to test each suite of unit tests which test user accounts, voice commands (directions), and object detection (Requires pytest to be installed):
- `pytest app/tests/test_accounts.py`
- `pytest app/tests/test_directions.py`
- `pytest app/tests/test_detection.py`

## Deployment
Before proceeding to deployment, ensure that you have completed all steps outlined in the Development Instructions section.

### Backend
A GitHub workflow exists in the `./github/` directory of the repository which automatically tests, builds, and deploys the backend to a server using Docker. Any changes pushed/merged to the main branch of the repository automatically trigger a new deployment. In order to setup this workflow, you must set the following GitHub Secrets in your repository:
- DOCKER_USERNAME - The username for logging into your [Docker Hub](https://hub.docker.com/) account.
- DOCKER_PASSWORD - The password for logging into your [Docker Hub](https://hub.docker.com/) account.
- SERVER_IP - The IP address of the server where the application will be deployed. Note that the server must be configured to allow SSH through password authentication and must run on a Linux with docker installed. Refer to these instructions to install Docker on your server: [Installation guide for Debian/Ubuntu](https://pastebin.com/SmNZy64x)
- SERVER_USER - The username for SSH access to the server.
- SSH_PASSWORD - The password for SSH access to the server.
- SUDO_PASSWORD - The password for sudo access on the server.

On the server where the backend is deployed, create a `/home/<your_user>/docker` directory. Inside that directory, simply create a `.env` file using the instructions from the Development requirements section, and an empty `/instance` directory, as well as a `docker-compose.yml` file with [this inside of it](https://pastebin.com/YUDfJ210). 

The server must also have a web server such as an nginx reverse proxy in order to route outside traffic to your running docker container. Here is a sample [Nginx Configuration](https://pastebin.com/cPR4tpx6), however any other web server or even a cloud service such as AWS EC2 or ECS to host the backend would suffice as well.

Completing these steps will allow the automated GitHub deployment to work.

### Frontend
To deploy the frontend of the app, you must run `npm install eas-cli` and use the `eas` CLI tool to create a new Android build:
1. Log in using your Expo account with `eas login` and verify your account using `eas whoami`
2. Run `eas build --platform android` to create a new Android build. Once completed download the build from the [Expo Dashboard](https://expo.dev/login). (Note, this step may require you to manually create and link a project on the Expo dashboard prior to building, in which case the Expo documentation and CLI error messages will provide instructions on how to do so)
3. To create an installable `.apk` file on any Android device using the new build, you can follow [this guide](https://www.geekdashboard.com/extract-apk-files-from-aab/) to generate a univeral `.apk` installer
**NOTE:** You may choose to skip step #3 and optionally publish the build directly from the [Expo Dashboard](https://expo.dev/login)

**NOTE:** Since this app has been developed using React Native, it is technically compatible with iOS but due to Apple Developer Program fees, it will cost money to be able to run the app through Apple TestFlight or similar after creating an iOS build. As such, this app has only been tested for and currently only officially supports Android.

## Coding Standards and Guidelines
The data layer in the backend of this app is abstracted behind data access objects, to allow ease of refactoring for future scaling of the app. If the current SQLite database needs to be swapped with a more robust database system, the only changes that need to be made are in the `backend/find-my-keys/app/db` folder to modify the logic of the database operations in the app. Moreover, all API requests to the backend server made in the frontend make use of an Axios Client which automatically adds interceptors for user authentication and other headers. All API requests should be made using the ``frontend/find-my-keys/services/client.ts`` client to ensure consistency across the frontend. All error handling, popups, and success messages are handled through [React Native Root Toast](https://www.npmjs.com/package/react-native-root-toast) to ensure consistency with responsiveness in the UI/UX.
​
## Licenses ​
This project is licensed under the MIT License. Please note that while the source code is available for public use and modification, the application itself is not permitted to be deployed for public use. Any deployment must be approved by [Levine Law](https://levinelegal.ca).

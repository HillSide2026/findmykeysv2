# Introduction
Find My Keys is a user-friendly mobile app that assists users with locating commonly misplaced personal belongings using voice commands and object recognition through the user’s phone camera. Traditional solutions, such as key finders that emit a sound when triggered, often feel too impersonal or overly technical, which can alienate users seeking to locate misplaced objects in their surroundings. The app will provide users with the ability to choose between a range of highly accessible options to locate common objects such as phones or keys, with an emphasis on usability and ease of use. For example, users can verbally ask the app “Where are my keys?” and it will respond to them with “Your keys are to the left” or “Your keys are on the kitchen countertop.” Additionally, the app will allow users to view their surroundings through their camera with their identified object highlighted on-screen. Overall this product is a highly accessible and easy to use method of locating lost items through a simple and intuitive interface.


# Setup Instructions
1. Make sure you have npm and Node.js installed
2.  Clone the D2-15.1 Branch
### Backend:
1. In a terminal, make a python venv and install the required packages
  - `python3 -m venv myenv`
  - `source myenv/bin/activate`
  - Navigate to the base directory of the repo
  - `pip install -r requirements.txt`
  - `python run.py`
3. Install expo: `yarn add expo`


## Running Frontend:
In a different terminal window:
1. `cd frontend/find-my-keys`
2. `npx expo start` to run the app. It should output a QR code, and "... Web is waiting on \[link\]" in the command line.
3. If any packages are missing, use `npm install` to install necessary packages.
4. run `npx expo start` again
5. To open the app in browser: press w
6. Click on "Go to Image Detection" or "Go to Live Detection"

## Running Backend Tests:

1. Install pytest
2. cd test
3. run pytest test_backend.py


# Key Features
### Home Page:
<img width="885" alt="image" src="https://github.com/user-attachments/assets/38161081-c323-4cf4-b905-518f7f03a6e5">

### Image Detection Page:
The "Take Pic" button captures an image, then the Submit button sends the captured image to the backend to do object recognition, The "Capture Another Image" sends the user back to the take pic screen
![image](https://github.com/user-attachments/assets/87fbb6bb-e8b9-4a6a-89f8-5a27b6f3a488)


![image](https://github.com/user-attachments/assets/e789bed9-5feb-4046-98af-610bd35d9d08)



### Live Detection Page:
This is like the Image Detection Page, except it automatically captures images at regular intervals and sends to backend. The user can stop/start live detection by clicking the "Stop/Start Capturing" button
<img width="805" alt="image" src="https://github.com/user-attachments/assets/55745beb-df41-4080-a508-d44cb217046f">



### Video:
Here is the video showcasing the app:

https://github.com/user-attachments/assets/f19a6a07-25af-415d-b21f-8027bb833d72




## Framework Selection

For our frontend development, we chose React Native for its capability to build cross-platform mobile applications. Most of us did not have much experience with bare react native workflow, so we used to Expo SDK to quickly run and test our React Native application on physical devices. React Native enabled us to maintain a single codebase that functions seamlessly on both iOS and Android devices, streamlining the development process and reducing the time and effort required.

## UI Design

We adopted a modular design by dividing the UI into reusable components. This approach enhances maintainability and ensures consistency throughout the application. For the front end, our subteam has created one Home Screen that has quite a bit of functionality. There’s a live camera that lets you take pictures, there’s a button that lets you record a voice message, and there is a submit button that sends the picture along with the recording to the backend server for processing. Afterwards, the front end part of the application receives a response and transcribes the text into speech, “voicing” the response.

A ton of research and experimentation went into the development of this mini-project, as we had to work with many libraries and APIs to achieve our goal. In order to make sure the app runs on mobile devices as smoothly as on the web, we had to let go of some libraries, that required a bare Expo workflow. The final libraries used on the front end were expo-camera, expo-av, and expo-speech, as those provide the best compatibility with Expo SDK.

In addition, our program sends an audio file and an image file to the backend. Implementing that functionality for the first time proved to be a challenge as well. At the end, converting URIs of those files to blob objects allowed us to successfully transfer the files.

The backend, in turn, used voice-to-text Boto3 SDK (AWS), along with S3 buckets for image storage, and finally an OpenAI API to analyze the images. Getting all the APIs and libraries to work together was another challenge we had to overcome.

So, putting that altogether, on the front end, our app takes a picture, records an audio file, and sends it to the backend. The backend transcribes audio into text, sends an image along with the text to the OpenAI receives the response, and sends the text back to the front end. The front end transcribes the text into audio and tells the user the response of the server.

Ivan was responsible for the front end. He made camera work on both the web and mobile phones, set up the logic and UI of everything that is on the Home Screen. He wrote all components and the HomeScreen, along with an api.js file that makes a request file to the backend. Arjun was responsible for the backend portion, including setting up S3 buckets, AWS, and OpenAI APIs, along with a portion of the api.js file on the front end that transforms a URI object into a blob object which you can more easily transfer to the back end.

All the work can be seen on our branch, D2-15.2. Both members have commits and proven track record of contributing to the task, along with helping each other and other teams solve similar issues like making Camera work, or figuring out how to use the testing library for the react native application.

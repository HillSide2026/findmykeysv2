# Summary of Design Choices
### UI & Frontend
We utilized the native UI components of each mobile operating system to create an app that feels natural and familiar to users on their respective platforms.

For the frontend, we employed the Expo Camera and Expo Image Picker APIs, allowing users to select images from their phones or take new photos for their objects. We chose these APIs over the React Native camera API to take advantage of the managed workflow that Expo offers, which restricts us to using Expo's libraries. This decision enabled us to deploy the app on both Android and iOS with a single implementation, significantly simplifying our project structure.

Additionally, we built each screen in our frontend using TypeScript with React Native, which provides excellent cross-platform support for UI components and seamless integration with APIs like those from Expo. By leveraging TypeScript and React Native, we can easily utilize npm, a powerful package manager, to incorporate various libraries and tools, such as Axios for HTTP requests and React Native's Async Storage for storing JWTs. This setup also grants us access to efficient testing libraries like React Testing Library and Jest for frontend testing.

We opted for the Axios library due to its modern, lightweight, and user-friendly nature, which streamlines making HTTP requests to our backend server. Compared to the JavaScript fetch API, Axios simplifies error handling and request management, allowing us to focus on making API calls without dealing with complex promises and asynchronous code.

### Backend
Our backend was developed entirely using Python, Flask, and SQLAlchemy. This choice allowed us to easily import various modules and integrate different components of our backend seamlessly. It also facilitated the containerization of our backend, as we could base our Docker image on the standard Python image.

We selected Flask for its lightweight nature, which provides us with significant control over implementing our REST API routes and integrating JWT (JSON Web Tokens) for authentication. This setup enables us to verify that certain API calls, such as deleting user data, are only permitted for the user who owns that data.

### Deployment / DevOps
We built and containerized our Flask backend using Docker, allowing for easy deployment on any machine and providing flexibility for future hosting options. Currently, our backend is hosted on a personal server to minimize costs, but we can easily deploy our Docker container on a different host without modifying our code or deployment setup.

For our app's frontend, we are using Expo Go, which simplifies the deployment process for both iOS and Android through a link or QR code. This approach is much more straightforward than manually creating APK files or running the app through Xcode for iOS.

Whenever changes are made to our backend and pushed to our subteam's branch, a GitHub Action automatically builds a new Docker image, uploads it to Docker Hub using our account credentials, and redeploys the backend on our server using Docker Compose. This process allows us to securely store our environment variables in GitHub Secrets, which are accessed by the GitHub Action workflow, as well as in a .env file as a Docker volume on our backend server.

### Data Layer
All user data is stored in an SQLite database file, which persists through a Docker volume when deployed using Docker Compose on our server. Since this database is file-based, it is easy to transport across different development and deployment environments, and we can run multiple instances for testing purposes.

We utilized SQLAlchemy as our ORM to abstract database queries, eliminating the need for SQL knowledge. This abstraction also means that if we need to change our database implementation, the rest of our code remains unaffected as long as it is compatible with SQLAlchemy. Additionally, we implemented the Data Access Object design pattern to further separate database operations from our Flask APIs, ensuring that changes to database operations do not impact our API code, which is a good practice to minimize bugs.

To manage image data for user objects, we used an AWS S3 bucket. Storing images as BLOBs or in the local filesystem on our backend server would lead to significant file storage issues, which are not scalable. Given that our application will require substantial image data for building and training a recognition system, we opted for the scalable solution of storing images in the cloud with AWS S3 and keeping references to the images in our database. This approach allows us to access images through presigned URL links without needing to implement additional APIs.
# Individual Contributions
### Hadi Naqvi
Hadi played a key role in designing and building the data models for the backend, which include user accounts, objects, and images. He also developed the Data Access Object using SQLAlchemy to perform various database operations. Additionally, Hadi implemented all the API routes for the backend Flask server that the frontend relies on. He was responsible for containerizing the backend with Docker and automating its deployment on his server using GitHub Actions and Docker Compose. Hadi also deployed the frontend of the application using Expo Go and created unit tests for the backend API routes.

### Azlan Naeem
Azlan contributed to building the entire frontend, including all UI screens and frontend logic. He also completed unit tests to verify the core functionality of the frontend. Furthermore, Azlan connected the backend to the frontend by making API calls, enabling all functionalities related to user account creation, sign-in, and management of user objects. His work ensured a seamless integration between the frontend and backend, allowing users to interact with the application effectively.

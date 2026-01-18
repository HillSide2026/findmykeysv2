# Find My Keys
## Product Details
### Q1: What is the product?
##### Overview 

Find My Keys is a user-friendly mobile app that assists users with locating commonly misplaced personal belongings using voice commands and object recognition through the user’s phone camera. Traditional solutions, such as key finders that emit a sound when triggered, often feel too impersonal or overly technical, which can alienate users seeking to locate misplaced objects in their surroundings. The app will provide users with the ability to choose between a range of highly accessible options to locate common objects such as phones or keys, with an emphasis on usability and ease of use. For example, users can verbally ask the app “Where are my keys?” and it will respond to them with “Your keys are to the left” or “Your keys are on the kitchen countertop.” Additionally, the app will allow users to view their surroundings through their camera with their identified object highlighted on-screen. Overall this product is a highly accessible and easy to use method of locating lost items through a simple and intuitive interface. The following [link](https://www.figma.com/design/GhOE44wmfbjFgE9gt6YOze/Find-My-Keys-Prototype?node-id=0-1) showcases a UI mockup for this application.

##### Partner Organization: Levine Law 

The partner organization for Find My Keys is Levine Law. The project will be developed under Dr. Rachel Levine and Matthew Levine. Dr. Rachel Levine is a Postdoctoral fellow in the Department of Computer Science at the University of Toronto with a background in anthropology, HCI, and meta-ethics. Matthew Levine is a lawyer with experience in advising SaaS, Marketplace and App product teams, as well as product development. This product will offer a tangible expression of the benefits of anthropological research (i.e. the needs and concerns of various target user groups) in the design of new technologies.

### Q2: Who are your target users?

##### Target Users
The target users for Find My Keys will include older adults and seniors who are techphobic and have difficulties navigating technical tools. It will also include people in cognitive decline, as well as those who struggle with organization, attention, and executive function, as they face heightened levels of stress and difficulties in managing daily tasks. This includes people who have Alzheimer’s, neurodivergent individuals, including people with ADHD. More broadly, this app is intended to be used by people who either have low dexterity, memory issues, or struggle to learn how to use new technology.

##### Target User Persona
![Persona](https://rimgo.hadinaqvi.dev/02jtfRD.png)
[Link to persona on Xtensio]([https://workspace15877226.xtensio.com/ecbgp4jm](https://workspace15877226.xtensio.com/ecbgp4jm))

### Q3: Why would your users choose your product? What are they using today to solve their problem/need?

##### Background
As people age, they often experience minor cognitive changes that can make it more challenging to remember where they placed everyday items. This is not only frustrating but leads to unnecessary stress and wasted time when manually searching for personal belongings. For example, ADHD and other cognitive limitations impact executive function and stress levels, which impairs the affected individuals' ability to navigate existing solutions such as Apple AirTags or manual searching.

##### Solution
The "Find My Keys" application addresses this tension by providing a natural and engaging way for users to locate their misplaced belongings. By using a smartphone's camera for object recognition and incorporating voice interaction, the application offers an experience that is both intuitive and reassuring. For example, instead of just emitting a loud noise like other existing solutions (i.e. Apple AirTags), the app would guide the user with verbal cues like “I’m on the coffee table in the living room,” helping them to re-engage with their surroundings in a meaningful way.

##### Benefits
This app helps users rediscover their environment by guiding them verbally to their belongings. Additionally, it saves the users a significant amount of time and mental burden from trying to locate lost belongings. Moreover, the app will help promote cognitive accessibility and improve the quality of life for individuals who cannot access existing technical tools.

### Q4: What are the user stories that make up the Minumum Viable Product (MVP)?

The MVP will be the simplest iteration possible that works for basic use cases of the app. This means that it will only be expected to work reliably under relatively simple environments/scenes with easily identifiable objects which may or may not be digital objects. For example, a nearly empty room with a large object such as a laptop or a handbag which is easily identifiable. More specifically, the object should not be around other cluttered objects, and should be facing to the user's camera directly. The object must be generic and big enough to be detected. This will include most commonly misplaced items such as bags, phones, laptops, keys, water bottles etc.. Below are a list of user stories for the app:

1. As a user of Find My Keys, I want to create an account that stores a list of my personal belongings to build a personalized recognition system for my items

	**Acceptance Criteria:**
	The user can input object details (name, image, etc.) into their account on the app. The app confirms the successful addition of the object to the list of recognized objects. The list of owned objects is displayed to the user.

2. As an older user with memory difficulties, I want to easily use my phone camera to quickly scan my surroundings to locate and find my lost items.

	**Acceptance Criteria:**
	The app must successfully identify the object from the camera feed. The recognized object is highlighted on the screen with a bounding box. The user receives a visual identifier confirming the identification.

3. As someone who has difficulty typing and pressing buttons, I want to use voice commands to ask the app where my object is located in order to find it hands-free

	**Acceptance Criteria:**
	The app will accurately recognize voice commands related to object location. The app will respond with a verbal description of the object's location. The user can repeat commands without the app misinterpreting previous requests.

4. As someone who has difficulty reading text, I want to receive text-to-speech guidance for locating my objects in order to have a more interactive and accessible experience

	**Acceptance Criteria:**
	The app converts text-based location instructions into spoken words. The audio guidance must be clear and easily understandable. The user can repeat the audio guidance as needed.

5. As a user of the app, I want to adjust accessibility settings to customize my method of locating items based on my individual needs

	**Acceptance Criteria:**
	The app will provide options for adjusting font size, contrast, and audio feedback. Users can save their accessibility preferences. The app reflects changes in real-time during usage.

This MVP and the user stories have been reviewed and approved by the partner organization. Here is a [link](https://imgur.com/a/nX8yuLL) to their approval which was sent via email. 

### Q5: Have you decided on how you will build it? Share what you know now or tell us the options you are considering.

This app will be developed with the following tech stack:
1. **Frontend:** TypeScript, React-Native (including Voice and Camera API)
2. **Backend:** Python, Flask, Socket.io, PyTorch, oauth, bcrypt, YOLO, OpenAI's GPT4 API
3. **Data Layer:** SQLite
4. **DevOps:** Expo Go, Docker

##### Application Details
On the frontend, we intend on using react-native for its cross-platform support and its ability to provide various APIs such as its Voice and Camera API which will allow us to convert the user's voice commands to text and also output text-to-speech guided directions for object locations. Additionally, we will be using React-Native for its ability to provide native UI components for both iOS and Android, allowing us to create a seamless experience within each mobile device's ecosystem for users.

Morever on the backend, we will be using OAuth to allow users to create an account by signing in with a third-party account such as a Google account, as well as the ability to create accounts manually which will require the bcrypt hashing/encryption library. Our Flask server will handle everything from login requests, data storage and retrieval, to object detection using the computer vision models. In the latter case, our Flask server will require a socket connection in order to efficiently send and receive live video stream data, which is why we will be using the socket.io library. Lastly, we also intend on using OpenAI's GPT4 API in order to generate guided text-to-speech cues and directions for object locations based on our object recognition in the computer vision model.

##### Data Layer and Cloud
We are considering migrating from using a SQLite database to potentially using AWS S3 if we need to scale our app in terms of the number of users, object recognition data being stored such as many images. As such, we will be using the data access object design pattern in our codebase to ensure that the implementation of our data persistence layer is independent of its usage, by creating an interface between the two. This will allow us to switch our implementation and migrate to AWS as needed in the future.

##### Deployment
The app will be deployed using Expo Go for the React Native frontend, and our Python backend (Flask server) will be deployed alongside it using docker compose so that we are able to efficiently build and deploy the app using containerization. We will explore migrating to AWS (or another virtual hosting option) for the deployment of our backend server if we require more computational resources provided by cloud for running the computer vision models (i.e. powerful GPUs).


----
## Intellectual Property Confidentiality Agreement 
The partner organization for Find My Keys has agreed that we may share the code under an open-source license and distribute it, but only the partner can approve the deployment of the app and will have access during the course.

----

## Teamwork Details
#### Q6: Have you met with your team?
![Activity_Image](https://i.imgur.com/1xnjI6U.png)

Our team played the online skribbl.io game which is similar to the game pictionary. This team building activity involved working together to guess each other's drawings which helped us start building communication and collaboration skills in our team. Some interesting facts that we learned about each other were that:
- Burak is learning Arabic
- Rohan is a DJ
- Arjun likes playing sports like Soccer and Basketball
- Hadi runs a personal server

#### Q7: What are the roles & responsibilities on the team?
##### Project Roles and Descriptions
1. **AI Engineer**
	Responsible for researching various methods of implementing the project's Computer Vision such as specific frameworks and libraries needed. Furthermore, this position will also be responsible for training, developing and integrating the machine learning models for object recognition, with an LLM to provide directional data which a text to speech react native library will utilize to provide audio cues to the user. 
1. **Backend Developer**
	Responsible for creating a REST API in the backend for the flask server, as well as integrating third-party APIs. They will also be responsible for creating the data access interface with our database, and working on integrating various libraries such as socket.io with the frontend in order to handle video feeds in the app.
3. **Project Manager / Team Lead**
	Responsible for project planning, project scoping, resource management, risk assessment, and timeline management. The project manager and team lead will ensure that the team is on track towards meeting key deliverables, deadlines, and managing risks and blockers during the course of the project. 
4. **Fullstack Developer (Frontend + Backend)**
	A developer working on both front end and backend portions of the application. This person, depending on the current needs of the team, will either be working on either mostly the frontend, or backend parts, balancing the workload of the 2 sub-teams. They will also be responsible for connecting the frontend and backend together given their domain knowledge of both parts of the application.
5. **Frontend Developer**
	Responsible for developing the frontend of the application including integration with the backend using various APIs, as well as building the functionality for all the UI components. They will be responsible for working with different data input and output types using react native libraries and API calls to our backend to make the user interface functional.
1. **UI/UX Designer**
	Since the UX design is an extremely important part of this application, this person’s role will be more creative, they will be responsible for designing the interface with our partner’s guidance that will be easy to use for our target audience. This role will go hand-in-hand with the frontend developer role.
7. **DevOps Developer**
	Responsible for managing the configuration and deployment of the app, along with the facilitation of building and testing the app. Additionally, this person will be responsible for managing database and cloud infrastructure services (i.e. AWS) and the containerization of the app. This person will also be responsible for handling any external API keys or paid tools used for the app. 
8. **Partner Liason**
	Responsible for managing all communications between the partner and our team.

##### Team Roles

| Name  | Role(s)                                              | Why?                                                                                                                                                                                                |
| ----- | ---------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Hadi  | Team Lead/Project Manager, Backend Developer, DevOps | Hadi has good leadership skills. Additionally, he has experience with project management, DevOps, and backend development, and is interested to work in these roles                                 |
| Rohan | AI Engineer, Backend Developer, DevOps               | Rohan has experience with computer vision, backend development, and DevOps and is interested to work in these roles                                                                                 |
| Azlan | Partner Liason, UI/UX Designer, Frontend Developer   | Azlan is very organized and has good communication skills which make him a fit for partner liason. Additionally, he has experience with UI/UX design, react-native, as well as frontend development |
| Arjun | Backend Developer                                    | Arjun has experience in backend development and is interested in learning flask and SQLite                                                                                                          |
| Ivan  | Fullstack Developer                                  | Ivan has experience with full stack development and would like to focus more on frontend                                                                                                            |
| Carol | AI Engineer, Fullstack Developer                     | Carol has experience in AI through internships and would like to learn fullstack development                                                                                                        |
| Burak | Fullstack Developer                                  | Burak would is interested in learning full stack development and would like to work in a subteam alongside other team members                                                                       |


#### Q8: How will you work as a team?
##### Meetings
Our team will have a weekly meeting every Sunday at 11AM in a hybrid format, where team members who wish to meet in-person will have the opportunity to meet at Robarts Library in a pre-booked study room. The rest of the team members will join virtually through a Discord call. These meetings will be led by the team lead/project manager, and will go through project updates, any progress blockers, updating other subteams and team members on new information or on new information from meetings with the partner organization. This will be the time where our team agrees on milestones and task completion deadlines, as well as asking each other important questions or raising any other concerns.

Moreover, we have scheduled weekly meetings with our partner organization every Thursday at 4PM where our partner liason and team lead must join, along with any other team members who wish to join. The purpose of these meetings will be to showcase project updates to our partner and receive feedback from them. Additionally, this will be the time for us to ask our partner any questions on behalf of our team, and also discuss any potential problems being faced that our partner may help us resolve.
  
#### Q9: How will you organize your team?

##### Communication
Our team will be using a Discord server as our primary tool of communication by making use of different text channels for meeting announcements, general discussion, and important documentation during the development process that isn't already included in our README file. Additionally, we will be using Zoom to meet with our partner organization for video calls. We will also have separate text and voice channels for our subteams (frontend and backend) which will allow us to organize our communications during the course of the proejct. This Discord server will not be accessible by our partner organization or TA, and will be used solely by our team members for the purpose of project communications.

##### Task Management
Our team will be using a GitHub Project Task board ([link here](https://github.com/orgs/csc301-2024-f/projects/11)) that makes use of GitHub issues to track our tasks and progress. This task board and the GitHub repository will be accessible by our partner organization. The task board will consist of five categories:
- **Backlog:** Tasks which are typically of lower priority that do not need to be completed right away
- **Todo:** Tasks which we need to be completed, but may not necessarily have an assignee
- **In Progress:** Tasks which have an assignee, and are currently being worked on
- **Blocked:** Tasks which cannot be completed until a blocker is resolved (may not have an assignee)
- **Completed:** Tasks which have been completed

All members of our team are expected to add, update, or remove tasks being worked on under the supervision of the project manager during the course of the project. This means that all tasks must be assigned an assignee when being worked on, and that the task board must be an up-to-date representation of the project status at any given time. All team members will assign a priority to each task, being either low, medium, or high. Low priority tasks will minor enhancements, out-of-scope features not in our MVP, or small changes that otherwise don't affect the overall usage of the app. Medium priority tasks will compose the bulk of our tasks, which will include any tasks currently being worked on that are within our MVP and user stories. Lastly, high priority tasks will be limited to any tasks which are blockers for the completion of other critical tasks, critical bug fixes, or anything that otherwise impacts the overall usage of the app.

The project manager of our team will oversee the assignment of our tasks based on each team member's role, experience, skills, and ability. Our team will be expecting each other to assign tasks according to those principles, and our project manager will simply ensure that this is being done fairly and correctly.

##### Meeting Minutes
We will be documenting our meeting minutes for all meetings using word documents which will initially be stored in a private sharepoint folder, and later be placed into markdown files in our github repository under the meeting minutes directory. The partner liason or team lead will work together on documenting meeting minutes, and other team members will be encouraged to contribute any points to these documents as needed as well.

#### Q10: What are the rules regarding how your team works?
##### GitHub Repository
In order to push any changes to the GitHub repository's main branch, all changes must be made in a separate branch and will need to be included in a pull request. All pull requests must be approved by at least one other team member in a code review. This ensures that our main branch will be more stable and that all changes are being documented and approved as needed. Moreover, the GitHub task board and issue tracker must be updated and referenced accordingly when working on any new additions or changes to the repository.

##### Moderation and Accountability
The project manager will be responsible for supervising the completion of tasks by certain deadlines that each team member will initially agree upon. If deadlines are not being met or if there are other similar problems with our project's progress, we will raise these concerns with our team members to understand their situation and needs, and seek to resolve the issue internally by agreeing upon new deadlines or something similar. If team members are still unresponsive after this or are not fulfilling their agreements, we will raise our concerns with our project's TA. 

Team members will not be expected to attend all team meetings, but will he highly discouraged from missing any team meetings. Exceptions will be made if some team members are busy with other coursework or cannot attend due to last-minute issues, as long as they catch up with the rest of our team afterwards.

In conclusion, we will be using Discord for our team communication, and as such all team members will be required to regularly check Discord or have notifications enabled to ensure that nobody misses any important project updates and is able to effectively communicate with one another.

## Organisation Details

#### Q11. How does your team fit within the overall team organisation of the partner?
##### Partner Organization
Our partner organization which consists of two individuals who are not developers or taking part in the development process of the app, will be providing high-level business rules for the app. This means that they are our primarily stakeholders and will be responsible for giving us high-level descriptions of the use cases of our app, as well as any other project expectations. Our team will then translate these high-level descriptions into more clearly defined technical details, so that we are able to implement them and showcase them to our partner to see how well it fits their needs. We will continuously be consulting our partner organization for feedback on our project so that we can work towards building the app that they envision with their high-level overview.

##### Our Team
Our team will consist of a project manager who will work with the AI Engineers on our team to break down high-level business rules into more clearly defined technical terms so that we can design our how app will be developed. We will be responsible for developing the entire app from scratch, including the frontend, backend, deployment process, and maintaining quality assurance/testing. We will be able to fit these roles and fulfill the project requirements that the project manager in our team will help lay out, since we have experience in all of these areas and have designated roles to each other based on these needs. As such, we will be able to effectively help our partner organization who does not have as much technical experience in building out the app using their high level overview and business rules.

#### Q12. How does your project fit within the overall product from the partner?

Our team will be building this mobile app from scratch, including the frontend, backend, deployment processes, ML models, and any other components of the app. Our final product will not directly serve or benefit Levine Law in any direct way, but will serve as an initial prototype which may be beta-launched and help with anthropological research. Our partner organization does not have any plans yet for releasing the product or deploying it in any particular way during or directly after the development process. Our team will be entirely responsible for working on this project, while our partner organization will only be assisting us with ensuring our final product matches their high level description of the app and their high-level requirements.

## Potential Risks
#### Q13. What are some potential risks to your project?

**Risk #1 – Computer Vision Model Accuracy:** 
- We are uncertain of how accurate the YOLO computer vision model will be at detecting different objects in various environments 
- We lack clarity at this stage on how we will train or fine tune our model to detect personalized items or more difficult to detect items

**Risk #2 – Deployment & Cloud:** 
- We may require powerful GPUs to run our computer vision model, as well as external cloud services to efficiently manage image data, resulting in uncertainty of cost further down the line 

**Risk #3 – Realtime Processing of Data & Latency :**
- The responsiveness and latency of our app may potentially be too slow for it to satisfy the user stories which must provide ease of use and accessibility

#### Q14. What are some potential mitigation strategies for the risks you identified?
**Risk #1 – Computer Vision Model Accuracy:** 
- To mitigate this risk, we can work with our partner to define a more specific use cases to determine what the app will be expected to do and what it will not be expected to do (i.e. Only expect it to work in simplified use cases for the time being) 

**Risk #2 – Deployment & Cloud:**
- To mitigate this risk, we can work with our partner to secure funding for any future expenses, as well as looking into free-tier options that will fit our needs 

**Risk #3 – Realtime Processing of Data & Latency:**
- We can explore using technologies like sockets for faster transmission of video stream data as well as working with our partner to secure funding for a more powerful machine to deploy/host our app

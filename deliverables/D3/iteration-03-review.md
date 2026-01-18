# Project 15 - Team INVT (Partner: Levine Law)
## Iteration 03 - Review & Retrospect
* **When:** November 13th, 2024
* **Where:** Online via Discord

## Process - Reflection
#### Q1. What Worked Well
**Effective process-related actions:**
- After completing deliverable 2, we collectively decided on a new project structure for our ![frontend]([https://imgur.com/a/ljOjB10](https://i.imgur.com/e9I4afB.png)) and ![backend]([https://imgur.com/a/J6g8Y0b](https://i.imgur.com/NBEziQl.png)) components to accommodate future requirements. We then refactored our sub-branches to align with this new structure, facilitating a seamless merging process and establishing a standard for future code additions
- We utilized a ![task board]([https://imgur.com/a/RA8Az1G](https://i.imgur.com/Va11GZF.png)) to track project progress and assign tasks, allowing us to prioritize and stay informed about pending work
- Weekly meetings helped us identify duplicated code and components needed across multiple features, leading to the creation of reusable APIs and automated deployment workflows, minimizing overhead

#### Q2. What Did Not Work Well
**Ineffective process-related actions:**
- Running the backend component of our mobile app locally led to issues for frontend developers, who faced difficulties testing their code due to missing dependencies or firewall settings.
- Our initial decision to use a specific set of libraries and APIs resulted in compatibility issues and suboptimal functionality. A more flexible approach to selecting technologies could have saved time and effort.

#### Q3(a). Planned Changes
**Proposed process-related changes:**
- We will create more descriptive branch names to clarify which features are included, facilitating easier collaboration.
- We plan to remove the rule requiring pull requests for direct commits to the main branch, as it has slowed progress unnecessarily. Our established structure already minimizes merge conflicts.
- We will shift to a shared deployed instance of our app's backend to reduce issues related to individual setups and testing.

#### Q3(b). Integration & Next Steps
After deliverable 2, we analyzed our sub-branches for inconsistencies and potential merge conflicts. We established a new project structure in the main branch, refactored our code accordingly, and merged the updated codebases. We then focused on debugging any issues arising from the integration. This assignment enhanced our understanding of collaborating on large codebases using Git and managing merge conflicts.

## Product - Review
#### Q4. How Was Your Product Demo?
##### The Demo
We prepared our demo by testing a sequence of interactions in our app's workflow, isolating core features such as account creation, object inventories, object detection, and voice commands. This approach allowed us to effectively showcase our app's functionality.

##### Partner Feedback
Our partner accepted the features but highlighted areas for improvement, particularly in object detection. They suggested transitioning from manual photo analysis to a live video feed. Additionally, they emphasized the need to reduce and better maintain branches to streamline development.

##### Key Takeaways & Learnings
This process taught us how to translate our partner's high-level business requirements into technical specifications. We also learned the importance of branch organization for maintainability, which is crucial for ongoing development beyond our team's contributions.

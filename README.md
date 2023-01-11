HouseHub 
------

<img width="300" height="300" alt="HouseHub Logo" src="https://res.cloudinary.com/decu5fbul/image/upload/v1670528959/HouseHub/Logos/logo_red_banner_centered_slogan_2022-12-08_at_1.38.13_PM_cmvqgn.png">

### Application Overview

For most people, a home is the largest asset they’ll own throughout their lifetime and taking care of maintenance, repairs and upgrades can feel overwhelming or is often overlooked.  HouseHub is meant to eliminate the use of spreadsheets, notepads, filing cabinets, and other less efficient and less accessible resources used to track home maintenance and other projects.  The app gives homeowners the ability to add their home information, add maintenance tasks required, create a list of contractors, and schedule work orders to stay on track of taking care of their home.

This client side application was created as part of a 2 week long Front End Capstone project.  My learning goals were to: 
  - Demonstrate proficiency with React components including passing props and params
  - Professionally style page using CSS
  - Use a cloud storage platform to upload and display images
  - Be intentional about user experience during design and functionality choices
  - Try hard things and fail in the name of learning 

### Features
  - Users can store home information including interior details, construction details, exterior details and property details
  - Users can add tasks (reoccuring items) and specify the category and frequency of work and the details of the work to be performed
  - Users can create work orders which track a specific instance of a task and manage the start/completion dates, contractor and work notes
  - Users can build up an address book of contractors and link contractors to work-in-process
  
### User Experience

#### Login to app
------
![](src/media/HouseHub_Login.gif)

#### Add a task
------
![](src/media/HouseHub_Add_a_Task.gif)

#### Create a work order
------
![](src/media/HouseHub_Create_a_Work_Order.gif)

### Technologies Used

<img alt="Javascript" src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E"><img alt="React" src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"><img alt="HTML5" src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white"><img alt="CSS" src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white"><img alt="JSON" src="https://img.shields.io/badge/json-5E5C5C?style=for-the-badge&logo=json&logoColor=white"><img alt="GIT" src="https://img.shields.io/badge/GIT-E44C30?style=for-the-badge&logo=git&logoColor=white"><img alt="Github" src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white"><img alt="VScode" src="https://img.shields.io/badge/VSCode-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white"><img alt="Miro" src="https://img.shields.io/badge/Miro-F7C922?style=for-the-badge&logo=Miro&logoColor=050036"><img alt="" src="">

HTML, Javascript (React Framework), JSON server and CSS were used to build and style this application.  In the planning stages, I used DBDiagram to create an entity relationship diagram and Miro to create a wireframe.  Both documents helped with my solution design and were referenced throughout my work building out this app.

* [HouseHub ERD](https://dbdiagram.io/d/637cf58cc9abfc61117480ed)

* [HouseHub Wireframe](https://miro.com/app/board/uXjVP_UeasE=/?share_link_id=143430286106)
                
### Roadmap
* Filter dropdowns on task, contractor and work order pages
* Additional home detail fields that allow for lower level detail tracking (i.e. serial number, manufacturer, color, etc.) 
*  Auto-formatting of phone numbers 
*  Quote and invoice upload on work orders 

### Running the Application

Navigate to your workspace directory. 

Run the following command in terminal:

```
git clone git@github.com:vanessaspear/house-hub.git
cd house-hub
npm install
npm start
```

This runs the app in development mode.  Open [http://localhost:3000](http://localhost:3000) to view it in your browser. 
 
Navigate back to your workspace directory in terminal to download the database.

Run the following command in terminal:

```
git clone git@github.com:vanessaspear/house-hub-api.git
cd house-hub-api
json-server database.json -p 8088 -w
```

You should now be able to login to the application. 

To demo the app, login in with the following email address: **wthorneloe1@usa.gov**

Author
------
Created by Vanessa Spear 

[<img alt="Github" src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white">](https://github.com/vanessaspear)[<img alt="LinkedIn" src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white">](https://www.linkedin.com/in/vanessavspear/)

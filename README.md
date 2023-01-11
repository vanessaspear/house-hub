HouseHub 
------

<img width="300" height="300" alt="HouseHub Logo" src="https://res.cloudinary.com/decu5fbul/image/upload/v1670528959/HouseHub/Logos/logo_red_banner_centered_slogan_2022-12-08_at_1.38.13_PM_cmvqgn.png">

### Application Overview

For most people, a home is the largest asset they’ll own throughout their lifetime and taking care of maintenance, repairs and upgrades can feel overwhelming or is often overlooked.  HouseHub is meant to eliminate the use of spreadsheets, notepads, filing cabinets, and other less efficient and less accessible resources used to track home maintenance and other projects.  The app gives homeowners the ability to add their home information, add maintenance tasks required, create a list of contractors, and schedule work orders to stay on track of taking care of their home.

### Features
  - Users can store home information including interior details, construction details, exterior details and property details
  - Users can add tasks (reoccuring items) and specify the category and frequency of work and the details of the work to be performed
  - Users can create work orders which track a specific instance of a task and manage the start/completion dates, contractor and work notes
  - Users can build up an address book of contractors and link contractors to work-in-process
  
### ADD GIFS HERE

### Technologies Used

HTML, Javascript (React Framework), JSON server and CSS were used to build and style this application.  In the planning stages, I used DBDiagram to create an entity relationship diagram and Miro to create a wireframe.  Both documents helped with my solution design and were referenced throughout my work building out this app.

* [HouseHub ERD](https://dbdiagram.io/d/637cf58cc9abfc61117480ed)

* [HouseHub Wireframe](https://miro.com/app/board/uXjVP_UeasE=/?share_link_id=143430286106)
                
### Roadmap
* Filter dropdowns on task, contractor and work order pages
* Additional home detail fields that allow for lower level detail tracking (i.e. serial number, manufacturer, color, etc.) 
*  Auto-formatting of phone numbers 
*  Quote and invoice upload on work orders 

### Running the Application

**First, a note about authentication...**

This application does not use authentication and is for development use only. A proper authentication module would need to be implemented for production use.

Navigate to your workspace directory. 

Run the following command in terminal:

```
git clone git@github.com:vanessaspear/house-hub.git
cd house-hub
npm start
```

This runs the app in development mode.  Open [http://localhost:3000](http://localhost:3000) to view it in your browser. 
 
Navigate back to your workspace directory to download the database.

Run the following command in terminal:

```
git clone git@github.com:vanessaspear/house-hub-api.git
cd house-hub-api
json-server database.json -p 8088 -w
```

You should now be able to login to the application. 

To demo the app, login in with the following email address: **wthorneloe1@usa.gov**

<img width="1310" alt="HouseHub Login Page" src="https://user-images.githubusercontent.com/112430942/210656272-e3e58abd-e5d7-44e5-a501-12a33de75c99.png">

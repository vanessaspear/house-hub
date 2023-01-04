# HouseHub is a user-friendly web app that provides homeowners with a simpler way of managing home maintenance, repairs, and upgrades.

# Description

For most people, a home is the largest asset they’ll own throughout their lifetime and taking care of maintenance, repairs and upgrades can feel overwhelming or is often overlooked.  HouseHub is meant to eliminate the use of spreadsheets, notepads, filing cabinets, and other less efficient and less accessible resources used to track home maintenance and other projects.  The app gives homeowners the ability to add their home information, add maintenance tasks required, create a list of contractors, and schedule work orders to stay on track of taking care of their home.

HTML, Javascript (React Framework), JSON server and CSS were used to build and style this application.  In the planning stages, I used DBDiagram to create an entity relationship diagram and Miro to create a wireframe.  Both documents helped with my solution design and were referenced throughout my work building out this app.

* DBDiagram ERD: https://dbdiagram.io/d/637cf58cc9abfc61117480ed 

* Miro wireframe: https://miro.com/app/board/uXjVP_UeasE=/?share_link_id=143430286106
                      

## Some Cool Features
* Integration of the Axios library and Cloudinary API to allow a user to upload and display images for a task, contractor, and work order on their profile (followed this tutorial to learn the basics: https://www.youtube.com/watch?v=Y-VgaRwWS3o)
* Search box that filters through tasks, contractors, and work orders based on the user's search term and live updates the displayed list with matching items
* Task items have work order statuses that are updated as associated work orders are in-process or completed.  Otherwise, it links the user to the "Create a work order" form

## Some Challenges
* Times & dates are harder to work with then you'd expect, especially formatting time/date and filtering by time/date
* I didn't realize until the final day of project work that deleting an object that had foreign key dependencies would also delete the dependent objects from the database based on JSON dependency constraints.  Need to address this in the next revision of the application.
* Rewriting the details of GET/POST/DELETE fetch calls in every use case is extremely tedious and error-prone.  I would definitely create an API manager component with helper functions moving forward.

## Planned Features
* Filters for tasks, contractors, and work orders
* Additional home detail fields that allow for lower level detail tracking (serial number, manufacturer, color, etc.) 
*  Auto-formatting of phone numbers 
*  Quote and invoice upload on work orders 

# How to Install and Run the Project 

Navigate to your workspace directory. 

Run the following command in terminal:

```
git clone git@github.com:vanessaspear/house-hub.git
```

From within the HouseHub directory, run: 

```
npm start
```

This runs the app in development mode.  Open [http://localhost:3000](http://localhost:3000) to view it in your browser.  The page will reload when you make changes.
 
Navigate back to your workspace directory to download the database.

Run the following command in terminal:

```
git clone git@github.com:vanessaspear/house-hub-api.git
```

From within the HouseHub-API directory, run: 

```
json-server database.json -p 8088 -w
```

You should now see the website's login/register page:

<img width="1310" alt="image" src="https://user-images.githubusercontent.com/112430942/210656272-e3e58abd-e5d7-44e5-a501-12a33de75c99.png">




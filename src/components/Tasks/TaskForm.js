//Display form to add new task to homeowner's task list
//Used Axios library and Cloudinary API to upload images to database

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Axios from 'axios'
import "./TaskForm.css"


export const TaskForm = () => {
   
    const [task, update] = useState({
        title: "",
        description: "",
        homeId: 0,
        categoryId: 0,
        frequencyId: 0,
        image: "",
        status: "Active"
    })
    const [homes, setHomes] = useState([])
    const [categories, setCategories] = useState([])
    const [frequencies, setFrequencies] = useState([])
    const [image, setImage] = useState("")

    //Initialize homes state variable
    useEffect(
        () => {
            fetch(`http://localhost:8088/homes`)
                .then(res => res.json())
                .then((homesArray) => {
                    setHomes(homesArray)
                })
        },
        []
    )

    //Initialize Categories state variable
    useEffect(
        () => {
            fetch(`http://localhost:8088/categories`)
                .then(res => res.json())
                .then((categoriesArray) => {
                    setCategories(categoriesArray)
                })
        },
        []
    )

    //Initialize Frequencies state variable
    useEffect(
        () => {
            fetch(`http://localhost:8088/frequencies`)
                .then(res => res.json())
                .then((frequenciesArray) => {
                    setFrequencies(frequenciesArray)
                })
        },
        []
    )

    //Find the homownerId of the user currently logged-in
   const localUser = localStorage.getItem("homeowner")
   const homeownerObj = JSON.parse(localUser)

   //Find the homeID based on the current logged-in user
   const homeObj = homes.find(home => home.homeownerId === homeownerObj.id)
    const homeId = homeObj?.id
   
    //Use navigate to redirect to tasks list 
    const navigate = useNavigate()

    const handleSaveButtonClick = (event) => {
        if (image) {
            event.preventDefault()
            console.log("Your task has been saved")

            //Upload the image to Cloudinary platform
            //Followed tutorial: https://www.youtube.com/watch?v=Y-VgaRwWS3o
            const formData = new FormData()
            //Constructing the form data - add the imported file and upload preset
            formData.append("file", image)
            formData.append("upload_preset", "househub")

            //Use Axios API to post photo to Cloudinary platform
            Axios.post("https://api.cloudinary.com/v1_1/decu5fbul/image/upload", formData)
                .then(response => {
                        //Create the object to be saved to the API
                        const taskToSaveToAPI = {
                            title: task.title,
                            description: task.description,
                            homeId: homeId,
                            categoryId: task.categoryId,
                            frequencyId: task.frequencyId,
                            image: response.data.url,
                            status: "Active"
                        }

                        //Perform the fetch() to POST the new task object to the API
                        fetch(`http://localhost:8088/tasks`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(taskToSaveToAPI)
                        })
                            .then(res => res.json())
                            .then(() => {
                                //Return user to tasks list
                                navigate("/tasks")
                            })
                        })
        } else {
            event.preventDefault()
            console.log("Your task has been saved")

            //Create the object to be saved to the API
            const taskToSaveToAPI = {
                title: task.title,
                description: task.description,
                homeId: homeId,
                categoryId: task.categoryId,
                frequencyId: task.frequencyId,
                image: "",
                status: "Active"
            }

            //Perform the fetch() to POST the new task object to the API
            fetch(`http://localhost:8088/tasks`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(taskToSaveToAPI)
            })
                .then(res => res.json())
                .then(() => {
                    //Return user to tasks list
                    navigate("/tasks")
                })
        }
    }

    return <>
        <form className="taskForm">
            <h2 className="taskForm__title">Create New Task</h2>
            <section className="taskForm_groups">
            <div>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input
                            required autoFocus
                            type="text"
                            id="title"
                            className="form-control"
                            // placeholder="Task title"
                            value={task.title}
                            onChange={ (event) => {
                                const copy = {...task}
                                copy.title = event.target.value
                                update(copy)
                            }} />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea
                            required
                            className="form-control_description"
                            id="description"
                            // placeholder="Brief description of task to be completed"
                            value={task.description}
                            onChange={ (event) => {
                                const copy = {...task}
                                copy.description = event.target.value
                                update(copy)
                            }} />
                    </div>
                </fieldset>
            </div>
            <div className="taskform-options">
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="category">Category</label>
                        <select
                            required
                            id="category"
                            className="form-control"
                            onChange={ (event) => {
                                const copy = {...task}
                                copy.categoryId = parseInt(event.target.value)
                                update(copy)
                            }}
                            >
                            <option value={0}></option>
                            {
                                categories.map(category => {
                                    return <option value={category.id} key={`category--${category.id}`}>{category.category}</option>
                                })
                            }
                        </select>
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="frequency">Frequency</label>
                        <select
                            required
                            id="frequency"
                            className="form-control"
                            onChange={ (event) => {
                                const copy = {...task}
                                copy.frequencyId = parseInt(event.target.value)
                                update(copy)
                            }}
                            >
                            <option value={0}></option>
                            {
                                frequencies.map(frequency => {
                                    return <option value={frequency.id} key={`frequency--${frequency.id}`}>{frequency.frequency}</option>
                                })
                            }
                        </select>
                    </div>
                </fieldset>
                <fieldset>
                <div className="form-group">
                <label htmlFor="Image">Add an Image (Optional)</label>
                <input 
                    className="form-image"
                    id="Image"
                    type="file" 
                    onChange={ (event) => {
                        setImage(event.target.files[0])
                        }}
                    />
                    </div>
                </fieldset>
            </div>
            </section>
            <div className="btn-container">
                <button 
                    onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                    className="btn-create_task">
                    Save Task
                </button>
            </div>
        </form>
     </>
}
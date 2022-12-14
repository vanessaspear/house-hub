//Get the task ID that was passed as a string parameter 
//Use a fetch call to get the task item from the database
//Display the task's info and edit content using a form

import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Axios from 'axios'

export const EditTask = () => {

    const {taskId} = useParams()
    const [task, update] = useState({
        id: 0,
        title: "",
        description: "",
        homeId: 0,
        categoryId: 0,
        frequencyId: 0,
        image: "",
        status: ""
    })
    const [categories, setCategories] = useState([])
    const [frequencies, setFrequencies] = useState([])
    const [image, setImage] = useState("")

    useEffect(
        () => {
            fetch(`http://localhost:8088/tasks?id=${taskId}&_expand=frequency&_expand=category`)
                .then(res => res.json())
                .then((taskArray) => {
                    const taskObj = taskArray[0]
                    update(taskObj)
                })
        },
        [taskId]
    )

    //Initialize workCategories state variable
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

    //Initialize workFrequencies state variable
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

    const navigate = useNavigate()

    //Save task object and post it to database when button is clicked
    const handleSaveButtonClick = (event) => {
        if (image) {
            event.preventDefault()
            console.log("Your task edit has been saved")

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
                        const saveDataToAPI = {
                            title: task.title,
                            description: task.description,
                            homeId: task.homeId,
                            categoryId: task.categoryId,
                            frequencyId: task.frequencyId,
                            id: task.id,
                            image: response.data.url,
                            status: task.status
                        }

                        //Perform the fetch() to PUT the object to the API
                        return fetch(`http://localhost:8088/tasks/${taskId}`, {
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(saveDataToAPI)
                        })
                            .then(res => res.json())
                            .then(
                                () => {
                                    navigate("/tasks")
                                })
                    })
        } else {
            event.preventDefault()
            console.log("Your task edit has been saved")

            //Create the object to be saved to the API
            const saveDataToAPI = {
                title: task.title,
                description: task.description,
                homeId: task.homeId,
                categoryId: task.categoryId,
                frequencyId: task.frequencyId,
                id: task.id,
                image: task.image,
                status: task.status
            }

            //Perform the fetch() to PUT the object to the API
            return fetch(`http://localhost:8088/tasks/${taskId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(saveDataToAPI)
            })
                .then(res => res.json())
                .then(
                    () => {
                        navigate("/tasks")
                    }
                )
        }
    }

    //Form to collect information for updates to task object
    return <>
        <form className="taskForm">
            <h2 className="taskForm__title">Edit Task</h2>
            <section className="taskForm_groups">
                <div>
                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input
                                required autoFocus
                                type="text"
                                className="form-control"
                                placeholder="Task title"
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
                <div>
                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="category">Category</label>
                            <select
                                className="form-control"
                                value={task.categoryId}
                                onChange={ (event) => {
                                    const copy = {...task}
                                    copy.categoryId = event.target.value
                                    update(copy)
                                }}
                                >
                                {
                                    categories.map(category => {
                                        return <option value={category.id} key={category.id}>{category.category}</option>
                                    })
                                }
                            </select>
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="frequency">Frequency</label>
                            <select
                                className="form-control"
                                value={task.frequencyId}
                                onChange={ (event) => {
                                    const copy = {...task}
                                    copy.frequencyId = event.target.value
                                    update(copy)
                                }}
                                >
                                {
                                    frequencies.map(frequency => {
                                        return <option value={frequency.id} key={frequency.id}>{frequency.frequency}</option>
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
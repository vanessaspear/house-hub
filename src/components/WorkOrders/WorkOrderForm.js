//Display form to add new work order to work order list
//Used Axios library and Cloudinary API to upload images to database

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom"
import Axios from 'axios'

export const WorkOrderForm = () => {
   
    const {taskId} = useParams()
    const [task, setTask] = useState([])
    const [workOrder, update] = useState({
        taskId: 0,
        contractorId: 0,
        startDate: "",
        startTime: "",
        completionDate: "",
        completionTime: "",
        homeownerId: 0,
        summary: "",
        image: ""
    })
    //Initialize contractors list 
    const [contractors, setContractors] = useState([])
    const [image, setImage] = useState("")

    //Get task object
    useEffect(
        () => {
            fetch(`http://localhost:8088/tasks?id=${taskId}`)
                .then(res => res.json())
                .then((taskArray) => {
                    const taskObj = taskArray[0]
                    setTask(taskObj)
                })
        },
        [taskId]
    )

    //Find the homownerId of the user currently logged-in
   const localUser = localStorage.getItem("homeowner")
   const homeownerObj = JSON.parse(localUser)

    //Initialize contractors state variable
    useEffect(
        () => {
            fetch(`http://localhost:8088/contractors`)
                .then(res => res.json())
                .then((contractorsArray) => {
                    const yourContractors = contractorsArray.filter(contractor => contractor.homeownerId === homeownerObj.id)
                    setContractors(yourContractors)
                })
        },
        []
    )
   
    //Use navigate to redirect to work orders list 
    const navigate = useNavigate()

    const handleSaveButtonClick = (event) => {
        if (image) {
        event.preventDefault()
        console.log("Your work order has been created")

        //Upload the image to Cloudinary platform
        //Followed tutorial: https://www.youtube.com/watch?v=Y-VgaRwWS3o
        const formData = new FormData()
        //Constructing the form data - add the imported file and upload preset
        formData.append("file", image)
        formData.append("upload_preset", "househub")

        //Use Axios API to post photo to Cloudinary platform
        Axios.post("https://api.cloudinary.com/v1_1/decu5fbul/image/upload", formData)
            .then( response => {
                //Create the object to be saved to the API
                const workOrderToSaveToAPI = {
                //Task Id needs to be passed from the task list button
                taskId: parseInt(taskId),
                contractorId: workOrder.contractorId,
                startDate: workOrder.startDate,
                startTime: new Date(workOrder.startDate).toLocaleTimeString('en-us'),
                completionDate: "",
                completionTime: "",
                homeownerId: homeownerObj.id,
                summary: workOrder.summary,
                image: response.data.url,
                status: "Open"
                }
            
                //Perform the fetch() to POST the new work order object to the API
                fetch(`http://localhost:8088/workOrders`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(workOrderToSaveToAPI)
                })
                    .then(res => res.json())
                    .then(() => {
                        //Return user to work Orders list
                        navigate("/workOrders")
                    })
            })
        } else {
            event.preventDefault()
            console.log("Your work order has been created")

            //Create the object to be saved to the API
            const workOrderToSaveToAPI = {
            //Task Id needs to be passed from the task list button
            taskId: parseInt(taskId),
            contractorId: workOrder.contractorId,
            startDate: workOrder.startDate,
            startTime: new Date(workOrder.startDate).toLocaleTimeString('en-us'),
            completionDate: "",
            completionTime: "",
            homeownerId: homeownerObj.id,
            summary: workOrder.summary,
            image: "",
            status: "Open"
            }
        
            //Perform the fetch() to POST the new work order object to the API
            fetch(`http://localhost:8088/workOrders`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(workOrderToSaveToAPI)
            })
                .then(res => res.json())
                .then(() => {
                    //Return user to work Orders list
                    navigate("/workOrders")
                })
        }
    }

    //JSX for create work order form
    return <>
        <form className="workOrderForm">
            <h2 className="workOrderForm__title">Create Work Order</h2>
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
                        <label htmlFor="contractor">Contractor</label>
                        <select
                            className="form-control"
                            onChange={ (event) => {
                                const copy = {...workOrder}
                                copy.contractorId = parseInt(event.target.value)
                                update(copy)
                            }}
                            >
                            <option value={0}>Select a contractor</option>
                            {
                                contractors.map(contractor => {
                                    return <option value={contractor.id} key={`contractor--${contractor.id}`}>{contractor.company} (Specialty: {contractor.specialty})</option>
                                })
                            }
                        </select>
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="summary">Work Notes</label>
                        <textarea
                            required 
                            type="text"
                            className="form-control_description"
                            value={workOrder.summary}
                            onChange={ (event) => {
                                const copy = {...workOrder}
                                copy.summary = event.target.value
                                update(copy)
                            }} />
                    </div>
                </fieldset>
            </div>
            <div>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="startDate">Start Date</label>
                        <input
                            type="datetime-local"
                            className="form-control"
                            placeholder="Scheduled work start date"
                            value={workOrder.startDate}
                            onChange={ (event) => {
                                const copy = {...workOrder}
                                copy.startDate = event.target.value
                                update(copy)
                            }} />
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
                    Create Work Order
                </button>
            </div>
        </form>
    </>
}
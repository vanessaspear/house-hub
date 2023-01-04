//Get the work order ID that was passed as a string parameter 
//Use a fetch call to get the work order's info from the database
//Display the work orders info and edit content using a form

import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Axios from 'axios'

export const EditWorkOrder = () => {

    const {workOrderId} = useParams()
    const [workOrder, update] = useState({
        id: 0,
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
    const [contractors, setContractors] = useState([])
    const [image, setImage] = useState("")

    //Get the work order object that needs to be modified
    useEffect(
        () => {
            fetch(`http://localhost:8088/workOrders?id=${workOrderId}&_expand=task&_expand=contractor`)
                .then(res => res.json())
                .then((workOrderArray) => {
                    const workOrderObj = workOrderArray[0]
                    update(workOrderObj)
                })
        },
        [workOrderId]
    )

    //Initialize contractors state variable
    useEffect(
        () => {
            fetch(`http://localhost:8088/contractors`)
                .then(res => res.json())
                .then((contractorsArray) => {
                    setContractors(contractorsArray)
                })
        },
        []
    )

    const navigate = useNavigate()

    //Save work order object and post it to database when button is clicked
    const handleSaveButtonClick = (event) => {
        if (image) {
            event.preventDefault()
            console.log("Your work order edit has been saved")
            //Upload the image to Cloudinary platform
            //Followed tutorial: https://www.youtube.com/watch?v=Y-VgaRwWS3o
            const formData = new FormData()
            //Constructing the form data - add the imported file and upload preset
            formData.append("file", image)
            formData.append("upload_preset", "househub")

            //Use Axios API to post photo to Cloudinary platform
            Axios.post("https://api.cloudinary.com/v1_1/decu5fbul/image/upload", formData)
                .then( response => {
                    event.preventDefault()
                    console.log("Your work order edit has been saved")
            
                    //Create the object to be saved to the API
                    const saveDataToAPI = {
                        id: workOrderId,
                        taskId: workOrder.taskId,
                        contractorId: workOrder.contractorId,
                        startDate: workOrder.startDate,
                        startTime: new Date(workOrder.startDate).toLocaleTimeString('en-us'),
                        completionDate: workOrder.completionDate,
                        completionTime: new Date(workOrder.completionDate).toLocaleTimeString('en-us'),
                        homeownerId: workOrder.homeownerId,
                        summary: workOrder.summary, 
                        image: response.data.url,
                        status: workOrder.status
                    }
            
                    //Perform the fetch() to PUT the object to the API
                    return fetch(`http://localhost:8088/workOrders/${workOrderId}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(saveDataToAPI)
                    })
                        .then(res => res.json())
                        .then(
                            () => {
                                navigate("/workOrders")
                            })
                })
        } else {
            event.preventDefault()
            console.log("Your work order edit has been saved")
    
            //Create the object to be saved to the API
            const saveDataToAPI = {
                id: workOrderId,
                taskId: workOrder.taskId,
                contractorId: workOrder.contractorId,
                startDate: workOrder.startDate,
                startTime: new Date(workOrder.startDate).toLocaleTimeString('en-us'),
                completionDate: workOrder.completionDate,
                completionTime: new Date(workOrder.completionDate).toLocaleTimeString('en-us'),
                homeownerId: workOrder.homeownerId,
                summary: workOrder.summary, 
                image: workOrder.image,
                status: workOrder.status
            }
    
            //Perform the fetch() to PUT the object to the API
            return fetch(`http://localhost:8088/workOrders/${workOrderId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(saveDataToAPI)
            })
                .then(res => res.json())
                .then(
                    () => {
                        navigate("/workOrders")
                    })
        }
    }

    //Form to collect information for updates to work order info
    return <>
        <form className="workOrderForm">
            <h2 className="workOrderForm__title">Edit Work Order</h2>
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
                            value={workOrder?.task?.title}
                            onChange={ (event) => {
                                const copy = {...workOrder}
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
                                value={workOrder?.task?.description}
                                onChange={ (event) => {
                                    const copy = {...workOrder}
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
                                value={workOrder.contractorId}
                                onChange={ (event) => {
                                    const copy = {...workOrder}
                                    copy.contractorId = parseInt(event.target.value)
                                    update(copy)
                                }}
                                >
                                <option value={0}>Homeowner (No contractor required)</option>
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
                            <label htmlFor="completionDate">Completion Date</label>
                            <input
                                type="datetime-local"
                                className="form-control"
                                placeholder="Work completion date"
                                value={workOrder.completionDate}
                                onChange={ (event) => {
                                    const copy = {...workOrder}
                                    copy.completionDate = event.target.value
                                    if (copy.completionDate) {
                                        copy.status = "Closed"
                                    }
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
                    Save Edits
                </button>
            </div>
        </form>
    </>
}
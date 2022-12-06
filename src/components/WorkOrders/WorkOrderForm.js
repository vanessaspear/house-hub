import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom" 

export const WorkOrderForm = () => {
   
    const {taskId} = useParams()
    const [task, setTask] = useState([])
    const [workOrder, update] = useState({
        id: 0,
        taskId: 0,
        contractorId: 0,
        startDate: "",
        completionDate: "",
        homeownerId: 0,
        summary: "",
        beforeImage: "",
        afterImage: ""
    })
    //Initialize contractors list 
    const [contractors, setContractors] = useState([])

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
        event.preventDefault()
        console.log("Your work order has been created")

        //Create the object to be saved to the API
        const workOrderToSaveToAPI = {
            //Task Id needs to be passed from the task list button
            taskId: taskId,
            contractorId: workOrder.contractorId,
            startDate: workOrder.startDate,
            completionDate: workOrder.completionDate,
            homeownerId: homeownerObj.id,
            summary: workOrder.summary,
            beforeImage: workOrder.beforeImage,
            afterImage: workOrder.afterImage
        }

        //Perform the fetch() to POST the new work order object to the API
        return fetch(`http://localhost:8088/workOrders`, {
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

    //Use React and cloudinary upload widget to upload photos
    //Cloudinary widget reference tutorial: https://cloudinary.com/documentation/react_image_and_video_upload
    const beforeWidget = (event) => {
        
        event.preventDefault()

        let widget = window.cloudinary.createUploadWidget(
        {
            cloudName: "decu5fbul",
            uploadPreset: "househub"
        },
        (error, result) => {
            if (!error && result && result.event === "success") {
                const copy = {...workOrder}
                copy.beforeImage = result.info.url
                update(copy)
            }})
            widget.open()
    }

    const afterWidget = (event) => {
        
        event.preventDefault()

        let widget = window.cloudinary.createUploadWidget(
        {
            cloudName: "decu5fbul",
            uploadPreset: "househub"
        },
        (error, result) => {
            if (!error && result && result.event === "success") {
                const copy = {...workOrder}
                copy.afterImage = result.info.url
                update(copy)
            }})
            widget.open()
    }

    //JSX for create work order form
    return <>
        <form className="workOrderForm">
            <h2 className="workOrderForm__title">Create a Work Order</h2>  
            <div>Title: {task.title}</div>        
            <div>Description: {task.description}</div>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="summary">Work Summary:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="How did the work go?"
                        value={workOrder.summary}
                        onChange={ (event) => {
                            const copy = {...workOrder}
                            copy.summary = event.target.value
                            update(copy)
                        }} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="contractor">Contractor:</label>
                    <select
                        className="form-control"
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
                    <label htmlFor="startDate">Start Date:</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Format: MM/DD/YYYY"
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
                    <label htmlFor="completionDate">Completion Date:</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Format: MM/DD/YYYY"
                        value={workOrder.completionDate}
                        onChange={ (event) => {
                            const copy = {...workOrder}
                            copy.completionDate = event.target.value
                            update(copy)
                        }} />
                </div>
            </fieldset>
            <section>
                {
                    workOrder.beforeImage !== ""
                    ? <img src={workOrder.beforeImage} alt="" className="image-workOrderForm"/>
                    : ""
                }
                
                <button onClick={(event) => beforeWidget(event)}
                    className="btn btn-primary">
                    Add before photo
                </button>
            </section>
            <section>
                {
                    workOrder.afterImage !== ""
                    ? <img src={workOrder.afterImage} alt="" className="image-workOrderForm"/>
                    : ""
                }
                
                <button onClick={(event) => afterWidget(event)}
                    className="btn btn-primary">
                    Add after photo
                </button>
            </section>
            <button 
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Create Work Order
            </button>
        </form>
    </>
}
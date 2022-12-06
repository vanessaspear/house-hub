import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const EditWorkOrder = () => {

    const {workOrderId} = useParams()
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
    const [contractors, setContractors] = useState([])

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

    const navigate = useNavigate()

    //Save work order object and post it to database when button is clicked
    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        console.log("Your work order edit has been saved")

        //Create the object to be saved to the API
        const saveDataToAPI = {
            id: workOrderId,
            taskId: workOrder.taskId,
            contractorId: workOrder.contractorId,
            startDate: workOrder.startDate,
            completionDate: workOrder.completionDate,
            homeownerId: workOrder.homeownerId,
            summary: workOrder.summary,
            beforeImage: workOrder.beforeImage,
            afterImage: workOrder.afterImage
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
                }
            )
    }

    //Form to collect information for updates to work order info
    return (
        <form className="workOrderForm">
            <h2 className="workOrderForm__title">Edit Work Order</h2>
            <div>Title: {workOrder?.task?.title}</div>
            <div>Description: {workOrder?.task?.description}</div>
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
                Save Work Order
            </button>
        </form>
    )
}
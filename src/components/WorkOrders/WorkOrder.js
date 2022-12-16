import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export const WorkOrder = ({ workOrder, doRefresh, refresh }) => {
    const [openWorkOrder, updateWorkOrder] = useState([])

    useEffect(
        () => {
            fetch(`http://localhost:8088/workOrders/${workOrder.id}`)
                .then(res => res.json())
                .then((workOrderObj) => {
                    updateWorkOrder(workOrderObj)
                })
        },
        []
    )

    //Date format in database: "startDate": "2022-09-12T09:00"
    const startDateFormat = () => {
            let displayStartDate = workOrder.startDate.split("T")
            displayStartDate = displayStartDate[0].split("-")
            displayStartDate = [displayStartDate[1], displayStartDate[2], displayStartDate[0]]
            displayStartDate = displayStartDate.join("/")
            return displayStartDate
    }

    const completionDateFormat = () => {
        let displayCompletionDate = workOrder.completionDate.split("T")
        displayCompletionDate = displayCompletionDate[0].split("-")
        displayCompletionDate = [displayCompletionDate[1], displayCompletionDate[2], displayCompletionDate[0]]
        displayCompletionDate = displayCompletionDate.join("/")
        return displayCompletionDate
    }

    const getDefaultImage = () => {
        return <img className="task-image" src="https://res.cloudinary.com/decu5fbul/image/upload/v1670689181/HouseHub/Images/cesar-carlevarino-aragon-NL_DF0Klepc-unsplash_wqjjaq.jpg" />
    }


    return <>
        <section className="workOrder-container" key={`workOrder--${workOrder.id}`}>
            <section className="workOrder">
                {
                    !(workOrder.status === "Archived") ? <>

                    <div>
                        {
                            workOrder.image ? <img className="workOrder-image" src={workOrder?.image} />
                            : getDefaultImage()
                        }
                    </div>
                    <div className="workOrder-item">
                        <div className="workOrder-item_title">{workOrder?.task?.title}</div>
                        <div className="workOrder-item_description">{workOrder?.task?.description}</div>
                        <div className="workOrder-options">
                            <Link className="workOrder-item_link" to={`/workOrders/${workOrder.id}/edit`}>Edit</Link>|
                            <div className="workOrder-option_item" onClick={() => {
                                fetch(`http://localhost:8088/workOrders/${workOrder.id}`, {
                                    method: "DELETE"
                                })
                                    .then(() => {
                                        doRefresh(!refresh)
                                    })
                            }}>
                                Delete
                            </div>
                        </div>
                    </div>
                    <div className="workOrder-metrics">
                        <div className="metrics-category">
                            <img className="icon-category" src="https://res.cloudinary.com/decu5fbul/image/upload/v1670968751/HouseHub/Resources/Screenshot_2022-12-13_at_3.52.16_PM_uu2gkk.png" />
                            <div className="workOrder-metrics_item">{workOrder?.contractor?.company}</div>
                        </div>
                        <div className="metrics-category">
                            <img className="icon-category" src="https://res.cloudinary.com/decu5fbul/image/upload/v1670968751/HouseHub/Resources/Screenshot_2022-12-13_at_3.55.25_PM_zt3rvq.png" />
                            <div className="workOrder-metrics_item"> 
                                {
                                    workOrder.startDate ? `${startDateFormat(workOrder.startDate)} at ${workOrder.startTime}`
                                    : "Work is not yet scheduled"
                                }
                            </div>
                        </div>
                        <div className="metrics-category">
                            {
                                workOrder.completionDate ? <>
                                    <img className="icon-category" src="https://res.cloudinary.com/decu5fbul/image/upload/v1670968751/HouseHub/Resources/Screenshot_2022-12-13_at_3.57.29_PM_egwa7a.png" />
                                    <div className="workOrder-metrics_item">
                                        {completionDateFormat(workOrder.completionDate)} at {workOrder.completionTime}
                                    </div>
                                </>
                                : <><img className="icon-category" src="https://res.cloudinary.com/decu5fbul/image/upload/v1670968751/HouseHub/Resources/Screenshot_2022-12-13_at_3.57.05_PM_getb25.png" />
                                <div className="workOrder-metrics_item">Work order is in-process</div></>
                            }
                        </div>
                        <div className="metrics-category">
                            {
                                workOrder.summary ? <div className="workOrder-item_summary">Work Notes - {workOrder.summary}</div>
                                    : ""
                            }
                        </div>
                    </div>
                </>
                    : ""
            }
            </section>
        </section>
    </>
}
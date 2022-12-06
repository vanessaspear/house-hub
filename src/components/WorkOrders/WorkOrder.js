import { Link } from "react-router-dom"

export const WorkOrder = ({ workOrder, doRefresh, refresh }) => {

    //Date format in database: "startDate": "2022-09-12T09:00"
    const startDateFormat = (startDate) => {
            let displayStartDate = workOrder.startDate.split("T")
            displayStartDate = displayStartDate[0].split("-")
            displayStartDate = [displayStartDate[1], displayStartDate[2], displayStartDate[0]]
            displayStartDate = displayStartDate.join("/")
            return displayStartDate
    }

    const completionDateFormat = (completionDate) => {
        let displayCompletionDate = workOrder.completionDate.split("T")
        displayCompletionDate = displayCompletionDate[0].split("-")
        displayCompletionDate = [displayCompletionDate[1], displayCompletionDate[2], displayCompletionDate[0]]
        displayCompletionDate = displayCompletionDate.join("/")
        return displayCompletionDate
    }


    return <>
        <section className="workOrder" key={`workOrder--${workOrder.id}`}>
            <header><Link to={`/workOrders/${workOrder.id}/edit`}>{workOrder?.task?.title}</Link></header>
            <div>Description: {workOrder?.task?.description}</div>
            <div>Work Summary: {workOrder.summary}</div>
            <div>Contractor: {workOrder?.contractor?.company}</div>
            <div>Start Date & Time: 
                {
                    workOrder.startDate ? ` ${startDateFormat(workOrder.startDate)} at ${workOrder.startTime}`
                    : "Work is not yet scheduled"
                }
            </div>
            <div>Completion Date & Time: 
                {
                    workOrder.completionDate ? ` ${completionDateFormat(workOrder.completionDate)} at ${workOrder.completionTime}`
                    : " Work is not yet completed"
                }
            </div>
            <div>
                {
                    workOrder.image ? <img src={workOrder?.image} />
                    : ""
                }
            </div>
            <footer>
            <button onClick={() => {
                fetch(`http://localhost:8088/workOrders/${workOrder.id}`, {
                    method: "DELETE"
                })
                    .then(() => {
                        doRefresh(!refresh)
                    })
            }}>
                Delete
            </button>
            </footer>
        </section>
    </>
}
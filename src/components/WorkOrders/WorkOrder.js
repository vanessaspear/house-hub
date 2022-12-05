import { Link } from "react-router-dom"

export const WorkOrder = ({ workOrder, doRefresh, refresh }) => {

    return <>
        <section className="workOrder" key={`workOrder--${workOrder.id}`}>
            <header><Link to={`/workOrders/${workOrder.id}/edit`}>{workOrder?.task?.title}</Link></header>
            <div>Description: {workOrder?.task?.description}</div>
            <div>Work Summary: {workOrder.summary}</div>
            <div>Contractor: {workOrder?.contractor?.company}</div>
            <div>Start Date: {workOrder.startDate}</div>
            <div>Completion Date: {workOrder.completionDate}</div>
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
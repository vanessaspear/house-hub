import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

/* Algorithmic thinking: 

1. get work order array from database that is associated with the current task ID 
2. iterate through the entire array (could just be one object)
3. Determine if each work order is open or closed 
4. If the work order is oopen display 
    <div>This task is in-process on <Link className="task-item_link" to={`/workOrders`}>Work Order #{workOrder.id}</Link></div>
5. If the work order is closed, display when the most recent work order was completed 
6. If a work order doesn't exist or there are no open work orders, display: 
    <Link className="task-item_link" to={`/workOrder/${task.id}/create`}>Create Work Order</Link>

*/

export const WorkOrderStatus = ({ task }) => {
    const [workOrders, setWorkOrders] = useState([])

    useEffect(
        () => {
            fetch(`http://localhost:8088/workOrders?_expand=task&taskId=${task?.id}`)
                .then(res => res.json())
                .then((workOrderArray) => {
                    setWorkOrders(workOrderArray)
                })
        },
        []
    )

    const completionDateFormat = (workOrder) => {
        let displayCompletionDate = workOrder.completionDate.split("T")
        displayCompletionDate = displayCompletionDate[0].split("-")
        displayCompletionDate = [displayCompletionDate[1], displayCompletionDate[2], displayCompletionDate[0]]
        displayCompletionDate = displayCompletionDate.join("/")
        return displayCompletionDate
    }

    const workOrderStatus = () => {
        if (workOrders.length >= 1) {
            
          const openWorkOrders = workOrders.filter(workOrder => workOrder?.status === "Open")
          const closedWorkOrders = workOrders.filter(workOrder => workOrder?.status === "Closed")
            
          //Filter through open work orders 
          if ((openWorkOrders.length >= 1) && (closedWorkOrders.length < 1)) {
            if (openWorkOrders.length > 1) {
                return <div>There are multiple open <Link className="task-item_link" to={`/workOrders`}>work orders</Link>associated with this task</div>
            } else {
                const workOrder = openWorkOrders[0]
                return <div>This task is in-process on <Link className="task-item_link" to={`/workOrders`}>Work Order #{workOrder?.id}</Link></div>
            }
          }

          if ((openWorkOrders.length >= 1) && (closedWorkOrders.length >= 1)) {
            const sortedAscCompletionDates = closedWorkOrders.sort(
                (objA, objB) => Number(objA.completionDate) - Number(objB.completionDate)
            )
            const length = sortedAscCompletionDates.length
            const mostRecentCompletion = sortedAscCompletionDates[length - 1]
            const recentDate = completionDateFormat(mostRecentCompletion)
            const openWorkOrder = openWorkOrders[0]

            return <>
             <div className="metrics-category_workOrder">This task was last completed on {recentDate}</div>
             <div>This task is in-process on <Link className="task-item_link" to={`/workOrders`}>Work Order #{openWorkOrder?.id}</Link></div>
            </>
          }

          if ((openWorkOrders.length < 1) && (closedWorkOrders.length >= 1)) {
            const sortedAscCompletionDates = closedWorkOrders.sort(
                (objA, objB) => Number(objA.completionDate) - Number(objB.completionDate)
            )
            const length = sortedAscCompletionDates.length
            const mostRecentCompletion = sortedAscCompletionDates[length - 1]
            const recentDate = completionDateFormat(mostRecentCompletion)

            return <>
                <div className="metrics-category_workOrder">This task was last completed on {recentDate}</div>
                <div><Link className="task-item_link" to={`/workOrder/${task?.id}/create`}>Create Work Order</Link></div>
            </>
          }

        } else {
            return <Link className="task-item_link" to={`/workOrder/${task?.id}/create`}>Create Work Order</Link>
        }
    }

    return workOrderStatus()
}


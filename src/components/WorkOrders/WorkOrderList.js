import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { WorkOrder } from "./WorkOrder"
import "./WorkOrder.css"

export const WorkOrderList = ({ searchTerm }) => {
    const [workOrders, setWorkOrders] = useState([])
    const [filteredWorkOrders, setFilteredWorkOrders] = useState([])
    const [homeownerWorkOrders, updateHomeownerWorkOrders] = useState([])
    const [refresh, doRefresh] = useState(false)

    //Fetch the work orders array when the contractors state variable is initialized
    useEffect(
        () => {
            fetch(`http://localhost:8088/workOrders?_expand=task&_expand=contractor`)
                .then(res => res.json())
                .then((workOrdersArray) => {
                    setWorkOrders(workOrdersArray)
                })
        },
        []
    )

    const navigate = useNavigate()

    //Find the homownerId of the user currently logged-in
    const localUser = localStorage.getItem("homeowner")
    const homeownerObj = JSON.parse(localUser)


    //Filter the work orders list to only show work orders that belong to the current homeowner who is logged-in to the app
    useEffect(
        () => {
            const myWorkOrders = workOrders.filter(workOrder => workOrder.homeownerId === homeownerObj.id)
            updateHomeownerWorkOrders(myWorkOrders)
            setFilteredWorkOrders(myWorkOrders)
        },
        [workOrders]
    )

    //Observe state of the search term 
    useEffect(
        () => {
            const searchedWorkOrder = homeownerWorkOrders.filter(workOrder => {
                return workOrder?.task?.title.toLowerCase().includes(searchTerm.toLowerCase()) || workOrder?.task?.description.toLowerCase().includes(searchTerm.toLowerCase()) || workOrder.summary.toLowerCase().includes(searchTerm.toLowerCase())
            }) 
                setFilteredWorkOrders(searchedWorkOrder)
            },
        [searchTerm]
    )

    //Grab updated work orders list after deletion of a work order
    useEffect(
        () => {
            fetch(`http://localhost:8088/workOrders?_expand=task&_expand=contractor`)
                .then(res => res.json())
                .then((workOrdersArray) => {
                    setWorkOrders(workOrdersArray)
                })
        },
        [refresh]
    )

    return <>
        <article className="workOrders">
            {
                filteredWorkOrders.map(workOrder => {
                    return <WorkOrder workOrder={ workOrder } doRefresh={doRefresh} refresh={refresh}/>
                })
            }
        </article>
    </>
}
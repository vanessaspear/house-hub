//Parent page to display all work order components and manage search function

import { useState } from "react"
import { WorkOrderList } from "./WorkOrderList"
import { WorkOrderSearch } from "./WorkOrderSearch"


export const WorkOrderContainer = () => {
    const [search, updateSearch] = useState("")

    return <>
        <main className="workOrders-list">
            <h2>My Work Orders</h2>

            <div className="workOrders-elements">
                <WorkOrderSearch setterFunction={updateSearch} />
            </div>
            
            <WorkOrderList searchTerm={search} />
        </main>
    </>
}
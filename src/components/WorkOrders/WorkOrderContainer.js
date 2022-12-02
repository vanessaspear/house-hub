import { useState } from "react"
import { WorkOrderList } from "./WorkOrderList"
import { WorkOrderSearch } from "./WorkOrderSearch"


export const WorkOrderContainer = () => {
    const [search, updateSearch] = useState("")

    return <>
        <WorkOrderSearch setterFunction={updateSearch} />
        <WorkOrderList searchTerm={search} />
    </>
}
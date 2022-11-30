import { useState } from "react"
import { TaskList } from "../Tasks/TaskList"
import { TaskSearch } from "../Tasks/TaskSearch"

export const TaskContainer = () => {
    const [search, updateSearch] = useState("")

    return <>
        <TaskSearch setterFunction={updateSearch} />
        <TaskList searchTerm={search} />
    </>
}
//Parent page to display all task-related components and manage search function

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { TaskList } from "../Tasks/TaskList"
import { TaskSearch } from "../Tasks/TaskSearch"

export const TaskContainer = () => {
    const [search, updateSearch] = useState("")

    const navigate = useNavigate()

    return <>
        <main className="tasks-list">
            <h2>My Tasks</h2>

            <div className="tasks-elements">
                <button className="btn-create btn-create:hover" onClick={() => navigate("/task/create")}>Create Task</button>
                <TaskSearch setterFunction={updateSearch} />
            </div>
            
            <TaskList searchTerm={search} />
        </main>
    </>
}
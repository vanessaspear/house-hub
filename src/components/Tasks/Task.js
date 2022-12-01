import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"

export const Task = ({ task }) => {

    return <>
        <section className="task" key={task.id}>
            <header><Link to={`/tasks/${task.id}/edit`}>{task.title}</Link></header>
            <div>Description: {task.description}</div>
            <div>Category: {task?.category?.category}</div>
            <div>Frequency: {task?.frequency?.frequency}</div>
        </section>
    </>
}
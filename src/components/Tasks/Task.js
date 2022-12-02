import { Link } from "react-router-dom"

export const Task = ({ task, doRefresh, refresh }) => {

    return <>
        <section className="task" key={task.id}>
            <header><Link to={`/tasks/${task.id}/edit`}>{task.title}</Link></header>
            <div>Description: {task.description}</div>
            <div>Category: {task?.category?.category}</div>
            <div>Frequency: {task?.frequency?.frequency}</div>
            <footer>
            <button onClick={() => {
                fetch(`http://localhost:8088/tasks/${task.id}`, {
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
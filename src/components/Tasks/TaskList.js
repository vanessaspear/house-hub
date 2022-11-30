import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "./Tasks.css"

export const TaskList = ({ searchTerm }) => {
    const [tasks, setTasks] = useState([])
    const [filteredTasks, setFilteredTasks] = useState([])

    //Fetch the tickets array when the tasks state variable is initialized
    useEffect(
        () => {
            fetch(`http://localhost:8088/tasks?_expand=home&_expand=frequency&_expand=category`)
                .then(res => res.json())
                .then((tasksArray) => {
                    setTasks(tasksArray)
                })
        },
        []
    )

    const navigate = useNavigate()

    //Find the homownerId of the user currently logged-in
    const localUser = localStorage.getItem("homeowner")
    const homeownerObj = JSON.parse(localUser)


    //Filter the tasks list to only show tasks that belong to the current homeowner who is logged-in to the app
    useEffect(
        () => {
            const myTasks = tasks.filter(task => task?.home?.homeownerId === homeownerObj.id)
            setFilteredTasks(myTasks)
        },
        [tasks]
    )

    //Observe state of the search term 
    useEffect(
        () => {
            const searchedTasks = tasks.filter(task => {
                if(task.title.toLowerCase().contains(searchTerm.toLowerCase()) || task.description.toLowerCase().contains(searchTerm.toLowerCase())) {
                    return true
                }
            })
            setFilteredTasks(searchedTasks)
        },
        [searchTerm]
    )

    return <>
        <h2>Tasks List</h2>

        <button onClick={() => navigate("/task/create")}>Create Task</button>


        <article className="tasks">
            {
                filteredTasks.map(
                    task => {
                        return <section className="task" key={task.id}>
                            <header>{task.title}</header>
                            <div>Description: {task.description}</div>
                            <div>Category: {task?.category?.category}</div>
                            <div>Frequency: {task?.frequency?.frequency}</div>
                        </section>
                    }
                )
            }
        </article>
    </>
}
//Use fetch call and filtering to get the list of tasks for the logged-in user
//Use the searchTerm prop to filter task list as needed
//Pass each task as a prop to the Task component to build out individual task item display blocks

import { useState, useEffect } from "react"
import { Task } from "./Task"
import "./Tasks.css"

export const TaskList = ({ searchTerm }) => {
    const [tasks, setTasks] = useState([])
    const [filteredTasks, setFilteredTasks] = useState([])
    const [homeownerTasks, updateHomeownersTasks] = useState([])
    const [refresh, doRefresh] = useState(false)

    //Fetch the tasks array when the tasks state variable is initialized
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

    //Find the homownerId of the user currently logged-in
    const localUser = localStorage.getItem("homeowner")
    const homeownerObj = JSON.parse(localUser)


    //Filter the tasks list to only show tasks that belong to the current homeowner who is logged-in to the app
    useEffect(
        () => {
            const myTasks = tasks.filter(task => task?.home?.homeownerId === homeownerObj.id)
            updateHomeownersTasks(myTasks)
            setFilteredTasks(myTasks)
        },
        [tasks]
    )

    //Observe state of the search term 
    useEffect(
        () => {
            const searchedTasks = homeownerTasks.filter(task => {
                return task.title.toLowerCase().includes(searchTerm.toLowerCase()) || task.description.toLowerCase().includes(searchTerm.toLowerCase())
            }) 
                setFilteredTasks(searchedTasks)
            },
        [searchTerm]
    )

    //Grab updated task list after deletion of a task
    useEffect(
        () => {
            fetch(`http://localhost:8088/tasks?_expand=home&_expand=frequency&_expand=category`)
                .then(res => res.json())
                .then((tasksArray) => {
                    setTasks(tasksArray)
                })
        },
        [refresh]
    )

    return <>
            <article className="tasks">
                {
                    filteredTasks.map(task => {
                        return <Task task={ task } doRefresh={doRefresh} refresh={refresh}/>
                    })
                }
            </article>
    </>
}
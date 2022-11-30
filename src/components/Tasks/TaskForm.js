import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const TaskForm = () => {
   
    const [task, update] = useState({
        title: "",
        description: "",
        homeId: 0,
        categoryId: "",
        frequencyId: ""
    })
    const [homes, setHomes] = useState([])
    const [categories, setCategories] = useState([])
    const [frequencies, setFrequencies] = useState([])

    //Initialize homes state variable
    useEffect(
        () => {
            fetch(`http://localhost:8088/homes`)
                .then(res => res.json())
                .then((homesArray) => {
                    setHomes(homesArray)
                })
        },
        []
    )

    //Initialize workCategories state variable
    useEffect(
        () => {
            fetch(`http://localhost:8088/categories`)
                .then(res => res.json())
                .then((categoriesArray) => {
                    setCategories(categoriesArray)
                })
        },
        []
    )

    //Initialize workFrequencies state variable
    useEffect(
        () => {
            fetch(`http://localhost:8088/frequencies`)
                .then(res => res.json())
                .then((frequenciesArray) => {
                    setFrequencies(frequenciesArray)
                })
        },
        []
    )

    //Find the homownerId of the user currently logged-in
   const localUser = localStorage.getItem("homeowner")
   const homeownerObj = JSON.parse(localUser)

   //Find the homeID based on the current logged-in user
   const homeObj = homes.find(home => home.homeownerId === homeownerObj.id)
    const homeId = homeObj?.id
   
    //Use navigate to redirect to tasks list 
    const navigate = useNavigate()

    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        console.log("Your task has been saved")

        //Create the object to be saved to the API
        const taskToSaveToAPI = {
            title: task.title,
            description: task.description,
            homeId: homeId,
            categoryId: task.categoryId,
            frequencyId: task.frequencyId
        }

        //Perform the fetch() to POST the new task object to the API
        return fetch(`http://localhost:8088/tasks`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(taskToSaveToAPI)
        })
            .then(res => res.json())
            .then(() => {
                //Return user to tasks list
                navigate("/tasks")
            })
    }

    return (
        <form className="taskForm">
            <h2 className="taskForm__title">Create a new task</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Task title"
                        value={task.title}
                        onChange={ (event) => {
                            const copy = {...task}
                            copy.title = event.target.value
                            update(copy)
                        }} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Brief description of task to be completed"
                        value={task.description}
                        onChange={ (event) => {
                            const copy = {...task}
                            copy.description = event.target.value
                            update(copy)
                        }} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="category">Category:</label>
                    <select
                        className="form-control"
                        onChange={ (event) => {
                            const copy = {...task}
                            copy.categoryId = event.target.value
                            update(copy)
                        }}
                        >
                        <option value={0}>Choose a category</option>
                        {
                            categories.map(category => {
                                return <option value={category.id} key={category.id}>{category.category}</option>
                            })
                        }
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="frequency">Frequency:</label>
                    <select
                        className="form-control"
                        onChange={ (event) => {
                            const copy = {...task}
                            copy.frequencyId = event.target.value
                            update(copy)
                        }}
                        >
                        <option value={0}>Choose a frequency</option>
                        {
                            frequencies.map(frequency => {
                                return <option value={frequency.id} key={frequency.id}>{frequency.frequency}</option>
                            })
                        }
                    </select>
                </div>
            </fieldset>
            <button 
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Save Task
            </button>
        </form>
    )
}
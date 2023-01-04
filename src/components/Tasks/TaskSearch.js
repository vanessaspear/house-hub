//Update the task search term as it changes using the setter function passed from TaskContainer parent component

export const TaskSearch = ({ setterFunction }) => {
    return (
        <div>
            <input className="task-element_search"
                onChange={
                    (changeEvent) => {
                        setterFunction(changeEvent.target.value)
                    } 
                } 
            type="text" placeholder="Search tasks" />
        </div>
    )
}
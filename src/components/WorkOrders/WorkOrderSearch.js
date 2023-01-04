//Update the work order search term as it changes using the setter function passed from WorkOrderContainer parent component

export const WorkOrderSearch = ({ setterFunction }) => {
    return (
        <div>
            <input className="workOrder-element_search"
                onChange={
                    (changeEvent) => {
                        setterFunction(changeEvent.target.value)
                    } 
                } 
            type="text" placeholder="Search work orders" />
        </div>
    )
}
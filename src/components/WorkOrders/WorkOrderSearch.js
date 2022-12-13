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
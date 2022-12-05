export const WorkOrderSearch = ({ setterFunction }) => {
    return (
        <div>
            <input 
                onChange={
                    (changeEvent) => {
                        setterFunction(changeEvent.target.value)
                    } 
                } 
            type="text" placeholder="Search your work orders" />
        </div>
    )
}
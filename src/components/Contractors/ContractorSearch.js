export const ContractorSearch = ({ setterFunction }) => {
    return (
        <div>
            <input 
                onChange={
                    (changeEvent) => {
                        setterFunction(changeEvent.target.value)
                    } 
                } 
            type="text" placeholder="Search your contractors" />
        </div>
    )
}
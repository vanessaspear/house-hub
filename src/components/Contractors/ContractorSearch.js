export const ContractorSearch = ({ setterFunction }) => {
    return (
        <div>
            <input className="contractor-element_search"
                onChange={
                    (changeEvent) => {
                        setterFunction(changeEvent.target.value)
                    } 
                } 
            type="text" placeholder="Search contractors" />
        </div>
    )
}
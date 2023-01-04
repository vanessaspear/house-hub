//Update the contractor search term as it changes using the setter function passed from ContractorContainer parent component

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
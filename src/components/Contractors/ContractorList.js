import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Contractor } from "./Contractor"
import "./Contractors.css"

export const ContractorList = ({ searchTerm }) => {
    const [contractors, setContractors] = useState([])
    const [filteredContractors, setFilteredContractors] = useState([])
    const [homeownerContractors, updateHomeownersContractors] = useState([])
    const [refresh, doRefresh] = useState(false)

    //Fetch the contractors array when the contractors state variable is initialized
    useEffect(
        () => {
            fetch(`http://localhost:8088/contractors`)
                .then(res => res.json())
                .then((contractorsArray) => {
                    setContractors(contractorsArray)
                })
        },
        []
    )

    const navigate = useNavigate()

    //Find the homownerId of the user currently logged-in
    const localUser = localStorage.getItem("homeowner")
    const homeownerObj = JSON.parse(localUser)


    //Filter the contractors list to only show contractors that belong to the current homeowner who is logged-in to the app
    useEffect(
        () => {
            const myContractors = contractors.filter(contractor => contractor.homeownerId === homeownerObj.id)
            updateHomeownersContractors(myContractors)
            setFilteredContractors(myContractors)
        },
        [contractors]
    )

    //Observe state of the search term 
    useEffect(
        () => {
            const searchedContractor = homeownerContractors.filter(contractor => {
                return contractor.primaryContact.toLowerCase().includes(searchTerm.toLowerCase()) || contractor.company.toLowerCase().includes(searchTerm.toLowerCase()) || contractor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
            }) 
                setFilteredContractors(searchedContractor)
            },
        [searchTerm]
    )

    //Grab updated contractors list after deletion of a contractor
    useEffect(
        () => {
            fetch(`http://localhost:8088/contractors`)
                .then(res => res.json())
                .then((contractorsArray) => {
                    setContractors(contractorsArray)
                })
        },
        [refresh]
    )

    return <>
        <h2>Your Contractors</h2>

        <button onClick={() => navigate("/contractor/create")}>Add Contractor</button>

        <article className="contractors">
            {
                filteredContractors.map(contractor => {
                    return <Contractor contractor={ contractor } doRefresh={doRefresh} refresh={refresh}/>
                })
            }
        </article>
    </>
}
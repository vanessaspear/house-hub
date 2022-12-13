import { useState } from "react"
import { ContractorList } from "./ContractorList"
import { ContractorSearch } from "./ContractorSearch"
import { useNavigate } from "react-router-dom"

export const ContractorContainer = () => {
    const [search, updateSearch] = useState("")

    const navigate = useNavigate()
    
    return <>
        <main className="contractors-list">
            <h2>My Contractors</h2>

            <div className="contractors-elements">
                <button className="btn-create" onClick={() => navigate("/contractor/create")}>Add Contractor</button>
                <ContractorSearch setterFunction={updateSearch} />
            </div>
            <ContractorList searchTerm={search} />
        </main>
    </>
}
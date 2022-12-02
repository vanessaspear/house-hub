import { useState } from "react"
import { ContractorList } from "./ContractorList"
import { ContractorSearch } from "./ContractorSearch"

export const ContractorContainer = () => {
    const [search, updateSearch] = useState("")

    return <>
        <ContractorSearch setterFunction={updateSearch} />
        <ContractorList searchTerm={search} />
    </>
}
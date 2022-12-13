import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Axios from 'axios'

export const ContractorForm = () => {
   
    const [contractor, update] = useState({
        primaryContact: "",
        company: "",
        homeownerId: 0,
        phone: "",
        email: "",
        specialty: "",
        image: "",
        status: ""
    })
    const [image, setImage] = useState("")

    //Find the homownerId of the user currently logged-in
   const localUser = localStorage.getItem("homeowner")
   const homeownerObj = JSON.parse(localUser)
   
    //Use navigate to redirect to contractors list 
    const navigate = useNavigate()

    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        console.log("Your contractor has been added")

        const formData = new FormData()
        //Constructing the form data - add the imported file and upload preset
        formData.append("file", image)
        formData.append("upload_preset", "househub")

        //Use Axios API to post photo to Cloudinary platform
        Axios.post("https://api.cloudinary.com/v1_1/decu5fbul/image/upload", formData)
            .then(response => { 
                
                //Create the object to be saved to the API
                const contractorToSaveToAPI = {
                    primaryContact: contractor.primaryContact,
                    company: contractor.company,
                    homeownerId: homeownerObj.id,
                    phone: contractor.phone,
                    email: contractor.email,
                    specialty: contractor.specialty,
                    image: response.data.url,
                    status: "Active"
                }
        
                //Perform the fetch() to POST the new contractor object to the API
                fetch(`http://localhost:8088/contractors`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(contractorToSaveToAPI)
                })
                    .then(res => res.json())
                    .then(() => {
                        //Return user to contractors list
                        navigate("/contractors")
                    })
                })
    }

    return (
        <form className="contractorForm">
            <h2 className="contractorForm__title">Add Contractor</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="company">Company:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Company name"
                        value={contractor.company}
                        onChange={ (event) => {
                            const copy = {...contractor}
                            copy.company = event.target.value
                            update(copy)
                        }} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="primaryContact">Primary Contact:</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Primary contact name"
                        value={contractor.primaryContact}
                        onChange={ (event) => {
                            const copy = {...contractor}
                            copy.primaryContact = event.target.value
                            update(copy)
                        }} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="phone">Phone:</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="(XXX) XXX-XXXX"
                        value={contractor.phone}
                        onChange={ (event) => {
                            const copy = {...contractor}
                            copy.phone = event.target.value
                            update(copy)
                        }} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Format: example@email.com"
                        value={contractor.email}
                        onChange={ (event) => {
                            const copy = {...contractor}
                            copy.email = event.target.value
                            update(copy)
                        }} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="specialty">Specialty:</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Examples: HVAC, Plumbing, Lawn & Landscaping"
                        value={contractor.specialty}
                        onChange={ (event) => {
                            const copy = {...contractor}
                            copy.specialty = event.target.value
                            update(copy)
                        }} />
                </div>
            </fieldset>
            <section>
                <input 
                    type="file" 
                    onChange={ (event) => {
                        setImage(event.target.files[0])
                    }}
                />
            </section>
            <button 
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Add Contractor
            </button>
        </form>
    )
}
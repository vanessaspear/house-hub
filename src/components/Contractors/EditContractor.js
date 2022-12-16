import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Axios from 'axios'

export const EditContractor = () => {

    const {contractorId} = useParams()
    const [contractor, update] = useState({
        id: 0,
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

    //Get the contractor object that needs to be modified
    useEffect(
        () => {
            fetch(`http://localhost:8088/contractors?id=${contractorId}`)
                .then(res => res.json())
                .then((contractorArray) => {
                    const contractorObj = contractorArray[0]
                    update(contractorObj)
                })
        },
        [contractorId]
    )

    const navigate = useNavigate()

    //Save contractor object and post it to database when button is clicked
    const handleSaveButtonClick = (event) => {
        if (image) {
            event.preventDefault()
            console.log("Your contractor edit has been saved")

            const formData = new FormData()
            //Constructing the form data - add the imported file and upload preset
            formData.append("file", image)
            formData.append("upload_preset", "househub")

            //Use Axios API to post photo to Cloudinary platform
            Axios.post("https://api.cloudinary.com/v1_1/decu5fbul/image/upload", formData)
                .then(response => { 
                    //Create the object to be saved to the API
                    const saveDataToAPI = {
                        primaryContact: contractor.primaryContact,
                        company: contractor.company,
                        homeownerId: contractor.homeownerId,
                        phone: contractor.phone,
                        email: contractor.email,
                        specialty: contractor.specialty,
                        id: contractor.id,
                        image: response.data.url,
                        status: contractor.status
                    }

                    //Perform the fetch() to PUT the object to the API
                    return fetch(`http://localhost:8088/contractors/${contractorId}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(saveDataToAPI)
                    })
                        .then(res => res.json())
                        .then(
                            () => {
                                navigate("/contractors")
                            }
                        )
                    })
        } else {
            event.preventDefault()
            console.log("Your contractor edit has been saved")

            //Create the object to be saved to the API
            const saveDataToAPI = {
                primaryContact: contractor.primaryContact,
                company: contractor.company,
                homeownerId: contractor.homeownerId,
                phone: contractor.phone,
                email: contractor.email,
                specialty: contractor.specialty,
                id: contractor.id,
                image: contractor.image,
                status: contractor.status
            }

            //Perform the fetch() to PUT the object to the API
            return fetch(`http://localhost:8088/contractors/${contractorId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(saveDataToAPI)
            })
                .then(res => res.json())
                .then(
                    () => {
                        navigate("/contractors")
                    }
                )

            } 
    }

    //Form to collect information for updates to contractor info
    return (
        <form className="taskForm">
            <h2 className="contractorForm__title">Edit Contractor</h2>
            <section className="taskForm_groups">
                <div>
                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="company">Company</label>
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
                            <label htmlFor="primaryContact">Primary Contact</label>
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
                            <label htmlFor="phone">Phone</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Format: (XXX) XXX-XXXX"
                                value={contractor.phone}
                                onChange={ (event) => {
                                    const copy = {...contractor}
                                    copy.phone = event.target.value
                                    update(copy)
                                }} />
                        </div>
                    </fieldset>
                </div>
                <div>
                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
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
                            <label htmlFor="specialty">Specialty</label>
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
                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="Image">Add an Image (Optional)</label>
                            <input 
                                className="form-image"
                                type="file" 
                                onChange={ (event) => {
                                    setImage(event.target.files[0])
                                }}
                            />
                        </div>
                    </fieldset>
                </div>
            </section>
            <div className="btn-container">
                <button 
                    onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                    className="btn-create_task">
                    Save Edits
                </button>
            </div>
        </form>
    )
}
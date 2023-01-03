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
        if (image) { 
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
        } else {
            event.preventDefault()
            console.log("Your contractor has been added")

            //Create the object to be saved to the API
            const contractorToSaveToAPI = {
                primaryContact: contractor.primaryContact,
                company: contractor.company,
                homeownerId: homeownerObj.id,
                phone: contractor.phone,
                email: contractor.email,
                specialty: contractor.specialty,
                image: "",
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
        }
    }

        // const formatNumber = (userEntry) => {
        //     if (userEntry.length < 4) {
        //         return userEntry
        //     }
        //     if (userEntry.length < 7) {
        //         return `(${userEntry.substring(0,3)}) ${userEntry.substring(3, 7)}`
        //     }
        //     return `(${userEntry.substring(0,3)}) ${userEntry.substring(3, 7)}-${userEntry.substring(7,10)}`
        // }

        // const displayPhoneNumber = (event) => {
        //     const formattedNumber = formatNumber(event.target.value)
        //     const copy = {...contractor}
        //     copy.phone = formattedNumber
        //     update(copy)
        // }

    return <>
        <form className="taskForm">
            <h2 className="contractorForm__title">Add Contractor</h2>
            <section className="taskForm_groups">
                <div>
                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="company">Company</label>
                            <input
                                required autoFocus
                                type="text"
                                id="company"
                                className="form-control"
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
                                required
                                id="primaryContact"
                                type="text"
                                className="form-control"
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
                                type="tel"
                                id="phone"
                                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                                required
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
                </div>
                <div>
                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                className="form-control"
                                placeholder="example@email.com"
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
                                id="specialty"
                                className="form-control"
                                placeholder="HVAC, Plumbing, Electrical, etc."
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
                    className="btn-create_task"
                    onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}>
                    Add Contractor
                </button>
            </div>
        </form>
    </>
}
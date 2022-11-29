import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const HomeForm = () => {
    
    //Set default state properties
    const [home, updateHome] = useState({
        name: "",
        address: "",
        yearBuilt: "",
        construction: "",
        roofType: "",
        photo: ""
    })

    //Get current user's homeowner object
    const localUser = localStorage.getItem("homeowner")
    const homeownerUserObject = JSON.parse(localUser)
    
    //Use navigation hook to redirect user to home page after new home is added
    const navigate = useNavigate()

    //Save home object with homeowner ID and post home object to database when button is clicked
    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        console.log("Your home has been added to your profile")

        //Create the object to be saved to the API
        const saveDataToAPI = {
            homeownerId: homeownerUserObject.id,
            name: home.name,
            address: home.address,
            yearBuilt: home.yearBuilt,
            construction: home.construction,
            roofType: home.roofType,
            photo: home.photo
        }

        //Perform the fetch() to POST the object to the API
        return fetch("http://localhost:8088/homes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(saveDataToAPI)
        })
            .then(res => res.json())
            .then(
                () => {
                    navigate("/")
                }
            )
    }

    //Form to collect information for new home entry
    return <>
        <form className="homeForm">
            <h2 className="homeForm__title">Add Your Home</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Home Name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Example: Spear Primary Residence"
                        value={home.name}
                        onChange={
                            (event) => {
                                const copy = {...home}
                                copy.name = event.target.value
                                updateHome(copy)
                            }                        
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="address">Address:</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Example: 2234 Ellie Rapid Spinkastad, KY 19400"
                        value={home.address}
                        onChange={
                            (event) => {
                                const copy = {...home}
                                copy.address = event.target.value
                                updateHome(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="yearBuilt">Year Built:</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Example: 2002"
                        value={home.yearBuilt}
                        onChange={
                            (event) => {
                                const copy = {...home}
                                copy.yearBuilt = event.target.value
                                updateHome(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="construction">Construction:</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Example: Masonry Veneer"
                        value={home.construction}
                        onChange={
                            (event) => {
                                const copy = {...home}
                                copy.construction = event.target.value
                                updateHome(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="roofType">Roof Type:</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Example: Stamped Metal Shingles"
                        value={home.roofType}
                        onChange={
                            (event) => {
                                const copy = {...home}
                                copy.roofType = event.target.value
                                updateHome(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="photo">Home Photo:</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter the image URL"
                        value={home.photo}
                        onChange={
                            (event) => {
                                const copy = {...home}
                                copy.photo = event.target.value
                                updateHome(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button onClick={
                (clickEvent) => handleSaveButtonClick(clickEvent)
            } className="btn btn-primary">
                Save Home
            </button>
        </form>
    </>
}
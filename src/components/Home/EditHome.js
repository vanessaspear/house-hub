import { useState } from "react"

export const EditHome = ({ homeObj, setToggle }) => {
    
    const [home, updateHome] = useState({
        id: homeObj.id,
        homeownerId: homeObj.homeownerId,
        name: homeObj.name,
        address: homeObj.address,
        yearBuilt: homeObj.yearBuilt,
        construction: homeObj.construction,
        roofType: homeObj.roofType,
        photo: homeObj.photo
    })

    //Save home object with homeowner ID and post home object to database when button is clicked
    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        console.log("Your edits to your home have been saved to your profile")

        //Create the object to be saved to the API
        const saveDataToAPI = {
            homeownerId: home.homeownerId,
            name: home.name,
            address: home.address,
            yearBuilt: home.yearBuilt,
            construction: home.construction,
            roofType: home.roofType,
            photo: home.photo
        }

        //Perform the fetch() to PUT the object to the API
        return fetch(`http://localhost:8088/homes/${home.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(saveDataToAPI)
        })
            .then(res => res.json())
            .then(
                () => {
                    setToggle(false)
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

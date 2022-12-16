import { useState, useEffect } from "react"
import "./home.css"
import Axios from 'axios'
import { useNavigate, useParams } from "react-router-dom"

export const EditHome = () => {
    const {homeId} = useParams()
    const [home, updateHome] = useState({
        id: "",
        homeownerId: "",
        name: "",
        address: "",
        yearBuilt: "",
        flooring: "",
        heating: "",
        cooling: "",
        livableArea: "",
        construction: "",
        roof: "",
        lotSize: "",
        lotFeatures: "",
        exteriorFeatures: "",
        patioDetails: "",
        sewer: "",
        water: "",
        greenEnergy: "",
        image: ""
    })
    const [image, setImage] = useState("")

    const navigate = useNavigate()

    useEffect(
        () => {
            fetch(`http://localhost:8088/homes/${homeId}`)
                .then(res => res.json())
                .then((homeObj) => {
                    updateHome(homeObj)
                })
        },
        []
    )

    //Save home object with homeowner ID and post home object to database when button is clicked
    const handleSaveButtonClick = (event) => {

        if (image) {
            event.preventDefault()
            console.log("Your edits to your home have been saved to your profile")
    
            //Upload the image to Cloudinary platform
            //Followed tutorial: https://www.youtube.com/watch?v=Y-VgaRwWS3o
            const formData = new FormData()
            //Constructing the form data - add the imported file and upload preset
            formData.append("file", image)
            formData.append("upload_preset", "househub")

            //Use Axios API to post photo to Cloudinary platform
            Axios.post("https://api.cloudinary.com/v1_1/decu5fbul/image/upload", formData)
                .then( response => {
                    //Create the object to be saved to the API
                    const saveDataToAPI = {
                        id: home.id,
                        homeownerId: home.homeownerId,
                        name: home.name,
                        address: home.address,
                        yearBuilt: home.yearBuilt,
                        flooring: home.flooring,
                        heating: home.heating,
                        cooling: home.cooling,
                        livableArea: home.livableArea,
                        construction: home.construction,
                        roof: home.roof,
                        lotSize: home.lotSize,
                        lotFeatures: home.lotFeatures,
                        exteriorFeatures: home.exteriorFeatures,
                        patioDetails: home.patioDetails,
                        sewer: home.sewer,
                        water: home.water,
                        greenEnergy: home.greenEnergy,
                        image: response.data.url
                    }
            
                    //Perform the fetch() to PUT the object to the API
                    return fetch(`http://localhost:8088/homes/${homeId}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(saveDataToAPI)
                    })
                        .then(res => res.json())
                        .then(
                            () => {
                                navigate("/your-home")
                            }
                        )
            })
        }
            event.preventDefault()
            console.log("Your edits to your home have been saved to your profile")

            //Create the object to be saved to the API
            const saveDataToAPI = {
                id: home.id,
                homeownerId: home.homeownerId,
                name: home.name,
                address: home.address,
                yearBuilt: home.yearBuilt,
                flooring: home.flooring,
                heating: home.heating,
                cooling: home.cooling,
                livableArea: home.livableArea,
                construction: home.construction,
                roof: home.roof,
                lotSize: home.lotSize,
                lotFeatures: home.lotFeatures,
                exteriorFeatures: home.exteriorFeatures,
                patioDetails: home.patioDetails,
                sewer: home.sewer,
                water: home.water,
                greenEnergy: home.greenEnergy,
                image: home.image
            }

            //Perform the fetch() to PUT the object to the API
            return fetch(`http://localhost:8088/homes/${homeId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(saveDataToAPI)
            })
                .then(res => res.json())
                .then(
                    () => {
                        navigate("/your-home")
                    })
    }

    return <>
        <form className="homeForm">
            <h2 className="homeForm__title">Add Home</h2>
            <section className="taskForm_groups"> 
                <div>
                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="name">Home Name</label>
                            <input
                                required autoFocus
                                type="text"
                                className="form-control"
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
                            <label htmlFor="address">Address</label>
                            <input
                                type="text"
                                className="form-control"
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
                            <label htmlFor="yearBuilt">Year Built</label>
                            <input
                                type="text"
                                className="form-control"
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
                            <label htmlFor="flooring">Flooring</label>
                            <input
                                required 
                                type="text"
                                className="form-control"
                                value={home.flooring}
                                onChange={
                                    (event) => {
                                        const copy = {...home}
                                        copy.flooring = event.target.value
                                        updateHome(copy)
                                    }                        
                                } />
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="heating">Heating</label>
                            <input
                                type="text"
                                className="form-control"
                                value={home.heating}
                                onChange={
                                    (event) => {
                                        const copy = {...home}
                                        copy.heating = event.target.value
                                        updateHome(copy)
                                    }
                                } />
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="cooling">Cooling</label>
                            <input
                                type="text"
                                className="form-control"
                                value={home.cooling}
                                onChange={
                                    (event) => {
                                        const copy = {...home}
                                        copy.cooling = event.target.value
                                        updateHome(copy)
                                    }
                                } />
                        </div>
                    </fieldset>
                </div>
                <div>
                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="area">Livable Area (sqft)</label>
                            <input
                                type="text"
                                className="form-control"
                                value={home.livableArea}
                                onChange={
                                    (event) => {
                                        const copy = {...home}
                                        copy.livableArea = event.target.value
                                        updateHome(copy)
                                    }
                                } />
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="construction">Construction</label>
                            <input
                                type="text"
                                className="form-control"
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
                            <label htmlFor="roof">Roof</label>
                            <input
                                type="text"
                                className="form-control"
                                value={home.roof}
                                onChange={
                                    (event) => {
                                        const copy = {...home}
                                        copy.roof = event.target.value
                                        updateHome(copy)
                                    }
                                } />
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="lotSize">Lot Size</label>
                            <input
                                type="text"
                                className="form-control"
                                value={home.lotSize}
                                onChange={
                                    (event) => {
                                        const copy = {...home}
                                        copy.lotSize = event.target.value
                                        updateHome(copy)
                                    }
                                } />
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="lotFeatures">Lot Features</label>
                            <input
                                type="text"
                                className="form-control"
                                value={home.lotFeatures}
                                onChange={
                                    (event) => {
                                        const copy = {...home}
                                        copy.lotFeatures = event.target.value
                                        updateHome(copy)
                                    }
                                } />
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="exteriorFeatures">Exterior Features</label>
                            <input
                                type="text"
                                className="form-control"
                                value={home.exteriorFeatures}
                                onChange={
                                    (event) => {
                                        const copy = {...home}
                                        copy.exteriorFeatures = event.target.value
                                        updateHome(copy)
                                    }
                                } />
                        </div>
                    </fieldset>
                </div>
                <div>
                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="patioDetails">Patio Details</label>
                            <input
                                type="text"
                                className="form-control"
                                value={home.patioDetails}
                                onChange={
                                    (event) => {
                                        const copy = {...home}
                                        copy.patioDetails = event.target.value
                                        updateHome(copy)
                                    }
                                } />
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="sewer">Sewer</label>
                            <input
                                type="text"
                                className="form-control"
                                value={home.sewer}
                                onChange={
                                    (event) => {
                                        const copy = {...home}
                                        copy.sewer = event.target.value
                                        updateHome(copy)
                                    }
                                } />
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="water">Water</label>
                            <input
                                type="text"
                                className="form-control"
                                value={home.water}
                                onChange={
                                    (event) => {
                                        const copy = {...home}
                                        copy.water = event.target.value
                                        updateHome(copy)
                                    }
                                } />
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="greenEnergy">Green Energy</label>
                            <input
                                type="text"
                                className="form-control"
                                value={home.greenEnergy}
                                onChange={
                                    (event) => {
                                        const copy = {...home}
                                        copy.greenEnergy = event.target.value
                                        updateHome(copy)
                                    }
                                } />
                        </div>
                    </fieldset>
                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="Image">Add an Image (Optional)</label>
                            <input 
                                className="form-image"
                                id="Image"
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
                    Save Home
                </button>
            </div>
        </form>
    </>
}
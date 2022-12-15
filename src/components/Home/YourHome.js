import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import "./home.css"
//Model after a Zillow Facts and features section

export const YourHome = () => {

    //Initialize state variable for home information
    const [home, updateHome] = useState([])

    //Get current user's homeowner object
    const localUser = localStorage.getItem("homeowner")
    const userObject = JSON.parse(localUser)

    //Fetch home object that belongs to the current homeowner 
    useEffect(
        () => {
            fetch(`http://localhost:8088/homes?homeownerId=${userObject.id}`)
                .then(res => res.json())
                .then((homeArray) => {
                    const homeObj = homeArray[0]
                    updateHome(homeObj)
                })
        },
        []
    )

    return <>
        <section className="home-header">
            <h1>{home.name}</h1>
            <div className="home-edit">
                <div>{home.address} | </div>
                <Link className="home-item_link" to={`/home/${home.id}/edit`}>Edit</Link>
            </div>
            <img className="home-image" src={home.image} />
        </section>
        <main className="home-container">
            <section className="home_details">
                <h2 className="details-header">Interior details</h2>
                <h3>Interior features</h3>
                <ul>
                    <li>Flooring: {}</li>
                    <li>Heating: {}</li>
                    <li>Cooling: {}</li>
                </ul>
            </section>
            <section className="home_details">
                <h2 className="details-header">Construction details</h2>
                <h3>Material Information</h3>
                <ul>
                    <li>Construction materials: {}</li>
                    <li>Roof: {home.roofType}</li>
                </ul>
            </section>
            <section className="home_details">
                <h2 className="details-header">Property details</h2>
                <h3>Lot</h3>
                <ul>
                    <li>Lot size: {}</li>
                    <li>Lot features: {}</li>
                </ul>
                <h3>Property</h3>
                <ul>
                    <li>Exterior features: {}</li>
                    <li>Patio and porch details: {}</li>
                </ul>
            </section>
            <section className="home_details">
                <h2 className="details-header">Utility details</h2>
                <h3>Utility</h3>
                <ul>
                    <li>Sewer information: {}</li>
                    <li>Utilities for property: {}</li>
                </ul>
                <h3>Green Energy</h3>
                <ul>
                    <li>Energy efficient items: {}</li>
                </ul>
            </section>
        </main>
    </>

}
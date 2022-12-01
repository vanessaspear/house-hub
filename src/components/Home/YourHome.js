import { useState, useEffect } from "react"
import { EditHome } from "./EditHome"

export const YourHome = () => {

    //Initialize state variable for home information
    const [home, updateHome] = useState([])
    const [toggle, setToggle] = useState(false)

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

    //Grab updated home object after an edit it saved
    useEffect(
        () => {
            fetch(`http://localhost:8088/homes?homeownerId=${userObject.id}`)
                .then(res => res.json())
                .then((homeArray) => {
                    const homeObj = homeArray[0]
                    updateHome(homeObj)
                })
        },
        [toggle]
    )

    return <><section className="home">
        {
            toggle ? <EditHome homeObj={home} setToggle={ setToggle } />
                : <><header>
                    {home.name}
                </header>
                    <div>
                        <img
                            src={home.photo}
                            alt="Your home"
                        />
                    </div>
                    <section>
                        <div>Home Address: {home.address}</div>
                        <div>Year Built: {home.yearBuilt}</div>
                        <div>Construction: {home.construction}</div>
                        <div>Roof Type: {home.roofType}</div>
                    </section> 
                <footer>
                    <button
                        onClick={() => setToggle(!toggle)}>
                            Edit Home
                    </button>
                </footer> </>
        }
    </section>
    </>
}
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom";
import "./Login.css"
import { RiDoubleQuotesL, RiDoubleQuotesR, RiStarFill} from "react-icons/ri";

export const Register = (props) => {
    const [user, setUser] = useState({
        email: "",
        fullName: ""
    })
    let navigate = useNavigate()

    const registerNewUser = () => {
        return fetch("http://localhost:8088/homeowners", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(createdUser => {
                if (createdUser.hasOwnProperty("id")) {
                    localStorage.setItem("homeowner", JSON.stringify({
                        id: createdUser.id,
                        name: createdUser.fullName,
                        email: createdUser.email
                    }))
                    //Here I want to navigate to the "Add Home" page
                    navigate("/add-home")
                }
            })
    }

    const handleRegister = (e) => {
        e.preventDefault()
        return fetch(`http://localhost:8088/homeowners?email=${user.email}`)
            .then(res => res.json())
            .then(response => {
                if (response.length > 0) {
                    // Duplicate email. No good.
                    window.alert("Account with that email address already exists")
                }
                else {
                    // Good email, create user.
                    registerNewUser()
                }
            })
    }

    const updateUser = (evt) => {
        const copy = {...user}
        copy[evt.target.id] = evt.target.value
        setUser(copy)
    }

    return (
        <>
         <div className="container-header_register">
            <img className="img-header" src="https://res.cloudinary.com/decu5fbul/image/upload/v1670528969/HouseHub/Logos/logo_red_banner_2022-12-08_at_1.33.53_PM_ossku9.png" />
        </div>
        <main className="auth">
            <header className="auth-header">
                <h1 className="slogan">"Happy House, Happy Life"</h1>
            </header>
            <section className="container-content">
                <div className="container-reviews">
                    <div>
                        <div className="review-comment">
                            <img className="icon" src="https://res.cloudinary.com/decu5fbul/image/upload/v1670616434/HouseHub/Resources/double-quotes-l_u4nuos.png" />
                            I was tired of using Excel spreadsheets and my phone notes to track home maintenance and projects.  HouseHub allows me to manage my “to-do” list from anywhere!
                            <img className="icon" src="https://res.cloudinary.com/decu5fbul/image/upload/v1670616434/HouseHub/Resources/double-quotes-r_phthml.png" />
                        </div>
                        <div className="review-footer">
                            <img className="review-photo" src="https://res.cloudinary.com/decu5fbul/image/upload/v1670626914/HouseHub/Resources/christina-wocintechchat-com-SJvDxw0azqw-unsplash_qxmytm.jpg" />
                            <div className="review-rating">
                                <div>Bernae S.</div>
                                <div>November 2022</div>
                                <div>
                                    <img className="review-stars" src="https://res.cloudinary.com/decu5fbul/image/upload/v1670616423/HouseHub/Resources/star-fill_ai4y2l.png" />
                                    <img className="review-stars" src="https://res.cloudinary.com/decu5fbul/image/upload/v1670616423/HouseHub/Resources/star-fill_ai4y2l.png" />
                                    <img className="review-stars" src="https://res.cloudinary.com/decu5fbul/image/upload/v1670616423/HouseHub/Resources/star-fill_ai4y2l.png" />
                                    <img className="review-stars" src="https://res.cloudinary.com/decu5fbul/image/upload/v1670616423/HouseHub/Resources/star-fill_ai4y2l.png" />
                                    <img className="review-stars" src="https://res.cloudinary.com/decu5fbul/image/upload/v1670616423/HouseHub/Resources/star-fill_ai4y2l.png" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container--register">
                    <section>
                        <form className="form-register" onSubmit={handleRegister}>
                            <h3>Create a member account</h3>
                            <fieldset className="name">
                                <label htmlFor="fullName"> Full Name </label>
                                <input onChange={updateUser}
                                    type="text" id="fullName" className="form-control"
                                    required autoFocus />
                            </fieldset>
                            <fieldset className="email">
                                <label htmlFor="email"> Email address </label>
                                <input onChange={updateUser}
                                    type="email" id="email" className="form-control"
                                    required />
                            </fieldset>
                            <fieldset>
                                <button className="btn-register" type="submit">
                                    Register 
                                </button>
                            </fieldset>
                        </form>
                    <section className="link-register">
                        <Link to="/login">Already a member? Log in </Link>
                    </section>
                    </section>
                </div>
            </section>
            <footer className="container-footer_register">
                <img className="img-footer" src="https://res.cloudinary.com/decu5fbul/image/upload/v1670528959/HouseHub/Logos/logo_red_banner_centered_slogan_2022-12-08_at_1.38.13_PM_cmvqgn.png" />
            </footer>
        </main>
    </>
    )
}


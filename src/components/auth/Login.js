import React, { useState } from "react"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import "./Login.css"

export const Login = () => {
    const [email, set] = useState("")
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()

        return fetch(`http://localhost:8088/homeowners?email=${email}`)
            .then(res => res.json())
            .then(foundUsers => {
                if (foundUsers.length === 1) {
                    const user = foundUsers[0]
                    localStorage.setItem("homeowner", JSON.stringify({
                        id: user.id,
                        name: user.fullName,
                        email: user.email
                    }))

                    navigate("/")
                }
                else {
                    window.alert("Invalid login")
                }
            })
    }

    return (
        <>
        <div className="container-header">
            <img className="img-header" src="https://res.cloudinary.com/decu5fbul/image/upload/v1670528969/HouseHub/Logos/logo_brown_banner2022-12-08_at_1.34.39_PM_a9ua9w.png" />
        </div>
        <main className="auth">
            <header className="auth-header">
                <h1>Welcome to HouseHub</h1>
                <h1>Track, manage, and document your home projects with ease.</h1>
            </header>
            <section className="container-content">
                <div className="container-media">
                    <video className="login-video" src="https://res.cloudinary.com/decu5fbul/video/upload/v1670543520/HouseHub/Footage/201729_Drill_Drilling_Wood_Wooden_By_Martin_Flindt_Artlist_HD_cfikjq.mp4" autoPlay loop muted />
                </div>
                <div className="container--login">
                    <section>
                        <form className="form-login" onSubmit={handleLogin}>
                            <h3>Log in to your member account</h3>
                            <fieldset className="email">
                                <label htmlFor="email">Email address</label>
                                <input type="email"
                                    value={email}
                                    onChange={evt => set(evt.target.value)}
                                    className="form-control"
                                    required autoFocus />
                            </fieldset>
                            <fieldset>
                                <button className="btn-login" type="submit">
                                    Log in
                                </button>
                            </fieldset>
                        </form>
                    <hr className="divider"></hr>
                    </section>
                    <section className="link-register">
                        <Link to="/register">Create a member account</Link>
                    </section>
                </div>
            </section>
            <footer className="container-footer">
                <img className="img-footer" src="https://res.cloudinary.com/decu5fbul/image/upload/v1670528969/HouseHub/Logos/logo_brown_banner_centered_slogan_2022-12-08_at_1.40.16_PM_ch035w.png" />
            </footer>
        </main>
        </>
    )
}
import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    const navigate = useNavigate()

    return (
        <>
        <main className="navbar-main">
            <Link to="/">
                <img className="navbar-logo" src="https://res.cloudinary.com/decu5fbul/image/upload/v1670630567/HouseHub/Logos/B7870ACD-67E6-4D87-9580-64186BCE78C5_q7dqnp.png" />
            </Link>
            <ul className="navbar-list">
                <li className="navbar__item active">
                    <Link className="navbar__link" to="/your-home">Your Home</Link>
                </li>
                <li className="navbar__item active">
                    <Link className="navbar__link" to="/tasks">Your Tasks</Link>
                </li>
                <li className="navbar__item active">
                    <Link className="navbar__link" to="/contractors">Your Contractors</Link>
                </li>
                <li className="navbar__item active">
                    <Link className="navbar__link" to="/workOrders">Your Work Orders</Link>
                </li>
                <li className="navbar__item navbar__logout">
                    <Link className="navbar__link" to="" onClick={() => {
                        localStorage.removeItem("homeowner")
                        navigate("/", {replace: true})
                    }}>Logout</Link>
                </li>
            </ul>
        </main>
        </>
    )
}


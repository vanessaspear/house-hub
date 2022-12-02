import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    const navigate = useNavigate()

    return (
        <ul className="navbar">
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
    )
}


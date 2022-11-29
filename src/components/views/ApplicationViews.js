import { Outlet, Route, Routes } from "react-router-dom"
import { EditHome } from "../Home/EditHome"
import { HomeForm } from "../Home/HomeForm"
import { YourHome } from "../Home/YourHome"

export const ApplicationViews = () => {
	return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>HouseHub</h1>
                    <div>Happy Home, Happy Life</div>

                    <Outlet />
                </>
            }>
                <Route path="add-home" element={ <HomeForm /> } />
                <Route path="your-home" element={ <YourHome /> } />
            </Route>
        </Routes>
    )
}


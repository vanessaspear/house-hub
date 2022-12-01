import { Outlet, Route, Routes } from "react-router-dom"
import { HomeForm } from "../Home/HomeForm"
import { YourHome } from "../Home/YourHome"
import { EditTask } from "../Tasks/EditTask"
import { TaskContainer } from "../Tasks/TaskContainer"
import { TaskForm } from "../Tasks/TaskForm"

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
                <Route path="tasks" element={ <TaskContainer /> } />
                <Route path="task/create" element={ <TaskForm /> } />
                <Route path="/tasks/:taskId/edit" element={ <EditTask /> } />
            </Route>
        </Routes>
    )
}


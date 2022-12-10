import { Outlet, Route, Routes } from "react-router-dom"
import { HomeForm } from "../Home/HomeForm"
import { YourHome } from "../Home/YourHome"
import { EditTask } from "../Tasks/EditTask"
import { TaskContainer } from "../Tasks/TaskContainer"
import { TaskForm } from "../Tasks/TaskForm"
import { ContractorContainer } from "../Contractors/ContractorContainer"
import { ContractorForm } from "../Contractors/ContractorForm"
import { EditContractor } from "../Contractors/EditContractor"
import { WorkOrderContainer } from "../WorkOrders/WorkOrderContainer"
import { WorkOrderForm } from "../WorkOrders/WorkOrderForm"
import { EditWorkOrder } from "../WorkOrders/EditWorkOrder"
import { Footer } from "../Footer/Footer"

export const ApplicationViews = () => {
	return (
        <Routes>
            <Route path="/" element={
                <>
                    {/* <Footer /> */}

                    <Outlet />
                </>
            }>
                <Route path="add-home" element={ <HomeForm /> } />
                <Route path="your-home" element={ <YourHome /> } />
                <Route path="tasks" element={ <TaskContainer /> } />
                <Route path="task/create" element={ <TaskForm /> } />
                <Route path="/tasks/:taskId/edit" element={ <EditTask /> } />
                <Route path="contractors" element={ <ContractorContainer /> } />
                <Route path="contractor/create" element={ <ContractorForm /> } />
                <Route path="/contractors/:contractorId/edit" element={ <EditContractor /> } />
                <Route path="workOrders" element={ <WorkOrderContainer /> } />
                <Route path="workOrder/:taskId/create" element={ <WorkOrderForm /> } />
                <Route path="/workOrders/:workOrderId/edit" element={ <EditWorkOrder /> } />

            </Route>
        </Routes>
    )
}


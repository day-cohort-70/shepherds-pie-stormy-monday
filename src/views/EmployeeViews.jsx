import { Outlet } from "react-router-dom"
import { Route, Routes } from "react-router-dom"
import { EmployeeNav } from "../components/nav/EmployeeNav.jsx"
import { OrderList } from "../components/orders/OrderList.jsx"
import { OrderView } from "../components/orders/OrderView.jsx"
import { EditPizza } from "../components/forms/EditPizza.jsx"

export const EmployeeViews = ({ currentUser }) => {
    return (
        <Routes>
            <Route path="/" element={
                <>
                    <EmployeeNav />
                    <Outlet />
                </>
            }>
                <Route index element={<OrderList currentUser={currentUser} />}/>
                    <Route path="orders/:orderId" element={<OrderView />} />
                    <Route path="orders/edit/:pizzaId" element={<EditPizza />} />
            </Route>
        </Routes>
    )
}
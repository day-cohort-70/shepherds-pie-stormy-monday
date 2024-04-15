import { Outlet } from "react-router-dom"
import { Route, Routes } from "react-router-dom"
import { EmployeeNav } from "../components/nav/EmployeeNav.jsx"
import { OrderList } from "../components/orders/OrderList.jsx"

import { EditPizza } from "../components/forms/EditPizza.jsx"
import { NewOrder } from "../components/forms/NewOrder.jsx"
import { OrderView } from "../components/orders/OrderView.jsx"
import { AddPizza } from "../components/forms/AddPizza.jsx"

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
                    <Route path="orders/:orderId/edit/:pizzaId" element={<EditPizza />} />
                <Route path="orders/create" element={<NewOrder currentUser={currentUser} />} />
                <Route path="orders/addPizza/${orderId}" element={<AddPizza />} />
            </Route>
        </Routes>
    )
}
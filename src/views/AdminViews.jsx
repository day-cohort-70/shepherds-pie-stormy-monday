import { Outlet } from "react-router-dom"
import { Routes, Route } from "react-router-dom"
import { AdminNav } from "../components/nav/AdminNav.jsx"
import { OrderList } from "../components/orders/OrderList.jsx"

export const AdminViews = ({currentUser}) => {
    return (
        <Routes> 
        <Route path="/" element={
            <>
            <AdminNav />
            <Outlet />
            </>
        }>
        <Route index element ={<OrderList currentUser={currentUser} />} />
        </Route>
        </Routes>
    )
    }
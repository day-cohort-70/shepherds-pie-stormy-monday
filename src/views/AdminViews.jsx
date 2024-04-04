import { Outlet } from "react-router-dom"
import { Routes, Route } from "react-router-dom"
import { AdminNav } from "../components/nav/AdminNav.jsx"

export const AdminViews = ({currentUser}) => {
    return (
        <Routes> 
        <Route path="/" element={
            <>
            <AdminNav />
            <Outlet />
            </>
        }>

        </Route>
        </Routes>
    )
}
import { Outlet } from "react-router-dom"
import { Route, Routes } from "react-router-dom"
import { EmployeeNav } from "../components/nav/EmployeeNav.jsx"

export const EmployeeViews = ({currentUser}) => {
    return (
        <Routes> 
            <Route path="/" element={
            <>
            <EmployeeNav />
            <Outlet />
            </>
        }>

        </Route>
        </Routes>
    )
}
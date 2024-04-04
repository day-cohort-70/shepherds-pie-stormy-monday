import { Outlet } from "react-router-dom"
import { Routes, Route } from "react-router-dom"
import { AdminNav } from "../components/nav/AdminNav.jsx"
import { EmployeeList } from "../components/employees/EmployeesList.jsx"
import { EmployeeDetails } from "../components/employees/EmployeeDetails.jsx"

export const AdminViews = ({currentUser}) => {
    return (
        <Routes> 
        <Route path="/" element={
            <>
            <AdminNav />
            <Outlet />
            </>
        }>
        <Route path="employees">
          <Route index element={<EmployeeList />} />
          <Route path="edit" element={<EmployeeDetails />} />
          {/* <Route path=":employeeUserId" element={<EmployeeDetails />} /> */}
        </Route>
        </Route>
        </Routes>
    )
}
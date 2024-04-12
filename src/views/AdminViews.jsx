import { Outlet } from "react-router-dom"
import { Routes, Route } from "react-router-dom"
import { AdminNav } from "../components/nav/AdminNav.jsx"
import { OrderList } from "../components/orders/OrderList.jsx"
import { EmployeeList } from "../components/employees/EmployeesList.jsx"
import { EmployeeDetails } from "../components/employees/EmployeeDetails.jsx"
import { NewOrder } from "../components/forms/NewOrder.jsx"
import { OrderView } from "../components/orders/OrderView.jsx"
import { Sales } from "../components/sales/Sales.jsx"
import { EditPizza } from "../components/forms/EditPizza.jsx"

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
        <Route index element ={<OrderList currentUser={currentUser} />} />
        <Route path="orders/:orderId" element={<OrderView />}/>
        <Route path="orders/edit/:pizzaId" element={<EditPizza/>}/>
        <Route path="orders/create" element={<NewOrder currentUser={currentUser} />} />
        <Route path="sales" element={<Sales/>}/>
        </Route>
        </Routes>
    )
    }
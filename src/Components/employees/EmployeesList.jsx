import { getEmployees } from "../../services/employeeService";
import { Employee } from "./Employee.jsx";
import "./Employees.css"
import {useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom"

export const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {getEmployees().then((employeesArray) => {
        setEmployees(employeesArray)
    })}, [])

    const handleNewEmployee = () => {
        //define empty employee for creation
        const employeeObj = {
            id: null, 
            name: "",
            address: "",
            phone: "",
            email: "",
            admin: null
        };

        // navigate to /employees/edit and pass the employee object
        navigate(`/employees/edit`, { state: { employee: employeeObj } });
    }

return (
    <div className="employees-list">
    <div className="employees-new">
                    <button className="form-btn btn-primary" onClick={handleNewEmployee}>New Employee</button>
                </div>
    <div className="employees">
    {employees.map(employee => {
        //pass employee as state with link to edit page
        return <Link key={employee.id} to="/employees/edit"
            state={
                {employee: employee} 
            }
        >
                    <Employee employee={employee}/>
                </Link>

    })}
    </div>
    </div>
)
}
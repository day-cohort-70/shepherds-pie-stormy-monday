import { useEffect, useState } from "react"
import { getEmployees } from "../../services/employeeService.js"

export const Deliverer = ({delivererId}) => {
    const [employees, setEmployees] = useState([])
    const [deliverer, setDeliverer] = useState("")

    useEffect(()=>{
        getEmployees().then(employeeArr =>{
            setEmployees(employeeArr)
        })
    },[])

    useEffect(()=>{
       const found = employees.find(employee => employee.id === parseInt(delivererId))
        setDeliverer(found?.name)
    },[delivererId, employees])

    const assignDeliverer = () =>{
        console.log("this doesnt work yet")
        //make a put for new deliverId and reload the page
    }

    return(
        <>
        {delivererId ? (
            <div className="employee">
                {deliverer}
            </div>
            ) : (
                <div className="dropdown">
                    <select name="employees" 
                    onChange={assignDeliverer}
                    >
                        <option value="" selected disabled hidden>Choose a Deliverer</option>
                        {employees.map(employee=>{
                            return(
                                <option value={employee.id}>{employee.name}</option>
                            )
                        })}
                    </select>
                </div>
            )}
   </>
)}
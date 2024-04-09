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

    return(
    <div className="employee">
        {deliverer}
    </div>
    )
}
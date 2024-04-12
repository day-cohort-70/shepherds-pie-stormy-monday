import { useEffect, useState } from "react"
import { getEmployees } from "../../services/employeeService.js"
import { updateOrder } from "../../services/OrderService.jsx"

export const Deliverer = ({ delivererId, order, setNewDelivererId }) => {
    const [employees, setEmployees] = useState([])
    const [deliverer, setDeliverer] = useState("")
    const [changedDelivererId, setChangedDelivererId] = useState(0)


    useEffect(() => {
        getEmployees().then(employeeArr => {
            setEmployees(employeeArr)
        })
    }, [])

    useEffect(() => {
        const found = employees.find(employee => employee.id === parseInt(delivererId))
        setDeliverer(found?.name)
    }, [employees, delivererId])

    const assignDeliverer = async () => {
        const edittedOrder = {
            id: order.id,
            employeeId: order.employeeId,
            timestamp: order.timestamp,
            tip: order.tip,
            destination: order.destination,
            delivererId: changedDelivererId
        }
        await updateOrder(edittedOrder).then(() => {
            setNewDelivererId(changedDelivererId)
        })
    }

    const handleChange =(e)=> {
        setChangedDelivererId(parseInt(e.target.value))
    }

    return (
        <>
            {delivererId ? (
                <div className="employee">
                    {deliverer}
                </div>
            ) : (
                <div className="dropdown">
                    <select name="employees"
                        onChange={handleChange}
                    >
                        <option defaultValue="" hidden ></option>
                        {employees.map(employee => {
                            return (
                                <option value={employee.id} key={employee.id}>{employee.name}</option>
                            )
                        })}
                    </select>
                    <button className="btn-secondary"
                        onClick={assignDeliverer}
                    >Save</button>
                </div>
            )}
        </>
    )
}
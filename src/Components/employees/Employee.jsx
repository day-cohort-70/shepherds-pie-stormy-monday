import "./Employee.css"
export const Employee = ({employee}) => {
    return (
     <div className="employee" key={employee.id}>
        <div>
            <div className="employee-info">Name:</div>
            <div>{employee.name}</div>
        </div>
        <div>
            <div className="employee-info">Email:</div>
            <div>{employee.email}</div>
        </div>
    </div>
    )
}

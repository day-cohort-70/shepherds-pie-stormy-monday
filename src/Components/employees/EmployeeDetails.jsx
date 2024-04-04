import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"
import "./Employee.css"

export const EmployeeDetails = () => {
    //employee state obj for submission
    const [employee, setEmployee] = useState();
    //transient state 
    const [editedEmployee, setEditedEmployee] = useState();
    //use employee object passed from EmployeesList as location state
    const location = useLocation();
    const employeeObj = location.state?.employee;
  
    useEffect(() => {
        //set both in state
      setEmployee(employeeObj);
      setEditedEmployee(employeeObj);
    }, [employeeObj]);
  
    const handleInputChange = (event) => {
        //maintain transient state 
      const updatedEditedEmployee = { ...editedEmployee };
      updatedEditedEmployee[event.target.name] = event.target.value;
      setEditedEmployee(updatedEditedEmployee);
    };
  
    const handleSave = (event) => {
      event.preventDefault();
      console.log("Clicked!");
      setEmployee(editedEmployee);
      //TODO: save function with employee service
    };
   
    return <>

        <form className="employee-edit">
            <h2>Edit Employee</h2>
            <fieldset>
                <div className="form-group">
                    <label>Name:</label>
                    <input
                    type="text"
                    name="name"
                    value={editedEmployee?.name || ""}
                    onChange={handleInputChange}
                    required
                    className="form-control"
                    />

                </div>
            </fieldset>
            <fieldset>
            <div className="form-group">
                    <label>Email:</label>
                    <input
                    type="text"
                    name="email"
                    value={editedEmployee?.email || ""}
                    required
                    onChange={handleInputChange}
                    className="form-control"
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label>Phone:</label>
                    <input
                    type="text"
                    name="phone"
                    value={editedEmployee?.phone || ""}
                    onChange={handleInputChange}
                    required
                    className="form-control"
                    />

                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label>Address:</label>
                    <input
                    type="text"
                    name="address"
                    value={editedEmployee?.address || ""}
                    onChange={handleInputChange}
                    required
                    className="form-control"
                    />

                </div>
            </fieldset>
            <fieldset>
            <div className="form-group">
                    <button className="form-btn btn-primary" onClick={handleSave}>Save Employee</button>
                </div>
            </fieldset>
        </form>


        </> 
    


}
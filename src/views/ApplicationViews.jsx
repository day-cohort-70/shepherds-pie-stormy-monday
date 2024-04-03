
import { useState, useEffect } from "react"
import { AdminViews } from "./AdminViews.jsx"
import { EmployeeViews } from "./EmployeeViews.jsx"


export const ApplicationViews = () => {

const [currentUser, setCurrentUser] = useState({});

useEffect(() => {
  const localShepherdsUser = localStorage.getItem("shepherds_user");
  const shepherdsUserObject = JSON.parse(localShepherdsUser);
  setCurrentUser(shepherdsUserObject);
}, [])

  return currentUser.admin ? (
  <AdminViews currentUser={currentUser} /> 
  ) : (
  <EmployeeViews currentUser={currentUser}/>
  )

      
    
}

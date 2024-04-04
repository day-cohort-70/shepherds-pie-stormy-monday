import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import "./NavBar.css"

export const EmployeeNav = () =>{
    const navigate = useNavigate()

    return(
        <ul className="navbar">
        {localStorage.getItem("shepherds_user") ? (
  <li className="navbar-item navbar-logout">
    <Link
      className="navbar-link"
      to=""
      onClick={() => {
        localStorage.removeItem("shepherds_user")
        navigate("/", { replace: true })
      }}
    >
      Logout
    </Link>
  </li>
) : (
  ""
)}
    </ul>
)}
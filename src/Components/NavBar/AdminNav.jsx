import { useNavigate } from "react-router-dom"

export const NavBar = () =>{
    const navigate = useNavigate()

    return(
        <ul className="navbar">
        <li className="navbar-item">
            <Link to='/orders'>Orders</Link>
        </li>
        <li className="navbar-item">
            <Link to='/employees'>Employees</Link>
        </li>
        <li className="navbar-item">
          <Link to="/sales">Sales</Link>
        </li>
        {localStorage.getItem("honey_user") ? (
  <li className="navbar-item navbar-logout">
    <Link
      className="navbar-link"
      to=""
      onClick={() => {
        //add name for honey_user
        localStorage.removeItem("")
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
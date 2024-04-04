import { useNavigate } from "react-router-dom"

export const OrdersFilter = () => {
    const navigate = useNavigate()
    
    return(
    <div className="filter-bar">
    <button className="btn-primary"
    onClick={() =>{navigate('orders/create')}}> New Order </button>
    </div>
    )
}
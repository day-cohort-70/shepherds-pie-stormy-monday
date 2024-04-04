import { useEffect, useState } from "react"
import { getAllOrders } from "../../services/OrderService.jsx"
import { OrdersFilter } from "./OrdersFilter.jsx"
import { Link } from "react-router-dom"
import "./Orders.css"

export const OrderList = ({currentUser}) =>{
// const [allOrders, setAllOrders] = useState([])
const [filteredOrders, setFilteredOrders] = useState([])
const [filterDay, setFilterDay] = useState("")

const getAndSetAllOrders = async () =>{
    await getAllOrders().then(ordersArray =>{
        setFilteredOrders(ordersArray)
    })
}

//initial render
useEffect(() =>{
    getAndSetAllOrders()
},[])

useEffect(() => {
    //need to filter by day here with dependency array as filterDay
    //set filteredOrders
}, [])

useEffect(() =>{
},[])

return (
    <div className="orders-container">
        <h2> Orders </h2>
        <OrdersFilter />
        <article className="orders">
            {filteredOrders.map(orderObj =>{
                return(
                    <Link to={`/orders/${orderObj.id}`}>
                    <section className="order" key={orderObj.id}>
                        <header className="order-info">Order #{orderObj.id}</header>
                    
                    {currentUser?.isAdmin && orderObj.delivererId !== 0 ? (
                    <footer>
                        <div>
                            < div className="order-info"> Deliverer: </div>
                            {/* <div>{deliverer}</div> */}
                        </div>
                    </footer>
                    ): ("")}
                    </section>
                    </Link>
                )
            })}
        </article>
    </div>
)
}
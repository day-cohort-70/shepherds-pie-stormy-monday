import { useEffect, useState } from "react"
import { getAllOrdersSortedByTime, getOrderByDay } from "../../services/OrderService.jsx"
import { OrdersFilter } from "./OrdersFilter.jsx"
import { Link } from "react-router-dom"
import "./Orders.css"

export const OrderList = ({currentUser}) =>{
const [filteredOrders, setFilteredOrders] = useState([])
const [filterDay, setFilterDay] = useState(0)
const [filterEOD, setFilterEOD] = useState(7266292443815)


// const getAndSetAllOrders = async () =>{
//     await getAllOrdersSortedByTime().then(ordersArray =>{
//         //reverse sort for most recent to be first
//         const reverseArray = ordersArray.map(order => order).reverse()
//         setFilteredOrders(reverseArray)
//     })
// }

// //initial render
// useEffect(() =>{
//     getAndSetAllOrders()
// },[])

const getAndSetAllOrders = async (midnight, eod) =>{
    await getOrderByDay(midnight,eod).then(ordersArray =>{
        //reverse sort for most recent to be first
        const reverseArray = ordersArray.map(order => order).reverse()
        setFilteredOrders(reverseArray)
    })
}

// filter by day
useEffect(()=>{
    //add 86399 to midnight for EOD
    const midnight = parseInt(filterDay)
    const eod = parseInt(filterEOD)
    //pass filterDay & EOD to fetch call (getOrderbyDay) and set filteredtickets
   getAndSetAllOrders(midnight, eod)
   
    //look at honey rae to see how to pass state

},[filterDay])


return (
    <div className="orders-container">
        <h2> Orders </h2>
        <OrdersFilter setFilterDay={setFilterDay} setFilterEOD={setFilterEOD}/>
        <article className="orders">
            {filteredOrders.map(orderObj =>{
                return(
                    <Link to={`/orders/${orderObj.id}`}>
                    <section className="order" key={orderObj.id}>
                        <header className="order-info">Order #{orderObj.id}</header>
                        <footer>
                            <div className="order-info">{new Date(orderObj?.timestamp).toDateString()}</div>
                    {currentUser?.isAdmin && orderObj.delivererId !== 0 ? (
                    
                        <div>
                            < div className="order-info"> Deliverer: </div>
                            {/* <div>{deliverer}</div> */}
                        </div>
                    
                    ): ("")}
                    </footer>
                    </section>
                    </Link>
                )
            })}
        </article>
    </div>
)
}
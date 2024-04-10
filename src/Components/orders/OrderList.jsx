import { useEffect, useState } from "react"
import { getOrderByDay } from "../../services/OrderService.jsx"
import { OrdersFilter } from "./OrdersFilter.jsx"
import { Link } from "react-router-dom"
import { Deliverer } from "../employees/Deliverer.jsx"
import { DeleteOrder } from "../../services/OrderService.jsx"
import "./Orders.css"

export const OrderList = ({ currentUser }) => {
    const [filteredOrders, setFilteredOrders] = useState([])
    //starts with time range of 1970 - 2200
    const [filterDay, setFilterDay] = useState(0)
    const [filterEOD, setFilterEOD] = useState(7266292443815)


    //shows all orders with a timestamp within a certain day UTC
    const getAndSetAllOrders = async (beginning, end) => {
        await getOrderByDay(beginning, end).then(ordersArray => {
            //reverse sort for most recent time to be first
            const reverseArray = ordersArray.map(order => order).reverse()
            setFilteredOrders(reverseArray)
        })
    }

    // filter by day
    useEffect(() => {
        const beginning = parseInt(filterDay)
        const end = parseInt(filterEOD)
        getAndSetAllOrders(beginning, end)
    }, [filterDay])

    const OrderDeleted = async (orderId) =>{
        DeleteOrder(orderId)
    }

    const updateOrders = async () => {
        await getOrderByDay(parseInt(filterDay), parseInt(filterEOD)).then(ordersArray => {
            const reverseArray = ordersArray.map(order => order).reverse()
            setFilteredOrders(reverseArray)
    })
}

    return (
        <div className="orders-container">
            <h2> Orders </h2>
            <OrdersFilter setFilterDay={setFilterDay} setFilterEOD={setFilterEOD} />
            <article className="orders">
                {filteredOrders.map(orderObj => {
                    return (
                            <section className="order" key={orderObj.id}>
                                <Link to={`/orders/${orderObj.id}`}>
                                <header className="order-info">Order #{orderObj.id}</header>
                                </Link>
                                <footer>
                                    <div className="order-info">{new Date(orderObj?.timestamp).toDateString()}</div>
                                    {currentUser?.isAdmin && orderObj.delivererId !== 0 ? (

                                        <div>
                                            < div className="order-info"> Deliverer: </div>
                                            <Deliverer delivererId={orderObj.delivererId} />
                                        </div>

                                    ) : ("")}
                                    <div className="btn-container">
                                        <button className="delete-btn"
                                        value={orderObj.id}
                                        onClick={async () =>{
                                            await OrderDeleted(orderObj.id)
                                            console.log("post deleted")
                                            updateOrders()
                                        }}
                                        >
                                            <i className="fa-solid fa-trash-can"></i>
                                        </button>
                                    </div>
                                </footer>
                            </section>
                    )
                })}
            </article>
        </div>
    )
}
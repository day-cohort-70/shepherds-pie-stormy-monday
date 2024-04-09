import { useEffect, useState } from "react"
import { getAllOrdersSortedByTime } from "../../services/OrderService"
import { Link } from "react-router-dom"
import "../orders/Orders.css"
import { SalesFilter } from "./SalesFilter"

export const Sales = () => {
    const [allOrders, setAllOrders] = useState([])
    const [chosenMonth, setChosenMonth] = useState(0)
    const [showMonthOrder, setShowMonthOrder] = useState([])

    const getAndSetAllOrders = () => {
        getAllOrdersSortedByTime().then((orderArray) => {
            const reverseArray = orderArray.map(order => order).reverse()
            setAllOrders(reverseArray)
        })
    }

    useEffect(() => {
        getAndSetAllOrders()
    }, [])

    useEffect(() => {
        if (chosenMonth > 0) {
            const selectedMonthOrders = allOrders.filter(order => new Date(order.timestamp).getMonth() === chosenMonth)
            setShowMonthOrder(selectedMonthOrders)
        } else {
            setShowMonthOrder(allOrders)
        }
    }, [chosenMonth, allOrders])

    return <>
    <SalesFilter setChosenMonth={setChosenMonth}/>
    {showMonthOrder.map(orderObj =>{
                return(
                    <Link to={`/orders/${orderObj.id}`}>
                    <section className="order" key={orderObj.id}>
                        <header className="order-info">Order #{orderObj.id}</header>
                        <footer>
                            <div className="order-info">{new Date(orderObj?.timestamp).toDateString()}</div>
                    </footer>
                    </section>
                    </Link>
                )
            })}
    </>
}
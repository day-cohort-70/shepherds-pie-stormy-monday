import { useEffect, useState } from "react"
import { getAllOrdersSortedByTime, getAllPizzas } from "../../services/OrderService"
import { Link } from "react-router-dom"
import "../orders/Orders.css"
import { SalesFilter } from "./SalesFilter"
import { SalesTotal } from "./SalesTotal"

export const Sales = () => {
    const [allOrders, setAllOrders] = useState([])
    const [chosenMonth, setChosenMonth] = useState(0)
    const [showMonthOrder, setShowMonthOrder] = useState([])
    const [allPizzas, setAllPizzas] = useState([])
    const [orderTotal, setOrderTotal] = useState(0)
    const [crustTotal, setCrustTotal] = useState(0)
    const [totalSales, setTotalSales] = useState(0)

    const getAndSetAllOrders = () => {
        getAllOrdersSortedByTime().then((orderArray) => {
            const reverseArray = orderArray.map(order => order).reverse()
            setAllOrders(reverseArray)
        })
    }

    const getAndSetAllPizzas = () => {
        getAllPizzas().then((pizzaArray) => {
            setAllPizzas(pizzaArray)
        })
    }


    useEffect(() => {
        getAndSetAllOrders()
        getAndSetAllPizzas()
    }, [])

    useEffect(() => {
        if (chosenMonth !== 0) {
            const chosenMonthNumber = chosenMonth - 1
            const selectedMonthOrders = allOrders.filter(order => new Date(order.timestamp).getMonth() === chosenMonthNumber)
            setShowMonthOrder(selectedMonthOrders)
        } else {
            setShowMonthOrder(allOrders)
        }
    }, [chosenMonth, allOrders])

    //first layer is getting prices on order itself
    useEffect(() => {
        let totalOrderNumber = 0
        for (const order of showMonthOrder) {
            totalOrderNumber += order.tip
            if (order.delivererId !== 0){
                totalOrderNumber += 5
            }
        }
        setOrderTotal(totalOrderNumber)
    }, [showMonthOrder])

    //second layer is getting prices from pizza crust and toppings
    useEffect(() => {
        let crustNumber = 0
        for (const order of showMonthOrder) {
            for (const pizza of allPizzas) {
                if (order.id === pizza.orderId) {
                    crustNumber += pizza.crust.price
                    let allToppings = pizza.pizzaToppings
                    crustNumber += (allToppings.length)/2
                }
            }
        }
        setCrustTotal(crustNumber)
    }, [orderTotal, showMonthOrder, allPizzas])

    //combining all the prices
    useEffect(() => {
        let totalSalesNumber = crustTotal + orderTotal
        setTotalSales(totalSalesNumber)
    }, [crustTotal, orderTotal, showMonthOrder])

    return <>
    <SalesFilter setChosenMonth={setChosenMonth}/>
    <SalesTotal totalSales={totalSales}/>
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
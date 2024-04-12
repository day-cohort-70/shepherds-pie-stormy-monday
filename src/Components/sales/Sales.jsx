import { useEffect, useState } from "react"
import { getAllOrdersSortedByTime, getAllPizzas } from "../../services/OrderService"
import { Link } from "react-router-dom"
import "../orders/Orders.css"
import { SalesFilter } from "./SalesFilter"
import { SalesTotal } from "./SalesTotal"
import { SalesItems } from "./SalesItems"

export const Sales = () => {
    const [allOrders, setAllOrders] = useState([])
    const [chosenMonth, setChosenMonth] = useState(0)
    const [showMonthOrder, setShowMonthOrder] = useState([])
    const [allPizzas, setAllPizzas] = useState([])
    const [orderTotal, setOrderTotal] = useState(0)
    const [crustTotal, setCrustTotal] = useState(0)
    const [totalSales, setTotalSales] = useState(0)
    const [mostPopCrust, setMostPopCrust] = useState(0)
    const [mostPopSauce, setMostPopSauce] = useState(0)
    const [mostPopCheese, setMostPopCheese] = useState(0)
    const [mostPopToppings, setMostPopToppings] = useState([])

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

    const getMostPopIngredientId = (ingredientArray, setterState) => {
        let orderedArray = [...ingredientArray]
        orderedArray.sort((a, b)=>{return b - a})
        let idNumber = 0
        for (const number of ingredientArray) {
            idNumber += 1
            if (orderedArray[0] === number){
                setterState(idNumber)
            }
        }
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

    useEffect(() => {
        let crustArray = [0, 0, 0]
        let sauceCountArray = [0,0,0,0]
        let cheeseCountArray = [0,0,0,0]
        let toppingCountArray = [0,0,0,0,0,0,0,0]
        for (const order of showMonthOrder) {
            for (const pizza of allPizzas) {
                if (order.id === pizza.orderId) {
                    switch (pizza.crustId) {
                        case 1:
                            crustArray[0] += 1
                            break;
                        case 2:
                            crustArray[1] += 1
                            break;
                        case 3:
                            crustArray[2] += 1
                            break;
                    }
                    switch (pizza.sauceId) {
                        case 1:
                            sauceCountArray[0] += 1
                            break;
                        case 2:
                            sauceCountArray[1] += 1
                            break;
                        case 3:
                            sauceCountArray[2] += 1
                            break;
                        case 4:
                            sauceCountArray[3] += 1
                            break;
                    }
                    switch (pizza.cheeseId) {
                        case 1:
                            cheeseCountArray[0] += 1
                            break;
                        case 2:
                            cheeseCountArray[1] += 1
                            break;
                        case 3:
                            cheeseCountArray[2] += 1
                            break;
                        case 4:
                            cheeseCountArray[3] += 1
                            break;
                    }
                    let pizzaToppingArray = pizza.pizzaToppings
                    for (const pizzaTopping of pizzaToppingArray) {
                        switch (pizzaTopping.toppingId) {
                            case 1:
                                toppingCountArray[0] += 1
                                break;
                            case 2:
                                toppingCountArray[1] += 1
                                break;
                            case 3:
                                toppingCountArray[2] += 1
                                break;
                            case 4:
                                toppingCountArray[3] += 1
                                break;
                            case 5:
                                toppingCountArray[4] += 1
                                break;
                            case 6:
                                toppingCountArray[5] += 1
                                break;
                            case 7:
                                toppingCountArray[6] += 1
                                break;
                            case 8:
                                toppingCountArray[7] += 1
                                break;
                        }
                    }
                }
            }
        }
        getMostPopIngredientId(crustArray, setMostPopCrust)
        getMostPopIngredientId(sauceCountArray, setMostPopSauce)
        getMostPopIngredientId(cheeseCountArray, setMostPopCheese)
        let orderedToppingArray = [...toppingCountArray]
        orderedToppingArray.sort((a, b)=>{return b - a})
        let toppingIdNumber = 0
        let threeBestToppingsIdArray = []
        for (const number of toppingCountArray) {
            toppingIdNumber += 1
            if (orderedToppingArray[0] === number){
                threeBestToppingsIdArray.unshift(toppingIdNumber)
            } else if (orderedToppingArray[1] === number) {
                threeBestToppingsIdArray.unshift(toppingIdNumber)
            } else if (orderedToppingArray[2] === number){
                threeBestToppingsIdArray.unshift(toppingIdNumber)
            }
            if (threeBestToppingsIdArray.length === 3){
                setMostPopToppings(threeBestToppingsIdArray)
                return
            }
        }
    }, [showMonthOrder, allPizzas])

    return <>
    <SalesFilter setChosenMonth={setChosenMonth}/>
    <SalesItems mostPopCrust={mostPopCrust} mostPopSauce={mostPopSauce} mostPopCheese={mostPopCheese} mostPopToppings={mostPopToppings} totalSales={totalSales}/>
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
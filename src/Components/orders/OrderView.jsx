import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getOrderWithOrderId, getPizzasByOrderId } from "../../services/OrderService.jsx"
import { Pizza } from "./Pizza.jsx"
import "./Orders.css"

export const OrderView = () => {
    const { orderId } = useParams()
    const [currentOrder, setCurrentOrder] = useState([])
    const [orderPrice, setOrderPrice] = useState(0)
    const [orderTip, setOrderTip] = useState(0)
    const [deliveryPrice, setDeliveryPrice] = useState(0)
    const navigate = useNavigate()

    const getAndSetPizzas = () => {
        getPizzasByOrderId(orderId).then(pizzaArray => {
            setCurrentOrder(pizzaArray)
        })
    }

    //initital render only
    useEffect(() => {
        getAndSetPizzas()
    }, [])

    //runs only once when orderId changes
    useEffect(() => {
        checkForAdditionalCharges()
    }, [orderId])


    const checkForAdditionalCharges = () => {
        getOrderWithOrderId(orderId).then(orderArr => {
            const orderObj = orderArr[0]
            {
                orderObj?.delivererId !== 0 ?
                (
                    addDelivery().then(() => {
                        checkForTip()
                    })
                ) : (checkForTip())
            }
        })
    }

    const addDelivery = async () => {
        setDeliveryPrice(5)
    }

    const checkForTip = () => {
        getOrderWithOrderId(orderId).then(orderArr => {
            const orderObj = orderArr[0]
            setOrderTip(orderObj?.tip)
        })
    }

    const handleAddPizza = (e) => {
        e.preventDefault()
        const orderId = e.target.value
        navigate(`/orders/addPizza/${orderId}`)
    }

    return (
        <>
            <div className="orders-container">
            <div className="btn-container">
                <button className="btn-primary" value={orderId}
                    onClick={handleAddPizza}
                >Add Pizza</button>
            </div>
                {currentOrder.map(pizza => {
                    return (
                        <>
                            <Pizza getAndSetPizzas={getAndSetPizzas} pizza={pizza} pizzaId={pizza.id} orderPrice={orderPrice} setOrderPrice={setOrderPrice} orderId={orderId} />

                        </>

                    )
                })
                }
                <div className="order-details">
                <div><b>
                    <span>Tip: </span>
                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(orderTip)}
                </b></div>
                <div> <b>
                    <span>Total Price: </span>
                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(orderPrice + orderTip + deliveryPrice)}
                </b></div>
            </div>
            </div>
        </>
    )
}
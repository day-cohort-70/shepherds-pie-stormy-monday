import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getDelivererIdByOrderId, getOrderById } from "../../services/OrderService.jsx"
// import { PizzaToppings } from "./PizzaToppings.jsx"
import { PizzaPrice } from "./PizzaPrice.jsx"

export const OrderView = () => {
    //fetch pizzas by order id
    
    const {orderId} = useParams()
    const [currentOrder, setCurrentOrder] = useState([])
    const [orderPrice, setOrderPrice] = useState(0)
    const [orderTip, setOrderTip] = useState()
    const [deliveryPrice, setDeliveryPrice] = useState(0)
    const navigate = useNavigate()
    
const checkForDelivery = () => {
     getDelivererIdByOrderId(orderId).then(orderArr =>{
        const orderObj = orderArr[0]
        {orderObj.delivererId !== 0 ? (
         addDelivery().then(() =>{
         checkForTip()})
     ) : (checkForTip())}})
}

const checkForTip = () => {
    getDelivererIdByOrderId(orderId).then(orderArr =>{
        const orderObj = orderArr[0]
        // const newPrice = orderObj.tip + orderPrice
        // setOrderPrice(newPrice)
        setOrderTip(orderObj.tip)
    })
}

const addDelivery = async () => {
    //by adding 5 to orderPrice you're allowing it to happen at any time
    //  const newPrice = orderPrice + 5
    //  setOrderPrice(newPrice)
    setDeliveryPrice(5)
}
    //initital render only
    useEffect(()=>{
        getOrderById(orderId).then(pizzaArray => {
            setCurrentOrder(pizzaArray)
        })
    },[])
 


//runs once when orderId & OrderTip changes and has controls in case pizza has already set the state
    useEffect(()=>{
        checkForDelivery()
        //if I set this as orderId, It doesnt work. If I set it as orderTip, I dont get the pizza
    },[orderId])

    //if I put these in the same useEffect, I dont get the tip
    // useEffect(()=>{
    //     checkForTip()
    //     // checkForDelivery()
    // }, [currentOrder])


    const handleAddPizza = (e) => {
            e.preventDefault()
            navigate(`/orders/orderId/addPizza`)
        }



     
    return(
<>
<div className="btn-container">
    <button className="btn-primary"
    onClick = {handleAddPizza}
    >Add Pizza</button>
</div>
<div className="orders-conatiner">
       {currentOrder.map(pizza =>{
        return(
            <>
        <PizzaPrice pizza={pizza} pizzaId={pizza.id} orderPrice={orderPrice} setOrderPrice={setOrderPrice}/>
        <div>
            <span>Tip: $</span>
            {orderTip}
        </div>
        <div>
            <span>Total Price: $</span>
            {orderPrice + orderTip + deliveryPrice}
        </div>
</>
        
        )
    })
}
</div>
</>
    )
}
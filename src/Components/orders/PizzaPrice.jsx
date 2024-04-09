import { useEffect, useState } from "react"
import { getPizzaById, getToppingsByPizzaId } from "../../services/OrderService.jsx"
import { PizzaToppings } from "./PizzaToppings.jsx"
import { useNavigate } from "react-router-dom"


export const PizzaPrice = ({pizza, pizzaId, orderPrice, setOrderPrice}) => {
    // [currentPizzaToppings, setCurrentPizzaToppings] = useState([])
//    const [currentPizza, setCurrentPizza] = useState({})
   const [currentPizzaPrice, setCurrentPizzaPrice] = useState(0)
//    const [toppingsPrice, setToppingsPrice] = useState (0)
   const navigate = useNavigate()

   const handleEdit = (e) => {
    e.preventDefault()
    navigate(`/orders/edit`)
}

    
//runs everytime pizzaId changes
    useEffect(() =>{
        getPizzaById(pizzaId).then(pizzaArr =>{
            let pizzaObj = pizzaArr[0]
            let numOfToppings = pizzaObj.pizzaToppings?.length
            // console.log(numOfToppings)
            // setToppingsPrice(numOfToppings)
            let pizzaPrice = pizzaObj.crust?.price + (numOfToppings * 0.5)
            setCurrentPizzaPrice(pizzaPrice)})
    }, [pizza])

    useEffect(()=>{
        let newPrice = orderPrice + currentPizzaPrice
            setOrderPrice(newPrice)
    },[currentPizzaPrice])

    return (
        <section className="order" key={pizza.id}>
        <header className="order-header">
           Pizza id: {pizza.id}
        </header>
        <div>
            <span className="order-info"> Crust: </span> 
            {pizza.crust.desc} 
        </div>
        <div>
            <span className="order-info"> Sauce:
            </span>
            {pizza.sauce.desc}
        </div>
        <div>
            <span className="order-info"> Cheese: </span>
            {pizza.cheese.desc}
        </div>
        <div>
            <span className="order-info"> Toppings: </span>
            <div>
           <PizzaToppings pizzaId={pizza.id}/>
           </div>
        </div>
        <div className="btn-container">
            <button className="btn-primary"
            onClick={handleEdit}
            >Edit</button>
        </div>
    </section>
    )
}
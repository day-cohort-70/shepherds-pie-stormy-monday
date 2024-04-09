import { useEffect, useState } from "react"
import { getPizzaById } from "../../services/OrderService.jsx"
import { PizzaToppings } from "./PizzaToppings.jsx"
import { useNavigate } from "react-router-dom"

export const Pizza = ({ pizza, pizzaId, orderPrice, setOrderPrice }) => {
    const [currentPizzaPrice, setCurrentPizzaPrice] = useState(0)
    const navigate = useNavigate()

    const handleEdit = (e) => {
        e.preventDefault()
        const pizzaId = e.target.value
        navigate(`/orders/edit/${pizzaId}`)
    }

    useEffect(() => {
        getPizzaById(pizzaId).then(pizzaArr => {
            let pizzaObj = pizzaArr[0]
            let numOfToppings = pizzaObj.pizzaToppings?.length
            let pizzaPrice = pizzaObj.crust?.price + (numOfToppings * 0.5)
            setCurrentPizzaPrice(pizzaPrice)
        })
    }, [pizza])

    useEffect(() => {
        let newPrice = orderPrice + currentPizzaPrice
        setOrderPrice(newPrice)
    }, [currentPizzaPrice])

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
                    <PizzaToppings pizzaId={pizza.id} />
                </div>
            </div>
            <div className="btn-container">
                <button className="btn-primary"
                value = {pizza.id}
                    onClick={handleEdit}
                >Edit</button>
            </div>
        </section>
    )
}
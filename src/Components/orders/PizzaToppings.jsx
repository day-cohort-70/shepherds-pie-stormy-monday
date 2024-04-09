import { useEffect, useState } from "react"
import { getToppingsByPizzaId } from "../../services/OrderService.jsx"

export const PizzaToppings = ({pizzaId}) =>{
    const [currentPizza, setCurrentPizza] = useState([])
//useEffect - set state here of topping price then copy total price state to add topping price state
//  to the total price state in orderView each time currentPizza changes

    useEffect(()=>{
        getToppingsByPizzaId(pizzaId).then(pizzaObj => {
            setCurrentPizza(pizzaObj)
        })
    },[pizzaId])



    return(
        <>
        {currentPizza.length !==0 ?(
        currentPizza.map(toppingObj =>{
            return(
                <div key={toppingObj.id}>{toppingObj?.topping?.desc}</div>)})) 
                : (<div>None</div>)
            }
        </>
    )
   
}
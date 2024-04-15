import { OrderOptions } from "./OrderOptions.jsx"
import { useState, useEffect } from "react"
import { getToppings, getCrusts, getCheeses, getSauces, addToppingsForAddPizza } from "../../services/pizzaService.js";
import { useParams, useNavigate } from "react-router-dom"
import { getNextPizzaId } from "../../services/OrderService.jsx";
import { addPizza } from "../../services/pizzaService.js";

export const AddPizza = () => {
    const orderId = useParams()
    const navigate = useNavigate()
    const [ingredients, setIngredients] = useState({
        toppings: [],
        crusts: [],
        cheeses: [],
        sauces: []
    });
    const [transientPizza, setTransientPizza] = useState({
        pizzaId: null,
        orderId: parseInt(orderId.orderId),
        toppings: [],
        crust: 0,
        cheese: 0,
        sauce: 0
    })

    useEffect(() =>{
        getNextPizzaId().then((pizzaId)=>{
            setTransientPizza(prevTransientPizza => ({
                ...prevTransientPizza,
                pizzaId: pizzaId
            }))
            console.log()
        })
    },[orderId])

    useEffect(() => {
        Promise.all([
            getToppings(),
            getCrusts(),
            getCheeses(),
            getSauces()
        ]).then(([toppings, crusts, cheeses, sauces]) => {
            setIngredients(prevIngredients => ({
                ...prevIngredients,
                toppings,
                crusts,
                cheeses,
                sauces
            }));
        });
    }, [])

    const handleToppingChange = (event) => {
        const toppingId = parseInt(event.target.value);
        const isChecked = event.target.checked;
        const toppingIndex = transientPizza.toppings.findIndex(topping => topping.id === toppingId);

        if (isChecked) {
            if (toppingIndex === -1) {
                setTransientPizza(prevTransientPizza => ({
                    ...prevTransientPizza,
                    toppings: [...prevTransientPizza.toppings, ingredients.toppings.find(topping => topping.id === toppingId)]
                }));
            }
        } else {
            if (toppingIndex !== -1) {
                setTransientPizza(prevTransientPizza => ({
                    ...prevTransientPizza,
                    toppings: prevTransientPizza.toppings.filter(topping => topping.id !== toppingId)
                }));
            }
        }
        
        
    };

    const handleCrustChange = (event) => {
        const crustId = parseInt(event.target.value);
        setTransientPizza(prevTransientPizza => ({ ...prevTransientPizza, crust: crustId }));
        
    };

    const handleCheeseChange = (event) => {
        const cheeseId = parseInt(event.target.value);
        setTransientPizza(prevTransientPizza => ({ ...prevTransientPizza, cheese: cheeseId }));
        
    };

    const handleSauceChange = (event) => {
        const sauceId = parseInt(event.target.value);
        setTransientPizza(prevTransientPizza => ({ ...prevTransientPizza, sauce: sauceId }));
        
    };

    const addPizzaToOrder = async (e) => {
        e.preventDefault()
        if (transientPizza.cheese !== 0 && transientPizza.crust !== 0 && transientPizza.sauce !== 0) {
            await addPizza(transientPizza)
            console.log("pizza added")
            {transientPizza.toppings?.map((topping)=>{
            addToppingsForAddPizza({
                pizzaId: transientPizza.pizzaId,
                toppingId: topping.id
            })
        })}
        }
        else {
            window.alert(`Please make a selection.`)
        }

       navigate(`/orders/${transientPizza.orderId}`)
        
    };
    return(
        <>
       <OrderOptions 
       ingredients={ingredients}
       transientPizza={transientPizza}
       handleToppingChange={handleToppingChange}
       handleCrustChange={handleCrustChange}
       handleCheeseChange={handleCheeseChange}
       handleSauceChange={handleSauceChange} />
       <div className="btn-container">
       <button className="btn-primary btn-neworder" onClick={addPizzaToOrder}>Add Pizza</button>
       </div>
       </>
    )
}
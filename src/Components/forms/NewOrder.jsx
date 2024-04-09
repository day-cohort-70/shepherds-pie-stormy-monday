import { getNextOrderId } from "../../services/OrderService.jsx";
import { getCheeses, getToppings, getCrusts, getSauces } from "../../services/ingredientService.js";
import { useEffect, useState } from "react";

//order dropdown?
//dropdown to select pizza of order?


export const NewOrder =  () => {
    const [ingredients, setIngredients] = useState({
        toppings: [],
        crusts: [],
        cheeses: [],
        sauces: []
    });
    const [transientState, setTransientState] =  useState({
        toppings: [],
        crust: 0,
        cheese: 0,
        sauce: 0
    })
    const [orderId, setOrderId] = useState(null);
    
    
    const order = {
        toppings: [],
        crust: 0,
        cheese: 0,
        sauce: 0
    };

    useEffect(() => {
        // Fetch toppings, crusts, cheeses, and sauces when the component mounts
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
        getNextOrderId().then(resp => {
            const nextOrderId = resp;
            setOrderId(nextOrderId);
        })
    }, []);

    const handleToppingChange = (event) => {
        const toppingId = parseInt(event.target.value);
        const isChecked = event.target.checked;
    
        // Find the index of the topping in the order's toppings array
        const toppingIndex = order.toppings.findIndex(topping => topping.id === toppingId);
    
        if (isChecked) {
            // If the topping is selected and not already in the order, add it
            if (toppingIndex === -1) {
                order.toppings.push(ingredients.toppings.find(topping => topping.id === toppingId));
            }
        } else {
            // If the topping is not selected and is in the order, remove it
            if (toppingIndex !== -1) {
                order.toppings.splice(toppingIndex, 1);
            }
        }
    
        console.log(order);
    

    };

    const handleCrustChange = (event) => {
        const crustId = parseInt(event.target.value);
        // setIngredients(prevIngredients => ({
        //     ...prevIngredients,
        //     crust: crustId
        // }));
        order.crust = crustId;

    };

    const handleCheeseChange = (event) => {
        const cheeseId = parseInt(event.target.value);
        // setIngredients(prevIngredients => ({
        //     ...prevIngredients,
        //     cheese: cheeseId
        // }));
        order.cheese = cheeseId;
    };

    const handleSauceChange = (event) => {
        const sauceId = parseInt(event.target.value);
        // setIngredients(prevIngredients => ({
        //     ...prevIngredients,
        //     sauce: sauceId
        // }));
        order.sauce = sauceId;
    };

    const placeOrder = () => {
        //test for NaN
        console.log("Order placed.");
    }
    return (
        <div>
            <h2>New Order</h2>
            <div>
                <h3>Toppings</h3>
                {ingredients.toppings.map(topping => (
                    <div key={topping.id}>
                        <input
                            type="checkbox"
                            value={topping.id}
                            onChange={handleToppingChange}
                            id={`topping-${topping.id}`}
                        />
                        <label htmlFor={`topping-${topping.id}`}>{topping.desc}</label>
                    </div>
                ))}
            </div>
            <div>
                <h3>Crust</h3>
                <select value={ingredients.crust} onChange={handleCrustChange}>
                    <option value="">Select a crust</option>
                    {ingredients.crusts.map(crust => (
                        <option key={crust.id} value={crust.id}>{crust.desc}</option>
                    ))}
                </select>
            </div>
            <div>
                <h3>Cheese</h3>
                <select value={ingredients.cheese} onChange={handleCheeseChange}>
                    <option value="">Select a cheese</option>
                    {ingredients.cheeses.map(cheese => (
                        <option key={cheese.id} value={cheese.id}>{cheese.desc}</option>
                    ))}
                </select>
            </div>
            <div>
                <h3>Sauce</h3>
                <select value={ingredients.sauce} onChange={handleSauceChange}>
                    <option value="">Select a sauce</option>
                    {ingredients.sauces.map(sauce => (
                        <option key={sauce.id} value={sauce.id}>{sauce.desc}</option>
                    ))}
                </select>
            </div>
        </div>
    );
};



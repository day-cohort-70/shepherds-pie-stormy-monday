
import { useEffect, useState } from 'react';
import { getNextOrderId } from "../../services/OrderService.jsx";
import { getCheeses, getToppings, getCrusts, getSauces } from "../../services/ingredientService.js";
import OrderOptions from './OrderOptions'; 

export const NewOrder = () => {
    const [ingredients, setIngredients] = useState({
        toppings: [],
        crusts: [],
        cheeses: [],
        sauces: []
    });
    const [order, setOrder] = useState({
        toppings: [],
        crust: 0,
        cheese: 0,
        sauce: 0
    });
    const [orderId, setOrderId] = useState(null);

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
        getNextOrderId().then(resp => {
            setOrderId(resp);
        });
    }, []);

    const handleToppingChange = (event) => {
        const toppingId = parseInt(event.target.value);
        const isChecked = event.target.checked;
        const toppingIndex = order.toppings.findIndex(topping => topping.id === toppingId);

        if (isChecked) {
            if (toppingIndex === -1) {
                setOrder(prevOrder => ({
                    ...prevOrder,
                    toppings: [...prevOrder.toppings, ingredients.toppings.find(topping => topping.id === toppingId)]
                }));
            }
        } else {
            if (toppingIndex !== -1) {
                setOrder(prevOrder => ({
                    ...prevOrder,
                    toppings: prevOrder.toppings.filter(topping => topping.id !== toppingId)
                }));
            }
        }
    };

    const handleCrustChange = (event) => {
        const crustId = parseInt(event.target.value);
        setOrder(prevOrder => ({ ...prevOrder, crust: crustId }));
    };

    const handleCheeseChange = (event) => {
        const cheeseId = parseInt(event.target.value);
        setOrder(prevOrder => ({ ...prevOrder, cheese: cheeseId }));
    };

    const handleSauceChange = (event) => {
        const sauceId = parseInt(event.target.value);
        setOrder(prevOrder => ({ ...prevOrder, sauce: sauceId }));
    };

    const placeOrder = () => {
        // Implement the logic to place the order using the placeNewOrder function
        console.log("Order placed.");
    };

    return (
        <div>
            <h2>New Order</h2>
            <OrderOptions
                ingredients={ingredients}
                handleToppingChange={handleToppingChange}
                handleCrustChange={handleCrustChange}
                handleCheeseChange={handleCheeseChange}
                handleSauceChange={handleSauceChange}
            />
            <button onClick={placeOrder}>Place Order</button>
        </div>
    );
};

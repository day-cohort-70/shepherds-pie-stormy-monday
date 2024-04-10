import { useEffect, useState } from 'react';
import { getNextOrderId } from "../../services/OrderService.jsx";
import { getCheeses, getToppings, getCrusts, getSauces } from "../../services/ingredientService.js";
import { OrderOptions } from './OrderOptions.jsx'; 

export const NewOrder = () => {
    const [ingredients, setIngredients] = useState({
        toppings: [],
        crusts: [],
        cheeses: [],
        sauces: []
    });
    const [order, setOrder] = useState([]);
    const [orderId, setOrderId] = useState(null);
    const [pizzas, setPizzas] = useState([]); // State to hold the list of pizzas added to the order
    const [transientPizza, setTransientPizza] = useState({
        toppings: [],
        crust: 0,
        cheese: 0,
        sauce: 0
    }); // State to hold the current pizza selection temporarily
    const [deliveryDestination, setDeliveryDestination] = useState(''); // State for delivery destination

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

    useEffect(() => {
        console.log(transientPizza);
    }, [transientPizza]);

    useEffect(() => {
        console.log(order);
    }, [order]);
    

    const handleToppingChange = (event) => {
        const toppingId = parseInt(event.target.value);
        const isChecked = event.target.checked;
        const toppingIndex = transientPizza.toppings.findIndex(topping => topping.id === toppingId);

        if (isChecked) {
            if (toppingIndex === -1) {
                setTransientPizza(prevOrder => ({
                    ...prevOrder,
                    toppings: [...prevOrder.toppings, ingredients.toppings.find(topping => topping.id === toppingId)]
                }));
            }
        } else {
            if (toppingIndex !== -1) {
                setTransientPizza(prevOrder => ({
                    ...prevOrder,
                    toppings: prevOrder.toppings.filter(topping => topping.id !== toppingId)
                }));
            }
        }
        
        
    };

    const handleCrustChange = (event) => {
        const crustId = parseInt(event.target.value);
        setTransientPizza(prevOrder => ({ ...prevOrder, crust: crustId }));
        
    };

    const handleCheeseChange = (event) => {
        const cheeseId = parseInt(event.target.value);
        setTransientPizza(prevOrder => ({ ...prevOrder, cheese: cheeseId }));
        
    };

    const handleSauceChange = (event) => {
        const sauceId = parseInt(event.target.value);
        setTransientPizza(prevOrder => ({ ...prevOrder, sauce: sauceId }));
        
    };

    const addPizza = () => {
        if (transientPizza.cheese !== 0 && transientPizza.crust !== 0 && transientPizza.sauce !== 0) {
            setOrder(prevPizzas => [...prevPizzas, transientPizza]);
            // Clear the current pizza selection
            setTransientPizza({
                toppings: [],
                crust: 0,
                cheese: 0,
                sauce: 0
            });
            window.alert(`Pizza added to order.`)
        }
        else {
            window.alert(`Please make a selection.`)
        }
        
    };

    const clearOrder = () => {
        // Clear all selections and previously selected pizzas
        setTransientPizza({
            toppings: [],
            crust: 0,
            cheese: 0,
            sauce: 0
        });
        setOrder([]);
        window.alert(`Order cleared.`)
    };

    const handleOrder = () => {
        if (deliveryDestination.trim() === '') {
            window.alert("Please select a delivery destination.");
        } else {
            // add the delivery destination to the order
            if (transientPizza.cheese !== 0 && transientPizza.crust !== 0 && transientPizza.sauce !== 0) {
                setOrder(prevPizzas => [...prevPizzas, transientPizza]);
            }
            const newOrder = {
                ...order,
                deliveryDestination
            };
            setOrder(newOrder);
            window.alert("Order placed.");
            console.log(newOrder);
        }
    };

    return (
        <div>
            <h2>New Order</h2>
            <OrderOptions
                ingredients={ingredients}
                transientPizza={transientPizza}
                handleToppingChange={handleToppingChange}
                handleCrustChange={handleCrustChange}
                handleCheeseChange={handleCheeseChange}
                handleSauceChange={handleSauceChange}
            />
            
            <div className="order-controls-container">
            <div>
                <label htmlFor="deliveryDestination">Delivery Destination: </label>
                <input
                    type="text"
                    id="deliveryDestination"
                    value={deliveryDestination}
                    onChange={(e) => setDeliveryDestination(e.target.value)}
                    placeholder="Enter destination"
                />
            </div>
                <button className="btn-primary btn-neworder" onClick={addPizza}>Add Pizza</button>
                <button className="btn-primary btn-neworder" onClick={clearOrder}>Clear Order</button>
                <button className="btn-primary btn-neworder" onClick={handleOrder}>Place Order</button>
            </div>
            
        </div>
    );
};

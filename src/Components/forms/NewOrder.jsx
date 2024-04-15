import { useEffect, useState } from 'react';
import { getNextOrderId, insertOrder } from "../../services/OrderService.jsx";
import { getCheeses, getToppings, getCrusts, getSauces } from "../../services/ingredientService.js";
import { OrderOptions } from './OrderOptions.jsx'; 
import { getEmployees } from '../../services/employeeService.js';
import "./Create.css"

export const NewOrder = () => {
    const [ingredients, setIngredients] = useState({
        toppings: [],
        crusts: [],
        cheeses: [],
        sauces: []
    });
    const [order, setOrder] = useState([]);
    const [orderId, setOrderId] = useState(null);
    // const [pizzas, setPizzas] = useState([]); // State to hold the list of pizzas added to the order
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
        debugger
        if (deliveryDestination.trim() === '') {
            window.alert("Please select a delivery destination.");
        } else {
            // add the delivery destination to the order
            if (transientPizza.cheese !== 0 && transientPizza.crust !== 0 && transientPizza.sauce !== 0) {
                setOrder(prevPizzas => [...prevPizzas, transientPizza]);
            }
            // const newOrder = {
            //     ...order,
            //     deliveryDestination
            // };
            //setOrder(newOrder);
            addOrderToDatabase(order)

        }
    };



const addOrderToDatabase = async (order) => {
    // Calculate the total price of the order
    const calculateTotalPrice = (orderPizzas) => {
        let total = 12;
        orderPizzas.forEach(pizza => {
            total += pizza.toppings.reduce((acc, topping) => acc + topping.price, 0);
        });
        return total;
    };

    // Assign a random employee as the deliverer if the destination is not a table number
    const assignDeliverer = async (destination) => {
        if (isNaN(destination)) {
            const employees = await getEmployees();
            const deliverer = employees[Math.floor(Math.random() * employees.length)];
            return deliverer.id;
        }
        return 0; // No deliverer assigned if destination is a table number
    };

    // Insert the order into the database
    const insertOrderIntoDatabase = async (order) => {
        const totalPrice = calculateTotalPrice(order);
        const delivererId = await assignDeliverer(deliveryDestination);
        var nextPizzaId = await getNextPizzaId()
        // Insert the order

        //TODO use currentUser for employeeId
        let completedOrder = await insertOrder({
            employeeId: currentUser.id,
            timestamp: Date.now(),
            tip: 0, // Assuming no tip is added at this point
            destination: deliveryDestination,
            delivererId: delivererId,
            totalPrice: totalPrice
        });

        // Insert each pizza in the order

        //TO DO increment pizzaId
        for (const pizza of order) {
            debugger
            let orderedPizza = await insertPizza({
                orderId: orderId,
                crustId: pizza.crust,
                cheeseId: pizza.cheese,
                sauceId: pizza.sauce
            });

            // Insert each topping for the pizza
            for (const topping of pizza.toppings) {
                await insertPizzaTopping({
                    pizzaId: nextPizzaId,
                    toppingId: topping.id
                });
            }
            nextPizzaId++;
        }
    };

    // Call the insertOrderIntoDatabase function
    try {
        await insertOrderIntoDatabase(order);
        window.alert("Order placed.");
    } catch (error) {
        window.alert("Error placing order.", error);
    }
};


    return (
        <div>
            <div className="order-container">
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
                    <div className='order-controls-destination'>
                        <label htmlFor="deliveryDestination">Delivery Destination: </label>
                        <input
                            type="text"
                            id="deliveryDestination"
                            value={deliveryDestination}
                            onChange={(e) => setDeliveryDestination(e.target.value)}
                            placeholder="Enter destination"
                        />
                    </div>
                    <div className="order-controls-button-container">
                        <button className="btn-primary btn-neworder" onClick={addPizza}>Add Pizza</button>
                        <button className="btn-primary btn-neworder" onClick={clearOrder}>Clear Order</button>
                        <button className="btn-primary btn-neworder" onClick={handleOrder}>Place Order</button>
                    </div>
                </div>
            </div>
            <div className="order-status">
            {order.map((pizza, index) => (
                <div key={index} className="pizza-details">
                    <h3>Pizza {index + 1}</h3>
                    <p>Crust: {ingredients.crusts.find(crust => crust.id === pizza.crust).desc}</p>
                    <p>Cheese: {ingredients.cheeses.find(cheese => cheese.id === pizza.cheese).desc}</p>
                    <p>Sauce: {ingredients.sauces.find(sauce => sauce.id === pizza.sauce).desc}</p>
                    <p>Toppings: {pizza.toppings.map(topping => topping.desc).join(', ')}</p>
                </div>
            ))}
            </div>
        </div>
    );
};

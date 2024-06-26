import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCrusts, getPizzaNotExpanded, getSauces, getToppings, updatePizza, addToppings, DeleteToppings } from "../../services/pizzaService.js";
import { getPizzaById } from "../../services/OrderService.jsx";
import { getCheeses } from "../../services/pizzaService.js";



export const EditPizza = () => {
    const [edittedPizza, setEdittedPizza] = useState({});
    const { orderId, pizzaId } = useParams();
    const navigate = useNavigate();
    const [crusts, setCrusts] = useState([]);
    const [sauces, setSauces] = useState([]);
    const [cheeses, setCheeses] = useState([]);
    const [toppings, setToppings] = useState([])
    const [currentPizza, setCurrentPizza] = useState({})
    const [currentPizzaToppings, setCurrentPizzaToppings] = useState([])

    useEffect(() => {
        getCrusts().then((crustArr) => {
            setCrusts(crustArr);
        });
        getSauces().then((sauceArr) => {
            setSauces(sauceArr);
        });
        getCheeses().then((cheeseArr) => {
            setCheeses(cheeseArr);
        });
        getToppings().then((toppingArr) => {
            setToppings(toppingArr);
        });
    }, []);

    useEffect(() => {
        getPizzaById(pizzaId).then((pizzaArr) => {
            const pizzaObj = pizzaArr[0];
            setCurrentPizza(pizzaObj);

        });
    }, [currentPizzaToppings]);

    useEffect(() => {
        getPizzaById(pizzaId).then((pizzaArr) => {
            const pizzaObj = pizzaArr[0];
            setCurrentPizzaToppings(pizzaObj.pizzaToppings)
        })
    }, [pizzaId])

    useEffect(() => {
        getPizzaNotExpanded(pizzaId).then((pizzaArr) => {
            const pizzaObj = pizzaArr[0];
            setEdittedPizza(pizzaObj);
        });
    }, [currentPizza])

    const checkFunction = (topping) => {
        return currentPizzaToppings.some(toppingObj => toppingObj.toppingId === topping);
    };


    const handleToppingChange = async (event) => {
        const toppingId = parseInt(event.target.value);
        const isChecked = event.target.checked;
        let updatedToppings = [...currentPizzaToppings]

        if (isChecked) {
            if (!updatedToppings.some(toppingObj => toppingObj.toppingId === toppingId))
                updatedToppings.push({
                    pizzaId: parseInt(pizzaId),
                    toppingId: toppingId
                })
        } else {
            updatedToppings = updatedToppings.filter(toppingObj => toppingObj.toppingId !== toppingId)
        }
        setCurrentPizzaToppings(updatedToppings)
    }

    const handleSave = async (e) => {
        e.preventDefault()
        await updatePizza(edittedPizza)
        await CheckToppings()
        navigate(`/orders/${orderId}`)
    }

    const CheckToppings = async () => {
        console.log("toppings saving")
        {
            currentPizzaToppings.map((topping) => {
                const toppingIndex = currentPizza.pizzaToppings?.findIndex(toppingObj => toppingObj.toppingId === topping.toppingId)
                if (toppingIndex === -1) {
                    addToppings(topping)
                    console.log("topping added")
                }
            })
        }
        {
            currentPizza.pizzaToppings.map((toppingObj) => {
                const toppingIndex = currentPizzaToppings?.findIndex(topping => topping.toppingId === toppingObj.toppingId)
                if (toppingIndex === -1) {
                    DeleteToppings(toppingObj)
                }
            })
        }
    }

    return (
        <form className="edit-pizza">
            <h2>Edit Pizza</h2>
            <fieldset>
                <div className="form-group">
                    <label>Crust:</label>
                    <select name="crust"
                        onChange={(event) => {
                            const copy = { ...edittedPizza }
                            copy.crustId = parseInt(event.target.value)
                            setEdittedPizza(copy)
                        }}
                    >
                        <option defaultValue={currentPizza?.crust?.desc} hidden> {currentPizza?.crust?.desc} </option>
                        {crusts.map(crust => {
                            return (
                                <option value={crust.id} key={crust.id}>
                                    {crust.desc}
                                </option>
                            )
                        })}
                    </select>
                </div>
                <div className="form-group">
                    <label> Sauce: </label>
                    <select name="sauce"
                        onChange={(event) => {
                            const copy = { ...edittedPizza }
                            copy.sauceId = parseInt(event.target.value)
                        }}
                    >
                        <option defaultValue={currentPizza?.sauce?.desc} hidden> {currentPizza?.sauce?.desc} </option>
                        {sauces.map(sauce => {
                            return (
                                <option value={sauce.id} key={sauce.id}>
                                    {sauce.desc}
                                </option>
                            )
                        })}
                    </select>
                </div>
                <div className="form-group">
                    <label> Cheese: </label>
                    <select name="cheese"
                        onChange={(event) => {
                            const copy = { ...edittedPizza }
                            copy.cheeseId = parseInt(event.target.value)
                            setEdittedPizza(copy)
                        }}
                    >
                        <option defaultValue={currentPizza?.cheese?.desc} hidden> {currentPizza?.cheese?.desc} </option>
                        {cheeses.map(cheese => {
                            return (
                                <option value={cheese.id} key={cheese.id}>
                                    {cheese.desc}
                                </option>
                            )
                        })}
                    </select>
                </div>
                <div>
                    <label>Toppings</label>
                    {toppings.map(topping => (
                        <div key={topping.id}>
                            <input
                                type="checkbox"
                                value={topping.id}
                                id={`topping-${topping.id}`}
                                checked={checkFunction(topping.id)}
                                onChange={handleToppingChange}
                            />
                            <label htmlFor={`topping-${topping.id}`}>{topping.desc}</label>
                        </div>
                    ))}
                </div>
            </fieldset>
            <button className="btn-primary"
                onClick={handleSave}
            >Save</button>
        </form>
    );
};



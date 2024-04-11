import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCrusts, getPizzaNotExpanded, getSauces, getToppings } from "../../services/pizzaService.js";
import { getPizzaById } from "../../services/OrderService.jsx";
import { getCheeses } from "../../services/pizzaService.js";



export const EditPizza = () => {
    const [edittedPizza, setEdittedPizza] = useState({});
    const { pizzaId } = useParams();
    const navigate = useNavigate();
    const [crusts, setCrusts] = useState([]);
    const [sauces, setSauces] = useState([]);
    const [cheeses, setCheeses] = useState([]);
    const [toppings, setToppings] = useState([]);
    const [currentPizza, setCurrentPizza] = useState({});

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
    }, [pizzaId]);

    //I think this needs its own fetch call to set the editted pizza without the expansions 
    useEffect(() => {
        getPizzaNotExpanded(pizzaId).then((pizzaArr) => {
            const pizzaObj = pizzaArr[0];
            setEdittedPizza(pizzaObj);
        });
    }, [currentPizza]);

    const checkFunction = (topping) => {
        return currentPizza?.pizzaToppings?.some(toppingObj => toppingObj.toppingId === topping);
    };

    //this is not currently editting the state
    const handleToppingChange = (event) => {
        debugger;
        const toppingId = parseInt(event.target.value);
        const isChecked = event.target.checked;
        //does it exist already in the pizza?
        const toppingIndex = edittedPizza?.pizzaToppings?.findIndex(toppingObj => toppingObj.toppingId === toppingId);

        if (isChecked) {
            if (toppingIndex === -1) {
                setEdittedPizza(edittedPizza => ({
                    ...edittedPizza,
                    toppings: [...edittedPizza?.pizzaToppings, pizzaToppings.find(topping => topping.id === toppingId)]
                }));
            }
        } else {
            if (toppingIndex !== -1) {
                setEdittedPizza(edittedPizza => ({
                    ...edittedPizza,
                    pizzaToppings: edittedPizza?.pizzaToppings.filter(topping => topping.id !== toppingId)
                }));
            }
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
                            copy.crustId = event.target.value
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
                            copy.sauceId = event.target.value
                            setEdittedPizza(copy)
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
                            copy.cheeseId = event.target.value
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
                                defaultChecked={checkFunction(topping.id)}
                                onChange={handleToppingChange}
                            />
                            <label htmlFor={`topping-${topping.id}`}>{topping.desc}</label>
                        </div>
                    ))}
                </div>
            </fieldset>
            <button className="btn-primary">Save</button>
        </form>
    );
};



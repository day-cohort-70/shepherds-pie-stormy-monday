import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCrusts, getPizzaNotExpanded, getSauces, getToppings, getPizzaToppings, updatePizza, addToppings, DeleteToppings } from "../../services/pizzaService.js";
import { getPizzaById, getToppingsByPizzaId, getToppingsByPizzaIdWithoutExpansion } from "../../services/OrderService.jsx";
import { getCheeses } from "../../services/pizzaService.js";



export const EditPizza = () => {
    const [edittedPizza, setEdittedPizza] = useState({});
    const { pizzaId } = useParams();
    const navigate = useNavigate();
    const [crusts, setCrusts] = useState([]);
    const [sauces, setSauces] = useState([]);
    const [cheeses, setCheeses] = useState([]);
    const [toppings, setToppings] = useState([])
    //all toppings that exist
    const [currentPizza, setCurrentPizza] = useState({})
    const [currentPizzaToppings, setCurrentPizzaToppings] = useState([])
    // const [addedToppings, setAddedToppings] = useState([])
    // const [deletedToppings, setDeletedToppings] = useState([])
    // const [allPizzaToppingsThatExist, setAllPizzaToppingsThatExist] = useState([])

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
        // getPizzaToppings().then((toppingArr)=>{
        //     setAllPizzaToppingsThatExist(toppingArr)
        // })
    }, []);

    useEffect(() => {
        getPizzaById(pizzaId).then((pizzaArr) => {
            const pizzaObj = pizzaArr[0];
            setCurrentPizza(pizzaObj);
            setCurrentPizzaToppings(pizzaObj.pizzaToppings)
        });
    }, [pizzaId]);

    useEffect(() => {
        getPizzaNotExpanded(pizzaId).then((pizzaArr) => {
            const pizzaObj = pizzaArr[0];
            setEdittedPizza(pizzaObj);
        });
    }, [currentPizza])

    // useEffect(() => {
    //     getPizzaToppings().then((pizzaToppingArr) => {
    //         setPizzaToppings(pizzaToppingArr);
    //     });
    // }, [currentPizza]);

    const checkFunction = (topping) => {
        return currentPizzaToppings.some(toppingObj => toppingObj.toppingId === topping);
    };


    const handleToppingChange = async (event) => {
        const toppingId = parseInt(event.target.value);
        const isChecked = event.target.checked;
        //does it exist already in the pizza?
        const toppingIndex = currentPizza.pizzaToppings.findIndex(toppingObj => toppingObj.toppingId === toppingId);

        if (isChecked) {
            if (toppingIndex === -1) {
                const newObj = {
                    // id: Date.now(),
                    pizzaId: parseInt(pizzaId),
                    toppingId: toppingId
                }
                setCurrentPizzaToppings([...currentPizzaToppings, newObj])
            }
            //delete works
        } else {
            if (toppingIndex !== -1) {
                setCurrentPizzaToppings(currentPizzaToppings.filter(toppingObj => toppingObj.toppingId !== toppingId))
                // const newObj = {
                //     id: toppingIndex + 1,
                //     pizzaId: parseInt(pizzaId),
                //     toppingId: toppingId
                // }
                // const copy = [...deletedToppings]
                // console.log(copy)
                // copy.push(newObj)
                // console.log(copy)
            }
        }
    }

    const handleSave = async (e) => {
        e.preventDefault()
        await updatePizza(edittedPizza)
        await CheckToppings()
    }

    const CheckToppings = async () => {
        {
            currentPizzaToppings.map((topping) => {
                toppingIndex = currentPizza.pizzaToppings.findIndex(toppingObj => toppingObj.toppingId === topping.toppingId)
                if (toppingIndex === -1) {
                    addToppings(topping)
                }
            })
        }
        {
            currentPizza.pizzaToppings.map((toppingObj) => {
                toppingIndex = currentPizzaToppings.findIndex(topping => topping.toppingId === toppingObj.toppingId)
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



import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getCrusts, getSauces } from "../../services/pizzaService.js"
import { getPizzaById } from "../../services/OrderService.jsx"
import { getCheeses } from "../../services/pizzaService.js"


export const EditPizza = () => {
    const [edittedPizza, setEdittedPizza] = useState({})
    const { pizzaId } = useParams()
    const navigate = useNavigate()
    const [crusts, setCrusts] = useState([])
    const [sauces, setSauces] = useState([])
    const [cheeses, setCheeses] = useState([])
    //add state for topppings
    const [currentPizza, setCurrentPizza] = useState({})

    useEffect(() => {
        getCrusts().then((crustArr) => {
            setCrusts(crustArr)
        })
        getSauces().then((sauceArr) =>{
            setSauces(sauceArr)
        })
        getCheeses().then((cheeseArr)=>{
            setCheeses(cheeseArr)
        })
    }, [])

    useEffect(() => {
        getPizzaById(pizzaId).then((pizza) =>{
            const pizzaObj = pizza[0]
            setCurrentPizza(pizzaObj)
        })
    }, [pizzaId])

    return (
        <form className="edit-pizza">
            <h2>Edit Pizza</h2>
            <fieldset>
                <div className="form-group">
                    <label>Crust:</label>
                    <select name="crust">
                        debugger
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
                    <select name="sauce">
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
                    <select name="cheese">
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
                {/* add radio buttons for toppings */}
            </fieldset>
        </form>
    )
}
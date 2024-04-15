import { useEffect, useState } from "react"
import { getCheeses, getCrusts, getSauces, getToppings } from "../../services/ingredientService"

export const SalesItems = ({mostPopCrust, mostPopSauce, mostPopCheese, mostPopToppings, totalSales}) => {
    const [crustName, setCrustName] = useState("")
    const [sauceName, setSauceName] = useState("")
    const [cheeseName, setCheeseName] = useState("")
    const [toppingNamesList, setToppingNamesList] = useState("")

    const getAllIngredients = () => {
        getCrusts().then((crustArray) => {
            for (const crust of crustArray) {
                if (mostPopCrust === crust.id){
                    setCrustName(crust.desc)
                }
            }
        })
        getSauces().then((sauceArray) => {
            for (const sauce of sauceArray) {
                if (mostPopSauce === sauce.id){
                    setSauceName(sauce.desc)
                }
            }
        })
        getCheeses().then((cheeseArray) => {
            for (const cheese of cheeseArray) {
             if (mostPopCheese === cheese.id){
                setCheeseName(cheese.desc)
             }   
            }
        })
        getToppings().then((toppingsArray) => {
            let toppingsNames = []
            for (const topping of toppingsArray) {
                for (const toppingId of mostPopToppings) {
                    if (topping.id === toppingId){
                        toppingsNames.push(topping.desc)
                    }
                }
            }
            let formattedToppings = toppingsNames.join(", ")
            setToppingNamesList(formattedToppings)
        })
    }

    useEffect(() => {
        getAllIngredients()
    }, [mostPopCrust, mostPopSauce, mostPopCheese, mostPopToppings])

    if (totalSales === 0){
        return
    }

    return <div>
        <h4>Most popular items this month!</h4>
        <div>
            <li>Sauce: {sauceName}</li>
            <li>Crust: {crustName}</li>
            <li>Cheese: {cheeseName}</li>
            <li>Toppings: {toppingNamesList}</li>
        </div>
    </div>
}
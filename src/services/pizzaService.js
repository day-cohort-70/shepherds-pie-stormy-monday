export const getCrusts = () => {
    return fetch("http://localhost:8088/crusts").then((res) => res.json());
}
export const getSauces = () => {
    return fetch("http://localhost:8088/sauces").then((res) => res.json());
}
export const getCheeses = () => {
    return fetch("http://localhost:8088/cheeses").then((res) => res.json());
}
export const getToppings = () => {
    return fetch("http://localhost:8088/toppings").then((res) => res.json());
}
export const getPizzaNotExpanded = (pizzaId) => {
    return fetch(`http://localhost:8088/pizzas?id=${pizzaId}`).then((res) => res.json());
}
export const getPizzaToppings = () => {
    return fetch("http://localhost:8088/pizzaToppings").then((res) => res.json());
}

export const updatePizza = async (edittedPizza) => {
    return fetch(`http://localhost:8088/pizzas/${edittedPizza.id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(edittedPizza)
        }
    )
}
export const addToppings= async (topping) => {
    return fetch(`http://localhost:8088/pizzaToppings`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "pizzaId": topping.pizzaId,
                "toppingId": topping.toppingId
            })
        }
    )
}

export const DeleteToppings = async (topping) => {
    const deleteOptions = {
        method: "DELETE"
    }
    const response = await fetch(`http://localhost:8088/pizzaToppings/${topping.id}`, deleteOptions)
}
export const DeletePizza = async (pizzaId) => {
    const deleteOptions = {
        method: "DELETE"
    }
    const response = await fetch(`http://localhost:8088/pizzas/${pizzaId}`, deleteOptions)
}

export const addPizza= async (pizza) => {
    return fetch(`http://localhost:8088/pizzas`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
              "orderId": pizza.orderId,
              "crustId": pizza.crust,
             "sauceId": pizza.sauce,
             "cheeseId": pizza.cheese
            })
        }
    )
}

export const addToppingsForAddPizza= async (toppingObj) => {
    return fetch(`http://localhost:8088/pizzaToppings`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                toppingObj
            })
        }
    )
}


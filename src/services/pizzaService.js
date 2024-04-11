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
    return fetch(`http://localhost:8088/pizzas?id=${pizzaId}&_embed=pizzaToppings`).then((res) => res.json());
}

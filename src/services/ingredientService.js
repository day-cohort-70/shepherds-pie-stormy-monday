// Function to fetch toppings
export const getToppings = () => {
    return fetch('http://localhost:8088/toppings')
        .then(response => response.json());
}

// Function to fetch crusts
export const getCrusts = () => {
    return fetch('http://localhost:8088/crusts')
        .then(response => response.json());
}

// Function to fetch cheeses
export const getCheeses = () => {
    return fetch('http://localhost:8088/cheeses')
        .then(response => response.json());
}

// Function to fetch sauces
export const getSauces = () => {
    return fetch('http://localhost:8088/sauces')
        .then(response => response.json());
}

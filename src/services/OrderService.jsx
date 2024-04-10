export const getAllOrdersSortedByTime = async () => {
    return fetch(`http://localhost:8088/orders?_sort=timestamp`).then(res => res.json())
}

export const getOrderByDay = async (midnight, eod) => {
    return fetch(`http://localhost:8088/orders?timestamp_gte=${midnight}&timestamp_lte=${eod}&_sort=timestamp`).then(res => res.json())
}

export const getPizzasByOrderId = (orderId) => {
    return fetch(`http://localhost:8088/pizzas?id=${orderId}&_expand=crust&_expand=cheese&_expand=sauce&_embed=pizzaToppings`).then(res => res.json())
}

export const getToppingsByPizzaId = (pizzaId) => {
    return fetch(`http://localhost:8088/pizzaToppings?pizzaId=${pizzaId}&_expand=topping`).then(res => res.json())
}

export const getPizzaById = (pizzaId) => {
    return fetch(`http://localhost:8088/pizzas?id=${pizzaId}&_expand=crust&_expand=cheese&_expand=sauce&_embed=pizzaToppings`).then(res => res.json())
}

export const getOrderWithOrderId = (orderId) => {
    return fetch(`http://localhost:8088/orders?id=${orderId}`).then(res => res.json())
}

export const updateOrder = async (edittedOrder) => {
    return fetch(`http://localhost:8088/orders/${edittedOrder.id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(edittedOrder)
        }
    )
}
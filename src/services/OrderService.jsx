export const getAllOrders = async () => {
    return fetch (`http://localhost:8088/orders`).then(res => res.json())
}
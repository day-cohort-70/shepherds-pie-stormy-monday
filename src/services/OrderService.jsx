export const getAllOrdersSortedByTime = async () => {
    return fetch (`http://localhost:8088/orders?_sort=timestamp`).then(res => res.json())
}

export const getOrderByDay = async (midnight, eod) => {
    return fetch (`http://localhost:8088/orders?timestamp_gte=${midnight}&timestamp_lte=${eod}&_sort=timestamp`).then(res=>res.json())
}


export const getNextOrderId = async () => {
    let currentOrders = await fetch (`http://localhost:8088/orders`).then(res => res.json());
    return (currentOrders.length+1);
}
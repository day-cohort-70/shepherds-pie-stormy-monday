export const getAllOrdersSortedByTime = async () => {
    return fetch (`http://localhost:8088/orders?_sort=timestamp`).then(res => res.json())
}

export const getOrderByDay = async (midnight, eod) => {
    return fetch (`http://localhost:8088/orders?timestamp_gte=${midnight}&timestamp_lte=${eod}&_sort=timestamp`).then(res=>res.json())
}
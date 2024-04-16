import { useEffect, useState } from "react"

export const SalesTotal = ({totalSales}) => {
    const [salesMessage, setSalesMessage] = useState("")

    useEffect(() => {
        if (totalSales !== 0){
            setSalesMessage(`Total Sales: ${totalSales.toLocaleString("en-US",{style: "currency",currency:"USD"})}`)
        } else {
            setSalesMessage("No Sales This Month")
        }
    }, [totalSales])

    return <div>
        <b>{salesMessage}</b>
    </div>
}
import { useNavigate } from "react-router-dom"
import "./Orders.css"

export const OrdersFilter = ({ setFilterDay, setFilterEOD }) => {
    const navigate = useNavigate()

    const handleDateChange = (event) => {
        console.log(event.target.value)
        const beginning = new Date(event.target.value).getTime()
        console.log(beginning)
        //sets timestamp for beginning of day
        setFilterDay(beginning)
        const end = (beginning + 86399000)
        setFilterEOD(end)
    }

    //function for when calender is cleared
    const handleClear = () => {
        setFilterDay(0)
        setFilterEOD(7266292443815)
    }

    return (
        <div className="filter-bar">
            <button className="btn-primary"
                onClick={() => { navigate('orders/create') }}> New Order </button>

            <div className="dropdown"></div>
            <label htmlFor="filterDay">Filter by Day:</label>
            <input type="date" id="filterDay" name="filterDay"
                onChange={(event) => {
                    event.target.value ? handleDateChange(event)
                        : handleClear()
                }}
            />
        </div>
    )
}
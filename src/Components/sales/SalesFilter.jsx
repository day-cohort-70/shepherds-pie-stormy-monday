export const SalesFilter = ({setChosenMonth}) => {
    return (
        <div>
            <select onChange={(event) => {
                let monthNumber = parseInt(event.target.value)
                setChosenMonth(monthNumber -1)
            }}>
                <option value="0">Select Month</option>
                <option value="1">January</option>
                <option value="2">Febuary</option>
                <option value="3">March</option>
                <option value="4">April</option>
                <option value="5">May</option>
                <option value="6">June</option>
                <option value="7">July</option>
                <option value="8">August</option>
                <option value="9">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>
            </select>
        </div>
    )
}
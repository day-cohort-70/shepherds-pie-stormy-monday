export const OrderOptions = ({ ingredients, transientPizza, handleToppingChange, handleCrustChange, handleCheeseChange, handleSauceChange }) => {
    return (
        <div className="order-options">
            <div>
                <h3>Toppings</h3>
                {ingredients.toppings.map(topping => (
                    <div key={topping.id}>
                        <input
                            type="checkbox"
                            value={topping.id}
                            onChange={handleToppingChange}
                            id={`topping-${topping.id}`}
                            checked={transientPizza.toppings.some(selectedTopping => selectedTopping.id === topping.id)}
                        />
                        <label htmlFor={`topping-${topping.id}`}>{topping.desc}</label>
                    </div>
                ))}
            </div>
            <div>
                <h3>Crust</h3>
                <select onChange={handleCrustChange} value={transientPizza.crust || ''}>
                    <option value="">Select a crust</option>
                    {ingredients.crusts.map(crust => (
                        <option key={crust.id} value={crust.id}>{crust.desc}</option>
                    ))}
                </select>
            </div>
            <div>
                <h3>Cheese</h3>
                <select onChange={handleCheeseChange} value={transientPizza.cheese || ''}>
                    <option value="">Select a cheese</option>
                    {ingredients.cheeses.map(cheese => (
                        <option key={cheese.id} value={cheese.id}>{cheese.desc}</option>
                    ))}
                </select>
            </div>
            <div>
                <h3>Sauce</h3>
                <select onChange={handleSauceChange} value={transientPizza.sauce || ''}>
                    <option value="">Select a sauce</option>
                    {ingredients.sauces.map(sauce => (
                        <option key={sauce.id} value={sauce.id}>{sauce.desc}</option>
                    ))}
                </select>
            </div>
        </div>
    );
};

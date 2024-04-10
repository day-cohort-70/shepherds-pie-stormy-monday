

export const OrderOptions = ({ ingredients, handleToppingChange, handleCrustChange, handleCheeseChange, handleSauceChange }) => {
    return (
        <div>
            <h2>Order Options</h2>
            <div>
                <h3>Toppings</h3>
                {ingredients.toppings.map(topping => (
                    <div key={topping.id}>
                        <input
                            type="checkbox"
                            value={topping.id}
                            onChange={handleToppingChange}
                            id={`topping-${topping.id}`}
                        />
                        <label htmlFor={`topping-${topping.id}`}>{topping.desc}</label>
                    </div>
                ))}
            </div>
            <div>
                <h3>Crust</h3>
                <select onChange={handleCrustChange}>
                    <option value="">Select a crust</option>
                    {ingredients.crusts.map(crust => (
                        <option key={crust.id} value={crust.id}>{crust.desc}</option>
                    ))}
                </select>
            </div>
            <div>
                <h3>Cheese</h3>
                <select onChange={handleCheeseChange}>
                    <option value="">Select a cheese</option>
                    {ingredients.cheeses.map(cheese => (
                        <option key={cheese.id} value={cheese.id}>{cheese.desc}</option>
                    ))}
                </select>
            </div>
            <div>
                <h3>Sauce</h3>
                <select onChange={handleSauceChange}>
                    <option value="">Select a sauce</option>
                    {ingredients.sauces.map(sauce => (
                        <option key={sauce.id} value={sauce.id}>{sauce.desc}</option>
                    ))}
                </select>
            </div>
        </div>
    );
};


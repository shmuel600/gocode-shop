import './Header.css';

const Header = ({ categories, setSelectedCategory, reloadProducts, afterFirstRender }) => {
    return (
        <>
            <nav className="product-filter">
                <h1>GoCode Shop</h1>
                {afterFirstRender &&
                    <div className="sort">
                        <div className="collection-sort">
                            <label>Filter by:</label>
                            <select onChange={(event) => setSelectedCategory(event.target.value)}>
                                <option value="All">All Products</option>
                                {categories.map(
                                    category =>
                                        <option
                                            key={category}
                                            value={category}
                                        >
                                            {category}
                                        </option>
                                )}
                            </select>
                        </div>
                        <div className="collection-sort">
                            <label>Sort by:</label>
                            <select>
                                <option value="/">Featured</option>
                                <option value="/">Best Selling</option>
                                <option value="/">Alphabetically, A-Z</option>
                                <option value="/">Alphabetically, Z-A</option>
                                <option value="/">Price, low to high</option>
                                <option value="/">Price, high to low</option>
                                <option value="/">Date, new to old</option>
                                <option value="/">Date, old to new</option>
                            </select>
                        </div>
                    </div>
                }
            </nav>
            <button onClick={reloadProducts}>Reload Products</button>
        </>
    );
}

export default Header;
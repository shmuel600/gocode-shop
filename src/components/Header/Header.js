import Slider from '@mui/material/Slider';
import { useContext } from 'react';
import { Link } from "react-router-dom";
import CartContext from "../../contexts/CartContext";
import Cart from '../Cart/Cart';
import ToggleText from '../ToggleText/ToggleText';
import './Header.css';

// import Cart from '../Cart/Cart';


const Header = ({ categories, setSelectedCategory, reloadProducts, loadFilters, loading, filterByPrice }) => {
    const { renderToggle, products, openCart, setOpenCart, inCart, total, setLoadFilters } = useContext(CartContext);
    const minPrice = Math.min(...products.map((product) => product.price));
    const maxPrice = Math.max(...products.map((product) => product.price));

    return (
        <>
            {renderToggle && <></>}
            {openCart && <Cart products={products} />}
            <button
                onClick={() => setOpenCart(!openCart)}
                onMouseOver={(e) => {
                    e.preventDefault();
                    setOpenCart(true);
                }}
                className='cart-icon'
            >
                <div className="cart-image"></div>
                <div className="cart-text">
                    <h4>Total: ${total.toFixed(2)}</h4>
                    <h4>In Cart: {inCart}</h4>
                </div>
            </button>
            {/* <br /> */}
            <div className='header'>
                <nav className="product-filter">
                    <h1>
                        GoCode Shop
                    </h1>

                    {loadFilters &&
                        <div>
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
                            <br />
                            <div>
                                <label>Price range:</label>
                                {!loading && <Slider
                                    className="slider"
                                    getAriaLabel={() => 'Price range'}
                                    defaultValue={[minPrice, maxPrice]}
                                    onChange={(event) => {
                                        filterByPrice(event.target.value[0], event.target.value[1]);
                                    }}
                                    valueLabelDisplay="auto"
                                    size='small'
                                    min={minPrice}
                                    max={maxPrice}
                                />}
                            </div>
                        </div>
                    }

                </nav>
                {/* put buttons here to be inside */}
            </div>
            <hr />
            <div className='menu'>
                <Link to={`/`} className='header-btn'>
                    <button className='header-btn' onClick={() => setLoadFilters(true)}>Home</button>
                </Link>
                <button onClick={reloadProducts} className='header-btn' >
                    Reload Products
                </button>
                <ToggleText />
            </div>
            <hr />
        </>
    );
}

export default Header;

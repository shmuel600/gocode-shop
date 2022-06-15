import { useContext } from 'react';
import { Link } from "react-router-dom";
import CartContext from "../../contexts/CartContext";
import Cart from '../Cart/Cart';
import ToggleText from '../ToggleText/ToggleText';
import './Header.css';

const Header = ({ categories, setSelectedCategory, reloadProducts, afterFirstRender }) => {
    const { renderToggle, products, openCart, setOpenCart, inCart, total } = useContext(CartContext);
    return (
        <>
            {renderToggle && <></>}
            {openCart && <Cart products={products} />}
            <button onClick={() => setOpenCart(!openCart)} className='cart-icon' >
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
                        <br />
                    </h1>

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
                {/* put buttons here to be inside */}
            </div>
            <hr />
            <div className='menu'>
                <Link to={`/`} className='header-btn'><button className='header-btn'>Home</button></Link>
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

import { Link } from "react-router-dom";
import './Product.css';
import { useContext, useState } from "react";
import CartContext from "../../contexts/CartContext";

const Product = ({ product }) => {
    const { renderToggle, setRenderToggle, cartProducts, setCartProducts, openCart, setOpenCart } = useContext(CartContext);
    const [howMany, setHowMany] = useState(1);

    const remove = () => {
        product.amount > 1 && product.amount--;
        howMany > 1 && setHowMany(howMany - 1);
    }

    const add = () => {
        product.amount++;
        howMany < 10 && setHowMany(howMany + 1);
    }

    const addAll = () => {
        !cartProducts.includes(product) ?
            setCartProducts([...cartProducts, product])
            : product.amount++;
        setHowMany(1);
        setRenderToggle(!renderToggle);
    }

    return (

        < Link className="product-card" to={`/products${product.id}`} >
            <div className="product-image">
                <img src={product.image} alt="" />
            </div>
            <div className="product-info">
                <h5>{product.title}</h5>
                <h6>${product.price}</h6>
                <br />
            </div>
            <div>
                <button onClick={(e) => {
                    e.preventDefault();
                    remove();
                }}>↓</button>
                <button onClick={(e) => {
                    e.preventDefault();
                    add();
                }}>↑</button>
                <input value={howMany} readOnly />
                <button onClick={(e) => {
                    e.preventDefault();
                    addAll();
                }} >
                    Add To Cart
                </button>
            </div>
        </Link >
    );
}

export default Product;
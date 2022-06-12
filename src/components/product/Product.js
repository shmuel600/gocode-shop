import './Product.css';
import { useContext, useState } from "react";
import CartContext from "../../contexts/CartContext";

const Product = ({ image, title, price }) => {
    const { cartProducts, setCartProducts, setOpenCart } = useContext(CartContext)
    const [howMany, setHowMany] = useState(1);
    const addToCart = [...cartProducts];
    for (let i = 0; i < howMany; i++) {
        addToCart.push({ title, price, image });
    }
    return (
        <div className="product-card">
            <div className="product-image">
                <img src={image} alt="" />
            </div>
            <div className="product-info">
                <h5>{title}</h5>
                <h6>${price}</h6>
                <br />
            </div>
            <div>
                <button onClick={() => howMany > 1 && setHowMany(howMany - 1)}>↓</button>
                <button onClick={() => howMany < 10 && setHowMany(howMany + 1)}>↑</button>
                <input value={howMany} readOnly />
                <button onClick={() => {
                    setOpenCart(true);
                    setCartProducts([...addToCart]);
                }} >
                    Add To Cart
                </button>
            </div>
        </div >);
}

export default Product;
import { useContext } from "react";
import CartContext from "../../contexts/CartContext";
import "./CartProduct.css";

const CartProduct = ({ product }) => {
    const { cartProducts, setCartProducts, setOpenCart } = useContext(CartContext);

    const removeAll = () => {
        product.amount !== 1 && remove();
        product.amount !== 1 && removeAll();
        setCartProducts([...cartProducts]);
        const filter = product.amount === 1 &&
            cartProducts
                .filter((value) => value !== product);
        setCartProducts([...filter]);
        filter.length === 0 && setOpenCart(false);
    }

    const remove = () => {
        product.amount > 1 && product.amount--;
        setCartProducts([...cartProducts]);
    }

    const add = () => {
        product.amount++;
        setCartProducts([...cartProducts]);
    }

    return (
        <div className="cart-product">
            <div className="product-card">
                <div>
                    <img src={product.image} className="cart-product-image" alt="" />
                    <h5>{product.title}</h5>
                    <h6>${product.price}</h6>
                    <br />
                </div>
                <div className="btn">
                    <button onClick={() => { remove(); }}>-</button>
                    <button onClick={() => { add(); }}>+</button>
                    <input value={product.amount} readOnly />
                    <button onClick={() => { removeAll(); }} className="product-img">Remove From Cart</button>
                </div>
            </div>
        </div>
    )
}

export default CartProduct;
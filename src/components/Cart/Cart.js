import { useContext } from "react";
import CartContext from "../../contexts/CartContext";
import CartProduct from "../CartProduct/CartProduct";
import './Cart.css';

// import CartProduct from "../../CartProduct/CartProduct"

const Cart = () => {
    const { openCart, setOpenCart, cartProducts, setCartProducts } = useContext(CartContext);
    return (
        <div
            className="cart-container"
            onMouseLeave={() =>
                setOpenCart(!openCart)}
        >
            <div className="cart">
                {cartProducts.length > 0 &&
                    cartProducts.map((product) => {
                        return (
                            <CartProduct
                                key={product.id}
                                product={product}
                            />
                        )
                    })
                }
                <button
                    className='cart-icon'
                    onClick={() =>
                        setCartProducts(cartProducts.filter((value) => false))}
                >
                    <div className="cart-text">
                        <h4>Clear All</h4>
                    </div>
                </button>
            </div>
        </div >
    )
}

export default Cart;
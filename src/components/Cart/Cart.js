import './Cart.css'
import { useContext } from "react";
import CartProduct from "../CartProduct/CartProduct";
import CartContext from "../../contexts/CartContext";

const Cart = () => {
    const { cartProducts, setCartProducts } = useContext(CartContext);
    return (
        <div className="cart-container">
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
                    className='header-btn cart-icon'
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
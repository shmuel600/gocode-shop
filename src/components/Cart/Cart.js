import './Cart.css'
import { useContext } from "react";
import CartProduct from "../CartProduct/CartProduct";
import CartContext from "../../contexts/CartContext";

const Cart = () => {
    const { cartProducts } = useContext(CartContext);
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
            </div>
        </div>
    )
}

export default Cart;
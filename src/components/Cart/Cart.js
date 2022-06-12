import { useContext } from "react";
import CartContext from "../../contexts/CartContext";

const Cart = () => {
    const { cartProducts, setCartProducts, openCart, setOpenCart } = useContext(CartContext);
    const prices = cartProducts.map((product) => product.price);
    const total = prices.reduce((partialSum, a) => partialSum + a, 0)
    return (
        <section className="cart-container">
            <div className="cart">
                <button onClick={() => setOpenCart(!openCart)}>
                    Close Cart
                </button>
                total: ${total}
                {cartProducts.length > 0 && cartProducts.map((product) => {
                    return (
                        <div key={cartProducts.indexOf(product)} className="product-card">
                            <div>
                                <img src={product.image} className="cart-product-image" alt="" />
                                <h5>{product.title}</h5>
                                <h6>${product.price}</h6>
                                <br />
                            </div>
                            <div>
                                <button
                                    className="product-img"
                                    onClick={() => {
                                        cartProducts.splice(cartProducts.indexOf(product), 1);
                                        setCartProducts([...cartProducts]);
                                        cartProducts.length === 0 && setOpenCart(false);
                                    }}>
                                    Remove From Cart
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}

export default Cart;
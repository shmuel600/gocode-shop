import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import CartContext from "../../contexts/CartContext";
import './Product.css';

const Product = ({ product }) => {
    const { renderToggle, setRenderToggle, cartProducts, setCartProducts } = useContext(CartContext);
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
        < Link
            to={`/products${product.id}`}
            className="product-card card"
        >
            <div className="product-image">
                <img src={product.image} alt="" />
                <div className="content">
                    <div className="description">More Details</div>
                    <div className="btn">
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
                </div>
            </div>
            <div className="product-info">
                <h5>{product.title}</h5>
                <h6>${product.price}</h6>
                <br />
            </div>
            {/* <div className="btn">
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
            </div> */}
        </Link >
    );
}

export default Product;

// <div class="card">
//     <div class="content">
//         <h2 class="title"> </h2>
//         <p class="description"> </p>
//     </div>
// </div> 

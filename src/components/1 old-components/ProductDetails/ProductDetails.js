import Rating from '@mui/material/Rating';
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CartContext from "../../../contexts/CartContext";
import Loader from "../../Loader/Loader";
import './ProductDetails.css';

const ProductDetails = () => {
    const { renderToggle, setRenderToggle, cartProducts, setCartProducts } = useContext(CartContext);
    const [howMany, setHowMany] = useState(1);
    const [product, setProduct] = useState();
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const [rating, setRating] = useState(1);

    useEffect(() => {
        const fetchProducts = () => {
            fetch(`https://fakestoreapi.com/products/${id}`)
                .then((content) => content.json())
                .then((fetchedProduct) => {
                    setProduct(fetchedProduct);
                    setRating(fetchedProduct.rating.rate);
                    setLoading(false);
                    fetchedProduct.amount = 1;
                })
                .catch((error) => {
                    console.log("Server unavailable, try again later");
                    setProduct("Server unavailable, reload products and try again");
                    setLoading(true);
                });
        }
        fetchProducts();
    }, [id]);

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
        <div>
            {loading ?
                <Loader /> :
                <div className="container">
                    <div className="product-details">
                        <img src={product.image} alt="" />
                        <div className="content">
                            <h1>{product.title}</h1>
                            <h3>{product.description}</h3>
                            <h6>{product.category}</h6>
                            <br />
                            <h6>
                                Rating: {product.rating.rate}/5
                                <br />
                                {product.rating.count} users have voted
                            </h6>

                            <Rating
                                readOnly
                                value={rating}
                                precision={0.1}
                                onChange={(event, newValue) => {
                                    setRating(newValue);
                                }}
                            />

                            <h5>${product.price}</h5>
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
                </div>
            }
        </div>
    )
}

export default ProductDetails;
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import './ProductDetails.css'

const ProductDetails = () => {
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        const fetchProducts = () => {
            fetch(`https://fakestoreapi.com/products/${id}`)
                .then((content) => content.json())
                .then((fetchedProduct) => {
                    setProduct(fetchedProduct);
                    setLoading(false);
                })
                .catch((error) => {
                    console.log("Server unavailable, try again later");
                    setLoading(true);
                });
        }
        fetchProducts();
    }, [id]);

    // const fetchProducts = () => {
    //     fetch(`https://fakestoreapi.com/products/${id}`)
    //         .then((content) => content.json())
    //         .then((fetchedProduct) => {
    //             setProduct(fetchedProduct);
    //             setLoading(false);
    //             console.log(fetchedProduct);
    //         })
    //         .catch((error) => {
    //             console.log("Server unavailable, try again later");
    //             setLoading(true);
    //         });
    // }

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
                            <h5>${product.price}</h5>
                            <h6>{product.category}</h6>
                            <br />
                            <h6>
                                Rating: {product.rating.rate}/5
                                <br />
                                {product.rating.count} users have voted
                            </h6>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default ProductDetails;
import { CardActionArea } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import CartContext from "../../contexts/CartContext";
import './Product.css';

const Product = ({ product }) => {
    const { renderToggle, setRenderToggle, cartProducts, setCartProducts, setLoadFilters } = useContext(CartContext);
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
        <>
            < Link
                to={`/products${product.id}`}
                className="disable-link"
                onClick={() => setLoadFilters(false)}
                onMouseOut={(e) => e.target.blur()}
            >
                <Card sx={{ margin: 0.5, minWidth: 260, maxWidth: 260, minHeight: 370, maxHeight: 370, borderRadius: 10 }} className="card">
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
                    <CardActionArea className="product-image">
                        <CardMedia className="media"
                            component="img"
                            height="140"
                            image={product.image}
                            alt="image not found"
                        />
                        <CardContent className="product-info card-content">
                            <Typography gutterBottom variant="h5" component="div" className='title'>
                                {product.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" className='price'>
                                ₪{product.price}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Link>

            {/* < Link
                to={`/products${product.id}`}
                className="product-card card card-size"
                onClick={() => setLoadFilters(false)}
                onMouseOut={(e) => e.target.blur()}
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
            </Link > */}
        </>
    );
}

export default Product;
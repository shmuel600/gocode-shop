import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from '../../components/Loader/Loader';
import Context from "../../contexts/Context";

const ProductDetails = ({ products, loading }) => {
    const { id } = useParams();
    const [product, setProduct] = useState(products[id - 1]);
    const { cartProductsQuantities, changeQuantities } = useContext(Context);
    fetch(`/api/products/${id}`)
        .then((content) => content.json())
        .then((fetchedProduct) => {
            setProduct(fetchedProduct);
        })
        .catch((error) => console.log("Server unavailable, try again later"));

    return (
        <>
            {loading ? <Loader /> :
                <Card sx={{ display: 'flex' }}>
                    <Box sx={{ p: '5%', maxHeight: '70vh', minWidth: '30%', maxWidth: '30%' }}>
                        <CardMedia
                            component="img"
                            sx={{ objectFit: 'contain', margin: '10px' }}
                            image={product.image}
                            alt=""
                        >
                        </CardMedia>
                    </Box>

                    <CardContent
                        sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', px: '6%', pt: '3%', pb: '10%', minHeight: '100%', minWidth: '70%', objectFit: 'contain', backgroundColor: 'whitesmoke' }}
                    >
                        <Typography variant="subtitle2" component="div" sx={{ fontSize: 24 }}>
                            {product.title}
                        </Typography>
                        <Typography variant="subtitle3" component="div" fontSize='16px'>
                            {product.description}
                        </Typography>

                        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '30vh' }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', minHeight: '20vh' }}>
                                <Typography variant="subtitle3" color="text.secondary" component="div">
                                    Rating: {product.rating.rate}/5
                                    <br />
                                    {product.rating.count} users have voted
                                </Typography>
                                <Rating
                                    readOnly
                                    value={product.rating.rate}
                                    precision={0.1}
                                // onChange={(event, newValue) => {
                                //     setRating(newValue);
                                // }}
                                />
                                <Typography component="div" variant="subtitle1" fontSize='24px'>
                                    ₪{product.price}
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', pl: 1, pb: 1, maxWidth: '50%' }}>
                                <ButtonGroup variant="contained" aria-label="outlined primary button group" sx={{ m: 1 }}>
                                    <Button sx={{ p: 0, m: 0 }}>
                                        <Link to={`/products/${product.id > 1 ? product.id - 1 : product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                            <Button>Previous</Button>
                                        </Link>
                                    </Button>
                                    <Button sx={{ p: 0, m: 0 }}>
                                        <Link to={`/products/${product.id < products.length ? product.id + 1 : product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                            <Button>Next</Button>
                                        </Link>
                                    </Button>
                                </ButtonGroup>
                                <ButtonGroup variant="contained" aria-label="outlined primary button group" sx={{ m: 1 }}>
                                    <Button
                                        onClick={() => { changeQuantities(product.id - 1, "-") }}
                                    >
                                        -
                                    </Button>
                                    <Button sx={{ backgroundColor: 'transparent' }} disabled>
                                        {cartProductsQuantities[product.id - 1]}
                                    </Button>
                                    <Button
                                        onClick={() => { changeQuantities(product.id - 1, "+") }}
                                    >
                                        +
                                    </Button>
                                </ButtonGroup>
                            </Box>
                        </Box>
                    </CardContent>
                    <CardContent sx={{ minHeight: '90vh' }}> </CardContent>
                </Card >}
        </>
    )
}

export default ProductDetails;
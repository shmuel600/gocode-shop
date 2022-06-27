import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box } from "@mui/system";
import { useContext } from 'react';
import { Link } from "react-router-dom";
import Context from '../../contexts/Context';

const Product = ({ product }) => {
    const { cartProductsQuantities, changeQuantities, setOnMainPage } = useContext(Context);
    return (
        <>
            <Card sx={{ display: 'flex', alignItems: 'center', width: 400, height: 220, margin: '0.5%' }}>
                <Link to={`products/${product._id}`} style={{ display: 'flex', justifyContent: 'center', textDecoration: 'none', minWidth: '30%', maxWidth: '30%', maxHeight: '170px', margin: '10px' }} onClick={() => setOnMainPage(false)}>
                    <CardMedia
                        component="img"
                        height="140"
                        sx={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                        image={product.image}
                        alt=""
                    />
                </Link>
                <Box sx={{ display: 'flex', flexDirection: 'column', width: 260, height: 220, backgroundColor: '#eeeeee' }}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                        <Typography component="div" variant="subtitle2">
                            {product.title}
                        </Typography>
                        <Typography variant="subtitle2" color="text.secondary" component="div">
                            {product.category}
                        </Typography>
                    </CardContent>
                    <Link to={`products/${product.id}`} style={{ textDecoration: 'none' }} onClick={() => setOnMainPage(false)}>
                        <Typography variant="subtitle2" color="text.secondary" component="div" sx={{ pl: 17, pb: 1 }}>
                            More Details
                        </Typography>
                    </Link>
                    <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', pl: 1, pb: 1 }}>
                        <Typography component="div" variant="subtitle3">
                            ₪{product.price}
                        </Typography>
                        <ButtonGroup variant="contained" aria-label="outlined primary button group">
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
            </Card>
        </>
    )
}

export default Product;
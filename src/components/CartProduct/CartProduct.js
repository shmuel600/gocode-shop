import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box } from "@mui/system";
import { useContext, useState } from 'react';
import Context from '../../contexts/Context';
import RemoveProduct from '@mui/icons-material/DeleteRounded';
import RemoveProductAction from '@mui/icons-material/DeleteForeverRounded';


const CartProduct = ({ product, quantity }) => {
    const { cartProductsQuantities, changeQuantities, removeFromCart } = useContext(Context);
    const [removeProductHover, setRemoveProductHover] = useState(false);

    return (
        <Card sx={{ my: 0.5, mx: 1, border: '1px solid #eeeeee' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', width: 250, height: 80 }}>
                <CardMedia
                    component="img"
                    height="50"
                    sx={{ maxWidth: '10%', maxHeight: '170px', objectFit: 'contain', margin: '10px' }}
                    image={product.image}
                    alt=""
                />
                <Box sx={{ display: 'flex', flexDirection: 'column', width: 250, height: 80, backgroundColor: '#eeeeee', m: 0 }}>
                    <CardContent sx={{ flex: '1 0 auto', m: 0, px: 2, py: 0.5 }}>
                        <Typography component="div" variant="subtitle2" sx={{ fontSize: 12 }}>
                            {product.title}
                        </Typography>
                    </CardContent>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', pl: 1, py: 1, backgroundColor: 'whitesmoke' }}>
                <Box
                    onMouseOver={() => setRemoveProductHover(true)}
                    onMouseLeave={() => setRemoveProductHover(false)}
                    onClick={() => removeFromCart(product.id - 1)}
                >
                    {
                        !removeProductHover ?
                            <Box sx={{ maxWidth: 25, height: 25, color: '#1976d2' }}>
                                <RemoveProduct />
                            </Box>
                            :
                            <Box sx={{ maxWidth: 25, height: 25, color: '#1976d2', cursor: 'pointer' }}>
                                <RemoveProductAction />
                            </Box>
                    }
                </Box>
                <Typography component="div" variant="subtitle3">
                    ₪{product.price * cartProductsQuantities[product.id - 1]}
                </Typography>
                <ButtonGroup variant="contained" aria-label="outlined primary button group" size='small'>
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
        </Card>
    )
}

export default CartProduct;
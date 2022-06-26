import ClearCartAction from '@mui/icons-material/DeleteForeverRounded';
import ClearCart from '@mui/icons-material/DeleteRounded';
import CloseCartAction from '@mui/icons-material/RemoveShoppingCartRounded';
import CartIcon from '@mui/icons-material/ShoppingCartRounded';
import { Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import CartProduct from '../CartProduct/CartProduct';

const Cart = ({ products, inCartQuantity, totalCartCost, cartProductsQuantities, clearCart, openCart, setOpenCart }) => {
    const [clearHover, setClearHover] = useState(false);
    const [closeHover, setCloseHover] = useState(false);

    const drawerWidth = 260;
    const iconColor = 'gray';

    const CartHandle = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
        ({ theme, open }) => ({
            flexGrow: 1,
            padding: theme.spacing(1),
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            position: 'fixed',
            right: 6,
            bottom: 2,
            marginRight: 0,
            zIndex: 1,
            // ...(open && {
            //     transition: theme.transitions.create('margin', {
            //         easing: theme.transitions.easing.easeOut,
            //         duration: theme.transitions.duration.enteringScreen,
            //     }),
            //     marginRight: `${drawerWidth}px`,
            // }),
        }),
    );

    return (
        <>
            <CartHandle open={openCart} onClick={() => setOpenCart(!openCart)}>
                <Box style={{ display: 'flex', flexDirection: 'column' }}>
                    <CartIcon sx={{ fontSize: 45, color: iconColor, cursor: 'pointer' }} />
                    {inCartQuantity > 0 &&
                        <Box sx={{
                            borderRadius: '50%',
                            backgroundColor: '#1976d2',
                            width: 18,
                            height: 18,
                            fontSize: 12,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            color: 'whitesmoke',
                            position: 'absolute',
                            right: 6,
                        }}>
                            {inCartQuantity}
                        </Box>}
                </Box>
            </CartHandle>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        // boxSizing: 'border-box',
                    },
                }}
                anchor="right"
                open={openCart}
                onClose={() => setOpenCart(false)}
            >
                <Box //total cart cost and quantity
                    sx={{ width: drawerWidth, height: 30, display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}
                >
                    <Typography variant="subtitle1">
                        Items: {inCartQuantity}
                    </Typography>
                    <Typography variant="subtitle1">
                        Total: ₪{totalCartCost.toFixed(2)}
                    </Typography>
                </Box>
                <Divider />
                {openCart && //menu: close cart and clear cart products
                    <>
                        <Tooltip title="Close Cart">
                            <Box
                                sx={{ position: 'fixed', bottom: 0, textAlign: 'center', width: drawerWidth / 2, cursor: 'pointer' }}
                                onMouseOver={() => setCloseHover(true)}
                                onMouseLeave={() => setCloseHover(false)}
                                onClick={() => { setOpenCart(false); setCloseHover(false) }}
                            >
                                <Box sx={{ backgroundColor: 'whitesmoke' }}>
                                    <Divider />
                                    {!closeHover ?
                                        <CartIcon sx={{ fontSize: 30, color: iconColor }} /> :
                                        <CloseCartAction sx={{ fontSize: 30, color: iconColor }} />
                                    }
                                </Box>
                            </Box>
                        </Tooltip>
                        <Tooltip title="Empty Cart">
                            <Box
                                sx={{ position: 'fixed', bottom: 0, right: 0, textAlign: 'center', width: drawerWidth / 2, cursor: 'pointer' }}
                                onMouseOver={() => setClearHover(true)}
                                onMouseLeave={() => setClearHover(false)}
                                onClick={() => clearCart()}
                            >
                                <Box sx={{ backgroundColor: 'whitesmoke' }}>
                                    <Divider />
                                    {!clearHover ?
                                        <ClearCart sx={{ fontSize: 30, color: iconColor }} /> :
                                        <ClearCartAction sx={{ fontSize: 30, color: iconColor }} />
                                    }
                                </Box>
                            </Box>
                        </Tooltip>
                    </>
                }
                {products.map((product) =>
                    cartProductsQuantities[product.id - 1] > 0 &&
                    <CartProduct key={product.id} product={product} quantity={cartProductsQuantities[product.id - 1]} />
                )}
            </Drawer>
        </>
    );
}

export default Cart;
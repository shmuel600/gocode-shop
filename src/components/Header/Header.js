import HomeIcon from '@mui/icons-material/HomeRounded';
import AdbIcon from '@mui/icons-material/LocalOffer';
import MenuIcon from '@mui/icons-material/Menu';
import Reload from '@mui/icons-material/RefreshRounded';
import ToggleCart from '@mui/icons-material/ShoppingCartRounded';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Slider from '@mui/material/Slider';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = ({ loading, onMainPage, setOnMainPage, sourceProducts, reloadProducts, openCart, setOpenCart, filterByPrice, filterByCategory, priceRange }) => {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };
    const categories = (
        sourceProducts
            .map(product => product.category)
            .filter(
                (value, index, array) =>
                    array.indexOf(value) === index
            )
    );
    let min, max;
    if (!loading) {
        [[min, max]] = [...priceRange];
    }
    else {
        min = 1;
        max = 1000;
    }

    return (
        <>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            GOCODE SHOP
                        </Typography>

                        {/* header */}
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, marginBottom: 0 }}>
                            <Link to="/" style={{ textDecoration: 'none' }}>
                                <Button
                                    onClick={() => { handleCloseNavMenu(); setOnMainPage(true) }}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <HomeIcon />
                                        Home
                                    </Box>
                                </Button>
                            </Link>
                            <Button
                                onClick={() => { handleCloseNavMenu(); reloadProducts() }}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <Reload />
                                    Reload
                                </Box>
                            </Button>
                            <Button
                                onClick={() => { handleCloseNavMenu(); setOpenCart(!openCart) }}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <ToggleCart />
                                    Cart
                                </Box>
                            </Button>
                        </Box>

                        {/* mobile: */}
                        <>
                            <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' }, fontSize: 12, mr: 2 }}>
                                <IconButton
                                    size="small"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleOpenNavMenu}
                                    color="inherit"
                                >
                                    <MenuIcon />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorElNav}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'left',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left',
                                    }}
                                    open={Boolean(anchorElNav)}
                                    onClose={handleCloseNavMenu}
                                    sx={{
                                        display: { xs: 'block', md: 'none' },
                                    }}
                                >
                                    <MenuItem onClick={() => { handleCloseNavMenu(); setOnMainPage(true) }}>
                                        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                                            <Typography textAlign="center">
                                                Home
                                            </Typography>
                                        </Link>
                                    </MenuItem>
                                    <MenuItem onClick={() => { handleCloseNavMenu(); reloadProducts() }}>
                                        <Typography textAlign="center">
                                            Reload
                                        </Typography>
                                    </MenuItem>
                                </Menu>
                            </Box>
                            {
                                !onMainPage &&
                                <Box sx={{ display: 'flex', m: 2.2 }}>
                                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                                    <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }} onClick={() => { handleCloseNavMenu(); setOnMainPage(true) }}>
                                        <Typography
                                            variant="h5"
                                            noWrap
                                            component="a"
                                            sx={{
                                                display: { xs: 'flex', md: 'none' },
                                                flexGrow: 1,
                                                fontSize: 20,
                                                fontFamily: 'monospace',
                                                fontWeight: 700,
                                                letterSpacing: '.3rem',
                                                color: 'inherit',
                                                textDecoration: 'none',
                                            }}
                                        >
                                            GOCODE SHOP
                                        </Typography>
                                    </Link>
                                </Box>
                            }
                        </>

                        {/* filters and sorts */}
                        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            {onMainPage && // filters and sorts
                                (!loading &&
                                    <>
                                        <Typography sx={{ m: 2, color: 'whitesmoke', fontSize: 13, fontWeight: 500 }}>PRICE</Typography>
                                        <Slider
                                            getAriaLabel={() => 'Price range'}
                                            defaultValue={[1, 1000]}
                                            onChange={(event) => {
                                                filterByPrice(event.target.value[0], event.target.value[1]);
                                            }}
                                            valueLabelDisplay="auto"
                                            size='small'
                                            min={min}
                                            max={max}
                                            // min={Math.min(...sourceProducts.map((product) => product.price))}
                                            // max={Math.max(...sourceProducts.map((product) => product.price))}
                                            sx={{ mr: 4, color: '#1653b4', maxWidth: 140 }}
                                        />
                                        <Typography id="demo-simple-select-standard-label" sx={{ color: 'whitesmoke', fontSize: 13, fontWeight: 500 }}>CATEGORY</Typography>
                                        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }} size="small">
                                            <Select
                                                sx={{ my: 1.5, color: 'whitesmoke', fontSize: 12 }}
                                                // labelId="demo-simple-select-standard-label"
                                                // id="demo-simple-select-standard"
                                                onChange={(event) => filterByCategory(event.target.value)}
                                                // label="Category"
                                                value=""
                                                size="small"
                                            >
                                                <MenuItem value="All">
                                                    <em>All</em>
                                                </MenuItem>
                                                {categories.map((category) =>
                                                    <MenuItem key={category} value={category}>{category}</MenuItem>
                                                )}
                                            </Select>
                                        </FormControl>
                                    </>
                                )
                            }
                        </Box>

                    </Toolbar>
                </Container>
            </AppBar >


        </>
    )
}

export default Header;

// <Link to="/" style={{ textDecoration: 'none' }}>Home</Link>
// {/* <Link to="somewhere" style={{ textDecoration: 'none' }}>somewhere</Link> */ }

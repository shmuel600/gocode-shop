import { CssBaseline } from '@mui/material';
import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Cart from './components/Cart/Cart';
import Header from './components/Header/Header';
import Loader from './components/Loader/Loader';
import ProductDetails from './pages/ProductDetails/ProductDetails';
import Shop from './pages/Shop/Shop';
import Context from './contexts/Context';
import './App.css';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [onMainPage, setOnMainPage] = useState(true);
  const [sourceProducts, setSourceProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [cartProductsQuantities, setCartProductsQuantities] = useState([]);
  const [openCart, setOpenCart] = useState(false);
  const [inCartQuantity, setInCartQuantity] = useState(0);
  const [totalCartCost, setTotalCartCost] = useState(0);
  const [priceRange, setPriceRange] = useState([])

  useEffect(() => {
    fetchProducts();
  }, []);
  const fetchProducts = () => {
    fetch("/api/products")
      .then((content) => content.json())
      .then((fetchedProducts) => {
        setPriceRange([[
          Math.min(...fetchedProducts.map((product) => product.price)),
          Math.max(...fetchedProducts.map((product) => product.price))
        ]]);
        setCartProductsQuantities(fetchedProducts.map((product) => 0));
        setSourceProducts(fetchedProducts);
        setProducts(fetchedProducts);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Server unavailable, try again later");
      })
  }
  const filterByPrice = (min, max) => {
    setProducts(sourceProducts.filter((product) => product.price >= min && product.price <= max));
  }
  const filterByCategory = (selectedCategory) => {
    setProducts(selectedCategory === "All" ?
      sourceProducts :
      sourceProducts.filter(
        (item) => item.category === selectedCategory
      )
    )
  }
  const reloadProducts = () => {
    console.log("Reloading products");
    setLoading(true);
    fetchProducts();
  }
  const changeQuantities = (id, action) => {
    let change = 0;
    change = (action === "+") ? 1 : 0;
    change = (action === "-" && cartProductsQuantities[id] !== 0) ? -1 : change;
    const newQuantities = cartProductsQuantities.map((productQuantity, index) =>
      index === id ? (productQuantity + change) : productQuantity
    );
    setInCartQuantity(
      products
        .map((product) => newQuantities[product.id - 1])
        .reduce((partialSum, a) => partialSum + a, 0)
    )
    setTotalCartCost(
      products
        .map((product) => product.price * newQuantities[product.id - 1])
        .reduce((partialSum, a) => partialSum + a, 0)
    )
    setCartProductsQuantities(newQuantities);
  }
  const clearCart = () => {
    setCartProductsQuantities(sourceProducts.map((product) => 0));
    setInCartQuantity(0);
    setTotalCartCost(0);
  }
  const removeFromCart = (id) => {
    const newQuantities = cartProductsQuantities.map((productQuantity, index) =>
      index === id ? 0 : productQuantity
    );
    setInCartQuantity(
      products
        .map((product) => newQuantities[product.id - 1])
        .reduce((partialSum, a) => partialSum + a, 0)
    )
    setTotalCartCost(
      products
        .map((product) => product.price * newQuantities[product.id - 1])
        .reduce((partialSum, a) => partialSum + a, 0)
    )
    setCartProductsQuantities(newQuantities);
  }

  return (
    <BrowserRouter>
      <CssBaseline />
      <Context.Provider value={{ loading, products, cartProductsQuantities, changeQuantities, setOnMainPage, removeFromCart }}>
        <Cart
          products={products}
          cartProductsQuantities={cartProductsQuantities}
          inCartQuantity={inCartQuantity}
          openCart={openCart}
          setOpenCart={setOpenCart}
          totalCartCost={totalCartCost}
          clearCart={clearCart} />
        <Header
          loading={loading}
          sourceProducts={sourceProducts}
          reloadProducts={reloadProducts}
          openCart={openCart}
          setOpenCart={setOpenCart}
          onMainPage={onMainPage}
          setOnMainPage={setOnMainPage}
          priceRange={priceRange}
          filterByPrice={filterByPrice}
          filterByCategory={filterByCategory} />
        {
          loading ? <Loader /> :
            <Routes>
              <Route path='/' element={<Shop products={products} />} />
              <Route path='/products/:id' element={<ProductDetails products={sourceProducts} />} />
            </Routes>
        }
      </Context.Provider>
    </BrowserRouter>
  )
}

export default App;
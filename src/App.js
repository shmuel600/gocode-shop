import { useEffect, useState } from 'react';
import { Route, Routes } from "react-router-dom";
import './App.css';
import Header from './components/Header/Header';
import Loader from './components/Loader/Loader';
import ProductDetails from './components/ProductDetails/ProductDetails';
import Products from './components/Products/Products';
import CartContext from './contexts/CartContext';

const App = () => {
  const [originalProducts, setOriginalProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [openCart, setOpenCart] = useState(false);
  const [renderToggle, setRenderToggle] = useState(false);
  const [cartProducts, setCartProducts] = useState([]);
  const [loadFilters, setLoadFilters] = useState(true);
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    setLoading(false);
    setSelectedCategory("All");
    fetch("https://fakestoreapi.com/products")
      .then((content) => content.json())
      .then((fetchedProducts) => {
        setOriginalProducts(fetchedProducts);
        setProducts(fetchedProducts);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Server unavailable, trying second server");
        fetch("https://gocode-bituach-yashir.glitch.me/products")
          .then((content) => content.json())
          .then((fetchedProducts) => {
            setOriginalProducts(fetchedProducts);
            setProducts(fetchedProducts);
            setLoading(false);
          })
          .catch((error) => {
            console.log("Server unavailable, try again later");
          })
      });
  }

  const inCart = cartProducts
    .map((product) => product.amount)
    .reduce((partialSum, a) => partialSum + a, 0);

  const total = cartProducts
    .map((product) => product.price * product.amount)
    .reduce((partialSum, a) => partialSum + a, 0);

  const categories = originalProducts
    .map(product => product.category)
    .filter(
      (value, index, array) =>
        array.indexOf(value) === index
    );

  const filter =
    selectedCategory === "All" ?
      products :
      products.filter(
        (item) => item.category === selectedCategory
      );

  const filterByPrice = (min, max) =>
    setProducts(originalProducts.filter((product) => product.price >= min && product.price <= max));

  return (
    <CartContext.Provider value={{
      renderToggle, setRenderToggle, products: originalProducts, setProducts: setOriginalProducts, cartProducts, setCartProducts, openCart, setOpenCart, inCart, total, loadFilters, setLoadFilters
    }}>
      <div className="App">
        <Header
          categories={categories}
          setSelectedCategory={setSelectedCategory}
          reloadProducts={fetchProducts}
          loadFilters={!loading && loadFilters}
          loading={loading}
          filterByPrice={filterByPrice}
        />
        <Routes>
          <Route path={`/`} element={
            !loading ?
              <Products products={filter} /> :
              <Loader />
          } />
          <Route path={`/products:id`} element={<ProductDetails />} />
        </Routes>
      </div>
    </CartContext.Provider>
  )
}

export default App;
import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Products from './components/Products/Products';
import Loader from './components/Loader/Loader';
import CartContext from './contexts/CartContext';
import ProductDetails from './components/ProductDetails/ProductDetails'

const App = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [afterFirstRender, setAfterFirstRender] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [renderToggle, setRenderToggle] = useState(false);
  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    setAfterFirstRender(false);
    setSelectedCategory("All");
    fetch("https://fakestoreapi.com/products")
      .then((content) => content.json())
      .then((fetchedProducts) => {
        setProducts(fetchedProducts);
        setAfterFirstRender(true);
      })
      .catch((error) =>
        console.log("Server unavailable, try again later")
      );
  }

  const inCart = cartProducts
    .map((product) => product.amount)
    .reduce((partialSum, a) => partialSum + a, 0);

  const total = cartProducts
    .map((product) => product.price * product.amount)
    .reduce((partialSum, a) => partialSum + a, 0);

  const categories = products
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

  return (
    <CartContext.Provider value={{ renderToggle, setRenderToggle, products, cartProducts, setCartProducts, openCart, setOpenCart, inCart, total }}>
      <div className="App">
        <Header
          categories={categories}
          setSelectedCategory={setSelectedCategory}
          reloadProducts={fetchProducts}
          afterFirstRender={afterFirstRender}
        />
        <Routes>
          <Route path={`/`} element={
            afterFirstRender ?
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
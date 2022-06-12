import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Products from './components/Products/Products';
import ToggleText from './components/ToggleText/ToggleText';
import Cart from './components/Cart/Cart';
import CartContext from './contexts/CartContext';

const App = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [afterFirstRender, setAfterFirstRender] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [cartProducts, setCartProducts] = useState([])

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
      });
  }

  return (
    <CartContext.Provider value={{ cartProducts, setCartProducts, openCart, setOpenCart }}>
      <div className="App">
        {openCart && <Cart products={products} />}
        <button onClick={() => setOpenCart(!openCart)}>
          {openCart ? "Close Cart" : "Open Cart"}
        </button>
        <Header
          categories={
            products
              .map(product => product.category)
              .filter(
                (value, index, array) =>
                  array.indexOf(value) === index
              )
          }
          setSelectedCategory={setSelectedCategory}
          reloadProducts={fetchProducts}
          afterFirstRender={afterFirstRender}
        />
        <ToggleText />
        {afterFirstRender ?
          <>
            < Products
              products={
                selectedCategory === "All" ?
                  products :
                  products.filter((item) => item.category === selectedCategory)
              }
            />
          </> :
          <div className="flex">
            <div className="loader"></div>
          </div>
        }
      </div>
    </CartContext.Provider>
  )
}

export default App;
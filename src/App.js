import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Products from './components/Products/Products';
import ToggleText from './components/ToggleText/ToggleText';

const App = () => {
  const [originalProducts, setOriginalProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [afterFirstRender, setAfterFirstRender] = useState(false);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((content) => content.json())
      .then((products) => {
        setOriginalProducts(products);
        setFilteredProducts(products);
        setAfterFirstRender(true);
      })
      .catch((error) => {
        console.log("Fetch request failed");
      });
  }, []);

  const categories = originalProducts
    .map(p => p.category)
    .filter(
      (value, index, array) =>
        array.indexOf(value) === index
    );

  const filterByCategory = (selected) => {
    const filter =
      selected === "All" ?
        originalProducts :
        originalProducts.filter((item) => item.category === selected);
    setFilteredProducts(filter);
  };

  return (
    <div className="App">
      {afterFirstRender ?
        <>
          <Header
            categories={categories}
            filterByCategory={filterByCategory}
          />
          <ToggleText />
          < Products
            products={filteredProducts}
          />
        </> :
        <div className="flex">
          <div className="loader"></div>
        </div>
      }
    </div>
  )
}

export default App;
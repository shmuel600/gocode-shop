import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Products from './components/Products/Products';
import ToggleText from './components/ToggleText/ToggleText';

const App = () => {
  const [data, setData] = useState([]);
  const [products, setProducts] = useState(data);
  const [afterFirstRender, setAfterFirstRender] = useState(false);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((content) => content.json())
      .then((array) => {
        setData(array);
        setProducts(array);
        setAfterFirstRender(true);
      });
  }, []);

  const categories = data
    .map(p => p.category)
    .filter(
      (value, index, array) =>
        array.indexOf(value) === index
    );

  const filterByCategory = (selected) => {
    const filter =
      selected === "All" ?
        data :
        data.filter((item) => item.category === selected);
    setProducts(filter);
  };

  return (
    <div className="App">
      <Header
        categories={categories}
        filterByCategory={filterByCategory}
      />
      <ToggleText />
      {afterFirstRender ?
        < Products
          products={products}
        /> :
        <div className="flex">
          <div className="loader"></div>
        </div>

      }
    </div>
  )
}

export default App;
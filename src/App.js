import { useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Products from './components/Products/Products';
import ToggleText from './components/ToggleText/ToggleText';
import data from './data';

const App = () => {
  const categories = data
    .map(p => p.category)
    .filter(
      (value, index, array) =>
        array.indexOf(value) === index
    );
  const [products, setProducts] = useState(data);
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
      <Products
        products={products}
      />
    </div>)
}

export default App;
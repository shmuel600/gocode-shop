import { useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Products from './components/Products/Products';
import ToggleText from './components/ToggleText/ToggleText';
import data from './data';

const App = () => {
  const [products, setProducts] = useState(data);
  const categories = data
    .map(p => p.category)
    .filter(
      (value, index, array) =>
        array.indexOf(value) === index
    );
  function filterCategory(event) {
    const filtered = data.filter((item) =>
      event.target.value === "/" ? item : event.target.value === item.category
    );
    setProducts(filtered);
  }
  return (
    <div className="App">
      <Header categories={categories} filterCategory={filterCategory} />
      <ToggleText />
      <Products products={products} />
    </div>)
}

export default App;


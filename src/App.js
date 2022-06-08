import { useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Products from './components/Products/Products';
import ToggleText from './components/ToggleText/ToggleText';
import data from './data';

const App = () => {
  const [products, setProducts] = useState(data);
  function filterCategory(event) {
    const filtered = data.filter((value) => {
      if (event.target.value === "/")
        return value.category;
      else
        return value.category === event.target.value;
    });
    console.log(filtered);
    setProducts(filtered);
  }
  return (
    <div className="App">
      <Header data={data} filterCategory={filterCategory} />
      <ToggleText />
      <Products products={products} />
    </div>)
}

export default App;


import { useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Products from './components/Products/Products';
import data from './data';

const App = () => {
  const [products, setProducts] = useState(data);
  function filterCategory(event) {
    const filtered = data.filter((value) => value.category === event.target.value);
    console.log(filtered);
    setProducts(filtered);
  }
  return (
    <div className="App">
      <Header data={data} filterCategory={filterCategory} />
      <Products products={products} />
    </div>)
}

export default App;


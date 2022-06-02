import './App.css';
import Header from './components/header/Header';
import Products from './components/products/Products';
import data from './data';

const App = () => {

  return (
    <div className="App">
      <Header />
      <Products products={data} />
    </div>)
}

export default App;

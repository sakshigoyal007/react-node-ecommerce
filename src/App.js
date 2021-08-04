import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductDisplay from './pages/ProductDisplay';
import Header from './components/Header';
import CartPage from './pages/CartPage';


function App() {
  return (
    <Router>
    <div className="App">
      <div className="grid-container">
        <Header/>
        <main>
          
            <div>
            <Route path='/cart' component={CartPage} />
              <Route path='/' exact component={HomePage} />
              <Route path='/product/:id' component={ProductDisplay} />
             
            </div>
        </main>
        <footer className="row center">
          All right reserved
        </footer>
      </div>
    </div>
    </Router>
  );
}

export default App;

import './App.scss';
import ProductList from './components/ProductList';
import {
  Routes,
  Route,
  Link
} from "react-router-dom";
import Cart from './components/Cart';
import { useSelector } from 'react-redux';
import cartSVG from './assets/icons/cart.svg'
import githubSVG from './assets/icons/github.svg'
import { formatCurrency } from './utils';

function App() {
  const cart = useSelector((state) => state.cart);

  const totalItemsInCart = cart.cartItems.reduce((total, { quantity }) => total + quantity, 0)
  return (
    <div className='App'>
      <header className='header'>
        <ul className='nav-bar'>
          <li><a href='https://github.com/Janicecy/ecomm-store' rel="noreferrer" target='_blank'>
            <img src={githubSVG} alt='github' />
          </a></li>
          <li>
            <Link to={'/cart'} className='nav-bar__cart'>
              <img src={cartSVG} alt='cart' />
              {totalItemsInCart} Cart {formatCurrency(cart.subtotal)}
            </Link>
          </li>
        </ul>
      </header>
      <main>
        <Routes>
          <Route path='/' element={<ProductList />} />
          <Route path='/products' element={<ProductList />} />
          <Route path='/cart' element={<Cart />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

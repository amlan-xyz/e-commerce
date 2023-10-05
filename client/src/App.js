import {Routes,Route, NavLink} from 'react-router-dom'

//pages
import { Home } from './pages/Home/Home';
import { Products } from './pages/Products/Products';
import { Cart } from './pages/Cart/Cart';

function App() {
  return (
    <div className="main__container">
        <nav>
          <NavLink to='/'>Home</NavLink>
          <NavLink to='/products'>Products</NavLink>
          <NavLink to='/cart'>Cart</NavLink>
        </nav>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/products' element={<Products/>} />
          <Route path='/cart' element={<Cart/>} />
        </Routes>
    </div>
  );
}

export default App;

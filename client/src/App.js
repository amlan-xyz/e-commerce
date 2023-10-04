import {Routes,Route, NavLink} from 'react-router-dom'

//pages
import { Home } from './pages/Home/Home';
import { Products } from './pages/Products/Products';

function App() {
  return (
    <div className="main__container">
        <nav>
          <NavLink to='/'>Home</NavLink>
          <NavLink to='/products'>Products</NavLink>
        </nav>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/products' element={<Products/>} />
        </Routes>
    </div>
  );
}

export default App;

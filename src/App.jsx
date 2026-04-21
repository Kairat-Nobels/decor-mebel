import './App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Shop from "./pages/Shop/Shop";
import Cart from "./pages/Cart/Cart";
import NotFound from "./pages/NotFound/NotFound";
import 'bootstrap/dist/css/bootstrap.css';
import Product from './pages/Product/Product';
import PrivateRoute from './components/PrivateRoute';
import AdminLayout from './admin/AdminLayout/AdminLayout';
import ReviewsPage from './admin/ReviewsPage/ReviewsPage';
import ItemsPage from './admin/ItemsPage/ItemsPage';
import CategoriesAdmin from './admin/CategoriesAdmin/CategoriesAdmin';
import OrdersPage from './admin/OrdersPage/OrdersPage';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Header />} >
            <Route index element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/shop/:id" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path='/admin' element={
            <PrivateRoute>
              <AdminLayout />
            </PrivateRoute>
          }>
            <Route index path='orders' element={<OrdersPage />} />
            <Route path='reviews' element={<ReviewsPage />} />
            <Route path='items' element={<ItemsPage />} />
            <Route path='categories' element={<CategoriesAdmin />} />
            <Route path='*' element={<NotFound />} />
          </Route>
        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;

import React, { useEffect } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Button } from 'rsuite';
import styles from './adminLayout.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { outAdmin } from '../../store/slices/adminSlice';
import { getItems } from '../../store/slices/itemsSlice';
import { getOrders } from '../../store/slices/ordersSlice';
import { getCategories } from '../../store/slices/categoriesSlice';
import { getReviews } from '../../store/slices/reviewsSlice';

function AdminLayout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { valid } = useSelector(state => state.adminReducer);
  const location = useLocation();

  useEffect(() => {
    if (valid && location.pathname === '/admin') {
      navigate('/admin/orders');
    }
    dispatch(getOrders());
    dispatch(getItems());
    dispatch(getCategories());
    dispatch(getReviews());
  }, [valid, location.pathname, navigate, dispatch]);

  const handleLogout = () => {
    dispatch(outAdmin());
    navigate('/');
  };

  if (!valid) {
    return (
      <div className={styles.notWelcome}>
        <h2>Вы должны войти как администратор</h2>
        <Button appearance="primary" onClick={handleLogout}>Выйти</Button>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className='container'>
        <div className={styles.header}>
          <button className='general-button' onClick={() => navigate('/')}>Главная</button>
          <h2>Администратор</h2>
          <button className='general-button red' appearance="ghost" onClick={handleLogout}>Выйти</button>
        </div>
        <div className={styles.navbar}>
          <NavLink to="/admin/orders" className={({ isActive }) => isActive ? styles.active : ''}>Заказы</NavLink>
          <NavLink to="/admin/reviews" className={({ isActive }) => isActive ? styles.active : ''}>Отзывы</NavLink>
          <NavLink to="/admin/items" className={({ isActive }) => isActive ? styles.active : ''}>Товары</NavLink>
          <NavLink to="/admin/categories" className={({ isActive }) => isActive ? styles.active : ''}>Категории</NavLink>
        </div>
        <div className={styles.content}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;

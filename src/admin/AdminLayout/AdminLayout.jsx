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
import { HiOutlineHome, HiOutlineArrowRightOnRectangle } from 'react-icons/hi2';

function AdminLayout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { valid } = useSelector((state) => state.adminReducer);
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
        <div className={styles.notWelcomeCard}>
          <h2>Вы должны войти как администратор</h2>
          <Button appearance="primary" onClick={handleLogout}>
            Выйти
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className="page-container">
        <div className={styles.shell}>
          <div className={styles.header}>
            <div className={styles.headerInfo}>
              <span className={styles.badge}>Панель управления</span>
              <h1>Администратор</h1>
              <p>Управление заказами, отзывами, товарами и категориями</p>
            </div>

            <div className={styles.headerActions}>
              <button className={styles.secondaryButton} onClick={() => navigate('/')}>
                <HiOutlineHome />
                <span>Главная</span>
              </button>

              <button className={styles.primaryButton} onClick={handleLogout}>
                <HiOutlineArrowRightOnRectangle />
                <span>Выйти</span>
              </button>
            </div>
          </div>

          <div className={styles.navbar}>
            <NavLink
              to="/admin/orders"
              className={({ isActive }) =>
                isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
              }
            >
              Заказы
            </NavLink>

            <NavLink
              to="/admin/reviews"
              className={({ isActive }) =>
                isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
              }
            >
              Отзывы
            </NavLink>

            <NavLink
              to="/admin/items"
              className={({ isActive }) =>
                isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
              }
            >
              Товары
            </NavLink>

            <NavLink
              to="/admin/categories"
              className={({ isActive }) =>
                isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
              }
            >
              Категории
            </NavLink>
          </div>

          <div className={styles.content}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;

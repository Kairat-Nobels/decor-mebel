import React, { useEffect, useMemo, useState } from 'react';
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import logo from "../../assets/images/logo.png";
import "./header.scss";
import { HiShoppingCart } from "react-icons/hi";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import { useDispatch, useSelector } from 'react-redux';
import Connect from '../Connect/Connect';
import Footer from '../Footer/Footer';
import Contact from '../Contact/Contact';
import { getOrders } from '../../store/slices/ordersSlice';
import { getReviews } from '../../store/slices/reviewsSlice';
import CameModal from '../CameModal/CameModal';
import { getItems } from '../../store/slices/itemsSlice';
import { getCategories } from '../../store/slices/categoriesSlice';
import { setCategory } from '../../store/features/filterSlice';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isCatalogOpen, setIsCatalogOpen] = useState(false);
    const [modal, setModal] = useState(false);

    const cart = useSelector((state) => state.cart.cart);
    const { categories } = useSelector((state) => state.categoriesReducer);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        dispatch(getItems());
        dispatch(getReviews());
        dispatch(getOrders());
        dispatch(getCategories());
    }, [dispatch]);

    useEffect(() => {
        setIsMenuOpen(false);
        setIsCatalogOpen(false);
    }, [location.pathname]);

    const totalQuantity = useMemo(() => {
        return cart.reduce((total, item) => total + item.quantity, 0);
    }, [cart]);

    const totalPrice = useMemo(() => {
        return cart.reduce((total, item) => total + Math.round(item.price) * item.quantity, 0);
    }, [cart]);

    const changeCategory = (category) => {
        dispatch(setCategory(category));
        navigate('/shop');
        setIsMenuOpen(false);
        setIsCatalogOpen(false);
    };

    const handleAdminClick = () => {
        if (localStorage.getItem('admin') === "true") {
            navigate('/admin/orders');
        } else {
            setModal(true);
        }
        setIsMenuOpen(false);
    };

    const navLinkClass = ({ isActive }) =>
        isActive ? 'nav-link-item active' : 'nav-link-item';

    return (
        <>
            <header className="site-header">
                <div className="topbar">
                    <div className="page-container">
                        <p>Стильная мебель для вашего дома</p>
                    </div>
                </div>

                <div className="page-container">
                    <div className="header-main">
                        <div className="header-brand">
                            <Link to="/" className="logo-link" aria-label="На главную">
                                <img src={logo} alt="Mebel Decor" />
                            </Link>
                        </div>

                        <nav className="desktop-nav" aria-label="Основная навигация">
                            <NavLink to="/" className={navLinkClass}>
                                Главная
                            </NavLink>
                            <NavLink to="/shop" className={navLinkClass}>
                                Магазин
                            </NavLink>

                            <div
                                className={`catalog-dropdown ${isCatalogOpen ? 'open' : ''}`}
                                onMouseEnter={() => setIsCatalogOpen(true)}
                                onMouseLeave={() => setIsCatalogOpen(false)}
                            >
                                <button
                                    className="catalog-trigger"
                                    type="button"
                                    onClick={() => setIsCatalogOpen((prev) => !prev)}
                                >
                                    <HiOutlineSquares2X2 />
                                    Категории
                                </button>

                                <div className="catalog-menu">
                                    <button
                                        type="button"
                                        className="catalog-item"
                                        onClick={() => changeCategory('All')}
                                    >
                                        Все товары
                                    </button>

                                    {categories.map((category) => (
                                        <button
                                            key={category.id}
                                            type="button"
                                            className="catalog-item"
                                            onClick={() => changeCategory(category.name)}
                                        >
                                            {category.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </nav>

                        <div className="header-actions">
                            <button
                                type="button"
                                className="admin-button"
                                onClick={handleAdminClick}
                            >
                                Admin
                            </button>

                            <Link to="/cart" className="cart-button" aria-label="Корзина">
                                <div className="cart-icon-wrap">
                                    <HiShoppingCart />
                                    {totalQuantity > 0 && (
                                        <span className="cart-count">{totalQuantity}</span>
                                    )}
                                </div>
                                <div className="cart-info">
                                    <span className="cart-label">Корзина</span>
                                    <span className="cart-price">{totalPrice}.00 сом</span>
                                </div>
                            </Link>

                            <button
                                type="button"
                                className="mobile-menu-button"
                                aria-label={isMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
                                onClick={() => setIsMenuOpen((prev) => !prev)}
                            >
                                {isMenuOpen ? <IoCloseSharp /> : <GiHamburgerMenu />}
                            </button>
                        </div>
                    </div>
                </div>

                <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
                    <div className="page-container">
                        <div className="mobile-menu-content">
                            <nav className="mobile-nav" aria-label="Мобильная навигация">
                                <NavLink
                                    to="/"
                                    className={navLinkClass}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Главная
                                </NavLink>

                                <NavLink
                                    to="/shop"
                                    className={navLinkClass}
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Магазин
                                </NavLink>
                            </nav>

                            <div className="mobile-categories">
                                <p className="mobile-title">Категории</p>

                                <button
                                    type="button"
                                    className="mobile-category-btn"
                                    onClick={() => changeCategory('All')}
                                >
                                    Все товары
                                </button>

                                {categories.map((category) => (
                                    <button
                                        key={category.id}
                                        type="button"
                                        className="mobile-category-btn"
                                        onClick={() => changeCategory(category.name)}
                                    >
                                        {category.name}
                                    </button>
                                ))}
                            </div>

                            <button
                                type="button"
                                className="mobile-admin-button"
                                onClick={handleAdminClick}
                            >
                                Перейти в админку
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {modal && <CameModal setModal={setModal} />}

            <main>
                <Outlet />
            </main>

            <Connect />
            <Contact />
            <Footer />
        </>
    );
};

export default Header;

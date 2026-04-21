import React, { useEffect, useMemo, useState } from 'react';
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import logo from "../../assets/images/logo.png";
import "./header.scss";
import { HiShoppingCart } from "react-icons/hi";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../Footer/Footer';
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
        if (localStorage.getItem('admin') === 'true') {
            navigate('/admin/orders');
        } else {
            setModal(true);
        }
        setIsMenuOpen(false);
    };

    const navLinkClass = ({ isActive }) =>
        isActive ? 'main-nav__link active' : 'main-nav__link';

    return (
        <>
            <header className="site-header">
                <div className="header-top-line">
                    <div className="page-container">
                        <p>Новая коллекция мебели для современного интерьера</p>
                    </div>
                </div>

                <div className="page-container">
                    <div className="header-shell">
                        <Link to="/" className="brand-block">
                            <div className="brand-logo">
                                <img src={logo} alt="Decor Mebel" />
                            </div>
                            <div className="brand-text">
                                <span className="brand-title">Decor Mebel</span>
                                <span className="brand-subtitle">уют, стиль, комфорт</span>
                            </div>
                        </Link>

                        <nav className="main-nav">
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
                                    type="button"
                                    className="catalog-dropdown__trigger"
                                    onClick={() => setIsCatalogOpen((prev) => !prev)}
                                >
                                    <HiOutlineSquares2X2 />
                                    <span>Категории</span>
                                </button>

                                <div className="catalog-dropdown__menu">
                                    <button
                                        type="button"
                                        className="catalog-dropdown__item"
                                        onClick={() => changeCategory('All')}
                                    >
                                        Все товары
                                    </button>

                                    {categories.map((category) => (
                                        <button
                                            key={category.id}
                                            type="button"
                                            className="catalog-dropdown__item"
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
                                className="admin-btn"
                                onClick={handleAdminClick}
                            >
                                Admin
                            </button>

                            <Link to="/cart" className="cart-btn">
                                <div className="cart-btn__icon">
                                    <HiShoppingCart />
                                    {totalQuantity > 0 && (
                                        <span className="cart-btn__count">{totalQuantity}</span>
                                    )}
                                </div>

                                <div className="cart-btn__info">
                                    <span className="cart-btn__label">Корзина</span>
                                    <span className="cart-btn__price">{totalPrice}.00 сом</span>
                                </div>
                            </Link>

                            <button
                                type="button"
                                className="burger-btn"
                                onClick={() => setIsMenuOpen((prev) => !prev)}
                            >
                                {isMenuOpen ? <IoCloseSharp /> : <GiHamburgerMenu />}
                            </button>
                        </div>
                    </div>
                </div>

                <div className={`mobile-panel ${isMenuOpen ? 'open' : ''}`}>
                    <div className="page-container">
                        <div className="mobile-panel__content">
                            <nav className="mobile-nav">
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
                                <p className="mobile-categories__title">Категории</p>

                                <button
                                    type="button"
                                    className="mobile-categories__btn"
                                    onClick={() => changeCategory('All')}
                                >
                                    Все товары
                                </button>

                                {categories.map((category) => (
                                    <button
                                        key={category.id}
                                        type="button"
                                        className="mobile-categories__btn"
                                        onClick={() => changeCategory(category.name)}
                                    >
                                        {category.name}
                                    </button>
                                ))}
                            </div>

                            <button
                                type="button"
                                className="mobile-admin-btn"
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

            <Footer />
        </>
    );
};

export default Header;

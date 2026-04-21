import React, { useEffect, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../store/features/cartSlice';
import { HiOutlineArrowNarrowLeft, HiShoppingCart } from 'react-icons/hi';
import { FaCheckCircle } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi2';
import Spinner from '../../components/Spinner/Spinner';
import './product.scss';

const Product = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const { items, loading, error } = useSelector((state) => state.itemsReducer);

    const product = useMemo(() => {
        return items.find((item) => +item.id === +id);
    }, [id, items]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (loading) {
        return (
            <div className="product-page page-container">
                <div className="product-state-box">
                    <Spinner />
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="product-page page-container">
                <div className="product-state-box product-state-box--error">
                    <p>😕 Ошибка: {error}</p>
                    <span>Проверьте интернет и обновите страницу</span>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="product-page page-container">
                <div className="product-state-box">
                    <p>Товар не найден</p>
                    <span>Возможно, он был удалён или ссылка неверная</span>
                </div>
            </div>
        );
    }

    return (
        <div className="product-page">
            <div className="page-container">
                <div className="product-page__back">
                    <Link to="/shop">
                        <HiOutlineArrowNarrowLeft />
                        <span>Вернуться в магазин</span>
                    </Link>
                </div>

                <section className="product-hero">
                    <div className="product-hero__gallery">
                        <div className="product-image-card">
                            <img src={product.image} alt={product.title} />
                            {product.oldPrice && (
                                <span className="product-image-card__badge">Акция</span>
                            )}
                        </div>
                    </div>

                    <div className="product-hero__info">
                        <div className="product-label">
                            <HiSparkles />
                            <span>{product.category}</span>
                        </div>

                        <h1>{product.title}</h1>

                        <p className="product-description">
                            {product.content ||
                                'Современная мебель для комфортного и стильного интерьера. Практичное решение для дома, которое сочетает удобство, качество и аккуратный внешний вид.'}
                        </p>

                        <div className="product-prices-box">
                            {product.oldPrice ? (
                                <>
                                    <del>{product.oldPrice}.00 сом</del>
                                    <span>{product.price}.00 сом</span>
                                </>
                            ) : (
                                <span>{product.price}.00 сом</span>
                            )}
                        </div>

                        <div className="product-benefits">
                            <div className="product-benefits__item">
                                <FaCheckCircle />
                                <span>Современный дизайн</span>
                            </div>
                            <div className="product-benefits__item">
                                <FaCheckCircle />
                                <span>Качественные материалы</span>
                            </div>
                            <div className="product-benefits__item">
                                <FaCheckCircle />
                                <span>Удобная доставка</span>
                            </div>
                        </div>

                        <div className="product-actions">
                            <button
                                type="button"
                                className="product-buy-btn"
                                onClick={() => dispatch(addToCart(product))}
                            >
                                <HiShoppingCart />
                                <span>Добавить в корзину</span>
                            </button>

                            <Link to="/cart" className="product-cart-link">
                                Перейти в корзину
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Product;

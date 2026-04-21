import React, { useMemo } from 'react';
import './home.scss';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaArrowRight, FaStar, FaTruck, FaShieldAlt, FaCouch, FaHeadset } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi2';

const Home = () => {
    const navigate = useNavigate();

    const { categories = [] } = useSelector((state) => state.categoriesReducer);
    const { items = [] } = useSelector((state) => state.itemsReducer);
    const { reviews = [] } = useSelector((state) => state.reviewsReducer);

    const featuredProducts = useMemo(() => {
        return [...items].slice(0, 6);
    }, [items]);

    const visibleReviews = useMemo(() => {
        return [...reviews].slice(0, 6);
    }, [reviews]);

    const openCategory = (categoryName) => {
        navigate('/shop');
    };

    const openProduct = (id) => {
        navigate(`/shop/${id}`);
    };

    return (
        <div className="home-page">
            <section className="home-hero">
                <div className="page-container">
                    <div className="home-hero__content">
                        <div className="home-hero__left">
                            <div className="hero-badge">
                                <HiSparkles />
                                <span>Новый взгляд на интерьер</span>
                            </div>

                            <h1>
                                Мебель,
                                <br />
                                которая делает
                                <br />
                                дом красивее
                            </h1>

                            <p>
                                Современные решения для спальни, гостиной, кухни и рабочего
                                пространства. Выбирайте мебель, которая сочетает стиль,
                                комфорт и удобство на каждый день.
                            </p>

                            <div className="home-hero__buttons">
                                <button
                                    className="hero-primary-btn"
                                    onClick={() => navigate('/shop')}
                                >
                                    Перейти в каталог
                                    <FaArrowRight />
                                </button>

                                <button
                                    className="hero-secondary-btn"
                                    onClick={() => {
                                        const section = document.getElementById('popular-products');
                                        if (section) {
                                            section.scrollIntoView({ behavior: 'smooth' });
                                        }
                                    }}
                                >
                                    Смотреть популярное
                                </button>
                            </div>

                            <div className="home-hero__stats">
                                <div className="hero-stat-card">
                                    <h3>500+</h3>
                                    <p>товаров в каталоге</p>
                                </div>
                                <div className="hero-stat-card">
                                    <h3>24/7</h3>
                                    <p>поддержка клиентов</p>
                                </div>
                                <div className="hero-stat-card">
                                    <h3>4.9</h3>
                                    <p>средняя оценка</p>
                                </div>
                            </div>
                        </div>

                        <div className="home-hero__right">
                            <div className="hero-image-card hero-image-card--main">
                                <img
                                    src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80"
                                    alt="Современная мебель"
                                />
                            </div>

                            <div className="hero-floating-card hero-floating-card--top">
                                <span>Премиальный дизайн</span>
                            </div>

                            <div className="hero-floating-card hero-floating-card--bottom">
                                <span>Доставка и сборка</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="home-categories">
                <div className="page-container">
                    <div className="section-heading">
                        <span className="section-badge">Категории</span>
                        <h2>Подберите мебель под свой интерьер</h2>
                        <p>
                            Популярные направления, чтобы быстро найти подходящие товары для
                            дома и офиса.
                        </p>
                    </div>

                    <div className="categories-grid">
                        {categories.length > 0 ? (
                            categories.slice(0, 6).map((category, index) => (
                                <button
                                    key={category.id}
                                    className={`category-card category-card--${(index % 6) + 1}`}
                                    onClick={() => openCategory(category.name)}
                                >
                                    <div className="category-card__content">
                                        <span className="category-card__label">Категория</span>
                                        <h3>{category.name}</h3>
                                        <p>Смотреть товары</p>
                                    </div>
                                </button>
                            ))
                        ) : (
                            <>
                                <div className="category-card category-card--1">
                                    <div className="category-card__content">
                                        <span className="category-card__label">Категория</span>
                                        <h3>Диваны</h3>
                                        <p>Смотреть товары</p>
                                    </div>
                                </div>
                                <div className="category-card category-card--2">
                                    <div className="category-card__content">
                                        <span className="category-card__label">Категория</span>
                                        <h3>Стулья</h3>
                                        <p>Смотреть товары</p>
                                    </div>
                                </div>
                                <div className="category-card category-card--3">
                                    <div className="category-card__content">
                                        <span className="category-card__label">Категория</span>
                                        <h3>Столы</h3>
                                        <p>Смотреть товары</p>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </section>

            <section className="home-benefits">
                <div className="page-container">
                    <div className="section-heading section-heading--center">
                        <span className="section-badge">Преимущества</span>
                        <h2>Почему выбирают наш магазин</h2>
                    </div>

                    <div className="benefits-grid">
                        <div className="benefit-card">
                            <div className="benefit-card__icon">
                                <FaTruck />
                            </div>
                            <h3>Быстрая доставка</h3>
                            <p>
                                Оперативная доставка по городу и удобные условия получения
                                заказа.
                            </p>
                        </div>

                        <div className="benefit-card">
                            <div className="benefit-card__icon">
                                <FaShieldAlt />
                            </div>
                            <h3>Надёжное качество</h3>
                            <p>
                                Подбираем мебель из качественных материалов для ежедневного
                                использования.
                            </p>
                        </div>

                        <div className="benefit-card">
                            <div className="benefit-card__icon">
                                <FaCouch />
                            </div>
                            <h3>Современный стиль</h3>
                            <p>
                                Актуальные модели для уютного, светлого и красивого интерьера.
                            </p>
                        </div>

                        <div className="benefit-card">
                            <div className="benefit-card__icon">
                                <FaHeadset />
                            </div>
                            <h3>Поддержка клиентов</h3>
                            <p>
                                Поможем подобрать товар, ответим на вопросы и подскажем лучшее
                                решение.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="home-banner">
                <div className="page-container">
                    <div className="home-banner__content">
                        <div className="home-banner__text">
                            <span className="section-badge">Новая коллекция</span>
                            <h2>Создайте пространство, в которое хочется возвращаться</h2>
                            <p>
                                Элегантная мебель для тех, кто ценит комфорт, чистый дизайн и
                                приятную атмосферу дома.
                            </p>
                            <button onClick={() => navigate('/shop')}>
                                Открыть каталог
                            </button>
                        </div>

                        <div className="home-banner__image">
                            <img
                                src="https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1200&q=80"
                                alt="Интерьер комнаты"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section className="home-products" id="popular-products">
                <div className="page-container">
                    <div className="section-heading">
                        <span className="section-badge">Популярное</span>
                        <h2>Товары, которые выбирают чаще всего</h2>
                        <p>
                            Подборка мебели, которая хорошо подойдёт для современного дома.
                        </p>
                    </div>

                    <div className="products-grid">
                        {featuredProducts.length > 0 ? (
                            featuredProducts.map((item) => (
                                <div
                                    className="product-card"
                                    key={item.id}
                                    onClick={() => openProduct(item.id)}
                                >
                                    <div className="product-card__image">
                                        <img src={item.image} alt={item.title} />
                                    </div>

                                    <div className="product-card__body">
                                        <span className="product-card__category">
                                            {item.category || 'Мебель'}
                                        </span>
                                        <h3>{item.title}</h3>
                                        <div className="product-card__bottom">
                                            <p>{Math.round(item.price)} сом</p>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    openProduct(item.id);
                                                }}
                                            >
                                                Подробнее
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="empty-state">
                                <p>Товары пока не загружены.</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            <section className="home-reviews">
                <div className="page-container">
                    <div className="section-heading section-heading--center">
                        <span className="section-badge">Отзывы</span>
                        <h2>Что говорят наши клиенты</h2>
                        <p>
                            Реальные комментарии покупателей, загруженные из backend.
                        </p>
                    </div>

                    <div className="reviews-slider">
                        {visibleReviews.length > 0 ? (
                            visibleReviews.map((review) => (
                                <div className="review-card" key={review.id}>
                                    <div className="review-card__stars">
                                        <FaStar />
                                        <FaStar />
                                        <FaStar />
                                        <FaStar />
                                        <FaStar />
                                    </div>
                                    <p className="review-card__text">
                                        {review.comment}
                                    </p>
                                    <h4>{review.name}</h4>
                                </div>
                            ))
                        ) : (
                            <div className="empty-state">
                                <p>Отзывы пока не загружены.</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;

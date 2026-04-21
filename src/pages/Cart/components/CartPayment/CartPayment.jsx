import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import CartItem from '../CartItem/CartItem';
import { HiOutlineArrowNarrowLeft, HiShoppingCart } from 'react-icons/hi';
import { FaTag, FaCheckCircle } from 'react-icons/fa';
import PaymentModal from '../PaymentModal/PaymentModal';
import './cartPayment.scss';
import { createOrder } from '../../../../store/slices/ordersSlice';

const CartPayment = () => {
    const cart = useSelector((state) => state.cart.cart);
    const dispatch = useDispatch();

    const [promo, setPromo] = useState('');
    const [promoApplied, setPromoApplied] = useState(false);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [delivery, setDelivery] = useState(false);
    const [address, setAddress] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [isValid, setIsValid] = useState(false);

    const discount = promoApplied ? 0.2 : 0;

    const getTotalQuantity = () =>
        cart.reduce((sum, item) => sum + item.quantity, 0);

    const getTotalPrice = () =>
        cart.reduce((sum, item) => sum + Math.round(item.price) * item.quantity, 0);

    const getDiscountedPrice = () =>
        Math.round(getTotalPrice() * (1 - discount));

    const handlePromoApply = (e) => {
        e.preventDefault();

        if (promo.trim().toLowerCase() === 'grilish') {
            setPromoApplied(true);
        } else {
            setPromoApplied(false);
            alert('Промокод неверный');
        }
    };

    const handleCheckout = (e) => {
        e.preventDefault();

        if (!name || !phone || (delivery && !address)) {
            alert('Пожалуйста, заполните все поля');
            return;
        }

        if (!isValid) {
            alert('Неверный номер телефона');
            return;
        }

        const orderData = {
            order: cart.map((item) => ({
                id: item.id,
                title: item.title,
                quantity: item.quantity,
                price: item.price,
            })),
            date: new Date().toISOString(),
            name,
            phone,
            address: delivery ? address : '',
            amount: getDiscountedPrice(),
            status: 'Заказано',
        };

        dispatch(createOrder(orderData));
        setShowModal(true);
    };

    const handlePhoneNumberChange = (event) => {
        let input = event.target.value.replace(/\D/g, '');

        if (!/^(2\d{2}|5\d{2}|7\d{2}|9\d{2})\d{6}$/.test(input)) {
            setIsValid(false);
            setPhone(input);
            return;
        }

        input = input.replace(/^(\d{3})(\d{3})(\d{3})$/, '($1)-$2-$3');
        setIsValid(/^\(\d{3}\)-\d{3}-\d{3}$/.test(input));
        setPhone(input);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div className="cart-payment-page">
            <div className="page-container">
                <div className="cart-payment-page__back">
                    <Link to="/shop">
                        <HiOutlineArrowNarrowLeft />
                        <span>Вернуться в магазин</span>
                    </Link>
                </div>

                <div className="cart-payment-layout">
                    <section className="cart-products-card">
                        <div className="cart-products-card__head">
                            <div>
                                <div className="cart-page-badge">
                                    <HiShoppingCart />
                                    <span>Корзина</span>
                                </div>
                                <h1>Ваши товары</h1>
                            </div>

                            <div className="cart-products-card__count">
                                {getTotalQuantity()} товаров
                            </div>
                        </div>

                        {cart.length === 0 ? (
                            <div className="cart-empty-state">
                                <h3>Корзина пуста</h3>
                                <p>Добавьте понравившиеся товары, чтобы оформить заказ.</p>
                                <Link to="/shop" className="cart-empty-state__link">
                                    Перейти в магазин
                                </Link>
                            </div>
                        ) : (
                            <div className="cart-products-list">
                                {cart.map((item) => (
                                    <CartItem
                                        key={item.id}
                                        item={item}
                                        quantity={item.quantity}
                                        image={item.image}
                                        title={item.title}
                                        category={item.category}
                                        price={item.price}
                                    />
                                ))}
                            </div>
                        )}
                    </section>

                    <aside className="cart-summary-card">
                        <div className="cart-summary-card__head">
                            <h2>Оформление заказа</h2>
                            <p>Заполните данные и перейдите к оплате</p>
                        </div>

                        {cart.length === 0 ? (
                            <div className="cart-summary-empty">
                                <p>Добавьте товары в корзину для оформления заказа</p>
                            </div>
                        ) : (
                            <form className="checkout-form" onSubmit={handleCheckout}>
                                <div className="checkout-form__group">
                                    <label>Имя</label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Введите имя"
                                        required
                                    />
                                </div>

                                <div className="checkout-form__group">
                                    <label>Телефон</label>
                                    <input
                                        type="tel"
                                        value={phone}
                                        onChange={handlePhoneNumberChange}
                                        placeholder="Например: (700)-123-456"
                                        required
                                    />
                                    {!isValid && phone.length > 0 && (
                                        <span className="checkout-form__error">
                                            Неверный номер телефона
                                        </span>
                                    )}
                                </div>

                                <label className="checkout-checkbox">
                                    <input
                                        type="checkbox"
                                        checked={delivery}
                                        onChange={(e) => setDelivery(e.target.checked)}
                                    />
                                    <span>Нужна доставка</span>
                                </label>

                                {delivery && (
                                    <div className="checkout-form__group">
                                        <label>Адрес доставки</label>
                                        <input
                                            type="text"
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                            placeholder="Введите адрес"
                                            required={delivery}
                                        />
                                    </div>
                                )}

                                <div className="promo-box">
                                    <div className="promo-box__label">
                                        <FaTag />
                                        <span>Промокод</span>
                                    </div>

                                    <div className="promo-box__controls">
                                        <input
                                            type="text"
                                            value={promo}
                                            onChange={(e) => setPromo(e.target.value)}
                                            placeholder="Введите промокод"
                                            disabled={promoApplied}
                                        />
                                        <button
                                            type="button"
                                            onClick={handlePromoApply}
                                            disabled={promoApplied}
                                        >
                                            Применить
                                        </button>
                                    </div>

                                    {promoApplied && (
                                        <div className="promo-box__success">
                                            <FaCheckCircle />
                                            <span>Промокод применён! Скидка 20%</span>
                                        </div>
                                    )}
                                </div>

                                <div className="summary-totals">
                                    <div className="summary-row">
                                        <span>Товаров</span>
                                        <strong>{getTotalQuantity()}</strong>
                                    </div>

                                    <div className="summary-row">
                                        <span>Сумма</span>
                                        <strong>{getTotalPrice()} сом</strong>
                                    </div>

                                    {promoApplied && (
                                        <div className="summary-row summary-row--discount">
                                            <span>Скидка</span>
                                            <strong>-20%</strong>
                                        </div>
                                    )}

                                    <div className="summary-row summary-row--total">
                                        <span>Итого</span>
                                        <div className="summary-total-price">
                                            {promoApplied && (
                                                <del>{getTotalPrice()} сом</del>
                                            )}
                                            <strong>{getDiscountedPrice()} сом</strong>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="checkout-submit-btn"
                                    disabled={
                                        !name ||
                                        !phone ||
                                        !isValid ||
                                        (delivery && !address)
                                    }
                                >
                                    Перейти к оплате
                                </button>
                            </form>
                        )}
                    </aside>
                </div>
            </div>

            <PaymentModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                promoApplied={promoApplied}
                discount={discount}
            />
        </div>
    );
};

export default CartPayment;

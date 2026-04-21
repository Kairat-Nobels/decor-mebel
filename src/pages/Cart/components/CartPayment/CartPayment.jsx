import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import CartItem from '../CartItem/CartItem';
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import PaymentModal from '../PaymentModal/PaymentModal';
import "./cartPayment.scss";
import { createOrder } from '../../../../store/slices/ordersSlice';

const CartPayment = () => {
    const cart = useSelector((state) => state.cart.cart);
    const dispatch = useDispatch();

    // Состояния для формы
    const [promo, setPromo] = useState('');
    const [promoApplied, setPromoApplied] = useState(false);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [delivery, setDelivery] = useState(false);
    const [address, setAddress] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [isValid, setIsValid] = useState(false);

    // Скидка по промокоду
    const discount = promoApplied ? 0.2 : 0;

    const getTotalQuantity = () => cart.reduce((sum, item) => sum + item.quantity, 0);

    const getTotalPrice = () => cart.reduce((sum, item) => sum + Math.round(item.price) * item.quantity, 0);

    const getDiscountedPrice = () => Math.round(getTotalPrice() * (1 - discount));

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
            order: cart.map(item => ({
                id: item.id,
                title: item.title,
                quantity: item.quantity,
                price: item.price
            })),
            date: new Date().toISOString(),
            name,
            phone,
            address: delivery ? address : "",
            amount: getDiscountedPrice(),
            status: "Заказано"
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

    return (
        <div className="cart-payment">
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12">
                        <div className="card card-registration card-registration-2" style={{ borderRadius: "15px" }}>
                            <div className="card-body p-0">
                                <div className="row g-0">
                                    <div className="col-lg-8">
                                        <div className="p-5">
                                            <div className="cart-head d-flex justify-content-between align-items-center mb-5">
                                                <h1 className="fw-bold mb-0 text-black">Корзина</h1>
                                                <h6 className="mb-0 text-muted">{getTotalQuantity()} товаров</h6>
                                            </div>
                                            <div className={`cart-products ${cart.length === 0 ? "empty" : ""}`}>
                                                {cart.length === 0 ? (
                                                    <div className="text-center py-5">
                                                        <h4>Корзина пуста</h4>
                                                        <Link to="/shop" className="btn btn-primary mt-3">Перейти в магазин</Link>
                                                    </div>
                                                ) : (
                                                    cart.map((item) => (
                                                        <CartItem
                                                            key={item.id}
                                                            item={item}
                                                            quantity={item.quantity}
                                                            image={item.image}
                                                            title={item.title}
                                                            category={item.category}
                                                            price={item.price}
                                                        />
                                                    ))
                                                )}
                                            </div>
                                            <div className="pt-5 back-shop">
                                                <h6 className="mb-0"><Link to="/shop"><HiOutlineArrowNarrowLeft />Вернуться в магазин</Link></h6>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 bg-grey">
                                        <div className="p-5">
                                            <h3 className="fw-bold mb-5 mt-2 pt-1 cart-head" style={{ fontSize: "26px", textAlign: "center" }}>Оформление заказа</h3>
                                            {cart.length === 0 ? (
                                                <div className="text-center text-muted">Добавьте товары в корзину для оформления заказа</div>
                                            ) : (
                                                <form onSubmit={handleCheckout}>
                                                    <div className="mb-3">
                                                        <label className="form-label">Имя</label>
                                                        <input type="text" className="form-control" value={name} onChange={e => setName(e.target.value)} required />
                                                    </div>
                                                    <div className="mb-3">
                                                        <label className="form-label">Телефон</label>
                                                        <input
                                                            type="tel"
                                                            className="form-control"
                                                            value={phone}
                                                            onChange={handlePhoneNumberChange}
                                                            required
                                                        />
                                                        {!isValid && phone.length > 0 && (
                                                            <div className="text-danger mt-1">Неверный номер телефона</div>
                                                        )}
                                                    </div>
                                                    <div className="form-check mb-3">
                                                        <input className="form-check-input" type="checkbox" checked={delivery} onChange={e => setDelivery(e.target.checked)} id="deliveryCheck" />
                                                        <label className="form-check-label" htmlFor="deliveryCheck">
                                                            Доставка
                                                        </label>
                                                    </div>
                                                    {delivery && (
                                                        <div className="mb-3">
                                                            <label className="form-label">Адрес доставки</label>
                                                            <input type="text" className="form-control" value={address} onChange={e => setAddress(e.target.value)} required={delivery} />
                                                        </div>
                                                    )}
                                                    <div className="mb-3">
                                                        <label className="form-label">Промокод</label>
                                                        <div className="input-group">
                                                            <input type="text" className="form-control" value={promo} onChange={e => setPromo(e.target.value)} disabled={promoApplied} />
                                                            <button className="btn btn-outline-secondary" onClick={handlePromoApply} disabled={promoApplied}>Применить</button>
                                                        </div>
                                                        {promoApplied && <div className="text-success mt-1">Промокод применён! -20%</div>}
                                                    </div>
                                                    <div className="d-flex justify-content-between mb-3">
                                                        <h5 className="text-uppercase">Итого</h5>
                                                        <h5>
                                                            {promoApplied && (
                                                                <span style={{ textDecoration: 'line-through', color: '#888', marginRight: 8 }}>
                                                                    {getTotalPrice()} сом
                                                                </span>
                                                            )}
                                                            {getDiscountedPrice()} сом
                                                        </h5>
                                                    </div>
                                                    <button
                                                        type="submit"
                                                        className="general-button w-100"
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
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Модальное окно оплаты */}
            <PaymentModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                promoApplied={promoApplied}
                discount={discount}
            />
        </div>
    )
}

export default CartPayment;
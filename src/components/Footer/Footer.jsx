import React, { useState } from 'react';
import './footer.scss';
import { useDispatch } from 'react-redux';
import { createReview } from '../../store/slices/reviewsSlice';
import {
    AiFillInstagram,
    AiFillFacebook,
    AiOutlineWhatsApp,
    AiOutlineGoogle,
} from 'react-icons/ai';
import { IoClose } from 'react-icons/io5';

const Footer = () => {
    const dispatch = useDispatch();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [comment, setComment] = useState('');
    const [isValid, setIsValid] = useState(false);

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

    const resetForm = () => {
        setName('');
        setPhone('');
        setComment('');
        setIsValid(false);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        resetForm();
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name || !phone || !comment || !isValid) return;

        dispatch(createReview({ name, phone, comment }));
        closeModal();
    };

    return (
        <>
            <footer className="site-footer">
                <div className="page-container">
                    <div className="site-footer__top">
                        <div className="site-footer__brand">
                            <span className="footer-badge">Decor Mebel</span>
                            <h3>Мебель для дома, которая сочетает стиль и комфорт</h3>
                            <p>
                                Подберите интерьерные решения для гостиной, спальни,
                                кухни и рабочего пространства. Современный дизайн,
                                удобство и приятная атмосфера в каждом элементе.
                            </p>
                        </div>

                        <div className="site-footer__links">
                            <div className="footer-block">
                                <h4>Навигация</h4>
                                <a href="/">Главная</a>
                                <a href="/shop">Магазин</a>
                                <a href="/cart">Корзина</a>
                                <button
                                    type="button"
                                    className="footer-review-link"
                                    onClick={() => setIsModalOpen(true)}
                                >
                                    Оставить отзыв
                                </button>
                            </div>

                            <div className="footer-block">
                                <h4>Контакты</h4>
                                <a href="tel:+996709317635">+996 709 317 635</a>
                                <a href="mailto:info@decormebel.com">info@decormebel.com</a>
                                <span>Пн–Вс: 09:00 – 21:00</span>
                            </div>

                            <div className="footer-block">
                                <h4>Соцсети</h4>
                                <div className="footer-socials">
                                    <a
                                        href="https://www.facebook.com/"
                                        target="_blank"
                                        rel="noreferrer"
                                        aria-label="Facebook"
                                    >
                                        <AiFillFacebook />
                                    </a>
                                    <a
                                        href="https://wa.me/996709317635"
                                        target="_blank"
                                        rel="noreferrer"
                                        aria-label="WhatsApp"
                                    >
                                        <AiOutlineWhatsApp />
                                    </a>
                                    <a
                                        href="https://www.google.com/"
                                        target="_blank"
                                        rel="noreferrer"
                                        aria-label="Google"
                                    >
                                        <AiOutlineGoogle />
                                    </a>
                                    <a
                                        href="https://www.instagram.com/ma1ika.22"
                                        target="_blank"
                                        rel="noreferrer"
                                        aria-label="Instagram"
                                    >
                                        <AiFillInstagram />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="site-footer__bottom">
                        <p>© 2026 Decor Mebel. Все права защищены.</p>
                        <button
                            type="button"
                            className="developer-link"
                            onClick={() => window.open('https://www.instagram.com/ma1ika.22', '_blank')}
                        >
                            Made by Developer
                        </button>
                    </div>
                </div>
            </footer>

            {isModalOpen && (
                <div className="review-modal-overlay" onClick={closeModal}>
                    <div
                        className="review-modal"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            type="button"
                            className="review-modal__close"
                            onClick={closeModal}
                            aria-label="Закрыть"
                        >
                            <IoClose />
                        </button>

                        <div className="review-modal__header">
                            <span className="review-modal__badge">Обратная связь</span>
                            <h3>Оставить отзыв</h3>
                            <p>
                                Поделитесь впечатлением о магазине, сервисе и качестве
                                мебели. Ваш отзыв будет отправлен в систему.
                            </p>
                        </div>

                        <form className="review-form" onSubmit={handleSubmit}>
                            <div className="review-form__group">
                                <label>Ваше имя</label>
                                <input
                                    type="text"
                                    placeholder="Введите имя"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="review-form__group">
                                <label>Телефон</label>
                                <input
                                    type="tel"
                                    placeholder="Например: (700)-123-456"
                                    value={phone}
                                    onChange={handlePhoneNumberChange}
                                    required
                                />
                                {!isValid && phone.length > 0 && (
                                    <span className="review-form__error">
                                        Неверный номер телефона
                                    </span>
                                )}
                            </div>

                            <div className="review-form__group">
                                <label>Ваш отзыв</label>
                                <textarea
                                    rows={4}
                                    placeholder="Напишите ваш отзыв"
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="review-form__submit"
                                disabled={!name || !phone || !comment || !isValid}
                            >
                                Отправить отзыв
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default Footer;

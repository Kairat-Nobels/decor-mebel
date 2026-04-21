import React, { useState } from 'react';
import { createReview } from '../../store/slices/reviewsSlice';
import { useDispatch } from 'react-redux';

const Contact = () => {
    const dispatch = useDispatch();
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

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createReview({ name, phone, comment }));
        setName('');
        setPhone('');
        setComment('');
    };

    return (
        <div className="home-contact page-container p-5 d-flex flex-column align-items-center justify-content-center">
            <h3 className='pb-3 fw-light'>Оставить отзыв</h3>
            <form onSubmit={handleSubmit} className="w-100" style={{ maxWidth: 400 }}>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Ваше имя"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="tel"
                        className="form-control"
                        placeholder="Телефон"
                        value={phone}
                        onChange={handlePhoneNumberChange}
                        required
                    />
                    {!isValid && phone.length > 0 && (
                        <div className="text-danger mt-1" style={{ fontSize: 14 }}>Неверный номер телефона</div>
                    )}
                </div>
                <div className="mb-3">
                    <textarea
                        className="form-control"
                        placeholder="Ваш отзыв"
                        value={comment}
                        onChange={e => setComment(e.target.value)}
                        required
                        rows={3}
                    />
                </div>
                <button
                    type="submit"
                    className="general-button w-100"
                    disabled={!name || !phone || !isValid || !comment}
                >
                    Отправить
                </button>
            </form>
        </div>
    );
};

export default Contact;
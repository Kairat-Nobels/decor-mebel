import { useEffect, useState } from 'react';
import styles from './reviewModal.module.css'
import { useDispatch, useSelector } from 'react-redux';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import SuccessMessage from '../SuccessMessage/SuccessMessage';
import SpinnerModal from '../SpinnerModal/SpinnerModal';
import { createReview, getReviews } from '../../store/slices/reviewsSlice';

function ReviewModal({ setModal }) {
    const [result, setResult] = useState(false)
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [comment, setComment] = useState('')
    const [isValid, setIsValid] = useState(false);


    const dispatch = useDispatch()
    const { error, loading, success } = useSelector(state => state.reviewsReducer)
    useEffect(() => {
        document.body.style.overflow = 'hidden';
    }, [])
    const closeModal = (e) => {
        if (!document.querySelector('form').contains(e.target) && !result) {
            document.body.style.overflow = '';
            setModal(false)
        }
    }
    const handlePhoneNumberChange = (event) => {
        let input = event.target.value;
        input = input.replace(/\D/g, '');
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
        setResult(true)
        const rew = {
            name: name,
            phone: phone,
            comment: comment
        }
        dispatch(createReview(rew))
    }
    const handleClose = () => {
        document.body.style.overflow = '';
        setModal(false)
    }

    return (
        <div onClick={closeModal} className={styles.window}>
            <form onSubmit={handleSubmit} className={styles.form} action="">
                <h2>Оставьте отзыв</h2>
                <div onClick={handleClose} className={styles.closeX}>X</div>
                {
                    result ?
                        (loading ? <div className={styles.loading}>
                            <SpinnerModal />
                            <p>Отзыв отправляется...</p></div>
                            :
                            <div>
                                <button type='button' className={styles.closeBtn} onClick={() => {
                                    dispatch(getReviews())
                                    document.body.style.overflow = '';
                                    setModal(false)
                                    setResult(false)
                                }}>X</button>
                                {
                                    error ? <ErrorMessage message={error} />
                                        : <SuccessMessage message={success} />
                                }
                            </div>
                        )
                        :
                        <>
                            <div>
                                <label>Имя: </label>
                                <input value={name} onChange={e => setName(e.target.value)} required type="text" />
                            </div>
                            <div>
                                <label htmlFor="phone">Телефон: </label>
                                <input
                                    type="tel"
                                    placeholder="777222333"
                                    id="phone"
                                    value={phone}
                                    onChange={handlePhoneNumberChange}
                                    required
                                />
                            </div>
                            {!isValid && phone.length > 0 && <p className='errorNum'>Номер телефона введен неправильно</p>
                            }
                            <div>
                                <label>Отзыв: </label>
                                <textarea maxLength={320} value={comment} onChange={e => setComment(e.target.value)} required cols="20" rows="4"></textarea>
                            </div>
                            <button disabled={isValid ? false : true} type='submit'>Отправить</button>
                        </>
                }
            </form >
        </div >
    )
}

export default ReviewModal
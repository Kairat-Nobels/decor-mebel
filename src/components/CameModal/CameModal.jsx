import { useEffect, useState } from "react";
import styles from './cameModal.module.css'
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginAdmin } from "../../store/slices/adminSlice";

function CameModal({ setModal }) {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => (document.body.style.overflow = '');
    }, []);

    const closeModal = (e) => {
        if (!document.querySelector('form').contains(e.target)) {
            setModal(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await dispatch(loginAdmin({ login, password }));
        if (res.meta.requestStatus === 'fulfilled') {
            setModal(false);
            navigate('/admin');
        }
    };

    return (
        <div onClick={closeModal} className={styles.window}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <h2>Авторизация</h2>
                <div>
                    <label>Login:</label>
                    <input value={login} onChange={e => setLogin(e.target.value)} required />
                </div>
                <div>
                    <label>Пароль:</label>
                    <input value={password} onChange={e => setPassword(e.target.value)} type="password" required />
                </div>
                <div onClick={() => setModal(false)} className={styles.closeX}>X</div>
                <button type="submit">Войти</button>
            </form>
        </div>
    );
}

export default CameModal;

import { useEffect, useRef, useState } from "react";
import styles from "./cameModal.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginAdmin } from "../../store/slices/adminSlice";
import { IoClose } from "react-icons/io5";
import { HiOutlineLockClosed, HiOutlineUser } from "react-icons/hi2";

function CameModal({ setModal }) {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [submitError, setSubmitError] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const modalRef = useRef(null);

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "";
        };
    }, []);

    const closeModal = () => {
        setModal(false);
    };

    const handleOverlayClick = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            closeModal();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitError("");

        const res = await dispatch(loginAdmin({ login, password }));

        if (res.meta.requestStatus === "fulfilled") {
            setModal(false);
            navigate("/admin");
        } else {
            setSubmitError("Неверный логин или пароль");
        }
    };

    return (
        <div onClick={handleOverlayClick} className={styles.window}>
            <div ref={modalRef} className={styles.formWrap}>
                <button
                    type="button"
                    onClick={closeModal}
                    className={styles.closeButton}
                    aria-label="Закрыть"
                >
                    <IoClose />
                </button>

                <div className={styles.header}>
                    <span className={styles.badge}>Admin Panel</span>
                    <h2>Авторизация</h2>
                    <p>Войдите в административную панель для управления сайтом</p>
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.field}>
                        <label htmlFor="admin-login">Логин</label>
                        <div className={styles.inputWrap}>
                            <HiOutlineUser />
                            <input
                                id="admin-login"
                                value={login}
                                onChange={(e) => setLogin(e.target.value)}
                                placeholder="Введите логин"
                                required
                            />
                        </div>
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="admin-password">Пароль</label>
                        <div className={styles.inputWrap}>
                            <HiOutlineLockClosed />
                            <input
                                id="admin-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                placeholder="Введите пароль"
                                required
                            />
                        </div>
                    </div>

                    {submitError && <div className={styles.error}>{submitError}</div>}

                    <button type="submit" className={styles.submitButton}>
                        Войти
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CameModal;
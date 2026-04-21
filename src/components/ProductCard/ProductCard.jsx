import React from 'react';
import { Link } from 'react-router-dom';
import './productCard.scss';
import { HiShoppingCart } from 'react-icons/hi';
import { FaEye } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/features/cartSlice';

const ProductCard = ({ image, title, category, price, oldPrice, item }) => {
    const dispatch = useDispatch();

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(addToCart(item));
    };

    return (
        <article className="product-card">
            <Link to={`/shop/${item.id}`} className="product-card__image">
                <img src={image} alt={title} />
                {oldPrice && <span className="product-card__badge">Акция</span>}
            </Link>

            <div className="product-card__content">
                <span className="product-card__category">{category}</span>

                <h3 className="product-card__title">
                    <Link to={`/shop/${item.id}`}>{title}</Link>
                </h3>

                <div className="product-card__prices">
                    {oldPrice ? (
                        <>
                            <del>{oldPrice}.00 сом</del>
                            <span>{price}.00 сом</span>
                        </>
                    ) : (
                        <span>{price}.00 сом</span>
                    )}
                </div>

                <div className="product-card__actions">
                    <button
                        type="button"
                        className="product-card__cart-btn"
                        onClick={handleAddToCart}
                    >
                        <HiShoppingCart />
                        <span>В корзину</span>
                    </button>

                    <Link to={`/shop/${item.id}`} className="product-card__view-btn">
                        <FaEye />
                    </Link>
                </div>
            </div>
        </article>
    );
};

export default ProductCard;

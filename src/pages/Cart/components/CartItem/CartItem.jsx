import React from 'react';
import { useDispatch } from 'react-redux';
import {
    decrementQuantity,
    incrementQuantity,
    removeItem,
} from '../../../../store/features/cartSlice';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import './cartItem.scss';

const CartItem = ({ image, title, price, quantity, category, item }) => {
    const dispatch = useDispatch();

    return (
        <article className="cart-item-card">
            <div className="cart-item-card__image">
                <img src={image} alt={title} />
            </div>

            <div className="cart-item-card__content">
                <div className="cart-item-card__info">
                    <span className="cart-item-card__category">{category}</span>
                    <h3 className="cart-item-card__title">{title}</h3>
                </div>

                <div className="cart-item-card__controls">
                    <div className="cart-item-quantity">
                        <button
                            type="button"
                            onClick={() => dispatch(decrementQuantity(item.id))}
                        >
                            -
                        </button>

                        <span>{quantity}</span>

                        <button
                            type="button"
                            onClick={() => dispatch(incrementQuantity(item.id))}
                        >
                            +
                        </button>
                    </div>

                    <div className="cart-item-card__price">
                        {price * quantity}.00 сом
                    </div>

                    <button
                        type="button"
                        className="cart-item-card__remove"
                        onClick={() => dispatch(removeItem(item.id))}
                        aria-label="Удалить товар"
                    >
                        <IoIosCloseCircleOutline />
                    </button>
                </div>
            </div>
        </article>
    );
};

export default CartItem;

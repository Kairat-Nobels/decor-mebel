import React from 'react';
import { Link } from 'react-router-dom';
import "./productCard.scss";
import { HiShoppingCart } from "react-icons/hi";
import { FaEye } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/features/cartSlice';

const ProductCard = (props) => {
    const { image, title, category, price, oldPrice, item } = props;
    const dispatch = useDispatch();
    return (
        <div data-aos="fade-up" className="product-card pb-5 d-flex flex-column col-12 col-md-4 col-lg-3">
            <div className="product-image mb-1">
                <Link to={`/shop/${item.id}`}><img src={image} alt="product" /></Link>
            </div>
            <div className="product-info px-3 d-flex flex-column">
                <span className='product-category'>{category}</span>
                <h3><Link to="/">{title}</Link ></h3>
                <div className="product-prices d-flex">
                    {oldPrice ? (<><del className='product-price pe-2'>{oldPrice}.00 сом</del><span className='product-price'>{price}.00 сом</span></>) : (<span className='product-price'>{price}.00 сом</span>)}
                </div>
            </div>
            <div className="product-card-buttons d-flex flex-column">
                <button onClick={() => { dispatch(addToCart(item)) }} className='add-cart'><HiShoppingCart /><span>Добавить в корзину</span></button>
                <button className='quick-view'><FaEye /><span>Быстрый просмотр</span></button>
            </div>
            {oldPrice && <span className="product-sale">Акция!</span>}
        </div>
    )
}

export default ProductCard;
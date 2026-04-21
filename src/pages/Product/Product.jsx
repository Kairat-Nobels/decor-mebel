import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../store/features/cartSlice';
import { HiOutlineArrowNarrowLeft } from 'react-icons/hi';
import Spinner from '../../components/Spinner/Spinner';

const Product = () => {
    const { id } = useParams();
    const [product, setProduct] = useState()
    const dispatch = useDispatch();
    const { items, loading, error } = useSelector((state) => state.itemsReducer);
    useEffect(() => {
        const productDetail = items.find((item) =>
            +item.id === +id
        );
        setProduct(productDetail)
    }, [id, items])
    return (
        <div className="product product-page page-container">
            <div className="pt-5 back-shop">
                <h6 className="mb-0"><Link to="/shop"><HiOutlineArrowNarrowLeft /> Вернуться в магазин</Link></h6>
            </div>
            <div className="row">
                {
                    loading ? <div className='loading'><Spinner /></div> :
                        error ? <div className='fetchError'><p>😕 Error: {error}</p><p>Проверьте Интернет и Обновите страницу</p></div> : <>
                            <div data-aos="fade-up" className="col-12 col-md-7 p-5">
                                <img src={product?.image} alt="product" className='w-100' />
                            </div>
                            <div className="col-12 col-md-5 p-5 product-info">
                                <h2 data-aos="fade-left">{product?.title}</h2>
                                <span data-aos="fade-left" className='product-category'>{product?.category}</span>
                                <p data-aos="fade-left">{product?.content}</p>
                                <div data-aos="fade-left" className="product-prices d-flex pb-2">
                                    {product?.oldPrice ? (<><del className='product-price pe-2'>{product?.oldPrice}.00 сом</del><span className='product-price'>{product?.price}.00 сом</span></>) : (<span className='product-price'>{product?.price}.00 сом</span>)}
                                </div>
                                <button data-aos="fade-left" className='general-button' onClick={() => dispatch(addToCart(product))}>Добавить в корзину</button>
                            </div>
                        </>
                }
            </div>
        </div>
    )
}

export default Product;
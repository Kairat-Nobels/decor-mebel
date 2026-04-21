import React from 'react';
import ProductCard from '../../../../components/ProductCard/ProductCard';
import "./homeProducts.scss";
import { useSelector } from 'react-redux';
import Spinner from '../../../../components/Spinner/Spinner';
const HomeProducts = () => {
  const { items, loading, error } = useSelector((state) => state.itemsReducer);

  return (
    <div className="home-products page-container">
      <h3 data-aos="fade-up" className='text-center part-title'>Наши последние товары</h3>
      <div data-aos="fade-up" className="divider-part">
        <div className="divider"></div>
      </div>
      <div className="row">
        {
          loading ? <Spinner /> :
            error ? <div className='fetchError'><p>😕 Error: {error}</p><p>Проверьте Интернет и Обновите страницу</p></div> :
              items.slice(0, 4).map((item) => (
                <ProductCard
                  key={item.id}
                  item={item}
                  image={item.image}
                  title={item.title}
                  category={item.category}
                  price={item.price}
                  oldPrice={item.oldPrice}
                />
              ))
        }
      </div>
    </div>
  )
}

export default HomeProducts;
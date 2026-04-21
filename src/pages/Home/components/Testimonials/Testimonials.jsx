import React from 'react';
import TestimonialsItem from './TestimonialsItem';
import { useSelector } from 'react-redux';
// import testimonials from "../../../../data/testimonials"

const Testimonials = () => {
    const { reviews: testimonials } = useSelector((state) => state.reviewsReducer);
    return (
        <div className="testimonials-part page-container">
            <h3 className='text-center part-title'>Отзывы</h3>
            <div className="divider-part">
                <div className="divider"></div>
            </div>
            <div className="row g-0 px-2">
                {testimonials.map((item) => (
                    <TestimonialsItem
                        key={item.id}
                        name={item.name}
                        comment={item.comment}
                    />
                ))}
            </div>
        </div>
    )
}

export default Testimonials;
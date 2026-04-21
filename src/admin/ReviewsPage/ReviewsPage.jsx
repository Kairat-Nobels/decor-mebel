import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getReviews, deleteReview } from '../../store/slices/reviewsSlice';
import { RotatingLines } from 'react-loader-spinner';
import ReviewsTable from '../../Tables/ReviewsTable/ReviewsTable';
import DeleteModal from '../../components/DeleteModalNew/DeleteModalNew';
import 'rsuite/dist/rsuite.min.css'

const ReviewsPage = () => {
  const dispatch = useDispatch();
  const { reviews, loading, error } = useSelector((state) => state.reviewsReducer);
  const [deleteTarget, setDeleteTarget] = useState(null);

  useEffect(() => {
    dispatch(getReviews());
  }, [dispatch]);

  return (
    <div className='adminReviews'>
      <h3>Отзывы</h3>

      {loading ? (
        <div className="center">
          <RotatingLines strokeColor="grey" width="60" />
          <p>Загрузка...</p>
        </div>
      ) : error ? (
        <h3>{error}</h3>
      ) : (
        <ReviewsTable data={reviews} onDelete={(review) => setDeleteTarget(review)} />
      )}

      {deleteTarget && (
        <DeleteModal
          deleteFunc={deleteReview}
          open={!!deleteTarget}
          onClose={() => setDeleteTarget(null)}
          id={deleteTarget.id}
        />
      )}
    </div>
  );
};

export default ReviewsPage;

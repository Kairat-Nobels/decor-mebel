import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RotatingLines } from 'react-loader-spinner';
import RecordsTable from '../../Tables/RecordsTable/RecordsTable';
import DeleteModal from '../../components/DeleteModalNew/DeleteModalNew';
import EditOrderModal from '../../components/EditOrderModal/EditOrderModal';
import 'rsuite/dist/rsuite.min.css'
import { deleteOrder, updateOrder } from '../../store/slices/ordersSlice';

const statusList = [
  { label: "Все", value: "all" },
  { label: "Заказано", value: "Заказано" },
  { label: "Оплачено", value: "Оплачено" },
  { label: "Доставлено", value: "Доставлено" },
  { label: "Отменен", value: "Отменен" }
];

const OrdersPage = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.ordersReducer);

  const [deleteTarget, setDeleteTarget] = useState(null);
  const [editTarget, setEditTarget] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");

  const handleEdit = (order) => setEditTarget(order);

  const handleEditSave = (updated) => {
    dispatch(updateOrder({ id: updated.id, updatedData: { status: updated.status, address: updated.address } }));
    setEditTarget(null);
  };

  return (
    <div className='adminRecords'>
      <div className='adminRecordHeader d-flex justify-content-between align-items-center mb-3'>
        <h3>Заказы</h3>
        <div className="d-flex gap-2">
          {statusList.map(s => (
            <button
              key={s.value}
              className={`btn btn-sm ${statusFilter === s.value ? 'btnActive' : 'btn-outline'}`}
              onClick={() => setStatusFilter(s.value)}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="center">
          <RotatingLines strokeColor="grey" width="60" />
          <p>Загрузка...</p>
        </div>
      ) : error ? (
        <h3>{error}</h3>
      ) : (
        <RecordsTable
          data={statusFilter === "all"
            ? orders
            : orders.filter(order => order.status === statusFilter)}
          onDelete={setDeleteTarget}
          onEdit={handleEdit}
        />
      )}

      {deleteTarget && (
        <DeleteModal
          deleteFunc={deleteOrder}
          open={!!deleteTarget}
          onClose={() => setDeleteTarget(null)}
          id={deleteTarget.id}
        />
      )}

      {editTarget && (
        <EditOrderModal
          open={!!editTarget}
          onClose={() => setEditTarget(null)}
          order={editTarget}
          onSave={handleEditSave}
        />
      )}
    </div>
  );
};

export default OrdersPage;

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RotatingLines } from 'react-loader-spinner';
import DeleteModal from '../../components/DeleteModalNew/DeleteModalNew';
import ItemModalForm from '../../components/ItemModalForm/ItemModalForm';
import ItemsTable from '../../Tables/ItemsTable/ItemsTable';
import { deleteItem, getItems } from '../../store/slices/itemsSlice';

const ItemsPage = () => {
  const { items, loading, error } = useSelector((state) => state.itemsReducer);

  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const handleEdit = (item) => {
    setEditItem(item);
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditItem(null);
    setShowModal(true);
  };

  return (
    <div className='adminItems'>
      <div className='adminHeader'>
        <h3>Товары</h3>
        <button onClick={handleAdd}>+ Добавить товар</button>
      </div>

      {loading ? (
        <div className="center">
          <RotatingLines strokeColor="grey" width="60" />
          <p>Загрузка...</p>
        </div>
      ) : error ? (
        <h3>{error}</h3>
      ) : (
        <ItemsTable
          data={items}
          onEdit={handleEdit}
          onDelete={setDeleteTarget}
        />
      )}

      <ItemModalForm
        open={showModal}
        onClose={() => {
          setEditItem(null);
          setShowModal(false)
        }}
        itemData={editItem}
      />

      {deleteTarget && (
        <DeleteModal
          open={!!deleteTarget}
          onClose={() => setDeleteTarget(null)}
          id={deleteTarget.id}
          deleteFunc={deleteItem}
          refreshFunc={getItems}
        />
      )}
    </div>
  );
};

export default ItemsPage;

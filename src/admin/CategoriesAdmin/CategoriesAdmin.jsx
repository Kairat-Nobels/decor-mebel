import { useEffect, useState } from 'react';
import { Button, Table, Whisper, Tooltip } from 'rsuite';
import { useDispatch, useSelector } from 'react-redux';
import { RotatingLines } from 'react-loader-spinner';
import { MdEdit, MdDeleteOutline } from 'react-icons/md';
import DeleteModal from '../../components/DeleteModalNew/DeleteModalNew';
import CategoriesModal from '../../components/CategoriesModal/CategoriesModal';
import { deleteCategories, getCategories } from '../../store/slices/categoriesSlice';

const CategoriesAdmin = () => {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector((state) => state.categoriesReducer);

  const [showModal, setShowModal] = useState(false);
  const [editCategory, setEditCategory] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const handleEdit = (category) => {
    setEditCategory(category);
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditCategory(null);
    setShowModal(true);
  };

  return (
    <div className='adminStaff'>
      <div className='adminHeader'>
        <h3>Категории</h3>
        <button appearance="ghost" onClick={handleAdd}>+ Добавить категорию</button>
      </div>

      {loading ? (
        <div className="center">
          <RotatingLines strokeColor="grey" width="60" />
          <p>Загрузка...</p>
        </div>
      ) : error ? (
        <h3>{error}</h3>
      ) : (
        <Table bordered cellBordered data={categories} autoHeight wordWrap="break-word">
          <Table.Column width={60} align="center">
            <Table.HeaderCell>ID</Table.HeaderCell>
            <Table.Cell dataKey="id" />
          </Table.Column>

          <Table.Column flexGrow={1}>
            <Table.HeaderCell>Название</Table.HeaderCell>
            <Table.Cell dataKey="name" />
          </Table.Column>

          <Table.Column flexGrow={2}>
            <Table.HeaderCell>Описание</Table.HeaderCell>
            <Table.Cell dataKey="description" />
          </Table.Column>

          <Table.Column width={120} align="center" fixed="right">
            <Table.HeaderCell>Действия</Table.HeaderCell>
            <Table.Cell>
              {(rowData) => (
                <div className='actionButtons'>
                  <Whisper placement="top" trigger="hover" speaker={<Tooltip>Редактировать</Tooltip>}>
                    <Button onClick={() => handleEdit(rowData)} appearance="subtle">
                      <MdEdit color="#1caf68" size={20} />
                    </Button>
                  </Whisper>
                  <Whisper placement="top" trigger="hover" speaker={<Tooltip>Удалить</Tooltip>}>
                    <Button onClick={() => setDeleteTarget(rowData)} appearance="subtle">
                      <MdDeleteOutline color="rgb(210 54 54)" size={20} />
                    </Button>
                  </Whisper>
                </div>
              )}
            </Table.Cell>
          </Table.Column>
        </Table>
      )}

      <CategoriesModal
        open={showModal}
        onClose={() => {
          setEditCategory(null);
          setShowModal(false);
        }}
        categoryData={editCategory}
      />

      {deleteTarget && (
        <DeleteModal
          open={!!deleteTarget}
          onClose={() => setDeleteTarget(null)}
          id={deleteTarget.id}
          deleteFunc={deleteCategories}
          refreshFunc={getCategories}
        />
      )}
    </div>
  );
};

export default CategoriesAdmin;
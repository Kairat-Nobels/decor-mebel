import { Table, Button, Whisper, Tooltip } from 'rsuite';
import { MdEdit, MdDeleteOutline } from 'react-icons/md';

const ItemsTable = ({ data, onEdit, onDelete }) => {
  return (
    <Table bordered cellBordered data={data} autoHeight wordWrap="break-word">
      <Table.Column width={60} align="center">
        <Table.HeaderCell>ID</Table.HeaderCell>
        <Table.Cell dataKey="id" />
      </Table.Column>

      <Table.Column width={120}>
        <Table.HeaderCell>Фото</Table.HeaderCell>
        <Table.Cell>
          {(rowData) => (
            <img
              src={rowData.image}
              alt="Фото"
              style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: '8px' }}
            />
          )}
        </Table.Cell>
      </Table.Column>

      <Table.Column flexGrow={1}>
        <Table.HeaderCell>Категория</Table.HeaderCell>
        <Table.Cell dataKey="category" />
      </Table.Column>

      <Table.Column flexGrow={2}>
        <Table.HeaderCell>Название</Table.HeaderCell>
        <Table.Cell dataKey="title" />
      </Table.Column>

      <Table.Column flexGrow={3}>
        <Table.HeaderCell>Описание</Table.HeaderCell>
        <Table.Cell dataKey="content" />
      </Table.Column>

      <Table.Column width={100}>
        <Table.HeaderCell>Цена</Table.HeaderCell>
        <Table.Cell>
          {(rowData) => rowData.price + ' сом'}
        </Table.Cell>
      </Table.Column>

      <Table.Column width={120} align="center" fixed="right">
        <Table.HeaderCell>Действия</Table.HeaderCell>
        <Table.Cell>
          {(rowData) => (
            <div className='actionButtons' style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
              <Whisper placement="top" trigger="hover" speaker={<Tooltip>Редактировать</Tooltip>}>
                <Button onClick={() => onEdit(rowData)} appearance="subtle">
                  <MdEdit color="#1caf68" size={20} />
                </Button>
              </Whisper>
              <Whisper placement="top" trigger="hover" speaker={<Tooltip>Удалить</Tooltip>}>
                <Button onClick={() => onDelete(rowData)} appearance="subtle">
                  <MdDeleteOutline color="rgb(210 54 54)" size={20} />
                </Button>
              </Whisper>
            </div>
          )}
        </Table.Cell>
      </Table.Column>
    </Table>
  );
};

export default ItemsTable;

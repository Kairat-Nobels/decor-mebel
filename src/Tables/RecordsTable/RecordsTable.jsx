import React from 'react';
import { Table, Button, Whisper, Tooltip } from 'rsuite';
import { MdEdit, MdDeleteOutline } from 'react-icons/md';

const RecordsTable = ({ data = [], loading, error, onDelete, onEdit }) => {
  return (
    <div>
      <Table
        bordered
        cellBordered
        data={data}
        autoHeight
        wordWrap="break-word"
        locale={{ emptyMessage: 'Заказов нет' }}
        loading={loading}
      >
        <Table.Column width={60} align="center">
          <Table.HeaderCell>ID</Table.HeaderCell>
          <Table.Cell dataKey="id" />
        </Table.Column>

        <Table.Column flexGrow={2}>
          <Table.HeaderCell>Товары</Table.HeaderCell>
          <Table.Cell>
            {rowData => (
              <ul style={{ paddingLeft: 16, margin: 0 }}>
                {rowData.order.map((item, idx) => (
                  <li key={idx}>
                    {item.title} — {item.quantity} шт. ({item.price} сом)
                  </li>
                ))}
              </ul>
            )}
          </Table.Cell>
        </Table.Column>

        <Table.Column width={120}>
          <Table.HeaderCell>Дата</Table.HeaderCell>
          <Table.Cell>
            {rowData => new Date(rowData.date).toLocaleDateString("ru-RU")}
          </Table.Cell>
        </Table.Column>

        <Table.Column width={120}>
          <Table.HeaderCell>Имя</Table.HeaderCell>
          <Table.Cell dataKey="name" />
        </Table.Column>

        <Table.Column width={120}>
          <Table.HeaderCell>Телефон</Table.HeaderCell>
          <Table.Cell dataKey="phone" />
        </Table.Column>

        <Table.Column width={160}>
          <Table.HeaderCell>Адрес</Table.HeaderCell>
          <Table.Cell dataKey="address" />
        </Table.Column>

        <Table.Column width={100}>
          <Table.HeaderCell>Сумма</Table.HeaderCell>
          <Table.Cell dataKey="amount" />
        </Table.Column>

        <Table.Column width={120}>
          <Table.HeaderCell>Статус</Table.HeaderCell>
          <Table.Cell dataKey="status" />
        </Table.Column>

        <Table.Column width={100} align="center">
          <Table.HeaderCell>Действия</Table.HeaderCell>
          <Table.Cell>
            {rowData => (
              <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
                <Whisper
                  trigger="hover"
                  placement="top"
                  speaker={<Tooltip>Редактировать</Tooltip>}
                >
                  <Button onClick={() => onEdit && onEdit(rowData)} appearance="subtle">
                    <MdEdit color="#1caf68" size={20} />
                  </Button>
                </Whisper>
                <Whisper
                  trigger="hover"
                  placement="top"
                  speaker={<Tooltip>Удалить</Tooltip>}
                >
                  <Button onClick={() => onDelete && onDelete(rowData)} appearance="subtle">
                    <MdDeleteOutline color="rgb(210 54 54)" size={20} />
                  </Button>
                </Whisper>
              </div>
            )}
          </Table.Cell>
        </Table.Column>
      </Table>
      {error && <div className="text-danger mt-3">{error}</div>}
    </div>
  );
};

export default RecordsTable;
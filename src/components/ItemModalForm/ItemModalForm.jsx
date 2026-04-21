import React, { useEffect, useState, useRef } from "react";
import { Modal, Button, Form, Schema, Uploader, Input, SelectPicker } from "rsuite";
import { useDispatch, useSelector } from "react-redux";
import { createItem, updateItem } from "../../store/slices/itemsSlice";

const { StringType, NumberType } = Schema.Types;

const model = Schema.Model({
  title: StringType().isRequired("Укажите название"),
  category: StringType().isRequired("Выберите категорию"),
  content: StringType().isRequired("Укажите описание"),
  price: NumberType("Цена должна быть числом").isRequired("Укажите цену"),
});

const Textarea = React.forwardRef((props, ref) => <Input {...props} as="textarea" ref={ref} />);

const ItemModalForm = ({ open, onClose, itemData }) => {
  const dispatch = useDispatch();
  const formRef = useRef();
  const { categories } = useSelector((state) => state.categoriesReducer);

  const [formValue, setFormValue] = useState({});
  const [imgUrl, setImgUrl] = useState("");

  useEffect(() => {
    if (itemData) {
      setFormValue({
        title: itemData.title || "",
        category: itemData.category || "",
        content: itemData.content || "",
        price: itemData.price || "",
      });
      setImgUrl(itemData.image || "");
    } else {
      setFormValue({});
      setImgUrl("");
    }
  }, [itemData]);

  const handleSubmit = () => {
    if (!formRef.current.check()) return;

    const payload = { ...formValue, image: imgUrl };

    if (itemData) {
      dispatch(updateItem({ id: itemData.id, updatedData: payload }));
    } else {
      dispatch(createItem(payload));
    }

    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} size="600px" className="add-edit-modal">
      <Modal.Header>
        <Modal.Title>{itemData ? "Редактировать товар" : "Добавить товар"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="item-modal__img">
          {imgUrl && (
            <img
              src={imgUrl}
              alt="item"
              style={{ width: "100%", borderRadius: 8 }}
            />
          )}

          <Uploader
            action="https://a966685f5a33544c.mokky.dev/uploads"
            name="file"
            autoUpload
            style={{ marginTop: '15px' }}
            fileListVisible={false}
            onSuccess={(res) => {
              const url = res?.url;
              if (url) setImgUrl(url);
            }}
          >
            <Button appearance="ghost">Загрузить фото</Button>
          </Uploader>

          <Input
            placeholder="Или вставьте ссылку на изображение"
            value={imgUrl}
            onChange={setImgUrl}
            style={{ marginTop: 10 }}
          />
        </div>

        <Form
          ref={formRef}
          model={model}
          formValue={formValue}
          onChange={setFormValue}
          fluid
          className="item-modal__form"
        >
          <Form.Group>
            <Form.ControlLabel>Категория:</Form.ControlLabel>
            <Form.Control
              className="category"
              name="category"
              accepter={SelectPicker}
              data={categories.map(cat => ({ label: cat.name, value: cat.name }))}
              searchable={false}
              placeholder="Выберите категорию"
            />
          </Form.Group>

          <Form.Group>
            <Form.ControlLabel>Название:</Form.ControlLabel>
            <Form.Control name="title" />
          </Form.Group>

          <Form.Group>
            <Form.ControlLabel>Описание:</Form.ControlLabel>
            <Form.Control name="content" accepter={Textarea} rows={3} />
          </Form.Group>

          <Form.Group>
            <Form.ControlLabel>Цена (сом):</Form.ControlLabel>
            <Form.Control name="price" type="number" />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className="modal-footer">
        <Button
          disabled={
            !formValue.title ||
            !formValue.category ||
            !formValue.content ||
            !formValue.price
          }
          appearance="primary"
          onClick={handleSubmit}
        >
          {itemData ? "Сохранить изменения" : "Добавить товар"}
        </Button>
        <Button onClick={onClose} appearance="subtle">
          Отмена
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ItemModalForm;

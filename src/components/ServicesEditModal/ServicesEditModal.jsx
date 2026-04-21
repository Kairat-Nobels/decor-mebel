import React, { useEffect, useState } from 'react';
import { Modal, Form, Button, Input, TimePicker } from 'rsuite';

const emptyLesson = {
  timeStart: '',
  timeEnd: '',
  subject: '',
  teacher: '',
  room: ''
};

const emptyClass = {
  class: '',
  schedule: [
    { day: 'Понедельник', lessons: [] },
    { day: 'Вторник', lessons: [] },
    { day: 'Среда', lessons: [] },
    { day: 'Четверг', lessons: [] },
    { day: 'Пятница', lessons: [] }
  ]
};

const ServiceEditModal = ({ open, onClose, context, onSubmit }) => {
  // context: { service, type, mode, dayIdx, lessonIdx }
  const { service, type, mode, dayIdx, lessonIdx } = context || {};

  const isEdit = type === 'edit';
  const isClass = mode === 'class';
  const isLesson = mode === 'lessons';

  // Для класса
  const [classData, setClassData] = useState(emptyClass);

  // Для урока
  const [lessonData, setLessonData] = useState(emptyLesson);

  useEffect(() => {
    if (isClass) {
      if (isEdit && service) {
        setClassData({
          class: service.class || '',
          schedule: service.schedule || emptyClass.schedule
        });
      } else {
        setClassData(emptyClass);
      }
    }
    if (isLesson) {
      if (isEdit && service && typeof dayIdx === 'number' && typeof lessonIdx === 'number') {
        setLessonData(service.schedule[dayIdx].lessons[lessonIdx]);
      } else {
        setLessonData(emptyLesson);
      }
    }
  }, [isEdit, isClass, isLesson, service, dayIdx, lessonIdx]);

  // Обработка изменений
  const handleClassChange = (val, key) => {
    setClassData(prev => ({ ...prev, [key]: val }));
  };

  const handleLessonChange = (val, key) => {
    setLessonData(prev => ({ ...prev, [key]: val }));
  };

  // Сохранение
  const handleSave = () => {
    if (isClass) {
      // Добавление или редактирование класса
      onSubmit(classData, service?.id, 'class');
    }
    if (isLesson) {
      // Добавление или редактирование урока
      let updatedService = { ...service };
      let updatedSchedule = [...updatedService.schedule];
      let lessons = [...updatedSchedule[dayIdx].lessons];

      if (isEdit) {
        lessons[lessonIdx] = lessonData;
      } else {
        lessons.push(lessonData);
      }
      updatedSchedule[dayIdx] = { ...updatedSchedule[dayIdx], lessons };
      updatedService.schedule = updatedSchedule;

      onSubmit(updatedService, service.id, 'lessons');
    }
  };

  return (
    <Modal open={open} onClose={onClose} size={500}>
      <Modal.Header>
        <Modal.Title>
          {isClass
            ? isEdit ? 'Редактировать класс' : 'Добавить класс'
            : isLesson
              ? isEdit ? 'Редактировать урок' : 'Добавить урок'
              : ''}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form fluid className='sheduleForm'>
          {isClass && (
            <Form.Group>
              <Form.ControlLabel>Название класса</Form.ControlLabel>
              <Input
                value={classData.class}
                onChange={val => handleClassChange(val, 'class')}
                placeholder="Например, 6А"
              />
            </Form.Group>
          )}
          {isLesson && (
            <>
              <Form.Group>
                <Form.ControlLabel style={{ display: 'block', whiteSpace: 'nowrap' }}>Время начала</Form.ControlLabel>
                <TimePicker
                  format="HH:mm"
                  value={lessonData.timeStart ? new Date(`1970-01-01T${lessonData.timeStart}:00`) : null}
                  onChange={val => handleLessonChange(val ? val.toTimeString().slice(0, 5) : '', 'timeStart')}
                  placeholder="08:00"
                  style={{ width: 120 }}
                  cleanable
                />
              </Form.Group>
              <Form.Group>
                <Form.ControlLabel style={{ display: 'block', whiteSpace: 'nowrap' }}>Время окончания</Form.ControlLabel>
                <TimePicker
                  format="HH:mm"
                  value={lessonData.timeEnd ? new Date(`1970-01-01T${lessonData.timeEnd}:00`) : null}
                  onChange={val => handleLessonChange(val ? val.toTimeString().slice(0, 5) : '', 'timeEnd')}
                  placeholder="08:45"
                  style={{ width: 120 }}
                  cleanable
                />
              </Form.Group>
              <Form.Group>
                <Form.ControlLabel>Предмет</Form.ControlLabel>
                <Input
                  value={lessonData.subject}
                  onChange={val => handleLessonChange(val, 'subject')}
                  placeholder="Математика"
                />
              </Form.Group>
              <Form.Group>
                <Form.ControlLabel>Преподаватель</Form.ControlLabel>
                <Input
                  value={lessonData.teacher}
                  onChange={val => handleLessonChange(val, 'teacher')}
                  placeholder="Иванова Т.А."
                />
              </Form.Group>
              <Form.Group>
                <Form.ControlLabel>Кабинет</Form.ControlLabel>
                <Input
                  value={lessonData.room}
                  onChange={val => handleLessonChange(val, 'room')}
                  placeholder="каб. 6А"
                />
              </Form.Group>
            </>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={handleSave}
          appearance="primary"
          disabled={
            (isClass && !classData.class) ||
            (isLesson && (!lessonData.timeStart || !lessonData.timeEnd || !lessonData.subject || !lessonData.teacher || !lessonData.room))
          }
        >
          Сохранить
        </Button>
        <Button onClick={onClose} appearance="subtle">
          Отмена
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ServiceEditModal;

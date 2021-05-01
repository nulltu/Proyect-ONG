import React, { useEffect, useState } from 'react';
import { DeleteTwoTone, EditTwoTone } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Popconfirm, Button, Space, Form } from 'antd';
import coursesActions from '../../redux/actions/coursesActions';
import ModalCourse from '../ModalCourses';

const Courses = () => {
  const [currentCourse, setCurrentCourse] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const coursesList = useSelector((state) => state.courses);
  const { courses } = coursesList;

  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const coursesUpdate = courses.map(({ id, name, description, duration }) => ({
    key: id,
    name,
    categoryId: 'Blog',
    description,
    duration,
  }));

  useEffect(() => {
    dispatch(coursesActions.getAllCourses());
    if (currentCourse) {
      const { name, description, duration, categoryId } = currentCourse;
      form.setFieldsValue({
        name,
        description,
        duration,
        categoryId,
      });
    } else {
      form.resetFields();
    }
  }, [dispatch, currentCourse, form, coursesActions]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const columns = [
    {
      title: 'Título de la capacitación',
      width: 100,
      dataIndex: 'name',
      key: 'name',
      fixed: 'left',
    },
    {
      title: 'Descripción',
      width: 100,
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Imagen',
      width: 100,
      dataIndex: 'image',
      key: 'image',
    },
    {
      title: 'Duración',
      width: 100,
      dataIndex: 'duration',
      key: 'duration',
    },
    {
      title: 'Categoria',
      width: 100,
      dataIndex: 'categoryId',
      key: 'categoryId',
    },
    {
      title: 'Action',
      key: 'operation',
      width: 100,
      render: (text) => (
        <Space size="middle">
          <Button
            icon={<EditTwoTone />}
            onClick={() => {
              setCurrentCourse(text);
              showModal();
            }}
          />
          <Popconfirm
            title="¿Esta seguro que desea eliminar el post?"
            onConfirm={() => {
              dispatch(coursesActions.deleteCourses(text.key));
            }}
            okText="Si"
            cancelText="No"
          >
            <Button icon={<DeleteTwoTone />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Button
        type="primary"
        style={{
          border: 0,
          display: 'block',
          marginLeft: 'auto',
          margin: '10px 10px 0 auto',
        }}
        onClick={() => {
          setCurrentCourse({});
          showModal();
        }}
      >
        Agregar un curso
      </Button>
      <Table
        columns={columns}
        dataSource={coursesUpdate.reverse()}
        scroll={{ x: 1300 }}
      />
      <ModalCourse
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        currentCourse={currentCourse}
      />
    </div>
  );
};

export default Courses;

import React, { useEffect } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { Button, Modal, Form, Input, InputNumber, Select, Upload } from 'antd';
import PropTypes from 'prop-types';
import coursesActions from '../../redux/actions/coursesActions';

const ModalCourse = ({ currentCourse, isModalVisible, setIsModalVisible }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

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

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
  return (
    <Modal
      title="Cursos"
      visible={isModalVisible}
      onOk={async () => {
        await form.validateFields().then((values) => {
          form.resetFields();
          if (Object.keys(currentCourse).length === 0) {
            const data = {
              ...values,
              image: '/asd',
              categoryId: 1,
            };
            dispatch(coursesActions.postCourses(data));
            setIsModalVisible(false);
          } else {
            const data = {
              ...values,
              id: currentCourse.key,
              image: '/asd',
              categoryId: 1,
            };
            dispatch(coursesActions.putCourses(data));
            setIsModalVisible(false);
          }
        });
      }}
      forceRender
      onCancel={handleCancel}
    >
      <Form
        style={{
          marginLeft: 'auto !important',
          marginRight: 'auto !important',
        }}
        form={form}
        layout="vertical"
        name="form_in_modal"
      >
        <Form.Item style={{ marginBottom: 0 }}>
          <Input.Group compact>
            <Form.Item
              name="name"
              label="Nombre"
              hasFeedback
              style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
              rules={[
                {
                  required: true,
                  message: 'Seleccione un nombre',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item style={{ marginBottom: 0 }}>
              <Input.Group compact>
                <Form.Item
                  style={{ width: '100%', marginLeft: '8px' }}
                  name="categoryId"
                  label="Categoria"
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: 'Selecciona una categoria',
                    },
                  ]}
                >
                  <Select placeholder="Seleccione un modelo">
                    <Select.Option value="1">Educación</Select.Option>
                  </Select>
                </Form.Item>
              </Input.Group>
            </Form.Item>
          </Input.Group>
        </Form.Item>

        <Form.Item style={{ marginBottom: 0 }}>
          <Input.Group compact>
            <Form.Item
              name="image"
              label="Upload"
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              <Upload name="logo" /* action="/upload.do" */ listType="picture">
                <Button icon={<UploadOutlined />}>Click to upload</Button>
              </Upload>
            </Form.Item>
            <Form.Item
              name="duration"
              label="Duracion"
              style={{
                display: 'inline-block',
                width: 'calc(50% - 8px)',
                margin: '0 40px',
              }}
              rules={[
                {
                  required: true,
                  message: 'Seleccione la duracion',
                },
              ]}
            >
              <InputNumber />
            </Form.Item>
          </Input.Group>
        </Form.Item>

        <Form.Item
          name="description"
          label="Descripcion"
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Seleccione una observacion',
            },
          ]}
        >
          <Input.TextArea
            showCount
            style={{ resize: 'none' }}
            maxLength={100}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

ModalCourse.propTypes = {
  currentCourse: PropTypes.objectOf(PropTypes.object).isRequired,
  isModalVisible: PropTypes.bool.isRequired,
  setIsModalVisible: PropTypes.func.isRequired,
};

export default ModalCourse;

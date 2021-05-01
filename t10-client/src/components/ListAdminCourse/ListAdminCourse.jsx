import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import 'antd/dist/antd.css';
import Swal from 'sweetalert2';
import { useHistory } from 'react-router-dom';
import { Space, Button } from 'antd';
import { DeleteTwoTone, EditTwoTone, EyeOutlined } from '@ant-design/icons';
import TableComponent from '../Table';
import FormCourses from '../FormCourses';
import styles from './ListAdminCourses.module.css';
import CoursesActions from '../../redux/actions/coursesActions';
import { STATUS_NO_CONTENT, DELETE_COURSE } from '../../constants';
import inscriptionsActions from '../../redux/actions/inscriptionAction';
import * as constants from '../../constants';

const ListAdminCourse = () => {
  const [edit, setEdit] = useState(false);
  const [create, setCreate] = useState(false);
  const [selected, setSelected] = useState({});
  const dispatch = useDispatch();
  const dataCourse = useSelector((state) => state.courses.courses);
  const [dataInscription, setDataInscription] = useState([]);

  const data = dataCourse.map((st) => ({
    id: st.id,
    name: st.name,
    description: st.description,
    image: st.image,
    duration: st.duration,
    inscription: `${
      dataInscription.filter((ins) => ins.onCourse.Course.id === st.id).length
    } `,
  }));

  const history = useHistory();
  const deleteCourse = async (id) => {
    const result = await Swal.fire({
      title: '¿Estas Seguro?',
      text: '¡No se puede revertir!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!',
    });
    if (result.isConfirmed) {
      try {
        const response = await dispatch(CoursesActions.deleteCourses(id));
        if (response.status === STATUS_NO_CONTENT) {
          Swal.fire('Eliminado!', DELETE_COURSE, 'success');
          dispatch(CoursesActions.getAllCourses());
        }
      } catch (err) {
        Swal.fire('Error!', err.response.data.message, 'error');
      }
    }
  };
  const editCourse = (record) => {
    setEdit(true);
    setSelected(record);
  };

  useEffect(async () => {
    try {
      const response = await dispatch(inscriptionsActions.getAllInscriptions());
      if (response.status === constants.STATUS_SUCCESS) {
        setDataInscription(response.data);
      }
    } catch (error) {
      Swal.fire('Error!', error.response.data.message, 'error');
    }
  }, []);

  const columns = [
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <p>{text}</p>,
    },
    {
      title: 'Descripción',
      dataIndex: 'description',
      key: 'description',
      render: (text) => <p className={styles.truncate}>{text}</p>,
    },
    {
      title: 'imagen',
      dataIndex: 'image',
      key: 'image',
      render: (text) => <img src={text} style={{ width: 100 }} alt="img" />,
    },
    {
      title: 'Duracion',
      dataIndex: 'duration',
      key: 'duration',
      render: (text) => <p>{text}hs</p>,
    },
    {
      title: 'Inscriptios Totales',
      dataIndex: 'inscription',
      key: 'inscription',
      render: (text) => <p>{text}</p>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (text) => (
        <Space size="middle">
          <Button
            title="Ver Cursadas"
            icon={<EyeOutlined />}
            onClick={() => {
              history.push({
                pathname: `/admin/capacitaciones/${text.id}/cursadas`,
                state: { id: text.id },
              });
            }}
          />
          <Button
            title="Editar Cursos"
            icon={<EditTwoTone />}
            onClick={() => {
              editCourse(text);
            }}
          />
          <Button
            title="Eliminar Cursos"
            icon={<DeleteTwoTone />}
            onClick={() => {
              deleteCourse(text.id);
            }}
          />
        </Space>
      ),
    },
  ];
  if (edit) {
    return <FormCourses courses={selected} edit={edit} setEdit={setEdit} />;
  }
  if (create) {
    return <FormCourses setCreate={setCreate} />;
  }
  return (
    <div>
      <button
        className="btn-primary"
        onClick={() => {
          setCreate(true);
        }}
        type="button"
      >
        Agregar
      </button>
      <TableComponent columns={columns} rows={data} />
    </div>
  );
};

export default ListAdminCourse;

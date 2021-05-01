import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import 'antd/dist/antd.css';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import {
  DeleteTwoTone,
  EditTwoTone,
  EyeOutlined,
  ArrowLeftOutlined,
} from '@ant-design/icons';
import { Space, Button } from 'antd';
import TableComponent from '../Table';
import CoursesActions from '../../redux/actions/coursesActions';
import CreateOnCourse from '../CreateOnCourse';
import * as constants from '../../constants';
import { ROUTE_ADMIN_CAPACITATION } from '../../constants/routes/routes';
import inscriptionsActions from '../../redux/actions/inscriptionAction';

const ListAdminOnCourse = ({ id }) => {
  const [edit, setEdit] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const [create, setCreate] = useState(false);
  const [selected, setSelected] = useState({});
  const dataCourse = useSelector((state) => state.courses.onCourses);
  const dataOnCourses = dataCourse.filter((state) => state.id === id);
  const [dataInscription, setDataInscription] = useState([]);

  const data = dataOnCourses[0]?.OnCourses.map((st) => ({
    id: st.id,
    date: st.date,
    schedule: st.schedule,
    inscription: `${
      dataInscription.filter((ins) => ins.onCourse.id === st.id).length
    } `,
  }));
  const deleteOnCourse = async (recordId) => {
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
        const response = await dispatch(
          CoursesActions.deleteOnCourses(recordId),
        );

        if (response.status === constants.STATUS_NO_CONTENT) {
          Swal.fire('Eliminado!', constants.DELETE_ON_COURSE, 'success');
          dispatch(CoursesActions.getAllOnCourses());
        }
      } catch (err) {
        Swal.fire('Error!', err.response.data.message, 'error');
      }
    }
  };
  const editOnCourse = (record) => {
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
      title: 'Fecha',
      dataIndex: 'date',
      key: 'date',
      render: (text) => <Moment format="L" date={text} />,
    },
    {
      title: 'Horario',
      dataIndex: 'schedule',
      key: 'schedule',
      render: (text) => {
        const formatText = text ? text.split('-') : '';
        return (
          <p>
            {formatText[0]}hs - {formatText[1]}hs
          </p>
        );
      },
    },
    {
      title: 'Inscripciones',
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
            title="Ver Inscripciones"
            icon={<EyeOutlined />}
            onClick={() => {
              history.push({
                pathname: `/admin/capacitaciones/${id}/cursada/${text.id}/inscripciones`,
                state: { id: text.id },
              });
            }}
          />
          <Button
            title="Editar Cursos"
            icon={<EditTwoTone />}
            onClick={() => {
              editOnCourse(text);
            }}
          />
          <Button
            title="Eliminar Cursos"
            icon={<DeleteTwoTone />}
            onClick={() => {
              deleteOnCourse(text.id);
            }}
          />
        </Space>
      ),
    },
  ];
  if (edit) {
    return (
      <CreateOnCourse
        onCourse={selected}
        edit={edit}
        setEdit={setEdit}
        id={id}
      />
    );
  }
  if (create) {
    return <CreateOnCourse id={id} setCreate={setCreate} />;
  }
  return (
    <div>
      <Space>
        <button
          className="btn-primary"
          style={{ fontSize: '20px', backgroundColor: '#aaa9a9' }}
          onClick={() => {
            history.push(ROUTE_ADMIN_CAPACITATION);
          }}
          type="button"
        >
          <ArrowLeftOutlined />
        </button>
        <button
          className="btn-primary"
          onClick={() => {
            setCreate(true);
          }}
          type="button"
        >
          Agregar
        </button>
      </Space>
      <TableComponent columns={columns} rows={data} />
    </div>
  );
};

ListAdminOnCourse.propTypes = {
  id: PropTypes.number.isRequired,
};
export default ListAdminOnCourse;

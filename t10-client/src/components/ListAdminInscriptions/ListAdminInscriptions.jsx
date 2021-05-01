import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Moment from 'react-moment';
import 'antd/dist/antd.css';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import { Space, Button } from 'antd';
import { DeleteTwoTone } from '@ant-design/icons';
import { STATUS_NO_CONTENT, DELETE_INSCRIPTION } from '../../constants';
import TableComponent from '../Table';
import inscriptionsActions from '../../redux/actions/inscriptionAction';
import * as constants from '../../constants';
import newInscription from '../../utils/new.inscription';
import { ROUTE_ADMIN_CAPACITATION } from '../../constants/routes/routes';

const ListAdminInscriptions = ({ id }) => {
  const dispatch = useDispatch();
  const [dataInscription, setDataInscription] = useState([]);
  const history = useHistory();

  useEffect(async () => {
    try {
      const response = await dispatch(
        inscriptionsActions.getAllInscriptionsByOnCourse(id),
      );
      if (response.status === constants.STATUS_SUCCESS) {
        const newData = response.data.map(newInscription);
        setDataInscription(newData);
      }
    } catch (error) {
      Swal.fire('Error!', error.response.data.message, 'error');
    }
  }, []);

  const deleteInscription = async (recordId) => {
    const result = await Swal.fire({
      title: '¿Estas seguro que desea elminiar su inscripcion?',
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
          inscriptionsActions.deleteInscription(recordId),
        );
        if (response.status === STATUS_NO_CONTENT) {
          Swal.fire('Eliminado!', DELETE_INSCRIPTION, 'success');
          setDataInscription([]);
        }
      } catch (err) {
        Swal.fire('Error!', err.response.data.message, 'error');
      }
    }
  };
  const columns = [
    {
      title: 'Nombre',
      dataIndex: 'firstName',
      key: 'firstName',
      render: (text) => <p>{text}</p>,
    },
    {
      title: 'Apellido',
      dataIndex: 'lastName',
      key: 'lastName',
      render: (text) => <p>{text}</p>,
    },
    {
      title: 'Correo',
      dataIndex: 'email',
      key: 'email',
      render: (text) => <p>{text}</p>,
    },
    {
      title: 'Fecha de inscripcion',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text) => <Moment format="L" date={text} />,
    },
    {
      title: 'Action',
      key: 'action',
      render: (text) => (
        <Space size="middle">
          <Button
            title="Eliminar Cursos"
            icon={<DeleteTwoTone />}
            onClick={() => {
              deleteInscription(text.id);
            }}
          />
        </Space>
      ),
    },
  ];
  return (
    <div>
      <button
        className="btn-primary"
        onClick={() => {
          history.push(ROUTE_ADMIN_CAPACITATION);
        }}
        type="button"
      >
        Volver
      </button>
      <TableComponent columns={columns} rows={dataInscription} />
    </div>
  );
};

ListAdminInscriptions.propTypes = {
  id: PropTypes.number.isRequired,
};

export default ListAdminInscriptions;

import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Moment from 'react-moment';
import 'antd/dist/antd.css';
import Swal from 'sweetalert2';
import { Space, Button } from 'antd';
import { DeleteTwoTone } from '@ant-design/icons';
import { STATUS_NO_CONTENT, DELETE_INSCRIPTION } from '../../constants';
import inscriptionsActions from '../../redux/actions/inscriptionAction';
import TableComponent from '../Table';
import * as constants from '../../constants';
import allInscription from '../../utils/All.inscriptions';

const ListAdminInscriptions = () => {
  const dispatch = useDispatch();
  const [dataInscription, setDataInscription] = useState([]);

  useEffect(async () => {
    try {
      const response = await dispatch(inscriptionsActions.getAllInscriptions());
      if (response.status === constants.STATUS_SUCCESS) {
        const newData = response.data.map(allInscription);
        setDataInscription(newData);
      }
    } catch (error) {
      Swal.fire('Error!', error.response.data.message, 'error');
    }
  }, []);

  const deleteInscription = async (recordId) => {
    const result = await Swal.fire({
      title: '¿Estas seguro que desea elminiar esta inscripcion?',
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
      title: 'Nombre del curso',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <p>{text}</p>,
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
      <TableComponent columns={columns} rows={dataInscription} />
    </div>
  );
};

export default ListAdminInscriptions;

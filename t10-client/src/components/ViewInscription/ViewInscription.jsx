import React, { useEffect, useState } from 'react';
import { Space } from 'antd';
import propTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Moment from 'react-moment';
import Swal from 'sweetalert2';
import inscriptionAction from '../../redux/actions/inscriptionAction';
import TableComponent from '../Table';
import * as constants from '../../constants';

const ViewInscription = ({ user }) => {
  const maxWidth = window.screen.width;
  const dispatch = useDispatch();
  const [recharge, setRecharge] = useState(false);
  const [inscriptions, setInscriptions] = useState([]);

  useEffect(async () => {
    const data = await dispatch(
      inscriptionAction.getAllInscriptionsByUser(user.id),
    );

    if (data) {
      const insc = data.data.map((state) => ({
        id: state.id,
        name: state.onCourse.Course.name,
        date: state.onCourse.date,
        duration: state.onCourse.Course.duration,
        schedule: state.onCourse.schedule,
      }));
      setInscriptions(insc);
      setRecharge(false);
    }
  }, [recharge]);

  const theme = useSelector((state) => state.theme.dataThemeDefault);

  const deleteInscriptions = async (id) => {
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
          inscriptionAction.deleteInscription(id),
        );

        if (response.status === constants.STATUS_NO_CONTENT) {
          Swal.fire('Eliminado!', constants.DELETE_INSCRIPTION, 'success');
          setRecharge(true);
        }
      } catch (err) {
        Swal.fire('Error!', err.response.data.message, 'error');
      }
    }
  };
  const columns = [
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <p>{text}</p>,
    },
    {
      title: 'Fecha',
      dataIndex: 'date',
      key: 'date',
      render: (text) => (
        <p>
          <Moment format="L" date={text} />
        </p>
      ),
    },
    {
      title: 'Horario',
      dataIndex: 'schedule',
      key: 'schedule',
      render: (text) => <p style={{ fontSize: 12 }}>{text}</p>,
    },
    {
      title: 'Duracion',
      dataIndex: 'duration',
      key: 'duration',
      render: (text) => <p>{text}hs</p>,
    },
    {
      title: 'Acciones',
      key: 'action',
      render: (text) => (
        <Space size="middle">
          <button
            onClick={() => {
              deleteInscriptions(text.id);
            }}
            style={{ heigth: 2 }}
            className="btn-danger"
            type="button"
          >
            Anular Inscripcion
          </button>
        </Space>
      ),
    },
  ];
  return (
    <div>
      <h1 style={{ color: theme.lettersColor }}>Inscripiones Realizadas</h1>
      <div style={maxWidth < 600 ? { overflowX: 'scroll' } : null}>
        <TableComponent columns={columns} rows={inscriptions} />
      </div>
    </div>
  );
};

ViewInscription.propTypes = {
  user: propTypes.shape({
    id: propTypes.number.isRequired,
    firstName: propTypes.string.isRequired,
    lastName: propTypes.string.isRequired,
    email: propTypes.string.isRequired,
    image: propTypes.string.isRequired,
  }).isRequired,
};
export default ViewInscription;

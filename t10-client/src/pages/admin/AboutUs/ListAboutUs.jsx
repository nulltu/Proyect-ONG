import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import htmlParser from 'react-html-parser';
import 'antd/dist/antd.css';
import { Space, Button } from 'antd';
import { DeleteTwoTone, EditTwoTone } from '@ant-design/icons';
import FormAboutUs from './FormAboutUs';
import * as constants from '../../../constants/constants';
import TableComponent from '../../../components/Table';
import historyAction from '../../../redux/actions/historyAction';

const ListActivities = () => {
  const [edit, setEdit] = useState(false);
  const [create, setCreate] = useState(false);
  const [selected, setSelected] = useState({});
  const dataHistory = useSelector((state) => state.history.dataHistory);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(historyAction.getDataHistory());
  }, []);

  const deleteHistory = async (id) => {
    const result = await Swal.fire({
      title: '¿Seguro quiere borrar el contenido?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
    });
    if (result.isConfirmed) {
      try {
        const response = await dispatch(historyAction.deleteHistory(id));
        if (response.status === constants.STATUS_NO_CONTENT) {
          Swal.fire({
            icon: 'success',
            title: constants.ENTRIES_DELETED,
          });
          await dispatch(historyAction.getDataHistory());
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: error.response.data.message,
        });
      }
    }
  };
  const editHistory = (record) => {
    setEdit(true);
    setSelected(record);
  };
  const columns = [
    {
      title: 'Texto',
      dataIndex: 'text',
      key: 'text',
      render: (text) => <p>{htmlParser(text)}</p>,
    },
    {
      title: 'Acciones',
      key: 'action',
      render: (text) => (
        <Space size="middle">
          <Button
            icon={<EditTwoTone />}
            title="Editar Contenido"
            onClick={() => {
              editHistory(text);
            }}
          />
          <Button
            icon={<DeleteTwoTone />}
            title="Eliminar Contenido"
            onClick={() => {
              deleteHistory(text.id);
            }}
          />
        </Space>
      ),
    },
  ];
  if (edit) {
    return <FormAboutUs historyData={selected} edit={edit} setEdit={setEdit} />;
  }
  if (create) {
    return <FormAboutUs setCreate={setCreate} />;
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
      <TableComponent columns={columns} rows={dataHistory} />
    </div>
  );
};

export default ListActivities;

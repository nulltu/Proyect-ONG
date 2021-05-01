import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import 'antd/dist/antd.css';
import { Space, Button } from 'antd';
import { DeleteTwoTone, EditTwoTone } from '@ant-design/icons';
import htmlParser from 'react-html-parser';
import styles from './ListActivities.module.css';
import TableComponent from '../Table';
import FormNews from '../FormNews';
import * as constants from '../../constants';
import entriesActions from '../../redux/actions/entriesActions';

const ListActivities = () => {
  const [edit, setEdit] = useState(false);
  const [create, setCreate] = useState(false);
  const [selected, setSelected] = useState({});
  const dataEntries = useSelector((state) => state.entries.dataEntries);
  const dispatch = useDispatch();

  const deleteEntries = async (id) => {
    try {
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
        const response = await dispatch(entriesActions.deleteEntries(id));
        if (response.status === constants.STATUS_NO_CONTENT) {
          Swal.fire({
            icon: 'success',
            title: constants.ENTRIES_DELETED,
          });
          await dispatch(entriesActions.getDataEntries());
        }
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: error.response.data.message,
      });
    }
  };
  const editEntries = (record) => {
    setEdit(true);
    setSelected(record);
  };
  const columns = [
    {
      title: 'Titulo',
      dataIndex: 'title',
      key: 'title',
      render: (text) => <p>{text}</p>,
    },
    {
      title: 'Contenido',
      dataIndex: 'content',
      key: 'content',
      render: (text) => <p className={styles.truncate}>{htmlParser(text)}</p>,
    },
    {
      title: 'Imagen',
      dataIndex: 'image',
      key: 'image',
      render: (text) => <img src={text} style={{ width: 100 }} alt="img" />,
    },
    {
      title: 'Tipo',
      dataIndex: 'type',
      key: 'type',
      render: (text) => <p>{text}</p>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (text) => (
        <Space size="middle">
          <Button
            icon={<EditTwoTone />}
            onClick={() => {
              editEntries(text);
            }}
          />
          <Button
            icon={<DeleteTwoTone />}
            onClick={() => {
              deleteEntries(text.id);
            }}
          />
        </Space>
      ),
    },
  ];
  if (edit) {
    return <FormNews entries={selected} edit={edit} setEdit={setEdit} />;
  }
  if (create) {
    return <FormNews setCreate={setCreate} />;
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
      <TableComponent columns={columns} rows={dataEntries} />
    </div>
  );
};

export default ListActivities;

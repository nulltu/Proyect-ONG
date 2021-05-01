import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'antd/dist/antd.css';
import { Space, Button } from 'antd';
import { DeleteTwoTone, EditTwoTone } from '@ant-design/icons';
import Swal from 'sweetalert2';
import * as constants from '../../constants';
import TableComponent from '../Table';
import FormUsers from '../FormUsers';
import userActions from '../../redux/actions/userActions';
import styles from './ListUserAdmin.module.css';
import Input from '../Input';

const ListUserAdmin = () => {
  const maxWidth = window.screen.width;
  const [create, setCreate] = useState(false);
  const [edit, setEdit] = useState(false);
  const [selected, setSelected] = useState({});
  const [reset, setReset] = useState(false);
  const [currentSearch, setCurrentSearch] = useState('');
  const [currentRole, setCurrentRole] = useState(0);
  const searchInput = useRef();
  const roleInput = useRef();

  const dispatch = useDispatch();

  const allUsers = useSelector((state) => state.user.listUsers);
  const theme = useSelector((state) => state.theme.dataThemeDefault);
  const usersRoles = useSelector((state) => state.user.roles);

  useEffect(() => {
    dispatch(userActions.getAllUsers());
    dispatch(userActions.getRoles());
    setReset(false);
  }, [reset]);

  const deleteUser = async (id) => {
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
        const response = await dispatch(userActions.deleteUser(id));
        if (response.status === constants.STATUS_NO_CONTENT) {
          Swal.fire({
            title: constants.NO_CONTENT,
            icon: 'success',
          });
          dispatch(userActions.getAllUsers());
        }
      } catch (error) {
        Swal.fire({
          text: error.response.data.message,
          icon: 'error',
        });
      }
    }
  };

  const editUser = (record) => {
    setEdit(true);
    setSelected(record);
  };

  const sendSeach = (e) => {
    e.preventDefault();
    const search = searchInput.current.value;
    setCurrentSearch(search);
    dispatch(userActions.searchUsers(search, currentRole));
  };

  const filterByRole = () => {
    const role = roleInput.current.value;
    setCurrentRole(role);
    dispatch(userActions.filterUsers(role, currentSearch));
  };

  const resetFilters = () => {
    setReset(true);
    searchInput.current.value = '';
    roleInput.current.value = 0;
    setCurrentSearch('');
    setCurrentRole(0);
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
      title: 'Correo Electrónico',
      dataIndex: 'email',
      key: 'email',
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
              editUser(text);
            }}
          />
          <Button
            title="Eliminar Usuario"
            icon={<DeleteTwoTone />}
            onClick={() => {
              deleteUser(text.id);
            }}
          />
        </Space>
      ),
    },
  ];
  if (create) {
    return <FormUsers setCreate={setCreate} />;
  }

  if (edit) {
    return <FormUsers setEdit={setEdit} edit={edit} user={selected} />;
  }

  return (
    <div className="container" style={{ minHeight: '90vh' }}>
      <div className="row align-items-center" style={{ minHeight: '70vh' }}>
        <div className={styles.table}>
          <div className="d-flex justify-content-between flex-wrap">
            <div>
              <button
                className="btn-primary my-1 mr-4"
                onClick={() => {
                  setCreate(true);
                }}
                type="button"
              >
                Agregar
              </button>
              <button
                className="btn-primary my-1 mr-4"
                onClick={resetFilters}
                type="button"
              >
                Limpiar filtros
              </button>
            </div>
            <div className="my-1">
              <form action="" onSubmit={(e) => sendSeach(e)}>
                <Input
                  search
                  register={searchInput}
                  style={{ color: theme.lettersColor }}
                  name="search"
                  type="text"
                  placeholder="Buscar un usuario"
                />
              </form>
              <div className="field field-select field-cat">
                <select
                  id="field-cat"
                  name="typeId"
                  style={{ color: theme.lettersColor }}
                  ref={roleInput}
                  onChange={filterByRole}
                >
                  <option value={0} style={{ color: '#000000' }} hidden>
                    Seleciona un rol
                  </option>
                  {usersRoles &&
                    usersRoles.map((role) => (
                      <option
                        value={role.id}
                        key={role.id}
                        style={{ color: '#000000' }}
                      >
                        {role.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          </div>
          <h1 className="text-center" style={{ color: theme.lettersColor }}>
            Usuarios
          </h1>
          <div style={maxWidth < 600 ? { overflowX: 'scroll' } : null}>
            <TableComponent columns={columns} rows={allUsers} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListUserAdmin;

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import Swal from 'sweetalert2';
import Input from '../Input';
import * as constants from '../../constants';
import userActions from '../../redux/actions/userActions';

const FormUsers = ({ setCreate, setEdit, user, edit }) => {
  const schema = yup.object().shape({
    firstName: yup
      .string()
      .required('El campo nombre es requerido')
      .min(2, 'El nombre no puede ser menor a dos caracteres'),
    lastName: yup
      .string()
      .required('El campo apellido es requerido')
      .min(2, 'El apellido no puede ser menor a dos caracteres'),
    roleId: yup.string().required('El tipo es requerido'),
    email: yup
      .string()
      .required('El campo correo electrónico es requerido')
      .email('Ingresa un correo electrónico válido'),
    ...(edit
      ? {}
      : {
          password: yup
            .string()
            .required('El campo contraseña es requerido')
            .min(6, 'Ingrese una clave de al menos 6 caracteres')
            .max(20, 'La clave no puede superar los 20 caracteres'),
        }),
  });

  const dispatch = useDispatch();
  const [disabled, setDisabled] = useState(false);

  const usersRoles = useSelector((state) => state.user.roles);

  useEffect(() => {
    dispatch(userActions.getRoles());
  }, []);

  const defaultValues = user
    ? {
        firstName: user.firstName,
        lastName: user.lastName,
        roleId: user.roleId,
        email: user.email,
      }
    : {};

  const { handleSubmit, register, errors } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const submit = async (data) => {
    setDisabled(true);
    const firstnameData = data.firstName;
    const lastnameData = data.lastName;
    const emailData = data.email;
    const roleIdData = data.roleId;
    const passwordData = data?.password;
    try {
      const response = await dispatch(
        edit
          ? userActions.editUserAdmin(
              user.id,
              firstnameData,
              lastnameData,
              emailData,
              roleIdData,
            )
          : userActions.createUser(
              firstnameData,
              lastnameData,
              passwordData,
              emailData,
              roleIdData,
            ),
      );

      if (
        response.status === constants.STATUS_CREATED ||
        response.status === constants.STATUS_SUCCESS
      ) {
        Swal.fire({
          title: constants.REGISTER_OK,
          icon: 'success',
        });
        await dispatch(userActions.getAllUsers());
        setCreate(false);
        setEdit(false);
      }
      setDisabled(false);
    } catch (error) {
      Swal.fire({
        text: error.response.data.message,
        icon: 'error',
      });
      setDisabled(false);
    }
  };

  const inputs = [
    { name: 'firstName', placeholder: 'Nombre', type: 'text' },
    { name: 'lastName', placeholder: 'Apellido', type: 'text' },
    { name: 'email', placeholder: 'Correo Electronico', type: 'text' },
  ];

  const theme = useSelector((state) => state.theme.dataThemeDefault);

  return (
    <div>
      <div className="container">
        <div className="main-content">
          <div className="form-login form-register">
            <form
              onSubmit={handleSubmit(submit)}
              id="registerForm"
              className="clearfix"
              encType="multipart/form-data"
            >
              {inputs.map((input) => (
                <Input
                  style={{ color: theme.lettersColor }}
                  key={input.name}
                  register={register}
                  name={input.name}
                  type={input.type}
                  placeholder={input.placeholder}
                  error={errors[input.name]}
                />
              ))}
              {!edit && (
                <Input
                  style={{ color: theme.lettersColor }}
                  key="password"
                  register={register}
                  name="password"
                  type="password"
                  placeholder="Contraseña"
                  error={errors.password}
                />
              )}
              <div className="field-select field-cat">
                <select
                  id="field-cat"
                  name="roleId"
                  ref={register}
                  style={{ color: theme.lettersColor }}
                >
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
                <span className="text-danger text-small d-block mb-2">
                  {errors?.roleId?.message}
                </span>
              </div>
              <div
                style={{
                  margin: '10px auto',
                  display: 'flex',
                  justifyContent: 'center',
                }}
                className="inline clearfix "
              >
                <button
                  style={{ margin: '0 10px' }}
                  type="button"
                  onClick={() => {
                    setCreate(false);
                    setEdit(false);
                  }}
                  className="btn btn-danger"
                  disabled={disabled}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={disabled}
                >
                  Guardar usuario
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

FormUsers.propTypes = {
  setEdit: PropTypes.func,
  setCreate: PropTypes.func,
  user: PropTypes.shape({
    id: PropTypes.number,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    roleId: PropTypes.number,
  }),
  edit: PropTypes.bool,
};

FormUsers.defaultProps = {
  setEdit: () => {},
  setCreate: () => {},
  user: {},
  edit: false,
};

export default FormUsers;

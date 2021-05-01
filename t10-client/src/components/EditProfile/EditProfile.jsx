import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import './EditProfile.css';
import PropTypes from 'prop-types';
import * as yup from 'yup';
import Swal from 'sweetalert2';
import * as constants from '../../constants';
import userActions from '../../redux/actions/userActions';
import readCurrentImage from '../../utils/readCurrentImage';
import Input from '../Input';

const schema = yup.object().shape({
  firstName: yup
    .string()
    .required('El campo nombre es requerido')
    .min(2, 'El nombre no puede ser menor a dos caracteres'),
  lastName: yup
    .string()
    .required('El campo apellido es requerido')
    .min(2, 'El apellido no puede ser menor a dos caracteres'),
  image: yup
    .mixed()
    .test(
      'fileFormat',
      'La extensión tiene que ser jpg, jpeg o png',
      (value) => {
        if (value[0]) {
          return (
            value[0] && constants.SUPPORTED_FORMATS.includes(value[0].type)
          );
        }
        return true;
      },
    ),
});

const EditProfile = ({ recharge, user }) => {
  const theme = useSelector((state) => state.theme.dataThemeDefault);

  const [disabled, setDisabled] = useState(false);
  const [currentImage, setCurrentImage] = useState(user.image);
  const { handleSubmit, register, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();

  const submit = async (data) => {
    setDisabled(!disabled);
    const { firstName, lastName } = data;
    const image = data.image[0] || undefined;
    try {
      const response = await dispatch(
        userActions.editUser(firstName, lastName, image),
      );
      if (response.status === constants.STATUS_SUCCESS) {
        Swal.fire({
          text: constants.UPDATED_OK,
          icon: 'success',
        });
        recharge(true);
      }
    } catch (err) {
      setDisabled(false);
      Swal.fire('Error!', err?.response?.data?.message, 'error');
    }
  };

  const deleteImage = async () => {
    const result = await Swal.fire({
      title: '¿Estas Seguro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!',
    });
    if (result.isConfirmed) {
      setDisabled(!disabled);
      try {
        const response = await dispatch(userActions.deleteUserImage());

        if (response.status === constants.STATUS_NO_CONTENT) {
          Swal.fire({
            text: constants.IMAGE_DELETED,
          });
          await dispatch(userActions.getUser(user.id));
          recharge(true);
        }
      } catch (err) {
        setDisabled(!disabled);
        Swal.fire('Error!', err.response.data.message, 'error');
      }
    }
  };

  const changeImage = () => {
    document.getElementById('image').click();
  };

  const cancel = () => recharge(true);

  const style = {
    image: {
      backgroundImage: `url(${currentImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      marginBottom: 20,
    },
  };

  return (
    <div className="form-login form">
      <h2 style={{ color: theme.lettersColor }}>Editar perfil</h2>
      <div className="d-flex justify-content-between flex-wrap">
        <div className="user-image" style={style.image} />
        <div className="d-flex flex-column">
          <button
            type="button"
            className="btn btn-danger btn-delete-image"
            onClick={deleteImage}
            disabled={disabled}
          >
            Eliminar imagen
          </button>
          <button
            type="button"
            className="btn btn-primary btn-edit-image"
            onClick={changeImage}
            disabled={disabled}
          >
            Cambiar imagen
          </button>
        </div>
      </div>
      <form
        onSubmit={handleSubmit(submit)}
        method="POST"
        id="loginForm"
        className="clearfix"
      >
        <div className="">
          <input
            className="d-none"
            type="file"
            id="image"
            name="image"
            ref={register}
            onChange={(e) => readCurrentImage(e, setCurrentImage)}
          />
          <span className="text-danger text-small d-block mb-2">
            {errors?.image?.message}
          </span>
        </div>
        <Input
          style={{ color: theme.lettersColor }}
          type="text"
          name="firstName"
          placeholder="Nombre"
          defaultValue={user.firstName}
          testId="inputFirstName"
          register={register}
          error={errors?.firstName}
        />
        <Input
          style={{ color: theme.lettersColor }}
          type="text"
          name="lastName"
          placeholder="Apellido"
          defaultValue={user.lastName}
          testId="inputLastName"
          register={register}
          error={errors?.lastName}
        />
        <div>
          <button
            type="submit"
            value="Send Messager"
            className="btn btn-primary"
            data-testid="buttonSubmit"
            disabled={disabled}
          >
            Guardar
          </button>
          <button
            type="button"
            className="btn btn-danger ml-2"
            disabled={disabled}
            onClick={cancel}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

EditProfile.propTypes = {
  recharge: PropTypes.func.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
};

export default EditProfile;

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import axios from 'axios';
import Input from '../Input';
import {
  PATH_ENDPOINT_AUTH,
  PATH_RESET_PASSWORD,
  SENT_EMAIL,
} from '../../constants/constants';
import baseURL from '../../config';

const schema = Yup.object().shape({
  email: Yup.string()
    .required('El campo correo electrónico es requerido')
    .email('Ingresa un correo electrónico válido'),
});

const ResetPassword = () => {
  const { handleSubmit, register, errors } = useForm({
    resolver: yupResolver(schema),
  });
  const [disabled, setDisabled] = useState(false);

  const theme = useSelector((state) => state.theme.dataThemeDefault);

  const onSubmit = async (data) => {
    try {
      axios.post(`${baseURL + PATH_ENDPOINT_AUTH + PATH_RESET_PASSWORD}`, {
        email: data.email,
      });
      Swal.fire({
        icon: 'success',
        title: SENT_EMAIL,
      });
    } catch (error) {
      Swal.fire({
        text: error.response.data.message,
        icon: 'error',
      });
      setDisabled(false);
    }
  };

  const strings = {
    recoverPassword: 'Recuperar contraseña',
    paragraphPassword:
      'Escribe el email con el que estas registrado y te enviaremos un link a tu correo para recuperar la contraseña',
  };

  return (
    <div className="container" style={{ minHeight: '90vh' }}>
      <div className="row align-items-center" style={{ minHeight: '70vh' }}>
        <div style={{ width: '80%', margin: '0 auto' }}>
          <h1 className="text-center" style={{ color: theme.lettersColor }}>
            {strings.recoverPassword}
          </h1>
          <p className="text-center mb-5">{strings.paragraphPassword}</p>
          <div className="form-login form-register">
            <form
              onSubmit={handleSubmit(onSubmit)}
              method="POST"
              id="loginForm"
              className="clearfix "
            >
              <Input
                style={{ color: theme.lettersColor }}
                type="email"
                name="email"
                label="Email:"
                placeholder="Correo electronico"
                register={register}
                error={errors.email}
              />
              <div className="inline clearfix text-center">
                <button
                  type="submit"
                  value="Send Messager"
                  className="btn btn-primary mb-5"
                  disabled={disabled}
                >
                  {strings.recoverPassword}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;

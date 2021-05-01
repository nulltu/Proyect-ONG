import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Input from '../Input';
import {
  PATH_ENDPOINT_AUTH,
  PATH_RECOVER_PASSWORD,
  PASSWORD_EDITED,
} from '../../constants/constants';
import { ROUTE_HOME, ROUTE_LOGIN } from '../../constants/routes/routes';
import baseURL from '../../config';

const schema = Yup.object().shape({
  password: Yup.string().required('El campo contraseña es requerido'),
  passwordConfirmation: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'Las dos contraseñas deben ser identicas',
  ),
});

// eslint-disable-next-line react/prop-types
const PasswordRecovery = ({ match }) => {
  // eslint-disable-next-line react/prop-types
  const { token } = match.params;
  const history = useHistory();

  const { handleSubmit, register, errors } = useForm({
    resolver: yupResolver(schema),
  });
  const [disabled, setDisabled] = useState(false);

  const theme = useSelector((state) => state.theme.dataThemeDefault);

  useEffect(async () => {
    try {
      await axios.get(
        `${baseURL + PATH_ENDPOINT_AUTH + PATH_RECOVER_PASSWORD}/${token}`,
      );
    } catch (error) {
      history.push(ROUTE_HOME);
    }
  }, []);

  const onSubmit = async (data) => {
    try {
      await axios.post(
        `${baseURL + PATH_ENDPOINT_AUTH + PATH_RECOVER_PASSWORD}`,
        {
          token,
          password: data.password,
        },
      );
      Swal.fire({
        icon: 'success',
        title: PASSWORD_EDITED,
      });
      history.push(ROUTE_LOGIN);
    } catch (error) {
      Swal.fire({
        text: error.response.data.message,
        icon: 'error',
      });
      setDisabled(false);
    }
  };

  const strings = {
    titleExpired:
      'El tiempo para cambiar la contraseña expiro, por favor empiece de nuevo',
    recoverPassword: 'Recuperar contraseña',
    newPassword: 'Nueva contraseña',
    passwordTwice: 'Ingrese su nueva contraseña dos veces',
    changePassword: 'Cambiar contraseña',
  };

  return (
    <div className="container" style={{ minHeight: '90vh' }}>
      <div className="row align-items-center" style={{ minHeight: '70vh' }}>
        <div style={{ width: '80%', margin: '0 auto' }}>
          <div>
            <h1 className="text-center" style={{ color: theme.lettersColor }}>
              {strings.newPassword}
            </h1>
            <p
              className="text-center mb-5"
              style={{ color: theme.lettersColor }}
            >
              {strings.passwordTwice}
            </p>
            <div className="form-login form-register">
              <form
                onSubmit={handleSubmit(onSubmit)}
                method="POST"
                id="loginForm"
                className="clearfix "
              >
                <Input
                  style={{ color: theme.lettersColor }}
                  type="password"
                  name="password"
                  placeholder="Contraseña"
                  register={register}
                  id="password"
                  error={errors?.password}
                />
                <Input
                  style={{ color: theme.lettersColor }}
                  type="password"
                  name="passwordConfirmation"
                  placeholder="Confirmar Contraseña"
                  register={register}
                  id="passwordConfirmation"
                  error={errors?.passwordConfirmation}
                />
                <div className="inline clearfix text-center">
                  <button
                    type="submit"
                    value="Send Messager"
                    className="btn btn-primary mb-5"
                    disabled={disabled}
                  >
                    {strings.changePassword}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordRecovery;

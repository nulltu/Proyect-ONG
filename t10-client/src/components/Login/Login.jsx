import React, { useState } from 'react';
import { Link, useHistory, Redirect } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import authAction from '../../redux/actions/authAction';
import './Login.css';
import * as constants from '../../constants';
import {
  ROUTE_HOME,
  ROUTE_REGISTER,
  ROUTE_RESET_PASSWORD,
  ROUTE_EMAIL_NOT_VERIFIED,
} from '../../constants/routes/routes';
import Input from '../Input';

const schema = yup.object().shape({
  email: yup
    .string()
    .required('El campo correo electrónico es requerido')
    .email('Ingresa un correo electrónico valido'),
  password: yup.string().required('El campo contraseña es requerido'),
});

const Login = () => {
  const isUserlogged = useSelector((state) => state.user.isUserlogged);
  const theme = useSelector((state) => state.theme.dataThemeDefault);
  const dispatch = useDispatch();
  const history = useHistory();
  const [disabled, setDisabled] = useState(false);
  const redirectToHome = () => {
    history.push(ROUTE_HOME);
  };
  const submit = async (data) => {
    setDisabled(true);
    try {
      const response = await dispatch(authAction.authUser(data));
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer);
          toast.addEventListener('mouseleave', Swal.resumeTimer);
        },
      });

      if (
        response.status === constants.STATUS_SUCCESS &&
        response.data.user.emailVerified
      ) {
        Toast.fire({
          icon: 'success',
          title: constants.AUTH_SUCCESS,
        });
        redirectToHome();
      } else if (
        response.status === constants.STATUS_SUCCESS &&
        !response.data.user.emailVerified
      ) {
        history.push(ROUTE_EMAIL_NOT_VERIFIED);
      }
      setDisabled(false);
    } catch (error) {
      Swal.fire({
        text: error.response.data.message,
        icon: 'warning',
      });
      setDisabled(false);
    }
  };
  const { handleSubmit, register, errors } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <div className="container">
      {isUserlogged ? <Redirect to="/verificar-correo" /> : null}
      <div className="main-content">
        <div className="form-login form">
          <h2 data-testid="login" style={{ color: theme.lettersColor }}>
            Inicio de sesión
          </h2>
          <form
            onSubmit={handleSubmit(submit)}
            method="POST"
            id="loginForm"
            className="clearfix"
          >
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="E-mail"
              register={register}
              error={errors?.email}
            />
            <Input
              type="password"
              name="password"
              placeholder="Contraseña"
              register={register}
              id="password"
              error={errors?.password}
            />
            <div className="inline clearfix">
              <button
                type="submit"
                value="Send Messager"
                className="btn btn-primary"
                disabled={disabled}
              >
                Login
              </button>
              <div className="inline clearfix" style={{ float: 'left' }}>
                <p style={{ color: theme.lettersColor, marginBottom: '0px' }}>
                  Olvidaste tu contraseña?{' '}
                  <Link to={ROUTE_RESET_PASSWORD}>Recuperar contraseña</Link>
                </p>
                <p style={{ color: theme.lettersColor }}>
                  ¿No eres miembro?{' '}
                  <Link to={ROUTE_REGISTER}>Registrarse ahora</Link>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

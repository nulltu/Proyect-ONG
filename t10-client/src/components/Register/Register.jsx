import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, Redirect } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import * as yup from 'yup';
import Swal from 'sweetalert2';
import Input from '../Input';
import authAction from '../../redux/actions/authAction';
import * as constants from '../../constants';
import { ROUTE_HOME, ROUTE_LOGIN } from '../../constants/routes/routes';

const schema = yup.object().shape({
  firstName: yup
    .string()
    .required('El campo nombre es requerido')
    .min(2, 'El nombre no puede ser menor a dos caracteres'),
  lastName: yup
    .string()
    .required('El campo apellido es requerido')
    .min(2, 'El apellido no puede ser menor a dos caracteres'),
  email: yup
    .string()
    .required('El campo correo electrónico es requerido')
    .email('Ingresa un correo electrónico válido'),
  password: yup
    .string()
    .required('El campo contraseña es requerido')
    .min(6, 'Ingrese una clave de al menos 6 caracteres')
    .max(20, 'La clave no puede superar los 20 caracteres'),
});

const Register = () => {
  const isUserlogged = useSelector((state) => state.user.isUserlogged);
  const theme = useSelector((state) => state.theme.dataThemeDefault);
  const dispatch = useDispatch();
  const history = useHistory();
  const [disabled, setDisabled] = useState(false);
  const [captcha, setCaptcha] = useState('');
  const captchaRef = useRef();

  const redirectToHome = () => {
    history.push(ROUTE_HOME);
  };

  const { handleSubmit, register, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const submit = async (data) => {
    setDisabled(true);
    try {
      if (!captcha) {
        const error = new Error('Debes pasar el captcha');
        throw error;
      }
      captchaRef.current.reset();
      const dataAndCaptcha = { ...data, ...{ captcha } };
      const response = await dispatch(authAction.createNewUser(dataAndCaptcha));
      Swal.fire({
        title: constants.REGISTER_OK,
        icon: 'success',
        showCloseButton: true,
      });
      if (response.status === constants.STATUS_CREATED) {
        redirectToHome();
      }
      setDisabled(false);
    } catch (error) {
      Swal.fire({
        text: error?.response?.data?.message || error.message,
        icon: 'error',
      });
      setDisabled(false);
    }
  };

  const inputs = [
    { name: 'firstName', placeholder: 'Nombre', type: 'text' },
    { name: 'lastName', placeholder: 'Apellido', type: 'text' },
    { name: 'email', placeholder: 'Correo Electronico', type: 'text' },
    { name: 'password', placeholder: 'Contraseña', type: 'password' },
  ];

  return (
    <main
      id="main"
      style={{ backgroundImage: `url("blog-img-03.jpg")` }}
      className="site-main"
    >
      {isUserlogged ? <Redirect to="/" /> : null}
      <div className="container">
        <div className="main-content">
          <div className="form-login form-register">
            <h2 data-testid="register" style={{ color: theme.lettersColor }}>
              Registrate y obtenga mas informacion
            </h2>

            <form
              onSubmit={handleSubmit(submit)}
              id="registerForm"
              className="clearfix"
            >
              {inputs.map((input) => (
                <Input
                  key={input.name}
                  register={register}
                  name={input.name}
                  type={input.type}
                  placeholder={input.placeholder}
                  error={errors[input.name]}
                />
              ))}
              <ReCAPTCHA
                sitekey={constants.RECAPTCHA_SITE_KEY}
                onChange={(captchaToken) => setCaptcha(captchaToken)}
                onExpired={() => setCaptcha('')}
                ref={captchaRef}
                theme={theme.name === 'Dark' ? theme.name : 'light'}
              />
              <div className="inline clearfix">
                <button
                  type="submit"
                  name="createaccount"
                  className="btn btn-primary"
                  disabled={disabled}
                >
                  Crear Cuenta
                </button>
                <p style={{ color: theme.lettersColor }}>
                  Ya tienes cuenta? <Link to={ROUTE_LOGIN}>Inicia Sesion</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Register;

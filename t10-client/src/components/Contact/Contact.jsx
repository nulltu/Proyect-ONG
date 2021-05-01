import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import Swal from 'sweetalert2';
import Input from '../Input';
import userActions from '../../redux/actions/userActions';
import * as constants from '../../constants';

const schema = yup.object().shape({
  name: yup.string().required('El nombre es requerido'),
  email: yup
    .string()
    .required('El correo electrónico es requerido')
    .email('Ingresa un correo electrónico valido'),
  question: yup.string().required('El mensaje es requerido'),
});

const Contact = () => {
  const [disabled, setDisabled] = useState(false);
  const theme = useSelector((state) => state.theme.dataThemeDefault);
  const dispatch = useDispatch();
  const inputs = [
    { name: 'name', placeholder: 'Nombre', type: 'text' },
    { name: 'email', placeholder: 'Correo Electrónico', type: 'email' },
    { name: 'question', placeholder: 'Mensaje', type: 'text' },
  ];

  const { handleSubmit, register, errors, setValue } = useForm({
    resolver: yupResolver(schema),
  });

  const submit = async (data) => {
    setDisabled(true);
    try {
      const response = await dispatch(userActions.sendEmail(data));
      Swal.fire({
        title: constants.SENDMAIL_OK,
      });
      if (response.status === constants.STATUS_SEND) {
        setValue('name', '');
        setValue('email', '');
        setValue('question', '');
      }
      setDisabled(false);
    } catch (error) {
      Swal.fire({
        text: error.response.data.message,
      });
      setDisabled(false);
    }
  };

  return (
    <div className="col-lg-12">
      <div className="form-login">
        <h2 data-testid="contact" style={{ color: theme.lettersColor }}>
          Contacto
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
          <div
            style={{
              margin: '0 auto',
              display: 'flex',
              justifyContent: 'center',
            }}
            className="inline clearfix "
          >
            <button
              type="submit"
              className="btn btn-primary"
              disabled={disabled}
            >
              Enviar Mensaje
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;

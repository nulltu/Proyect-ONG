import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../Input';

import CoursesActions from '../../redux/actions/coursesActions';
import * as constants from '../../constants';
import createFormData from '../../utils/createFormData';

const schema = yup.object().shape({
  name: yup.string().required('El Nombre es requerido'),
  duration: yup.number().required('La duracion es requerida'),
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
  description: yup.string().required('La descripcion es requerida'),
});

const FormCourses = ({ courses, edit, setEdit, setCreate }) => {
  const dispatch = useDispatch();
  const inputRef = useRef();
  const [disabled, setDisabled] = useState(false);
  const defaultVal = edit
    ? {
        name: courses.name,
        description: courses.description,
        duration: courses.duration,
      }
    : {};

  const theme = useSelector((state) => state.theme.dataThemeDefault);
  const inputs = [
    { name: 'name', placeholder: 'Título de la capacitación', type: 'text' },
    { name: 'image', placeholder: 'Imagen', type: 'file' },
    { name: 'duration', placeholder: 'Duración', type: 'text' },
  ];

  const { handleSubmit, register, errors } = useForm({
    resolver: yupResolver(schema),
    defaultValues: defaultVal,
  });

  const onSubmit = async (data) => {
    setDisabled(true);
    try {
      const formData = createFormData(data);
      const response = await dispatch(
        edit
          ? CoursesActions.putCourses(formData, courses.id)
          : CoursesActions.postCourses(formData),
      );

      if (response.status === constants.STATUS_CREATED) {
        Swal.fire({
          icon: 'success',
          title: edit ? constants.COURSES_UPDATED : constants.COURSES_CREATED,
        });
        await dispatch(CoursesActions.getAllCourses());
        if (edit) {
          setEdit(false);
        } else {
          setCreate(false);
        }
      }
      setDisabled(false);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: error.response.data.message,
      });
      setDisabled(false);
    }
  };
  return (
    <div className="form-login form-register">
      <form
        onSubmit={handleSubmit(onSubmit)}
        id="registerForm"
        className="clearfix"
      >
        <span> {errors?.course?.message}</span>
        <br />
        <br />

        {inputs.map((input) => (
          <Input
            key={input.name}
            register={register}
            ref={inputRef}
            name={input.name}
            type={input.type}
            placeholder={input.placeholder}
            error={errors[input.name]}
          />
        ))}
        <div className="field">
          <textarea
            style={{
              width: '100%',
              height: '150px',
              color: theme.lettersColor,
            }}
            placeholder="Descripción..."
            type="text"
            name="description"
            id="description"
            ref={register}
          />
          <span className="text-danger text-small d-block mb-2">
            {errors?.description?.message}
          </span>
        </div>
        <span className="text-danger text-small d-block mb-2">
          {errors?.editor?.message}
        </span>
        <div
          style={{
            margin: '10px auto',
            display: 'flex',
            justifyContent: 'center',
          }}
          className="inline clearfix "
        >
          <button
            style={{ margin: '0 10px', backgroundColor: 'red' }}
            type="submit"
            className="btn btn-primary"
            onClick={() => {
              if (edit) {
                setEdit(false);
              } else {
                setCreate(false);
              }
            }}
            disabled={disabled}
          >
            Cancelar
          </button>
          <button type="submit" className="btn btn-primary" disabled={disabled}>
            {edit ? 'Actualizar' : 'Enviar'}
          </button>
        </div>
      </form>
    </div>
  );
};

FormCourses.propTypes = {
  edit: PropTypes.bool,
  setEdit: PropTypes.func,
  setCreate: PropTypes.func,
  courses: PropTypes.objectOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    }),
  ),
};

FormCourses.defaultProps = {
  edit: false,
  setEdit: () => {},
  setCreate: () => {},
  courses: {},
};
export default FormCourses;

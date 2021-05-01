import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import * as yup from 'yup';
import Input from '../Input';
import CoursesActions from '../../redux/actions/coursesActions';
import * as constants from '../../constants';

const schema = yup.object().shape({
  date: yup.string().required('La fecha es requerida'),

  schedule: yup.string().required('El horario es requerido '),
});

const CreateOnCourse = ({ id, onCourse, edit, setEdit, setCreate }) => {
  const defaultVal = edit
    ? {
        // eslint-disable-next-line no-undef
        date: moment(onCourse.date).format('L'),
        schedule: onCourse.schedule,
      }
    : {};
  const inputRef = useRef();
  const dispatch = useDispatch();
  const [disabled, setDisabled] = useState(false);

  const inputs = [
    { name: 'date', placeholder: 'Fecha (Dia/Mes/Años)', type: 'text' },
    {
      name: 'schedule',
      placeholder: 'Horario (Hora de Inicio - Hora Final)',
      type: 'text',
    },
  ];

  const { handleSubmit, register, errors } = useForm({
    resolver: yupResolver(schema),
    defaultValues: defaultVal,
  });

  const onSubmit = async (data) => {
    setDisabled(true);
    try {
      const form = {
        courseId: id,
        date: data.date,
        schedule: data.schedule,
      };

      const response = await dispatch(
        edit
          ? CoursesActions.updateOnCourse(form, onCourse.id)
          : CoursesActions.createOnCourse(form),
      );

      if (response.status === constants.STATUS_CREATED) {
        Swal.fire({
          icon: 'success',
          title: edit
            ? constants.ON_COURSES_UPDATED
            : constants.ON_COURSES_CREATED,
        });
        await dispatch(CoursesActions.getAllOnCourses());
        setDisabled(false);
        if (edit) {
          setEdit(false);
        } else {
          setCreate(false);
        }
      }
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
        <div
          style={{
            margin: '0 auto 0px auto',
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
          <button
            type="submit"
            className="btn btn-primary mb-2"
            disabled={disabled}
          >
            {edit ? 'Editar Cursada' : 'Crear Cursada'}
          </button>
        </div>
      </form>
    </div>
  );
};

CreateOnCourse.propTypes = {
  edit: PropTypes.bool,
  setEdit: PropTypes.func,
  setCreate: PropTypes.func,
  id: PropTypes.number.isRequired,
  onCourse: PropTypes.objectOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      courseId: PropTypes.number.isRequired,
      date: PropTypes.string.isRequired,
      schedule: PropTypes.string.isRequired,
    }),
  ),
};

CreateOnCourse.defaultProps = {
  edit: false,
  setEdit: () => {},
  setCreate: () => {},

  onCourse: {},
};
export default CreateOnCourse;

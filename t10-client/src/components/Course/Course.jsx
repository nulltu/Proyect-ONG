import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { ROUTE_LOGIN } from '../../constants/routes/routes';
import inscriptionsActions from '../../redux/actions/inscriptionAction';
import { CREATED_INSCRIPTION, STATUS_CREATED } from '../../constants';

const Course = (props) => {
  const theme = useSelector((state) => state.theme.dataThemeDefault);
  const isUserlogged = useSelector((state) => state.user.isUserlogged);
  const [inscription, setInscription] = useState(false);
  const history = useHistory();
  const { course, isInscripted } = props;
  const dispatch = useDispatch();

  const handleClick = async (courseName, onCourseId) => {
    const result = await Swal.fire({
      title: '¿Estas Seguro que deseas inscribirte?',
      text: `Al ${courseName}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Inscribirse!',
    });
    if (result.isConfirmed) {
      try {
        const response = await dispatch(
          inscriptionsActions.createInscription({ onCourseId }),
        );
        if (response.status === STATUS_CREATED) {
          setInscription(true);
          Swal.fire('Inscripcion Creada!', CREATED_INSCRIPTION, 'success');
        }
      } catch (err) {
        Swal.fire('Error!', err.response.data.message, 'error');
      }
    }
  };

  const statusCourse =
    course?.OnCourses[0]?.active === 1 ? 'Disponible' : 'No disponible';

  const convertDateFormat = (onCourse) => {
    const { date } = onCourse;
    const cutDateCourse = date.slice(0, 10);
    const result = cutDateCourse.split('-').reverse().join('/');
    return result;
  };

  return (
    <div className="col-lg-6 col-sm-12 col-12" id="card-courses">
      <div
        className="card-courses-image"
        style={{ backgroundImage: `url(${course.image})` }}
      >
        <h3 className="team-name">{course.name}</h3>
        <span className="team-job">{course.description}</span>
      </div>
      <div className="col-lg-12">
        {statusCourse === 'Disponible' ? (
          <table className="table table table-hover">
            <thead>
              <tr>
                <th scope="col" style={{ color: theme.lettersColor }}>
                  Fecha
                </th>
                <th scope="col" style={{ color: theme.lettersColor }}>
                  Horario
                </th>
                <th scope="col" style={{ color: theme.lettersColor }}>
                  Inscripción
                </th>
              </tr>
            </thead>
            <tbody>
              {course.OnCourses.map((onCourse) => (
                <tr>
                  <td style={{ color: theme.lettersColor }}>
                    {convertDateFormat(onCourse)}
                  </td>
                  <th scope="row" style={{ color: theme.lettersColor }}>
                    {onCourse.schedule}
                  </th>
                  <td>
                    <Link
                      onClick={() =>
                        isUserlogged
                          ? handleClick(course.name, onCourse.id)
                          : history.push(ROUTE_LOGIN)
                      }
                      className="btn-primary"
                      disabled={isInscripted || inscription}
                      style={{ color: theme.lettersColor }}
                    >
                      {isInscripted || inscription
                        ? 'Ud ya está registrado'
                        : 'Inscribirse'}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <table className="table table table-hover">
            <thead>
              <p
                className="not-on-courses"
                style={{ color: theme.lettersColor }}
              >
                {' '}
                Muy pronto tendremos fechas disponibles.
              </p>
            </thead>
          </table>
        )}
      </div>
    </div>
  );
};

Course.propTypes = {
  course: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    OnCourses: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        active: PropTypes.number,
        date: PropTypes.string,
        schedule: PropTypes.string,
      }),
    ),
  }).isRequired,
  isInscripted: PropTypes.bool.isRequired,
};

export default Course;

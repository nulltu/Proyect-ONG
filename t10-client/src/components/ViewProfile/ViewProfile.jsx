import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import propTypes from 'prop-types';
import userActions from '../../redux/actions/userActions';
import authActions from '../../redux/actions/authAction';
import * as constants from '../../constants';
import { ROUTE_HOME } from '../../constants/routes/routes';
import themeActions from '../../redux/actions/themeActions';

const ViewProfile = ({ user }) => {
  const [darkModeOn, setDarkModeOn] = useState(false);
  const themes = {
    default: 'Default',
    dark: 'Dark',
  };

  const theme = useSelector((state) => state.theme.dataThemeDefault);

  const style = {
    image: {
      backgroundImage: `url(${user.image})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    },
  };

  const dispatch = useDispatch();
  const history = useHistory();
  const deleteUser = async () => {
    const result = await Swal.fire({
      title: '¿Estas Seguro?',
      text: '¡No se puede revertir!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!',
    });
    if (result.isConfirmed) {
      try {
        const response = await dispatch(userActions.deleteUser(user.id));

        if (response.status === constants.STATUS_NO_CONTENT) {
          await dispatch(authActions.logoutApp());
          localStorage.clear();
          Swal.fire('Eliminado!', constants.NO_CONTENT, 'success');
          history.push(ROUTE_HOME);
        }
      } catch (err) {
        Swal.fire('Error!', err.response.data.message, 'error');
      }
    }
  };

  const darkMode = async () => {
    await dispatch(themeActions.setDataTheme(themes.dark));
    setDarkModeOn(!darkModeOn);
  };

  const defaultMode = async () => {
    await dispatch(themeActions.setDataTheme(themes.default));
    setDarkModeOn(!darkModeOn);
  };

  return (
    <div>
      <div className="author clearfix author-container">
        <div className="author-avatar" style={style.image} />
        <div className="author-content">
          <div className="author-title">
            <h3 style={{ color: theme.lettersColor }}>{user.firstName}</h3>
            <h3 style={{ color: theme.lettersColor }} className="ml-1">
              {user.lastName}
            </h3>
          </div>
          <div className="author-info">
            <p>{user.email}</p>
          </div>
        </div>
      </div>
      <div className="btns-container">
        <button
          className="btn-danger button"
          type="button"
          onClick={deleteUser}
        >
          Eliminar cuenta
        </button>
      </div>
      {darkModeOn ? (
        <div className="btns-container">
          <button
            className="btn-dark button"
            type="button"
            onClick={defaultMode}
            style={{ padding: '10px 22px' }}
          >
            Modo Default
          </button>
        </div>
      ) : (
        <div className="btns-container">
          <button
            className="btn-dark button"
            type="button"
            onClick={darkMode}
            style={{ padding: '10px 22px' }}
          >
            Modo Oscuro
          </button>
        </div>
      )}
    </div>
  );
};

ViewProfile.propTypes = {
  user: propTypes.shape({
    id: propTypes.number.isRequired,
    firstName: propTypes.string.isRequired,
    lastName: propTypes.string.isRequired,
    email: propTypes.string.isRequired,
    image: propTypes.string.isRequired,
  }).isRequired,
};

export default ViewProfile;

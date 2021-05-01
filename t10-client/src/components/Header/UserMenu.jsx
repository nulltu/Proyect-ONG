import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import authAction from '../../redux/actions/authAction';
import { ADMIN } from '../../constants/constants';
import styles from './Header.module.css';
import links from '../../constants/linksNavegation/adminLinksNavegation';

const UserMenu = ({
  hamburgerState,
  setHamburgerState,
  userMenuState,
  setUserMenuState,
  userMenuRef,
}) => {
  const body = document.getElementById('body');
  if (userMenuState || hamburgerState) {
    body.classList.add(styles.body);
  } else {
    body.classList.remove(styles.body);
  }
  const refreshToken = useSelector((state) => state.user.refreshToken);

  const dispatch = useDispatch();

  const logout = () => {
    setHamburgerState(false);
    setUserMenuState(false);
    dispatch(authAction.logoutApp(refreshToken));
  };

  const theme = useSelector((state) => state.theme.dataThemeDefault);
  const user = useSelector((state) => state.user);

  const closeHeader = () => {
    setUserMenuState(false);
    setHamburgerState(false);
  };

  return (
    <ul
      style={{ backgroundColor: theme.headerColor }}
      className={
        userMenuState
          ? `${styles.userNavContainer} ${styles.showNav}`
          : styles.userNavContainer
      }
      ref={userMenuRef}
      onMouseEnter={() =>
        userMenuRef.current.classList.add(styles.showUserMenu)
      }
      onMouseLeave={() =>
        userMenuRef.current.classList.remove(styles.showUserMenu)
      }
    >
      <li>
        <Link
          to="/perfil"
          onClick={closeHeader}
          style={{ color: theme.lettersColor }}
        >
          Mi Perfil
        </Link>
      </li>
      {user.roleUser === ADMIN ? (
        <>
          {links.map((link) => (
            <li key={link.name}>
              <Link
                to={link.url}
                style={{ color: theme.lettersColor }}
                onClick={closeHeader}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </>
      ) : null}
      <li className={styles.btn}>
        <button type="button" className="btn btn-danger" onClick={logout}>
          Salir
        </button>
      </li>
    </ul>
  );
};

UserMenu.propTypes = {
  hamburgerState: PropTypes.bool.isRequired,
  userMenuState: PropTypes.bool.isRequired,
  setHamburgerState: PropTypes.func.isRequired,
  setUserMenuState: PropTypes.func.isRequired,
  userMenuRef: PropTypes.oneOfType([
    PropTypes.func,
    // eslint-disable-next-line react/forbid-prop-types
    PropTypes.shape({ current: PropTypes.any }),
  ]).isRequired,
};

export default UserMenu;

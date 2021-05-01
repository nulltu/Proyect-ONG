import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import links from '../../constants/linksNavegation/linksNavegation';
import styles from './Header.module.css';

const Navbar = ({
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

  const theme = useSelector((state) => state.theme.dataThemeDefault);
  const user = useSelector((state) => state.user);

  const imgStyle = {
    backgroundImage: `url(${user.userData.image})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  };

  const closeHeader = () => {
    setUserMenuState(false);
    setHamburgerState(false);
  };

  const onMouseEnter = () => {
    userMenuRef.current.classList.add(styles.showUserMenu);
    closeHeader();
  };

  const onMouseLeave = () => {
    userMenuRef.current.classList.remove(styles.showUserMenu);
    closeHeader();
  };

  return (
    <ul
      style={{ backgroundColor: theme.headerColor }}
      className={
        hamburgerState
          ? `${styles.navContainer} ${styles.showNav}`
          : styles.navContainer
      }
      id="navbar"
    >
      {links.map((link) => (
        <li key={link.name}>
          <Link
            to={link.url}
            style={{ color: theme.lettersColor }}
            onClick={() => setHamburgerState(false)}
          >
            {link.name}
          </Link>
        </li>
      ))}
      {!user.isUserlogged ? (
        <li className={styles.btn}>
          <Link
            to="/login"
            className="btn btn-primary"
            onClick={() => setHamburgerState(false)}
          >
            Ingresar
          </Link>
        </li>
      ) : (
        <>
          <li className={styles.btn}>
            <button
              className={`${styles.profileBtn} ${styles.profileBtnSm}`}
              type="button"
              onClick={() => setUserMenuState(true)}
              style={imgStyle}
            >
              <div />
            </button>
          </li>
          <li onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            <button
              className={`${styles.profileBtn} ${styles.profileBtnLg}`}
              type="button"
              style={imgStyle}
            >
              <div />
            </button>
          </li>
        </>
      )}
    </ul>
  );
};

Navbar.propTypes = {
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

export default Navbar;

import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from './Navbar';
import UserMenu from './UserMenu';
import styles from './Header.module.css';

const Header = () => {
  const [hamburgerState, setHamburgerState] = useState(false);
  const [userMenuState, setUserMenuState] = useState(false);
  const userMenuRef = useRef();

  const body = document.getElementById('body');
  if (userMenuState || hamburgerState) {
    body.classList.add(styles.body);
  } else {
    body.classList.remove(styles.body);
  }

  const dataOrganization = useSelector(
    (state) => state.organization.dataOrganization[0],
  );
  const theme = useSelector((state) => state.theme.dataThemeDefault);

  return (
    <header
      className={styles.header}
      style={{ backgroundColor: theme.headerColor }}
    >
      <div className={`${styles.headerContainer} container`}>
        <div className={styles.imageContainer}>
          <Link to="/">
            <img
              src={dataOrganization.image}
              alt=""
              style={{ maxHeight: '70px' }}
            />
          </Link>
        </div>
        <button
          type="button"
          className={
            (styles.hamburgerBtn,
            hamburgerState
              ? `c-hamburger c-hamburger--htx is-active ${
                  styles.hamburgerBtn
                } ${theme.name === 'Dark' ? styles.whiteHamburger : null}`
              : `c-hamburger c-hamburger--htx ${styles.hamburgerBtn} ${
                  theme.name === 'Dark' ? styles.whiteHamburger : null
                }`)
          }
          style={{ right: 30, color: theme.lettersColor }}
          onClick={() => {
            if (hamburgerState && !userMenuState) {
              setHamburgerState(false);
              setUserMenuState(false);
            } else if (userMenuState) {
              setUserMenuState(false);
            } else {
              setHamburgerState(true);
            }
          }}
        >
          <span />
        </button>
        <Navbar
          hamburgerState={hamburgerState}
          userMenuState={userMenuState}
          setHamburgerState={setHamburgerState}
          setUserMenuState={setUserMenuState}
          userMenuRef={userMenuRef}
        />
        <UserMenu
          hamburgerState={hamburgerState}
          userMenuState={userMenuState}
          setHamburgerState={setHamburgerState}
          setUserMenuState={setUserMenuState}
          userMenuRef={userMenuRef}
        />
      </div>
    </header>
  );
};

export default Header;

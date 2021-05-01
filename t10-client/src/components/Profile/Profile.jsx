import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import userActions from '../../redux/actions/userActions';
import ViewProfile from '../ViewProfile';
import EditProfile from '../EditProfile';
import ViewInscription from '../ViewInscription';

import './Profile.css';

const Profile = () => {
  const [recharge, setRecharge] = useState(true);
  const user = useSelector((state) => state.user);

  const theme = useSelector((state) => state.theme.dataThemeDefault);

  const userNavView = [
    {
      name: 'Ver perfil',
      component: <ViewProfile user={user.userData} />,
    },
    {
      name: 'Editar perfil',
      component: <EditProfile recharge={setRecharge} user={user.userData} />,
    },
    {
      name: 'Ver Inscripciones',
      component: (
        <ViewInscription
          recharge={setRecharge}
          user={user.userData}
          inscriptions={user.inscription}
        />
      ),
    },
  ];
  const [actualViewName, setActualView] = useState(userNavView[0].name);
  const [actualRenderComponent, setActualRenderComponent] = useState(
    userNavView[0].component,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (recharge) {
      dispatch(userActions.getUser(user.id));
      setRecharge(!recharge);
      setActualView(userNavView[0].name);
      setActualRenderComponent(userNavView[0].component);
    }
  }, [dispatch, recharge]);

  const changeViewAndComponentRendered = (view) => {
    setActualView(view.name);
    setActualRenderComponent(view.component);
  };

  return (
    <div id="main" className="site-main" style={{ minHeight: '90vh' }}>
      <div className="account-wrapper mb-4">
        <div className="container">
          <div className="row align-items-center" style={{ minHeight: '80vh' }}>
            <div className="col-lg-3">
              <nav
                style={{
                  backgroundColor: theme.tableColor,
                  border: `1px solid ${theme.borderColor}`,
                }}
                className="account-bar"
              >
                <ul>
                  {userNavView.map((view) => (
                    <li
                      key={view.name}
                      className={actualViewName === view.name ? 'active' : null}
                      style={{ borderTop: `1px solid ${theme.borderColor}` }}
                    >
                      <Link
                        to="/perfil"
                        onClick={() => changeViewAndComponentRendered(view)}
                      >
                        {view.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
            <div className="col-lg-9">
              <div className="account-content dashboard">
                <h3
                  className="account-title text-center"
                  style={{
                    backgroundColor: theme.tableColor,
                    color: theme.lettersColor,
                    marginBottom: '0',
                    border: `1px solid ${theme.borderColor}`,
                  }}
                >
                  TABLERO
                </h3>
                <div
                  style={{
                    backgroundColor: theme.backgroundColor,
                    color: theme.lettersColor,
                    border: `1px solid ${theme.borderColor}`,
                  }}
                  className="account-main"
                >
                  {actualRenderComponent}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { STATUS_SUCCESS } from '../../constants';
import authAction from '../../redux/actions/authAction';
import { ROUTE_HOME } from '../../constants/routes/routes';

const EmailVerification = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.dataThemeDefault);
  const history = useHistory();
  const [emailVerified, setEmailVerified] = useState(false);
  const { token } = useParams();
  useEffect(async () => {
    try {
      const response = await dispatch(authAction.emailVerification(token));
      if (response.status === STATUS_SUCCESS) {
        setEmailVerified(true);
      }
    } catch (error) {
      history.push(ROUTE_HOME);
    }
  }, []);

  return (
    emailVerified && (
      <div className="text-center m-5">
        <h3 style={{ color: theme.lettersColor }}>
          Su cuenta de correo electronico ha sido validada con exito. Ya puede
          iniciar sesion para acceder a su cuenta.
        </h3>
      </div>
    )
  );
};

export default EmailVerification;

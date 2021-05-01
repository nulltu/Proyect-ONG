import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { STATUS_SEND } from '../../constants';
import { ROUTE_HOME } from '../../constants/routes/routes';
import userActions from '../../redux/actions/userActions';
import * as constants from '../../constants';

const EmailNotVerified = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const theme = useSelector((state) => state.theme.dataThemeDefault);
  const id = useSelector((state) => state.user.id);
  const isUserlogged = useSelector((state) => state.user.isUserlogged);
  const accessToken = useSelector((state) => state.user.accessToken);
  const history = useHistory();

  useEffect(async () => {
    if (!accessToken || isUserlogged) {
      history.push(ROUTE_HOME);
    }
  }, []);

  const sendEmail = async () => {
    try {
      setLoading(true);
      const res = await dispatch(userActions.sendEmailVerification(id));
      if (res.status === STATUS_SEND) {
        Swal.fire({
          title: constants.SENDMAIL_VERIFICATION,
          icon: 'success',
        });
        setLoading(false);
      }
    } catch (error) {
      Swal.fire({
        text: error.response.data.message,
        icon: 'error',
      });
      setLoading(false);
    }
  };

  return (
    <div className="text-center m-5">
      <h3 style={{ color: theme.lettersColor }}>
        No hemos podido verificar su correo electronico. <br /> Si desea
        reenviarlo nuevamente o no le ha llegado de click al siguiente boton.
      </h3>
      <p style={{ color: theme.lettersColor }} className="hint">
        Espere 5 minutos para apretar el boton nuevamente si no le ha llegado
        aun.
      </p>
      <br />
      <button
        type="submit"
        value="Send Messager"
        className="btn btn-primary m-5"
        onClick={async () => sendEmail()}
        disabled={loading}
      >
        {!loading
          ? 'Enviar correo de verificacion'
          : 'Enviando verificacion...'}
      </button>
    </div>
  );
};

export default EmailNotVerified;

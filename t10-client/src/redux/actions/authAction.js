import axios from 'axios';
import * as actionTypes from '../reducers/actionTypes';
import * as constants from '../../constants';
import baseURL from '../../config';

const authAction = {
  createNewUser: (data) => async () => {
    const response = await axios.post(
      `${baseURL + constants.PATH_ENDPOINT_AUTH}register`,
      data,
    );
    return response;
  },

  authUser: (data) => async (dispatch) => {
    const response = await axios.post(
      `${baseURL + constants.PATH_ENDPOINT_AUTH}login`,
      data,
    );
    const isRoledUser = response.data.user.roleId === 1 ? 'admin' : 'user';
    dispatch({
      type: actionTypes.AUTH_USER,
      payload: {
        id: response.data.user.id,
        accessToken: response.data.access_token,
        refreshToken: response.data.refresh_token,
        roleUser: response.data.user.roleId,
        userLogged: response.data.user.emailVerified,
        isRoledUser,
        userData: response.data.user,
      },
    });
    return response;
  },
  logoutApp: (refreshToken) => async (dispatch) => {
    if (refreshToken) {
      await axios.delete(`${baseURL + constants.PATH_ENDPOINT_AUTH}logout`, {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      });
    }
    dispatch({
      type: actionTypes.LOGOUT_USER,
    });
  },
  refreshToken: (refreshToken) => async (dispatch) => {
    const response = await axios.post(
      `${baseURL + constants.PATH_ENDPOINT_AUTH}refreshToken`,
      {},
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      },
    );
    dispatch({
      type: actionTypes.REFRESH_TOKEN,
      payload: {
        accessToken: response.data.access_token,
        refreshToken: response.data.refresh_token,
      },
    });
    return response;
  },
  emailVerification: (token) => async (dispatch) => {
    const response = await axios.get(
      `${baseURL + constants.PATH_ENDPOINT_AUTH}emailVerification`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    dispatch({
      type: actionTypes.EMAIL_VERIFICATION,
    });
    return response;
  },
};

export default authAction;

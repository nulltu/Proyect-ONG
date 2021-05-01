import axios from 'axios';
import { loadState } from '../localStorage/localStorage';
import store from '../store';
import authAction from '../redux/actions/authAction';
import { STATUS_UNAUTHORIZED } from '../constants/constants';
import baseURL from '../config';

const connect = axios.create({ baseURL });

connect.interceptors.request.use(async (conf) => {
  const config = conf;
  const serializedState = loadState();
  if (serializedState) {
    const { accessToken } = serializedState.user;
    config.headers = {
      Authorization: `Bearer ${accessToken}`,
    };
  }
  return config;
});

connect.interceptors.response.use(
  (response) => response,
  async (error) => {
    const serializedState = loadState();
    if (serializedState) {
      const { refreshToken } = serializedState.user;
      const originalRequest = error.config;
      if (
        refreshToken &&
        error.response.status === STATUS_UNAUTHORIZED &&
        // eslint-disable-next-line no-underscore-dangle
        !originalRequest._retry
      ) {
        // eslint-disable-next-line no-underscore-dangle
        originalRequest._retry = true;
        try {
          const response = await store.dispatch(
            authAction.refreshToken(refreshToken),
          );
          axios.defaults.headers.common.Authorization = `Bearer ${response.data.access_token}`;
          return connect(originalRequest);
        } catch (err) {
          /* MESSAGE TO LOGOUT AGAIN AND REDIRECT TO HOME */
          store.dispatch(authAction.logoutApp());
        }
      }
    }
    throw error;
  },
);

export default connect;

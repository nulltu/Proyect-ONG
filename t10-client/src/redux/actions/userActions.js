import * as actionTypes from '../reducers/actionTypes';
import * as constants from '../../constants';
import connect from '../../axios/axios.config';
import createFormData from '../../utils/createFormData';

const userActions = {
  sendEmail: (data) => async () => {
    const response = await connect.post(
      `${constants.PATH_ENDPOINT_SENDMAIL}`,
      data,
    );
    return response;
  },
  getAllUsers: () => async (dispatch) => {
    const response = await connect.get(constants.PATH_ENDPOINT_USERS);
    dispatch({
      type: actionTypes.LIST_USERS,
      payload: {
        listUsers: response.data,
      },
    });
    return response;
  },
  searchUsers: (search, roleId) => async (dispatch) => {
    const roleIdFilter = roleId ? `&role=${roleId}` : '';
    const response = await connect.get(
      `${constants.PATH_ENDPOINT_USERS}?search=${search}${roleIdFilter}`,
    );
    dispatch({
      type: actionTypes.LIST_USERS,
      payload: {
        listUsers: response.data,
      },
    });
    return response;
  },
  filterUsers: (roleId, search) => async (dispatch) => {
    const searchFilter = search ? `&search=${search}` : '';
    const response = await connect.get(
      `${constants.PATH_ENDPOINT_USERS}?role=${roleId}${searchFilter}`,
    );
    dispatch({
      type: actionTypes.LIST_USERS,
      payload: {
        listUsers: response.data,
      },
    });
    return response;
  },
  getUser: (id) => async (dispatch) => {
    const response = await connect.get(
      `${constants.PATH_ENDPOINT_USERS}/${id}`,
    );
    dispatch({
      type: actionTypes.GET_USER,
      payload: {
        userData: response.data,
      },
    });
    return response;
  },
  editUserAdmin: (id, firstName, lastName, email, roleId) => async (
    dispatch,
  ) => {
    const data = {
      firstName,
      lastName,
      email,
      roleId,
    };
    const response = await connect.put(
      `${constants.PATH_ENDPOINT_USERS}/${id}`,
      data,
    );
    dispatch({
      type: actionTypes.EDIT_USER_ADMIN,
    });
    return response;
  },
  editUser: (firstName, lastName, image) => async (dispatch) => {
    const data = createFormData({
      firstName,
      lastName,
      ...(image ? { image } : {}),
    });
    const response = await connect.put(
      `${constants.PATH_ENDPOINT_USERS}`,
      data,
    );
    dispatch({
      type: actionTypes.EDIT_USER,
      payload: {
        newData: response.data,
      },
    });
    return response;
  },
  deleteUser: (id) => async (dispatch) => {
    const response = await connect.delete(
      `${constants.PATH_ENDPOINT_USERS}/${+id}`,
    );
    dispatch({
      type: actionTypes.DELETE_USER,
      payload: { id },
    });
    return response;
  },
  deleteUserImage: () => async (dispatch) => {
    const response = await connect.delete(
      `${constants.PATH_ENDPOINT_USERS}/image`,
    );
    dispatch({
      type: actionTypes.DELETE_USER,
    });
    return response;
  },
  createUser: (firstName, lastName, password, email, roleId) => async (
    dispatch,
  ) => {
    const data = {
      firstName,
      lastName,
      password,
      email,
      roleId,
    };
    const response = await connect.post(
      `${constants.PATH_ENDPOINT_USERS}`,
      data,
    );
    dispatch({
      type: actionTypes.CREATE_USER,
    });
    return response;
  },
  getInscription: (id) => async (dispatch) => {
    const response = await connect.get(
      `${constants.PATH_INSCRIPTION_USER}/${id}`,
    );

    dispatch({
      type: actionTypes.GET_USER_INSCRIPTIONS,
      payload: {
        inscriptions: response.data,
      },
    });
    return response;
  },
  getRoles: () => async (dispatch) => {
    const response = await connect.get(
      `${constants.PATH_ENDPOINT_USERS}/roles`,
    );

    dispatch({
      type: actionTypes.GET_USERS_ROLES,
      payload: {
        roles: response.data,
      },
    });
    return response;
  },
  sendEmailVerification: (id) => async (dispatch) => {
    const response = await connect.get(
      `${constants.PATH_ENDPOINT_AUTH}sendEmailVerification/${id}`,
    );
    dispatch({
      type: actionTypes.EMAIL_VERIFICATION,
    });
    return response;
  },
};

export default userActions;

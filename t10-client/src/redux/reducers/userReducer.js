import * as actionTypes from './actionTypes';

const initialState = {
  id: 0,
  accessToken: '',
  roleUser: '',
  listUsers: '',
  isUserlogged: false,
  refreshToken: '',
  isRoledUser: '',
  userData: {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    image: '',
  },
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_USER:
      return {
        ...state,
        id: action.payload.id,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
        roleUser: action.payload.roleUser,
        isUserlogged: action.payload.userLogged,
        isRoledUser: action.payload.isRoledUser,
        userData: action.payload.userData,
      };
    case actionTypes.SEND_MAIL:
      return {
        ...state,
      };
    case actionTypes.LOGOUT_USER:
      localStorage.clear();
      return {
        ...state,
        ...initialState,
      };
    case actionTypes.LIST_USERS:
      return {
        ...state,
        listUsers: action.payload.listUsers,
      };
    case actionTypes.GET_USER:
      return {
        ...state,
        userData: action.payload.userData,
      };
    case actionTypes.EDIT_USER:
      return {
        ...state,
        userData: { ...state.userData, ...action.payload.newData },
      };
    case actionTypes.EDIT_USER_ADMIN:
      return {
        ...state,
      };
    case actionTypes.DELETE_USER:
      return {
        ...state,
      };
    case actionTypes.DELETE_USER_IMAGE:
      return {
        ...state,
      };
    case actionTypes.REFRESH_TOKEN:
      return {
        ...state,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
      };
    case actionTypes.CREATE_USER:
      return {
        ...state,
      };
    case actionTypes.GET_USER_INSCRIPTIONS:
      return {
        ...state,
        inscription: action.payload.inscriptions,
      };
    case actionTypes.GET_USERS_ROLES:
      return {
        ...state,
        roles: action.payload.roles,
      };
    default:
      return state;
  }
};

export default userReducer;

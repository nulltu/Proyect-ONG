import * as actionsTypes from './actionTypes';

const initialState = {
  dataOrganization: [],
  getDataOrganization: () => {},
};

const organizationReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionsTypes.GET_DATA_ORGANIZATION:
      return {
        ...state,
        dataOrganization: action.payload,
      };
    case actionsTypes.UPDATE_ORGANIZATION:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default organizationReducer;

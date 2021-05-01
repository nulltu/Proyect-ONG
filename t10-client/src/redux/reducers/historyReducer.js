import * as actionTypes from './actionTypes';

const initialState = {
  dataHistory: [],
};

const historyReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_HISTORY:
      return {
        ...state,
        dataHistory: action.payload,
      };
    case actionTypes.UPDATE_HISTORY:
      return {
        ...state,
      };
    case actionTypes.CREATE_HISTORY:
      return {
        ...state,
      };
    case actionTypes.DELETE_HISTORY:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default historyReducer;

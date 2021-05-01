import * as actionsTypes from './actionTypes';

const initialState = {
  dataEntriesType: [],
  getDataEntriesType: () => {},
};

const EntriesTypeReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionsTypes.GET_ENTRIES_TYPE:
      return {
        ...state,
        dataEntriesType: action.payload,
      };
    default:
      return state;
  }
};

export default EntriesTypeReducer;

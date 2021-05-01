import {
  CREATE_ENTRIES,
  DELETE_ENTRIES,
  GET_DATA_ENTRIES,
  GET_DATA_ENTRIES_BY_ID,
  UPDATE_ENTRIES,
} from './actionTypes';

const initialState = {
  dataEntries: [],
  entries: {
    id: null,
    title: '',
    content: '',
    image: '',
    type: '',
  },
};

const entriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ENTRIES:
      return {
        ...state,
        dataEntries: action.payload,
      };
    case UPDATE_ENTRIES:
      return {
        ...state,
      };
    case GET_DATA_ENTRIES:
      return {
        ...state,
        dataEntries: action.payload,
      };
    case GET_DATA_ENTRIES_BY_ID:
      return {
        ...state,
        entries: action.payload,
      };
    case DELETE_ENTRIES:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default entriesReducer;

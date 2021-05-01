import * as actionsTypes from './actionTypes';

const initialState = {
  dataSlides: [],
  getDataSlides: () => {},
};

const slidesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionsTypes.GET_SLIDES:
      return {
        ...state,
        dataSlides: action.payload,
      };
    default:
      return state;
  }
};

export default slidesReducer;

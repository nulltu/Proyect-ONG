import * as actionsTypes from './actionTypes';

const initialState = {
  dataTheme: [],
  dataThemeDefault: {
    name: 'Default',
    primaryColor: '#ffffff',
    lettersColor: '#000000',
    backgroundColor: '#ffffff',
  },
  getDataTheme: () => {},
};

const ThemeReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionsTypes.GET_THEME:
      return {
        ...state,
        dataTheme: action.payload,
      };
    case actionsTypes.SET_THEME:
      return {
        ...state,
        dataThemeDefault: action.payload,
      };
    default:
      return state;
  }
};

export default ThemeReducer;

import * as constants from '../../constants/routes/routes';
import connect from '../../axios/axios.config';
import * as actionTypes from '../reducers/actionTypes';

const themeActions = {
  getDataTheme: () => async (dispatch) => {
    const response = await connect.get(constants.ROUTE_THEME);
    const dataTheme = response.data;
    dispatch({
      type: actionTypes.GET_THEME,
      payload: dataTheme,
    });
    return response.data;
  },
  setDataTheme: (name) => async (dispatch) => {
    const response = await connect.get(constants.ROUTE_THEME);
    const themes = response.data;
    let themeColor = {};
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < themes.length; i++) {
      if (themes[i].name === name) {
        themeColor = themes[i];
      }
    }

    dispatch({
      type: actionTypes.SET_THEME,
      payload: themeColor,
    });
    return response.data;
  },
};

export default themeActions;

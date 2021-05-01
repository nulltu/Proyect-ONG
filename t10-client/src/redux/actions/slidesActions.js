import * as constants from '../../constants';
import connect from '../../axios/axios.config';
import * as actionTypes from '../reducers/actionTypes';

const slidesActions = {
  getDataSlides: () => async (dispatch) => {
    const response = await connect.get(constants.PATH_ENDPOINT_SLIDES);
    const dataSlides = response.data;
    dispatch({
      type: actionTypes.GET_SLIDES,
      payload: dataSlides,
    });
    return response.data;
  },
};

export default slidesActions;

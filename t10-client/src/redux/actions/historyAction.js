import * as constants from '../../constants/constants';
import createFormData from '../../utils/createFormData';
import connect from '../../axios/axios.config';
import {
  GET_HISTORY,
  DELETE_HISTORY,
  CREATE_HISTORY,
  UPDATE_HISTORY,
} from '../reducers/actionTypes';

const historyAction = {
  getDataHistory: () => async (dispatch) => {
    const response = await connect.get(constants.PATH_ENDPOINT_HISTORY);
    const dataHistory = response.data;
    dispatch({
      type: GET_HISTORY,
      payload: dataHistory,
    });
    return response.data;
  },
  createHistory: ({ editor, image }) => async (dispatch) => {
    const formData = createFormData({ text: editor, image: image[0] });
    const response = await connect.post(
      constants.PATH_ENDPOINT_HISTORY,
      formData,
    );
    dispatch({
      type: CREATE_HISTORY,
      payload: response.data,
    });
    return response;
  },
  updateHistory: ({ editor, image }, id) => async (dispatch) => {
    const formData = createFormData({ text: editor, image: image[0] });
    const response = await connect.put(
      `${constants.PATH_ENDPOINT_HISTORY}/${id}`,
      formData,
    );
    dispatch({
      type: UPDATE_HISTORY,
    });
    return response;
  },

  deleteHistory: (id) => async (dispatch) => {
    const res = await connect.delete(
      `${constants.PATH_ENDPOINT_HISTORY}/${id}`,
    );
    dispatch({
      type: DELETE_HISTORY,
    });
    return res;
  },
};

export default historyAction;

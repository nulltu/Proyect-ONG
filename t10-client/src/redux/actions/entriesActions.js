import { PATH_ENDPOINT_ENTRIES } from '../../constants';
import {
  CREATE_ENTRIES,
  DELETE_ENTRIES,
  GET_DATA_ENTRIES,
  GET_DATA_ENTRIES_BY_ID,
  UPDATE_ENTRIES,
} from '../reducers/actionTypes';
import connect from '../../axios/axios.config';
import createFormData from '../../utils/createFormData';

const entriesActions = {
  createEntries: ({ projecttitle, image, typeId, editor }) => async (
    dispatch,
  ) => {
    const data = createFormData({
      title: projecttitle,
      content: editor,
      typeId,
      ...(image[0] ? { image: image[0] } : undefined),
    });
    const response = await connect.post(PATH_ENDPOINT_ENTRIES, data);
    dispatch({
      type: CREATE_ENTRIES,
      payload: response.data,
    });
    return response;
  },

  updateEntries: ({ projecttitle, image, typeId, editor }, id) => async (
    dispatch,
  ) => {
    const data = createFormData({
      title: projecttitle,
      content: editor,
      typeId,
      ...(image[0] ? { image: image[0] } : {}),
    });
    const response = await connect.put(`${PATH_ENDPOINT_ENTRIES}/${id}`, data);
    dispatch({
      type: UPDATE_ENTRIES,
    });
    return response;
  },

  getDataEntries: () => async (dispatch) => {
    const res = await connect.get(PATH_ENDPOINT_ENTRIES);
    const dataEntries = await res.data;
    dispatch({
      type: GET_DATA_ENTRIES,
      payload: dataEntries,
    });
    return dataEntries;
  },

  getDataEntriesById: (id) => async (dispatch) => {
    const res = await connect.get(`${PATH_ENDPOINT_ENTRIES}/${id}`);
    const dataEntries = await res.data;
    dispatch({
      type: GET_DATA_ENTRIES_BY_ID,
      payload: dataEntries,
    });
    return dataEntries;
  },

  deleteEntries: (id) => async (dispatch) => {
    const res = await connect.delete(`${PATH_ENDPOINT_ENTRIES}/${id}`);
    dispatch({
      type: DELETE_ENTRIES,
    });
    return res;
  },
};

export default entriesActions;

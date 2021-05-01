import * as constants from '../../constants';
import * as actionTypes from '../reducers/actionTypes';
import connect from '../../axios/axios.config';

const coursesActions = {
  getAllCourses: () => async (dispatch) => {
    const response = await connect.get(constants.PATH_ENDPOINT_COURSES);
    dispatch({
      type: actionTypes.GET_DATA_COURSES,
      payload: response.data,
    });
    return response.data;
  },
  getAllOnCourses: () => async (dispatch) => {
    const response = await connect.get(constants.PATH_ENDPOINT_ONCOURSES);
    dispatch({
      type: actionTypes.GET_DATA_ONCOURSES,
      payload: response.data,
    });
    return response.data;
  },
  putCourses: (data, id) => async (dispatch) => {
    const response = await connect.put(
      `${constants.PATH_ENDPOINT_COURSES}/${id}`,
      data,
    );
    dispatch({
      type: actionTypes.UPDATE_COURSE,
      payload: response.data,
    });
    return response;
  },
  postCourses: (data) => async (dispatch) => {
    const response = await connect.post(constants.PATH_ENDPOINT_COURSES, data);
    dispatch({
      type: actionTypes.CREATE_COURSE,
      payload: response.data,
    });
    return response;
  },
  deleteCourses: (id) => async (dispatch) => {
    const response = await connect.delete(
      `${constants.PATH_ENDPOINT_COURSES}/${id}`,
    );
    dispatch({
      type: actionTypes.DELETE_COURSE,
      payload: id,
    });
    return response;
  },
  deleteOnCourses: (id) => async (dispatch) => {
    const response = await connect.delete(
      `${constants.PATH_ENDPOINT_ON_COURSES}/${id}`,
    );
    dispatch({
      type: actionTypes.DELETE_ON_COURSE,
      payload: id,
    });
    return response;
  },
  createOnCourse: (data) => async (dispatch) => {
    const response = await connect.post(
      constants.PATH_ENDPOINT_ON_COURSES,
      data,
    );
    dispatch({
      type: actionTypes.CREATE_ON_COURSE,
      payload: response.data,
    });
    return response;
  },
  updateOnCourse: (data, id) => async (dispatch) => {
    const response = await connect.put(
      `${constants.PATH_ENDPOINT_ON_COURSES}/${id}`,
      data,
    );
    dispatch({
      type: actionTypes.UPDATE_ON_COURSE,
      payload: response.data,
    });
    return response;
  },
};

export default coursesActions;

import * as constants from '../../constants';
import connect from '../../axios/axios.config';
import * as actionTypes from '../reducers/actionTypes';
import createFormData from '../../utils/createFormData';

const organizationActions = {
  getDataOrganization: () => async (dispatch) => {
    const response = await connect.get(constants.PATH_ENDPOINT_ORGANIZATION);
    const dataOrganization = response.data;
    dispatch({
      type: actionTypes.GET_DATA_ORGANIZATION,
      payload: dataOrganization,
    });
    return dataOrganization;
  },
  putOrganization: (data) => async (dispatch) => {
    const { image } = data;
    const formData = createFormData({ ...data, ...(image ? { image } : {}) });
    const response = await connect.put(
      `${constants.PATH_ENDPOINT_ORGANIZATION}/1`,
      formData,
    );
    dispatch({
      type: actionTypes.UPDATE_ORGANIZATION,
    });
    return response;
  },
};

export default organizationActions;

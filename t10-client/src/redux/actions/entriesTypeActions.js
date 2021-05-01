import * as constants from '../../constants/routes/routes';
import connect from '../../axios/axios.config';
import * as actionTypes from '../reducers/actionTypes';

const entriesTypeActions = {
  getDataEntriesType: () => async (dispatch) => {
    const response = await connect.get(constants.ROUTE_ENTRIES_TYPE);
    const dataEntriesType = response.data;
    dispatch({
      type: actionTypes.GET_ENTRIES_TYPE,
      payload: dataEntriesType,
    });
    return response.data;
  },
};

export default entriesTypeActions;

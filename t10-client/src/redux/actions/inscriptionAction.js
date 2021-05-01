import * as constants from '../../constants';
import connect from '../../axios/axios.config';

const inscriptionsActions = {
  getAllInscriptionsByOnCourse: (id) => async () => {
    const response = await connect.get(
      `${constants.PATH_ENDPOINT_INSCRIPTION}?onCourseId=${id}`,
    );
    return response;
  },
  getAllInscriptions: () => async () => {
    const response = await connect.get(constants.PATH_ENDPOINT_INSCRIPTION);
    return response;
  },

  getAllInscriptionsByUser: (id) => async () => {
    const response = await connect.get(
      `${constants.PATH_ENDPOINT_INSCRIPTION}/user/${id}`,
    );
    return response;
  },
  createInscription: (data) => async () => {
    const response = await connect.post(
      constants.PATH_ENDPOINT_INSCRIPTION,
      data,
    );
    return response;
  },
  deleteInscription: (id) => async () => {
    const response = await connect.delete(
      `${constants.PATH_ENDPOINT_INSCRIPTION}/${id}`,
    );
    return response;
  },
};

export default inscriptionsActions;

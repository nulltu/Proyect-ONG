import * as actionsTypes from './actionTypes';

const initialState = { courses: [], update: false, onCourses: [] };

const coursesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionsTypes.GET_DATA_COURSES:
      return {
        ...state,
        courses: action.payload,
        listCourses: action.payload,
      };
    case actionsTypes.GET_DATA_ONCOURSES:
      return {
        ...state,
        onCourses: action.payload,
      };
    case actionsTypes.UPDATE_COURSE:
      return {
        ...state,
        courses: state.courses.map((course) =>
          course.id === action.payload.id ? action.payload : course,
        ),
      };
    case actionsTypes.UPDATE_ON_COURSE:
      return {
        ...state,
        onCourses: state.onCourses.map((oncourse) =>
          oncourse.OnCourses.id === action.payload.id
            ? action.payload
            : oncourse,
        ),
      };
    case actionsTypes.CREATE_COURSE:
      return {
        ...state,
        courses: [...state.courses, action.payload],
      };
    case actionsTypes.CREATE_ON_COURSE:
      return {
        ...state,
        onCourses: [...state.onCourses, action.payload],
      };
    case actionsTypes.DELETE_COURSE:
      return {
        ...state,
        courses: state.courses.filter((course) => course.id !== action.payload),
      };
    case actionsTypes.DELETE_ON_COURSE:
      return {
        ...state,
        onCourses: state.onCourses.filter(
          (course) => course.OnCourses.id !== action.payload,
        ),
      };
    default:
      return state;
  }
};

export default coursesReducer;

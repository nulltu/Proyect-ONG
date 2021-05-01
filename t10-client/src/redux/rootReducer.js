import userReducer from './reducers/userReducer';
import organizationReducer from './reducers/organizationReducer';
import slidesReducer from './reducers/slidesReducer';
import coursesReducer from './reducers/coursesReducer';
import entriesReducer from './reducers/entriesReducer';
import entriesTypeReducer from './reducers/entriesTypeReducer';
import historyReducer from './reducers/historyReducer';
import themeReducer from './reducers/themeReducer';

const { combineReducers } = require('redux');

const rootReducer = combineReducers({
  user: userReducer,
  organization: organizationReducer,
  slides: slidesReducer,
  courses: coursesReducer,
  entries: entriesReducer,
  entriesType: entriesTypeReducer,
  history: historyReducer,
  theme: themeReducer,
});

export default rootReducer;

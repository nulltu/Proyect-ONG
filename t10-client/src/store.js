import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './redux/rootReducer';
import { loadState, saveState } from './localStorage/localStorage';

const myStore = createStore(
  rootReducer,
  loadState(),
  composeWithDevTools(applyMiddleware(thunk)),
);

myStore.subscribe(async () => {
  saveState(await myStore.getState());
});

export default myStore;

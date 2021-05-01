import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import myStore from './store';

render(
  <Provider store={myStore}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

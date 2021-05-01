import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import EditProfile from './EditProfile';
import { initialStateUser } from '../../constants/initialState/initialStates';
import rootReducer from '../../redux/rootReducer';

const store = createStore(rootReducer, initialStateUser);

const user = {
  id: 0,
  firstName: 'usuario',
  lastName: 'test',
  email: 'user@test.com',
  image: 'image.jpg',
};

describe('Edit Profile', () => {
  it('Verify if submit with correct values', async () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <BrowserRouter>
          <EditProfile user={user} recharge={() => {}} />
        </BrowserRouter>
      </Provider>,
    );

    expect(getByTestId('inputFirstName').value).toBe(user.firstName);
    expect(getByTestId('inputLastName').value).toBe(user.lastName);
  });
});

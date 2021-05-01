import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import userEvent from '@testing-library/user-event';
import Login from './Login';
import { loginOnly } from '../../constants/initialState/initialStates';
import rootReducer from '../../redux/rootReducer';
// import Home from '../../pages/home/Home';

const store = createStore(rootReducer, loginOnly, applyMiddleware(thunk));

const renderLogin = () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    </Provider>,
  );
};

describe('Form login', () => {
  it('fill input firstname correctly and click button submit', async () => {
    renderLogin();
    const inputEmail = screen.getByPlaceholderText(/E-mail/i);
    userEvent.type(inputEmail, 'test@test.com');
    const submitButton = screen.getByRole('button', { name: /login/i });
    await waitFor(() => {
      userEvent.click(submitButton);
    });
  });
  it('fill email entry with invalid email and click submit button', async () => {
    renderLogin();
    const inputEmail = screen.getByPlaceholderText(/E-mail/i);
    userEvent.type(inputEmail, 'test');
    const submitButton = screen.getByRole('button', { name: /login/i });
    await waitFor(() => {
      userEvent.click(submitButton);
    });
  });
  it('fill email entry with empty field and click submit button', async () => {
    renderLogin();
    const inputEmail = screen.getByPlaceholderText(/E-mail/i);
    userEvent.type(inputEmail, '');
    const submitButton = screen.getByRole('button', { name: /login/i });
    await waitFor(() => {
      userEvent.click(submitButton);
    });
  });
  it('fill input password correctly and click button submit', async () => {
    renderLogin();
    const inputPassword = screen.getByPlaceholderText(/contraseña/i);
    userEvent.type(inputPassword, '123456');
    const submitButton = screen.getByRole('button', { name: /login/i });
    await waitFor(() => {
      userEvent.click(submitButton);
    });
  });
  it('fill password entry with empty field and click submit button', async () => {
    renderLogin();
    const inputPassword = screen.getByPlaceholderText(/contraseña/i);
    userEvent.type(inputPassword, '');
    const submitButton = screen.getByRole('button', { name: /login/i });
    await waitFor(() => {
      userEvent.click(submitButton);
    });
  });
});

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import userEvent from '@testing-library/user-event';
import Register from './Register';
import { loginOnly } from '../../constants/initialState/initialStates';
import rootReducer from '../../redux/rootReducer';

const store = createStore(rootReducer, loginOnly, applyMiddleware(thunk));

const renderRegister = () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    </Provider>,
  );
};

describe('Form login', () => {
  it('fill input firstname correctly and click button submit', async () => {
    renderRegister();
    const inputFirstName = screen.getByPlaceholderText(/nombre/i);
    userEvent.type(inputFirstName, 'nulltu');
    const submitButton = screen.getByRole('button', { name: /crear cuenta/i });
    await waitFor(() => {
      userEvent.click(submitButton);
    });
  });
  it('fill firstname entry with less than 2 characters and click submit button', async () => {
    renderRegister();
    const inputFirstName = screen.getByPlaceholderText(/nombre/i);
    userEvent.type(inputFirstName, 'n');
    const submitButton = screen.getByRole('button', { name: /crear cuenta/i });
    await waitFor(() => {
      userEvent.click(submitButton);
    });
  });
  it('fill input lastname correctly and click button submit', async () => {
    renderRegister();
    const inputLastName = screen.getByPlaceholderText(/apellido/i);
    userEvent.type(inputLastName, 'apellido');
    const submitButton = screen.getByRole('button', { name: /crear cuenta/i });
    await waitFor(() => {
      userEvent.click(submitButton);
    });
  });
  it('fill lastname entry with less than 2 characters and click submit button', async () => {
    renderRegister();
    const inputLastName = screen.getByPlaceholderText(/apellido/i);
    userEvent.type(inputLastName, 'a');
    const submitButton = screen.getByRole('button', { name: /crear cuenta/i });
    await waitFor(() => {
      userEvent.click(submitButton);
    });
  });
  it('fill input email correctly and click button submit', async () => {
    renderRegister();
    const inputEmail = screen.getByPlaceholderText(/correo electronico/i);
    userEvent.type(inputEmail, 'test@test.com');
    const submitButton = screen.getByRole('button', { name: /crear cuenta/i });
    await waitFor(() => {
      userEvent.click(submitButton);
    });
  });
  it('fill email entry with invalid email and click submit button', async () => {
    renderRegister();
    const inputEmail = screen.getByPlaceholderText(/correo electronico/i);
    userEvent.type(inputEmail, 'test');
    const submitButton = screen.getByRole('button', { name: /crear cuenta/i });
    await waitFor(() => {
      userEvent.click(submitButton);
    });
  });
  it('fill email entry with empty field and click submit button', async () => {
    renderRegister();
    const inputEmail = screen.getByPlaceholderText(/correo electronico/i);
    userEvent.type(inputEmail, '');
    const submitButton = screen.getByRole('button', { name: /crear cuenta/i });
    await waitFor(() => {
      userEvent.click(submitButton);
    });
  });
  it('fill input password correctly and click button submit', async () => {
    renderRegister();
    const inputPassword = screen.getByPlaceholderText(/contraseña/i);
    userEvent.type(inputPassword, '123456');
    const submitButton = screen.getByRole('button', { name: /crear cuenta/i });
    await waitFor(() => {
      userEvent.click(submitButton);
    });
  });
  it('fill password entry with less than 6 characters and click submit button', async () => {
    renderRegister();
    const inputPassword = screen.getByPlaceholderText(/contraseña/i);
    userEvent.type(inputPassword, '12345');
    const submitButton = screen.getByRole('button', { name: /crear cuenta/i });
    await waitFor(() => {
      userEvent.click(submitButton);
    });
  });
  it('fill input password with field greater than 20 characters and click on submit button', async () => {
    renderRegister();
    const inputPassword = screen.getByPlaceholderText(/contraseña/i);
    userEvent.type(inputPassword, '123456789123456789123');
    const submitButton = screen.getByRole('button', { name: /crear cuenta/i });
    await waitFor(() => {
      userEvent.click(submitButton);
    });
  });
  it('fill password entry with empty field and click submit button', async () => {
    renderRegister();
    const inputPassword = screen.getByPlaceholderText(/contraseña/i);
    userEvent.type(inputPassword, '');
    const submitButton = screen.getByRole('button', { name: /crear cuenta/i });
    await waitFor(() => {
      userEvent.click(submitButton);
    });
  });
});

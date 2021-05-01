import React from 'react';
import propTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ADMIN } from '../constants';

const AdminRoute = ({ component: Component }) => {
  const roleUser = useSelector((state) => state.user.roleUser);
  return (
    <Route
      render={() => (roleUser === ADMIN ? <Component /> : <Redirect to="/" />)}
    />
  );
};
AdminRoute.propTypes = {
  component: propTypes.oneOfType([propTypes.string, propTypes.func]).isRequired,
};

export default AdminRoute;

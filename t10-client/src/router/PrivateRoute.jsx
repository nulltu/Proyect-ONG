import React from 'react';
import propTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ component: Component }) => {
  const user = useSelector((state) => state.user);
  return (
    <Route
      render={() => (user.isUserlogged ? <Component /> : <Redirect to="/" />)}
    />
  );
};
PrivateRoute.propTypes = {
  component: propTypes.oneOfType([propTypes.string, propTypes.func]).isRequired,
};

export default PrivateRoute;

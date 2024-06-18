import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { ROUTE_PATHS } from '../routes/index.jsx';

function GuestRoute({ element }) {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return isAuthenticated ? <Navigate to={ROUTE_PATHS.HOME} /> : element;
}

GuestRoute.propTypes = {
  element: PropTypes.element.isRequired,
};

export default GuestRoute;

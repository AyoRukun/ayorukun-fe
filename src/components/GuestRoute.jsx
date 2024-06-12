import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ROUTE_PATHS } from '../routes/index.jsx';

function GuestRoute({ element }) {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return isAuthenticated ? <Navigate to={ROUTE_PATHS.HOME} /> : element;
}

export default GuestRoute;

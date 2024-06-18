import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { Box } from '@mui/material';
import { checkAuth } from './states/auth/authSlice';
import AppAppBar from './components/AppAppBar.jsx';
import routes from './routes/routes.jsx';
import AppFooter from './components/AppFooter.jsx';
import Loading from './components/Loading.jsx';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      dispatch(checkAuth());
    }
  }, [dispatch, token]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Loading />
      <ToastContainer />
      <AppAppBar />
      <Box component="main" justifyContent="center" alignItems="center" minHeight="100vh" minWidth="100%">
        <Box flex={1}>
          <Routes>
            {routes.map((route) => (
              <Route key={route.path} path={route.path} element={route.element} />
            ))}
          </Routes>
        </Box>
      </Box>
      <AppFooter />
    </Box>
  );
}

export default App;

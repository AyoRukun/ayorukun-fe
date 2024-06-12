import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import { LoadingBar } from 'react-redux-loading-bar';
import { ToastContainer } from 'react-toastify';
import { checkAuth } from './states/auth/authSlice';
import AppAppBar from './components/AppAppBar.jsx';
import routes from './routes/routes.jsx';
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
    <Box sx={{ display: 'flex' }}>
      <LoadingBar style={{ backgroundColor: '#27374D' }} />
      <AppAppBar />
      <ToastContainer />
      <Box component="main" justifyContent="center" alignItems="center" minHeight="100vh" minWidth="100%">
        <Toolbar />
        <Box flex={1}>
          <Routes>
            {routes.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}
          </Routes>
        </Box>
      </Box>
    </Box>
  );
}

export default App;

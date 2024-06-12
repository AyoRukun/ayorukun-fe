import React from 'react';
import { useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATHS } from '../routes/index.jsx';

function HomePage() {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  return (
    <Box sx={{
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      boxSizing: 'border-box',
      textAlign: 'center',
      backgroundImage: 'url(/img/background4.png)',
      backgroundSize: 'cover',
      height: '90vh',
      mr: 0,
    }}
    >
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
      >
        <Typography variant="h1" component="h1" gutterBottom>
          {isAuthenticated ? `AyoRukun, ${user.name}` : 'AyoRukun'}
        </Typography>
        <Typography variant="subtitle1" component="h1" gutterBottom>
          {isAuthenticated ? `Sikapilah toleransi terhadap perbedaan pendapat dan kepercayaan., ${user.name}` : 'Sikapilah toleransi terhadap perbedaan pendapat dan kepercayaan.'}
        </Typography>
        <Box>
          <Button
            sx={{
              padding: '20px',
              color: 'primary',
            }}
            variant="text"
            color="info"
            size="small"
            onClick={() => {
              navigate(ROUTE_PATHS.DISCUSSION, { replace: true });
            }}
          >
            Forum Diskusi
          </Button>
          <Button
            sx={{
              padding: '20px',
            }}
            variant="text"
            color="info"
            size="small"
            onClick={() => {
              navigate(ROUTE_PATHS.REPORT, { replace: true });
            }}
          >
            Pelaporan
          </Button>
        </Box>
      </Box>
      <Box />
    </Box>
  );
}

export default HomePage;

import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';
import { useTheme, Box } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { ROUTE_PATHS } from '../routes/index.jsx';

function AppFooter() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{
      bgcolor: '#FADEFF',
      height: isMobile ? 'auto' : '30vh',
      p: 3,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
    }}
    >
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item xs={12} sm={6} md={4} sx={{ textAlign: 'center' }}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <img src="/ayorukun.svg" alt="Logo" height={100} />
            <Typography variant="h5" component="h1" gutterBottom>AyoRukun</Typography>
            <Typography variant="subtitle1" component="h1" gutterBottom>
              Sikapilah toleransi terhadap perbedaan pendapat dan kepercayaan.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4} sx={{ textAlign: 'center' }}>
          <Typography variant="h5" component="h1" gutterBottom>Fitur</Typography>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Link
              color="inherit"
              underline="none"
              component="button"
              variant="body2"
              onClick={() => navigate(ROUTE_PATHS.HOME, { replace: true })}
            >
              Beranda
            </Link>
            <Link
              color="inherit"
              underline="none"
              component="button"
              variant="body2"
              onClick={() => navigate(ROUTE_PATHS.DISCUSSION, { replace: true })}
            >
              Diskusi
            </Link>
            <Link
              color="inherit"
              underline="none"
              component="button"
              variant="body2"
              onClick={() => navigate(ROUTE_PATHS.REPORT, { replace: true })}
            >
              Pelaporan
            </Link>
            <Link
              color="inherit"
              underline="none"
              component="button"
              variant="body2"
              onClick={() => navigate(ROUTE_PATHS.ABOUT, { replace: true })}
            >
              Tentang
            </Link>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={4} sx={{ textAlign: 'center' }}>
          <Typography variant="h5" component="h1" gutterBottom>Tentang</Typography>
          <Typography variant="subtitle1" component="h1" gutterBottom>
            Hubungi kami jika terdapat kendala saat menggunakan website satu hati.
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

export default AppFooter;

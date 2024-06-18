import Container from '@mui/material/Container';
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Add } from '@mui/icons-material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import ReportDialog from './ReportDialog.jsx';
import { addReport } from '../states/report/reportSlice.js';

function ReportHero() {
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleOpenDialog = () => {
    if (!isAuthenticated) {
      toast.warn('Silakan login untuk membuat laporan baru.');
      return;
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleAddReport = (formData) => {
    dispatch(addReport(formData));
      console.log("tes ")
  };

  return (
    <Box
      sx={{
        minHeight: '75vh',
        width: '100%',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#fadeff',
        mb: -10,
      }}
    >
      <ReportDialog
        isOpen={openDialog}
        onClose={handleCloseDialog}
        onSubmit={handleAddReport}
      />
      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center', color: 'black' }}>
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            Pelaporan
          </Typography>
          <Typography variant="body1" opacity={0.8} paragraph>
            Platform pelaporan anonim untuk melaporkan kejadian
            bullying secara mudah, aman, dan tanpa rasa takut.
          </Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleOpenDialog}
            sx={{ mt: 2 }}
          >
            Buat Laporan Baru
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default ReportHero;

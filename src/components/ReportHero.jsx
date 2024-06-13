import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Add } from '@mui/icons-material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import ReportDialog from './ReportDialog.jsx';
import { addReport } from '../states/report/reportSlice.js';

function ReportHero() {
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSubmitDialog = (formData) => {
    dispatch(addReport(formData));
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
      }}
    >
      <ReportDialog
        isOpen={openDialog}
        onClose={handleCloseDialog}
        onSubmit={handleSubmitDialog}
      />
      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center', color: 'black' }}>
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            Pelaporan
          </Typography>
          <Typography variant="body1" opacity={0.8} paragraph>
            Bergabunglah dalam diskusi, berbagi pengetahuan, dan dapatkan wawasan baru.
          </Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleOpenDialog}
            sx={{ mt: 2 }}
          >
            Buat Diskusi Baru
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default ReportHero;

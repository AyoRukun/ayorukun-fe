import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Add } from '@mui/icons-material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { addDiscussion } from '../states/discussion/discusssionSlice';
import DiscussionDialog from './DiscussionDialog.jsx';

function DiscussionHero() {
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleOpenDialog = () => {
    if (!isAuthenticated) {
      toast.warn('Silakan login untuk membuat diskusi baru.');
      return;
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleAddDiscussion = (discussionData) => {
    dispatch(addDiscussion(discussionData));
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
      <DiscussionDialog
        isOpen={openDialog}
        onClose={handleCloseDialog}
        onSubmit={handleAddDiscussion}
      />
      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center', color: 'black' }}>
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            Forum Diskusi
          </Typography>
          <Typography variant="body1" opacity={0.8} paragraph>
            Ruang diskusi aman untuk korban dan saksi bullying berbagi cerita, mendapatkan dukungan, dan menemukan
            solusi tanpa takut akan konsekuensi.
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

export default DiscussionHero;

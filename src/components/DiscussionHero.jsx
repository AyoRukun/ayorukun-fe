import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Add } from '@mui/icons-material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addDiscussion } from '../states/discussion/discusssionSlice';
import DiscussionDialog from './DiscussionDialog.jsx';

function DiscussionHero() {
  const dispatch = useDispatch();
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSubmitDialog = (newDiscussion) => {
    dispatch(addDiscussion(newDiscussion));
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
      <DiscussionDialog
        isOpen={openDialog}
        onClose={handleCloseDialog}
        onSubmit={handleSubmitDialog}
      />
      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center', color: 'black' }}>
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            Forum Diskusi
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

export default DiscussionHero;
import React, { useState } from 'react';
import { Box, Button, Grid } from '@mui/material';
import { useDispatch } from 'react-redux';
import DiscussionItem from './DiscussionItem.jsx';
import DiscussionDialog from './DiscussionDialog.jsx';
import { sortByCreatedAt } from '../utils/date.js';
import { addDiscussion } from '../states/discussion/discusssionSlice.js';

function DiscussionList({ discussions }) {
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
    <Grid item sm={12} md={7} sx={{ px: { xs: 2, md: 0 } }}>
      <Box sx={{ my: { xs: 1, md: 3 } }}>
        <Button variant="contained" onClick={handleOpenDialog}>
          Buat Diskusi Baru
        </Button>
        <DiscussionDialog
          isOpen={openDialog}
          onClose={handleCloseDialog}
          onSubmit={handleSubmitDialog}
        />

        {sortByCreatedAt(discussions).map((discussion) => (
          <DiscussionItem key={discussion.id} discussion={discussion} />
        ))}
      </Box>
    </Grid>
  );
}

export default DiscussionList;

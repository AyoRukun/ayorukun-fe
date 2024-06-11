import React, { useState } from 'react';
import { Box, Button, Grid } from '@mui/material';
import DiscussionItem from './DiscussionItem.jsx';
import DiscussionDialog from "./DiscussionDialog.jsx";
import {sortByCreatedAt} from "../utils/date.js";

function DiscussionList({ discussions, handleSubmitDialog }) {
    const [openDialog, setOpenDialog] = useState(false);

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
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

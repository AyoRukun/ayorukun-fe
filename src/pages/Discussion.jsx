import React, {useEffect, useState} from 'react';
import {
    Avatar,
    ButtonBase,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Chip,
    Grid,
    Icon,
    Stack,
    Typography,
    Divider,
    IconButton,
    DialogActions, DialogTitle, DialogContent, Dialog
} from '@mui/material';
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import CommentIcon from '@mui/icons-material/Comment';
import { useDispatch, useSelector } from 'react-redux';
import {addDiscussion, fetchDiscussions} from '../states/discussion/discusssionSlice.js';
import { ROUTE_PATHS } from '../routes/index.js';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export default function Discussion() {
    const dispatch = useDispatch();
    const { discussions, isLoading, error } = useSelector((state) => state.discussion);
    const [openDialog, setOpenDialog] = useState(false); // State untuk membuka/menutup dialog
    const [newDiscussionTitle, setNewDiscussionTitle] = useState('');
    const [newDiscussionContent, setNewDiscussionContent] = useState('');
    useEffect(() => {
        dispatch(fetchDiscussions());
    }, [dispatch]);

    const handleNewDiscussionClick = () => {
        setOpenDialog(true); // Buka dialog saat tombol diklik

    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setNewDiscussionTitle('');
        setNewDiscussionContent('');
    };

    console.log(discussions)

    const handleFormSubmit = (event) => {
        event.preventDefault();
        dispatch(addDiscussion({ title: newDiscussionTitle, content: newDiscussionContent }));
        handleCloseDialog();
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <Grid container justifyContent="center" minHeight="100vh">
            <Grid item sm={12} md={7} sx={{ px: { xs: 2, md: 0 } }}>
                <Dialog open={openDialog} onClose={handleCloseDialog}>
                    <DialogTitle>Buat Diskusi Baru</DialogTitle>
                    <form onSubmit={handleFormSubmit}>
                        <DialogContent>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="title"
                                label="Judul"
                                type="text"
                                fullWidth
                                variant="standard"
                                value={newDiscussionTitle}
                                onChange={(e) => setNewDiscussionTitle(e.target.value)}
                            />
                            <TextField
                                margin="dense"
                                id="content"
                                label="Konten"
                                type="text"
                                fullWidth
                                multiline
                                rows={4}
                                variant="standard"
                                value={newDiscussionContent}
                                onChange={(e) => setNewDiscussionContent(e.target.value)}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseDialog}>Batal</Button>
                            <Button type="submit" color="primary">
                                Buat
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>

                <Box sx={{ my: { xs: 1, md: 3 } }}>
                    <Button
                        variant="contained"
                        startIcon={<CommentIcon />}
                        onClick={handleNewDiscussionClick}
                        sx={{ mb: 2 }}
                    >
                        Buat Diskusi Baru
                    </Button>
                    {discussions.map((discussion) => (
                        <Card key={discussion.id} sx={{ mt: 2 }}>
                            <CardHeader
                                avatar={
                                    <Avatar aria-label="user-avatar" src={discussion.user.image_url} />
                                }
                                title={
                                    <Link underline="hover" color="inherit" to={`${ROUTE_PATHS.DISCUSSION}/${discussion.id}`}>
                                        <Typography variant="subtitle2">{discussion.title || 'Untitled Discussion'}</Typography>
                                    </Link>
                                }
                                subheader={
                                    <Typography variant="caption" color="text.secondary">
                                        {`Oleh ${discussion.user.username} - ${discussion.createdAt}`}
                                    </Typography>
                                }
                            />

                            <ButtonBase
                                component={Link}
                                sx={{ width: '100%', justifyContent: 'left' }}
                                underline="none"
                                color="inherit"
                                to={`${ROUTE_PATHS.DISCUSSION}/${discussion.id}`}
                            >
                                <CardContent>
                                    <Typography
                                        variant="body2"
                                        component="span"
                                        sx={{
                                            WebkitLineClamp: 4,
                                            lineClamp: 4,
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            display: '-webkit-box',
                                            WebkitBoxOrient: 'vertical',
                                        }}
                                    >
                                        {discussion.content}
                                    </Typography>
                                </CardContent>
                            </ButtonBase>

                            <CardActions>
                                <Stack direction="row" justifyContent="space-between" sx={{ width: '100%' }}>
                                    <Stack direction="row" spacing={1.2}>
                                        <Stack direction="row" alignItems="center">
                                            <IconButton>
                                                <CommentIcon sx={{ fontSize: '20px' }} />
                                            </IconButton>
                                            <Typography variant="subtitle2" color="text.secondary">
                                                {discussion.totalComments}
                                            </Typography>
                                        </Stack>
                                    </Stack>
                                </Stack>
                            </CardActions>
                        </Card>
                    ))}
                </Box>
            </Grid>
        </Grid>
    );
}

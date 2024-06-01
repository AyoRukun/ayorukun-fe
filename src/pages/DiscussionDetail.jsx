import React, { useEffect, useState } from 'react';
import {useParams, useNavigate, Link} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDiscussionDetail, addDiscussionComment } from '../states/discussion/discusssionSlice.js'; // Sesuaikan path
import {
    Avatar, ButtonBase, Card, CardActions, CardContent, CardHeader, Grid, Stack, Typography, Divider, IconButton, Button,
    FormLabel, TextField, FormControl, Box,
} from '@mui/material';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CommentIcon from "@mui/icons-material/Comment";
import {LoadingButton} from "@mui/lab";
import { ROUTE_PATHS } from '../routes/index.js';

function DiscussionDetail() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { discussion, isLoading, error } = useSelector((state) => state.discussion);
    const { user } = useSelector((state) => state.auth);
    const [commentInput, setCommentInput] = useState('');
    const [commentError, setCommentError] = useState('');

    useEffect(() => {
        dispatch(fetchDiscussionDetail(id));
    }, [dispatch, id]);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();

        if (!commentInput.trim()) {
            setCommentError('Komentar tidak boleh kosong');
            return;
        }

        try {
            const commentData = {
                content: commentInput,
                parent_id: 0,
            };
            await dispatch(addDiscussionComment({ discussionId: id, commentData }));

            setCommentInput('');
            setCommentError('');
        } catch (err) {
            setCommentError(err.message);
        }
    };

    if (isLoading) {
        return <div>Loading...</div>; // Tampilkan loading indicator
    }

    if (error) {
        return <div>Error: {error}</div>; // Tampilkan pesan error
    }

    if (!discussion) {
        return <div>Discussion not found</div>;
    }

    return (
        <Grid container justifyContent="center" minHeight="100vh">
            <Grid item sm={12} md={7} sx={{ px: { xs: 2, md: 0 } }}>
                <Box sx={{ my: { xs: 1, md: 3 } }}>
                    <Button
                        onClick={() => {
                            navigate(ROUTE_PATHS.DISCUSSION, { replace: true });
                        }}
                        variant="text"
                    >
                        <ArrowBackIcon />
                    </Button>

                    <Card sx={{ mt: 2 }}>
                        <CardContent>
                            <Typography variant="h5" gutterBottom>
                                {discussion.title || 'Untitled Discussion'} {/* Tampilkan judul diskusi */}
                            </Typography>
                            <Typography variant="body1" paragraph>
                                {discussion.content} {/* Tampilkan konten diskusi */}
                            </Typography>

                            <Stack direction="row" spacing={1} alignItems="center">
                                <Avatar src={discussion.user.image_url} alt={discussion.user.username} sx={{ width: 24, height: 24 }} />
                                <Typography variant="caption" color="text.secondary">
                                    Oleh {discussion.user.username} • {discussion.createdAt}
                                </Typography>
                            </Stack>
                        </CardContent>
                        <CardActions>

                            <Button
                                component={Link} // Jadikan tombol sebagai link
                                to={`${ROUTE_PATHS.DISCUSSION}/${discussion.id}`} // Link ke detail diskusi
                                startIcon={<CommentIcon />}
                                sx={{ textTransform: 'none' }} // Hilangkan kapitalisasi teks pada tombol
                            >
                                {discussion.comments.length || 0} Komentar
                            </Button>
                        </CardActions>

                    </Card>

                    <Card sx={{ mt: 2 }}>
                        <CardHeader
                            title={<Typography variant="h6" sx={{ ml: 1, mb: 0.5 }}>Leave a comment</Typography>}
                        />
                        <CardContent>
                            <Box
                                component="form"
                                noValidate
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    width: '100%',
                                    gap: 2,
                                }}
                                onSubmit={handleCommentSubmit} // Tambahkan onSubmit di sini
                            >
                                <FormControl>
                                    <TextField
                                        error={!!commentError}
                                        helperText={commentError}
                                        id="commentInput"
                                        label="Tulis komentar"
                                        multiline
                                        value={commentInput}
                                        onChange={(e) => setCommentInput(e.target.value)}
                                    />
                                </FormControl>
                                <Stack direction="column" alignItems="flex-end">
                                    <LoadingButton
                                        loading={isLoading}
                                        size="large"
                                        type="submit" // Ubah ke type="submit"
                                        variant="contained"
                                        color="primary"
                                        sx={{ mt: 2 }}
                                        disabled={!user} // Nonaktifkan tombol jika belum login
                                    >
                                        Submit
                                    </LoadingButton>
                                </Stack>
                            </Box>
                        </CardContent>

                    </Card>

                    <Card sx={{ mt: 2 }}>
                        <CardHeader
                            sx={{ pb: 0 }}
                            title={
                                <Typography variant="h6" sx={{ ml: 1, mb: 0.5 }}>
                                    {`Komentar${discussion.comments.length > 1 ? 's' : ''} (${discussion.comments.length})`}
                                </Typography>
                            }
                        />

                        <CardContent>
                            <Stack direction="column" spacing={2}>
                                {discussion.comments.map((comment) => (
                                    <React.Fragment key={comment.id}>
                                        <Stack direction="row" alignItems="center" spacing={1}>
                                            <Avatar src={comment.user.image_url} alt={comment.user.name} sx={{ width: 24, height: 24 }} />
                                            <Typography variant="subtitle2">{comment.user.name}</Typography>
                                            <Typography variant="caption" color="text.secondary">
                                                &bull; {comment.createdAt}
                                            </Typography>
                                        </Stack>
                                        <Typography variant="body1">{comment.content}</Typography>


                                        <Divider variant="middle" sx={{ mt: 2 }} />
                                    </React.Fragment>
                                ))}
                            </Stack>
                        </CardContent>
                    </Card>
                </Box>
            </Grid>
        </Grid>
    );
}

export default DiscussionDetail;

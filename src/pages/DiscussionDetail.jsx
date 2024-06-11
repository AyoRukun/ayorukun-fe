import React, { useEffect, useState } from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {fetchDiscussionDetail, addDiscussionComment} from '../states/discussion/discusssionSlice.js';
import {
    Avatar, Card, CardActions, CardContent, CardHeader, Grid, Stack, Typography, IconButton, Button, Box,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CommentIcon from "@mui/icons-material/Comment";
import { ROUTE_PATHS } from '../routes/index.js';
import formatRelativeTime from "../utils/date.js";
import CommentList from "../components/CommentList.jsx";
import {ThumbUp, ThumbUpOffAlt} from "@mui/icons-material";

function DiscussionDetail() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { discussion, isLoading, error} = useSelector((state) => state.discussion);
    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        dispatch(fetchDiscussionDetail(id));
    }, [dispatch, id]);

    const handleNewCommentSubmit = (newComment) => {
        dispatch(addDiscussionComment({ discussionId: id, commentData: newComment}))
        dispatch(fetchDiscussionDetail(id));
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
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
                        <CardHeader
                            avatar={<Avatar aria-label="user-avatar" src={discussion.user.image_url} />}
                            title={
                                <Typography variant="h5">{discussion.title || 'Untitled Discussion' }</Typography>
                            }
                            subheader={
                                <Typography variant="caption" color="text.secondary">
                                    {`Oleh ${discussion.user.name} - ${formatRelativeTime(discussion.createdAt)}`}
                                </Typography>
                            }
                        />
                        <CardContent>
                            <Typography variant="body1" paragraph>
                                {discussion.content}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Stack direction="row" justifyContent="flex-end" alignItems="center" sx={{ width: '100%' }}>
                                <Stack direction="row" spacing={1.2}>
                                    <Stack direction="row" alignItems="center">
                                        <IconButton>
                                            {isLiked ? <ThumbUp sx={{ fontSize: '20px', color: 'red' }} /> : <ThumbUpOffAlt sx={{ fontSize: '20px' }} />}
                                        </IconButton>
                                        <Typography variant="subtitle2" color="text.secondary">
                                            {0}
                                        </Typography>
                                        <IconButton>
                                            <CommentIcon sx={{ fontSize: '20px' }} />
                                        </IconButton >
                                        <Typography variant="subtitle2" color="text.secondary" sx={{mr: 2}}>
                                            {discussion.comments.length}
                                        </Typography>
                                    </Stack>
                                </Stack>
                            </Stack>
                        </CardActions>
                    </Card>

                    <CommentList comments={discussion.comments } handleNewCommentSubmit={handleNewCommentSubmit}/>

                </Box>
            </Grid>
        </Grid>
    );
}

export default DiscussionDetail;

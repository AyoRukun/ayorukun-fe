import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CommentIcon from '@mui/icons-material/Comment';
import { addDiscussionComment, fetchDiscussionDetail } from '../states/discussion/discusssionSlice';
import { ROUTE_PATHS } from '../routes/index.jsx';
import formatRelativeTime from '../utils/date';
import CommentList from '../components/CommentList.jsx';

function DiscussionDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { discussion, isLoading, error } = useSelector((state) => state.discussion);

  useEffect(() => {
    dispatch(fetchDiscussionDetail({discussionId: id}));
  }, [dispatch, id]);

  const handleNewCommentSubmit = (newComment) => {
    dispatch(addDiscussionComment({ discussionId: id, commentData: newComment }));
    dispatch(fetchDiscussionDetail(id));
  };


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
                <Typography variant="h5">{discussion.title || 'Untitled Discussion'}</Typography>
                            }
              subheader={(
                <Typography variant="caption" color="text.secondary">
                  {`Oleh ${discussion.user.name} - ${formatRelativeTime(discussion.createdAt)}`}
                </Typography>
                            )}
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
                      <CommentIcon sx={{ fontSize: '20px' }} />
                    </IconButton>
                    <Typography variant="subtitle2" color="text.secondary" sx={{ mr: 2 }}>
                      {discussion.comments.length}
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
            </CardActions>
          </Card>

          <CommentList
            comments={discussion.comments}
            handleNewCommentSubmit={handleNewCommentSubmit}
            source="discussion"
          />

        </Box>
      </Grid>
    </Grid>
  );
}

export default DiscussionDetail;

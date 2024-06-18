import React from 'react';
import { Link } from 'react-router-dom';
import {
  Avatar,
  ButtonBase,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment';
import { ROUTE_PATHS } from '../routes/index.jsx';
import formatRelativeTime from '../utils/date.js';
import { ThumbUp, ThumbUpOffAlt } from '@mui/icons-material';
import { likeDiscussionById, unlikeDiscussionById } from '../states/discussion/discusssionSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

function DiscussionItem({ discussion }) {
  const dispatch = useDispatch();
  const {
    id, title, content, user, totalComments, createdAt, likedBy,
  } = discussion;
  const userId = useSelector((state) => state.auth.user.id);
  const isLiked = likedBy.includes(userId);

  const handleLikeDiscussion = () => {
    if (!userId) {
      toast.warn('Silakan login untuk menyukai diskusi ini.');
      return;
    }

    if (isLiked) {
      dispatch(unlikeDiscussionById(id));
    } else {
      dispatch(likeDiscussionById(id));
    }
  };

  return (
    <Card sx={{ mb: 4, borderRadius: 8 }}>
      <ButtonBase
        component={Link}
        to={`${ROUTE_PATHS.DISCUSSION}/${id}`}
        sx={{ width: '100%', justifyContent: 'left' }}
      >
        <CardHeader
          avatar={<Avatar aria-label="user-avatar" src={user.image_url} />}
          title={
            <Typography variant="h5">{title || 'Untitled Discussion'}</Typography>
                    }
          subheader={(
            <Typography variant="caption" color="text.secondary">
              {`Oleh ${user.username} - ${formatRelativeTime(createdAt)}`}
            </Typography>
                      )}
        />
      </ButtonBase>

      <ButtonBase
        component={Link}
        to={`${ROUTE_PATHS.DISCUSSION}/${id}`}
        sx={{ width: '100%', justifyContent: 'left' }}
      >
        <CardContent>
          <Typography
            variant="body2"
            sx={{
              WebkitLineClamp: 4,
              lineClamp: 4,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
            }}
          >
            {content}
          </Typography>
        </CardContent>
      </ButtonBase>

      <CardActions>
        <Stack direction="row" justifyContent="flex-end" alignItems="center" sx={{ width: '100%' }}>
          <Stack direction="row" spacing={1.2}>
            <Stack direction="row" alignItems="center">
              <IconButton onClick={handleLikeDiscussion}>
                {isLiked ? (
                  <ThumbUp sx={{ fontSize: '20px' }} />
                ) : (
                  <ThumbUpOffAlt sx={{ fontSize: '20px' }} />
                )}
              </IconButton>
              <Typography variant="subtitle2" color="text.secondary">
                {likedBy.length || 0}
              </Typography>
              <IconButton>
                <CommentIcon sx={{ fontSize: '20px' }} />
              </IconButton>
              <Typography variant="subtitle2" color="text.secondary" sx={{ mr: 2 }}>
                {totalComments}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </CardActions>
    </Card>
  );
}

DiscussionItem.propTypes = {
  discussion: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string,
    content: PropTypes.string.isRequired,
    user: PropTypes.shape({
      username: PropTypes.string.isRequired,
      image_url: PropTypes.string.isRequired,
    }).isRequired,
    totalComments: PropTypes.number.isRequired,
    createdAt: PropTypes.string.isRequired,
    likedBy: PropTypes.arrayOf(PropTypes.number).isRequired,
  }).isRequired,
};

export default DiscussionItem;

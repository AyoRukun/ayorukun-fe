import {
  Avatar, Card, CardActions, CardContent, CardHeader, IconButton, Stack, Typography,
} from '@mui/material';
import React from 'react';
import CommentIcon from '@mui/icons-material/Comment';
import formatRelativeTime from '../utils/date.js';
import PropTypes from 'prop-types';

function DiscussionDetailCard({ discussion }) {
  const {
    user, title, createdAt, content, comments,
  } = discussion;

  return (
    <Card sx={{ mb: 4, borderRadius: 8 }}>
      <CardHeader
        avatar={<Avatar src={user.image_url} aria-label="user-avatar" />}
        title={<Typography variant="h4">{title || 'Untitled Discussion'}</Typography>}
        subheader={(
          <Typography
            variant="caption"
          >
            {`Oleh ${user.name} - ${formatRelativeTime(createdAt)}`}
          </Typography>
)}
      />
      <CardContent>
        <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
          {content}
        </Typography>
      </CardContent>
      <CardActions>
        <Stack direction="row" justifyContent="flex-end" alignItems="center" sx={{ width: '100%' }}>
          <IconButton>
            <CommentIcon sx={{ fontSize: '20px' }} />
          </IconButton>
          <Typography variant="subtitle2" color="text.secondary" sx={{ mr: 2 }}>{comments.length}</Typography>
        </Stack>
      </CardActions>
    </Card>
  );
}

DiscussionDetailCard.propTypes = {
  discussion: PropTypes.shape({
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
      image_url: PropTypes.string.isRequired,
    }).isRequired,
    title: PropTypes.string,
    createdAt: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    comments: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        content: PropTypes.string.isRequired,
        createdAt: PropTypes.string.isRequired,
        user: PropTypes.shape({
          name: PropTypes.string.isRequired,
          image_url: PropTypes.string.isRequired,
        }).isRequired,
        likedBy: PropTypes.arrayOf(PropTypes.number).isRequired,
      }),
    ).isRequired,
  }).isRequired,
};

export default DiscussionDetailCard;

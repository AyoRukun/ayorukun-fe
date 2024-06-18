import {
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import formatRelativeTime from '../utils/date.js';
import React from 'react';
import { ThumbUp, ThumbUpOffAlt } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { likeReportCommentById, unlikeReportCommentById } from '../states/report/reportSlice.js';
import { toast } from 'react-toastify';
import { likeDiscussionCommentById, unlikeDiscussionCommentById } from '../states/discussion/discusssionSlice.js';
import PropTypes from 'prop-types';

function CommentItem({ comment, source }) {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user.id);
  const isLiked = comment.likedBy.includes(userId);

  const handleLikeClick = () => {
    if (!userId) {
      toast.warn('Silakan login untuk menyukai komentar ini.');
      return;
    }

    if (isLiked) {
      if (source === 'discussion') {
        dispatch(unlikeDiscussionCommentById({
          discussionId: comment.discussion_id,
          commentId: comment.id,
          userId,
        }));
      } else if (source === 'report') {
        dispatch(unlikeReportCommentById({ reportId: comment.report_id, commentId: comment.id, userId }));
      }
    } else if (source === 'discussion') {
      dispatch(likeDiscussionCommentById({
        discussionId: comment.discussion_id,
        commentId: comment.id,
        userId,
      }));
    } else if (source === 'report') {
      dispatch(likeReportCommentById({ reportId: comment.report_id, commentId: comment.id, userId }));
    }
  };

  return (
    <React.Fragment key={comment.id}>
      <ListItem sx={{ borderRadius: '16px', border: '1px solid #e0e0e0' }}>
        <ListItemAvatar>
          <Avatar src={comment.user.image_url} aria-label="comment-avatar" />
        </ListItemAvatar>
        <ListItemText
          primary={comment.user.name}
          secondary={(
            <>
              <Typography
                sx={{ color: 'text.secondary', display: 'block', mb: 1 }}
                variant="caption"
              >
                {formatRelativeTime(comment.createdAt)}
              </Typography>
              <Typography variant="body2">
                {comment.content}
              </Typography>
            </>
                      )}
        />
        <ListItemSecondaryAction>
          <Stack
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            sx={{ width: '100%' }}
          >
            <IconButton onClick={handleLikeClick}>
              {isLiked ? (
                <ThumbUp sx={{ fontSize: '20px' }} />
              ) : (
                <ThumbUpOffAlt sx={{ fontSize: '20px' }} />
              )}
            </IconButton>
            <Typography
              variant="subtitle2"
              color="text.secondary"
            >
              {comment.likedBy.length || 0}
            </Typography>
          </Stack>
        </ListItemSecondaryAction>
      </ListItem>
    </React.Fragment>
  );
}

CommentItem.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.number.isRequired,
    content: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
      image_url: PropTypes.string.isRequired,
    }).isRequired,
    likedBy: PropTypes.arrayOf(PropTypes.number).isRequired,
    discussion_id: PropTypes.number,
    report_id: PropTypes.number,
  }).isRequired,
  source: PropTypes.oneOf(['discussion', 'report']).isRequired,
};

export default CommentItem;

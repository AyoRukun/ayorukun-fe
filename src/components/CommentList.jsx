import { Box, List, Typography } from '@mui/material';
import React from 'react';
import { Alert } from '@mui/lab';
import PropTypes from 'prop-types';
import { sortByCreatedAt } from '../utils/date.js';
import CommentItem from './CommentItem.jsx';

function CommentList({ comments, source }) {
  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2 }}>Komentar</Typography>
      {comments.length > 0 ? (
        <List>
          {sortByCreatedAt(comments).map((comment) => (
            <CommentItem key={comment.id} comment={comment} source={source} />
          ))}
        </List>
      ) : (
        <Alert severity="info" sx={{ mt: 2 }}>
          Belum ada komentar. Jadilah yang pertama berbagi pendapat Anda!
        </Alert>
      )}

    </Box>

  );
}

CommentList.propTypes = {
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
      discussion_id: PropTypes.number,
      report_id: PropTypes.number,
    }),
  ).isRequired,
  source: PropTypes.oneOf(['discussion', 'report']).isRequired,
};

export default CommentList;

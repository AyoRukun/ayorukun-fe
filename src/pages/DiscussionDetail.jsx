import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@mui/material';
import { addDiscussionComment, fetchDiscussionDetail } from '../states/discussion/discusssionSlice';
import CommentList from '../components/CommentList.jsx';
import CommentForm from '../components/CommentForm.jsx';
import DiscussionDetailCard from '../components/DiscussionDetailCard.jsx';

function DiscussionDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const discussion = useSelector((state) => state.discussion.discussion);

  useEffect(() => {
    dispatch(fetchDiscussionDetail({ discussionId: id }));
  }, [dispatch]);

  const handleAddComment = (discussionId, commentData) => {
    dispatch(addDiscussionComment({ discussionId, commentData }));
  };

  if (!discussion) {
    return null;
  }

  return (
    <Box sx={{
      p: 2, mx: { xs: 2, lg: 9 }, mt: 14, mb: 4, boxShadow: 24, borderRadius: 8, backgroundColor: '#ffffff',
    }}
    >
      <DiscussionDetailCard discussion={discussion} />

      <CommentForm onAddComment={handleAddComment} id={id} />

      <CommentList comments={discussion.comments} source="discussion" />
    </Box>
  );
}

export default DiscussionDetail;

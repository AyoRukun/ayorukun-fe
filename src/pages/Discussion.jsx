import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid } from '@mui/material';
import { fetchDiscussions } from '../states/discussion/discusssionSlice.js';
import DiscussionList from '../components/DiscussionList.jsx';

function Discussion() {
  const dispatch = useDispatch();
  const { discussions } = useSelector((state) => state.discussion);

  useEffect(() => {
    dispatch(fetchDiscussions());
  }, [dispatch]);

  return (
    <Grid container justifyContent="center" minHeight="100vh">
      <DiscussionList
        discussions={discussions}
      />
    </Grid>
  );
}

export default Discussion;

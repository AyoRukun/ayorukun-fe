import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Add } from '@mui/icons-material';
import Button from '@mui/material/Button';
import { fetchDiscussions } from '../states/discussion/discusssionSlice.js';
import { sortByCreatedAt } from '../utils/date.js';
import DiscussionItem from '../components/DiscussionItem.jsx';
import DiscussionList from '../components/DiscussionList.jsx';
import DiscussionHero from '../components/DiscussionHero.jsx';

function Discussion() {
  const dispatch = useDispatch();
  const { discussions } = useSelector((state) => state.discussion);

  useEffect(() => {
    dispatch(fetchDiscussions());
  }, [dispatch]);

  return (
    <>
      <DiscussionHero />
      <DiscussionList discussions={discussions} />
    </>
  );
}

export default Discussion;

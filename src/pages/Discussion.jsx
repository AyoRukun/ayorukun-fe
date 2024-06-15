import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDiscussions } from '../states/discussion/discusssionSlice.js';
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

import React, { useState } from 'react';
import { Box, Pagination } from '@mui/material';
import DiscussionItem from './DiscussionItem';
import { sortByCreatedAt } from '../utils/date.js';
import PropTypes from 'prop-types';

function DiscussionList({ discussions }) {
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const startIndex = (page - 1) * itemsPerPage;
  const selectedDiscussions = sortByCreatedAt(discussions)
    .slice(startIndex, startIndex + itemsPerPage);

  return (
    <Box sx={{
      p: 2, mx: { xs: 2, lg: 9 }, mt: 4, mb: 4, boxShadow: 24, borderRadius: 8, backgroundColor: '#ffffff',
    }}
    >
      {selectedDiscussions.map((discussion) => (
        <DiscussionItem key={discussion.id} discussion={discussion} />
      ))}
      <Pagination
        count={Math.ceil(discussions.length / itemsPerPage)}
        page={page}
        onChange={handleChangePage}
        sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}
      />
    </Box>
  );
}

DiscussionList.propTypes = {
  discussions: PropTypes.arrayOf(
    PropTypes.shape({
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
    }),
  ).isRequired,
};

export default DiscussionList;

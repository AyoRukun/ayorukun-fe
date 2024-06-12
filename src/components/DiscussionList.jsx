import React from 'react';
import { Box } from '@mui/material';
import DiscussionItem from './DiscussionItem.jsx';
import { sortByCreatedAt } from '../utils/date';

function DiscussionList({ discussions }) {
  return (
    <Box sx={{
      p: 2,
      mx: { xs: 2, lg: 9 },
      mt: -8,
      mb: 4,
      boxShadow: 24,
    }}
    >
      {sortByCreatedAt(discussions).map((discussion) => (
        <DiscussionItem key={discussion.id} discussion={discussion} />
      ))}
    </Box>
  );
}

export default DiscussionList;

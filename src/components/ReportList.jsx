import Box from '@mui/material/Box';
import React from 'react';
import ReportItem from './ReportItem.jsx';
import { sortByCreatedAt } from '../utils/date.js';

function ReportList({ reports }) {
  return (
    <Box sx={{
      p: 2,
      mx: { xs: 2, lg: 9 },
      mt: -8,
      mb: 4,
      boxShadow: 24,
    }}
    >
      {sortByCreatedAt(reports).map((report) => (
        <ReportItem key={report.id} report={report} />
      ))}
    </Box>
  );
}

export default ReportList;

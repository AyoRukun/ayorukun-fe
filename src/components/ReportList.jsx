import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import PropTypes from 'prop-types';
import ReportItem from './ReportItem.jsx';
import { sortByCreatedAt } from '../utils/date.js';

function ReportList({ reports }) {
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const startIndex = (page - 1) * itemsPerPage;
  const selectedReports = sortByCreatedAt(reports).slice(startIndex, startIndex + itemsPerPage);

  return (
    <Box sx={{
      p: 2, mx: { xs: 2, lg: 9 }, mt: 4, mb: 4, boxShadow: 24, borderRadius: 8, backgroundColor: '#ffffff',
    }}
    >
      {selectedReports.map((report) => (
        <ReportItem key={report.id} report={report} />
      ))}
      <Pagination
        count={Math.ceil(reports.length / itemsPerPage)}
        page={page}
        onChange={handleChangePage}
        sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}
      />
    </Box>
  );
}

ReportList.propTypes = {
  reports: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string,
      content: PropTypes.string.isRequired,
      region: PropTypes.string.isRequired,
      school_name: PropTypes.string.isRequired,
      user: PropTypes.shape({
        username: PropTypes.string.isRequired,
        image_url: PropTypes.string.isRequired,
      }).isRequired,
      report_as: PropTypes.string.isRequired,
      report_files: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          path: PropTypes.string.isRequired,
        }),
      ).isRequired,
      totalComments: PropTypes.number.isRequired,
      createdAt: PropTypes.string.isRequired,
      likedBy: PropTypes.arrayOf(PropTypes.number).isRequired,
    }),
  ).isRequired,
};

export default ReportList;

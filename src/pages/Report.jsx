import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import { fetchReports } from '../states/report/reportSlice';
import ReportList from '../components/ReportList.jsx';
import ReportHero from '../components/ReportHero.jsx';

function Report() {
  const dispatch = useDispatch();
  const { reports } = useSelector((state) => state.report);

  useEffect(() => {
    dispatch(fetchReports());
  }, [dispatch]);

  return (
    <Box>
      <ReportHero />
      <ReportList reports={reports} />
    </Box>
  );
}

export default Report;

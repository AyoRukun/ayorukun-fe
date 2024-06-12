import React, { useEffect } from 'react';
import { Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addReport, fetchReports } from '../states/report/reportSlice';
import ReportList from '../components/ReportList.jsx';

function Report() {
  const dispatch = useDispatch();
  const { reports, isLoading, error } = useSelector((state) => state.report);
  useEffect(() => {
    dispatch(fetchReports());
  }, [dispatch]);

  const handleNewReportSubmit = (formData) => {
    dispatch(addReport(formData));
  };

  return (
    <Grid container justifyContent="center" minHeight="100vh">

      <ReportList
        reports={reports}
        handleSubmitReport={handleNewReportSubmit}
      />
    </Grid>
  );
}

export default Report;

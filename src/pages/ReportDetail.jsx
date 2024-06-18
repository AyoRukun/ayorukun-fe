import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@mui/material';
import { addReportComment, fetchReportDetail } from '../states/report/reportSlice';
import CommentList from '../components/CommentList.jsx';
import ReportDetailCard from '../components/ReportDetailCard.jsx';
import CommentForm from '../components/CommentForm.jsx';

function ReportDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const report = useSelector((state) => state.report.report);

  useEffect(() => {
    dispatch(fetchReportDetail(id));
  }, [dispatch]);

  const handleAddComment = (reportId, commentData) => {
    dispatch(addReportComment({ reportId, commentData }));
  };

  if (!report) {
    return null;
  }

  return (
    <Box sx={{
      p: 2, mx: { xs: 2, lg: 9 }, mt: 14, mb: 4, boxShadow: 24, borderRadius: 8, backgroundColor: '#ffffff',
    }}
    >
      <ReportDetailCard report={report} />

      <CommentForm onAddComment={handleAddComment} id={id} />

      <CommentList comments={report.comments} source="report" />
    </Box>
  );
}

export default ReportDetail;

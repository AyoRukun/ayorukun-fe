import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
    <>
      <ReportHero />
      <ReportList reports={reports} />
    </>
  );
}

export default Report;

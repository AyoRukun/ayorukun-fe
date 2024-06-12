import React from 'react';
import HomePage from '../pages/HomePage.jsx';
import GuestRoute from '../components/GuestRoute.jsx';
import SignIn from '../pages/SignIn.jsx';
import SignUp from '../pages/SignUp.jsx';
import Discussion from '../pages/Discussion.jsx';
import DiscussionDetail from '../pages/DiscussionDetail.jsx';
import Report from '../pages/Report.jsx';
import ReportDetail from '../pages/ReportDetail.jsx';
import AboutPage from '../pages/AboutPage.jsx';
import { ROUTE_PATHS } from './index.jsx';

const routes = [
  { path: ROUTE_PATHS.HOME, element: <HomePage /> },
  { path: ROUTE_PATHS.SIGN_IN, element: <GuestRoute element={<SignIn />} /> },
  { path: ROUTE_PATHS.SIGN_UP, element: <GuestRoute element={<SignUp />} /> },
  { path: ROUTE_PATHS.DISCUSSION, element: <Discussion /> },
  { path: ROUTE_PATHS.DISCUSSION_DETAIL, element: <DiscussionDetail /> },
  { path: ROUTE_PATHS.REPORT, element: <Report /> },
  { path: ROUTE_PATHS.REPORT_DETAIL, element: <ReportDetail /> },
  { path: ROUTE_PATHS.ABOUT, element: <AboutPage /> },
];

export default routes;

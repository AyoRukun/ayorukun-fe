import React, {useEffect} from "react";
import {Route, Routes} from "react-router-dom";
import {ROUTE_PATHS} from "./routes/index.js";
import {checkAuth} from "./states/auth/authSlice.js";
import {useDispatch, useSelector} from "react-redux";
import HomePage from "./pages/HomePage.jsx";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import GuestRoute from "./components/GuestRoute.jsx";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import AppAppBar from "./components/AppAppBar.jsx";
import Discussion from "./pages/Discussion.jsx";
import DiscussionDetail from "./pages/DiscussionDetail.jsx";
import Report from "./pages/Report.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import ReportDetail from "./pages/ReportDetail.jsx";
import {LoadingBar} from "react-redux-loading-bar";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const routeConfig  = [
    { path: ROUTE_PATHS.HOME, element: <HomePage /> },
    { path: ROUTE_PATHS.SIGN_IN, element: <GuestRoute element={<SignIn/>} /> },
    { path: ROUTE_PATHS.SIGN_UP, element: <GuestRoute element={<SignUp/>} /> },
    { path: ROUTE_PATHS.DISCUSSION, element: <Discussion /> },
    { path: ROUTE_PATHS.DISCUSSION_DETAIL, element: <DiscussionDetail /> },
    { path: ROUTE_PATHS.REPORT, element: <Report /> },
    { path: ROUTE_PATHS.REPORT_DETAIL, element: <ReportDetail /> },
    { path: ROUTE_PATHS.ABOUT, element: <AboutPage /> },
];

function App() {
    const dispatch = useDispatch();

    const { token } = useSelector(state => state.auth);

    useEffect(() => {
        if (token) {
            dispatch(checkAuth());
        }
    }, [dispatch, token]);

    return (
        <Box sx={{ display: 'flex' }}>
            <AppAppBar/>
            <LoadingBar />
            <ToastContainer />
            <Box component="main" justifyContent="center" alignItems="center" minHeight="100vh" minWidth="100%">
                <Toolbar />
                <Box flex={1}>
                    <Routes>
                        {routeConfig.map((route, index) => (
                            <Route key={index} path={route.path} element={route.element} />
                        ))}
                    </Routes>
                </Box>
            </Box>
        </Box>
    );
}

export default App;

import React, {useEffect} from "react";
import {Route, Routes} from "react-router-dom";
import {ROUTE_PATHS} from "./routes/index.js";
import {checkAuth} from "./states/auth/authSlice.js";
import {useDispatch, useSelector} from "react-redux";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import GuestRoute from "./components/GuestRoute.jsx";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import AppAppBar from "./components/AppAppBar.jsx";
import Discussion from "./pages/Discussion.jsx";
import DiscussionDetail from "./pages/DiscussionDetail.jsx";

const routeConfig  = [
    { path: ROUTE_PATHS.HOME, element: <HomePage /> },
    { path: ROUTE_PATHS.LOGIN, element: <GuestRoute element={<LoginPage />} /> },
    { path: ROUTE_PATHS.REGISTER, element: <GuestRoute element={<RegisterPage />} /> },
    { path: ROUTE_PATHS.SIGN_IN, element: <GuestRoute element={<SignIn/>} /> },
    { path: ROUTE_PATHS.SIGN_UP, element: <GuestRoute element={<SignUp/>} /> },
    { path: ROUTE_PATHS.DISCUSSION, element: <Discussion /> },
    { path: ROUTE_PATHS.DISCUSSION_DETAIL, element: <DiscussionDetail /> },
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

import React, {useEffect} from "react";
import { useRoutes } from "react-router-dom";
import {ROUTE_PATHS} from "./routes/index.js";
import {checkAuth} from "./states/auth/authSlice.js";
import {useDispatch, useSelector} from "react-redux";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";

const routeConfig  = [
    { path: ROUTE_PATHS.HOME, element: <HomePage /> },
    { path: ROUTE_PATHS.LOGIN, element: <LoginPage /> },
    { path: ROUTE_PATHS.REGISTER, element: <RegisterPage /> },
];

function App() {
    const routes = useRoutes(routeConfig);
    const dispatch = useDispatch();
    const { user, token } = useSelector(state => state.auth);

    useEffect(() => {
        if (token) {
            dispatch(checkAuth());
        }
    }, [dispatch, token]);


    return (
        <div>
            <main>{routes}</main>
        </div>
    );
}

export default App;

import {useRoutes} from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";

const ROUTE_PATHS = {
    HOME: '/',
    LOGIN: '/login',
    REGISTER: '/register',
};

function App() {
    const routes = useRoutes([
        { path: ROUTE_PATHS.HOME, element: <HomePage /> },
        { path: ROUTE_PATHS.LOGIN, element: <LoginPage /> },
        { path: ROUTE_PATHS.REGISTER, element: <RegisterPage /> },
    ]);

  return (
      <>
          <main>
              {routes}
          </main>
      </>

  );
}

export default App

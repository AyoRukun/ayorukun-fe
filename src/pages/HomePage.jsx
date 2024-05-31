import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../states/auth/authSlice';

function HomePage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, token } = useSelector(state => state.auth);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    return (
        <>
            <h1>HomePage</h1>

            {user ? (
                <>
                    <p>Selamat datang, {user.name}!</p>
                    <button onClick={handleLogout}>Logout</button>
                </>
            ) : (
                <>
                    <Link to={"/login"}><h2>Login</h2></Link>
                    <Link to={"/register"}><h2>Register</h2></Link>
                </>
            )}
        </>
    );
}

export default HomePage;

import React, { useState } from 'react';
import logo from '../assets/ayorukun.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../states/auth/authSlice';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { status, error } = useSelector((state) => state.auth);

    const handleSubmit = async (event) => {
        event.preventDefault();

        dispatch(login({ email, password }))
            .unwrap()
            .then(() => {
                navigate('/');
            })
            .catch((error) => {
                alert(error);
            });
    };

    return (
        <section className="container">
            <div className="card">
                <div className="flex-wrapper">
                    <form className="form-group" onSubmit={handleSubmit}>
                        <div className="form-content">
                            <h1 className="title">Sign In</h1>

                            <label htmlFor="emailField" className="visually-hidden">Email</label>
                            <input
                                id="emailField"
                                className="input-field"
                                type="email"
                                placeholder="Email"
                                aria-label="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <label htmlFor="passwordField" className="visually-hidden">Password</label>
                            <input
                                id="passwordField"
                                className="input-field"
                                type="password"
                                placeholder="Password"
                                aria-label="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <p className="signin-text">Dont have account? <Link to={"/register"}>Sign up here</Link></p>
                            <button className="signup-button" type="submit">Sign In</button>

                        </div>
                    </form>
                    <div className="image-group">
                        <img
                            loading="lazy"
                            src={logo}
                            className="img-responsive"
                            alt="A decorative signup illustration"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default LoginPage;

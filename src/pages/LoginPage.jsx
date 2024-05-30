import React from 'react';
import logo from '../assets/ayorukun.svg'
import {Link} from "react-router-dom";

function LoginPage() {
    return (
        <section className="container">
            <div className="card">
                <div className="flex-wrapper">
                    <form className="form-group">
                        <div className="form-content">
                            <h1 className="title">Sign In</h1>
                            <label htmlFor="emailField" className="visually-hidden">Email</label>
                            <input id="emailField" className="input-field" type="email" placeholder="Email"
                                   aria-label="Email"/>
                            <label htmlFor="passwordField" className="visually-hidden">Password</label>
                            <input id="passwordField" className="input-field" type="password" placeholder="Password"
                                   aria-label="Password"/>
                            <p className="signin-text">Dont have account? <Link to={"/register"}>Sign up here</Link></p>
                            <button className="signup-button">Sign In</button>
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
};

export default LoginPage;

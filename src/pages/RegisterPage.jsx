import React from "react";
import logo from "../assets/ayorukun.svg";
import {Link} from "react-router-dom";

function RegisterPage() {
    return (
        <section className="container">
            <div className="card">
                <div className="flex-wrapper">
                    <form className="form-group">
                        <div className="form-content">
                            <h1 className="title">Sign Up</h1>
                            <label htmlFor="nameField" className="visually-hidden">Name</label>
                            <input id="nameField" className="input-field" type="text" placeholder="Name"
                                   aria-label="Name"/>
                            <label htmlFor="emailField" className="visually-hidden">Email</label>
                            <input id="emailField" className="input-field" type="email" placeholder="Email"
                                   aria-label="Email"/>
                            <label htmlFor="passwordField" className="visually-hidden">Password</label>
                            <input id="passwordField" className="input-field" type="password" placeholder="Password"
                                   aria-label="Password"/>
                            <label htmlFor="repeatPasswordField" className="visually-hidden">Repeat Password</label>
                            <input
                                id="repeatPasswordField"
                                className="input-field"
                                type="password"
                                placeholder="Repeat Password"
                                aria-label="Repeat Password"
                            />
                            <p className="signin-text">Have account? <Link to={"/login"}>Sign in here</Link></p>
                            <button className="signup-button">Sign Up</button>
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
    )
}

export default RegisterPage;

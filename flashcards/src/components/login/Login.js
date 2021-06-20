import React, { useState } from 'react';
import "./login.css";

import { useSelector, useDispatch } from "react-redux";
import { loginAction, loginFailAction } from "../../actions"

import { FaSpinner } from "react-icons/fa";

export default function Login(props)
{
    const dispatch = useDispatch();
    const authReducer = useSelector(state => state.auth);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => 
    {
        e.preventDefault();

        if (!(email.length > 0))
        {
            loginFailAction(dispatch, "Email cannot be blank!");
        }
        else if (!(password.length > 0))
        {
            loginFailAction(dispatch, "Password cannot be blank!");
        }
        else if (!(password.length >= 5 && password.length <= 100))
        {
            loginFailAction(dispatch, "Password must be between 5 and 100 characters!");
        }
        else
        {
            loginAction(dispatch, { password: password, email: email });
        }
    }

    return (
        <div className="login-container">
            <h1 className="text-center">Login</h1>
            <form >
                <div className="container">
                    <div>
                        <label htmlFor="email">Email</label>
                        <input type="text" id='email' placeholder="Enter email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div style={{ marginTop: 10 }}>
                        <label htmlFor="password">Password</label>
                        <input type="password" id='password' placeholder="Enter password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                </div>
                {authReducer.errorMessage ? <p style={{ color: 'red' }}>{authReducer.errorMessage}</p> : null}
                <button onClick={handleLogin} disabled={authReducer.loading}>{authReducer.loading ? <span>Please wait <FaSpinner /></span> : "Login"}</button>

                <div>
                    <button type="reset" onClick={() => { setEmail(""); setPassword(""); }}>Cancel</button>
                    <span className="forgotPsw">Forgot <a href="#">password?</a></span>{/*TODO forgotten password */}
                </div>
            </form>
            <p className="text-center"><a className="login-create" href="/register">Create an Account</a></p>
            <br></br>
            <button onClick={() => (loginAction(dispatch, { password: "123", email: "tt@ggg.com" }))}>Dev login</button>{/*TODO delete on prod*/}
        </div >
    )
}
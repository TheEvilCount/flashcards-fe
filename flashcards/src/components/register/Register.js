import React, { useState } from 'react';

import { useSelector, useDispatch } from "react-redux";
import { registerAction } from "../../actions";


import { FaSpinner } from "react-icons/fa";
import { Types } from '../../actions/actionTypes';


export default function Register()
{

    const dispatch = useDispatch();
    const registerReducer = useSelector(state => state.register);

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordRep, setPasswordRep] = useState("");


    const emailReg = /^[^\s@]+@[^\s@]+$/;


    const handleRegister = async (e) => 
    {
        e.preventDefault();

        if (!(username.length >= 3 && username.length <= 20))
        {
            dispatch({ type: Types.REGISTER_FAIL, payload: { error: "Username must be between 3 and 20 characters!" } });
        }
        else if (!(password.length >= 5 && password.length <= 100))
        {
            dispatch({ type: Types.REGISTER_FAIL, payload: { error: "Password must be between 5 and 100 characters!" } });
        }
        else if (password !== passwordRep)
        {
            dispatch({ type: Types.REGISTER_FAIL, payload: { error: "Password do not match!" } });
        }
        else if (!passwordRep)
        {
            dispatch({ type: Types.REGISTER_FAIL, payload: { error: "Pleas repeat password!" } });
        }
        else if (!emailReg.test(email))
        {
            dispatch({ type: Types.REGISTER_FAIL, payload: { error: "Please provide a valid email addrerss!" } });
        }
        else
        {
            registerAction(dispatch, { password: password, email: email, passwordRep: passwordRep, username: username });
        }
    };

    return (
        <div className="login-container">
            <h1 className="text-center">Register</h1>
            <form >
                <div className="container">
                    <div>
                        <label htmlFor="email">Email</label>
                        <input type="text" id='email' placeholder="Enter email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                        <label htmlFor="username">Username</label>
                        <input type="text" id='username' placeholder="Enter username" required value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div style={{ marginTop: 10 }}>
                        <label htmlFor="password">Password</label>
                        <input type="password" id='password' placeholder="Enter password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                        <label htmlFor="password-repeat">Repeat Password</label>
                        <input type="password" id='password-repeat' placeholder="Enter repeat password" required value={passwordRep} onChange={(e) => setPasswordRep(e.target.value)} />
                    </div>
                </div>
                {registerReducer.errorMessage ? <p style={{ color: 'red' }}>{registerReducer.errorMessage}</p> : null}
                <button onClick={handleRegister} disabled={registerReducer.loading}>{registerReducer.loading ? <span>Please wait <FaSpinner /></span> : "Register"}</button>

                <button type="reset" onClick={() => { setEmail(""); setPassword(""); setPasswordRep(""); setUsername(""); }}>Cancel</button>
            </form>
        </div >
    )
}
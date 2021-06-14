import React, { useState } from 'react';
import "./login.css";

import { useSelector, useDispatch } from "react-redux";
import { loginAction } from "../../actions"

export default function Login()
{
    const dispatch = useDispatch();
    const userReducer = useSelector(state => state.auth);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => 
    {
        e.preventDefault();

        //check 

        loginAction(dispatch, { password: password, email: email });
    }

    return (
        <div>
            Login page
            Login<br /><br />
            <form >
                <div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input type="text" id='email' placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div style={{ marginTop: 10 }}>
                        <label htmlFor="password">Password</label>
                        <input type="password" id='password' placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                </div>
                {/*errorMessage ? <p style={{ color: 'red' }}>{errorMessage}</p> : null*/}
                {userReducer.errorMessage ? <p style={{ color: 'red' }}>{userReducer.errorMessage}</p> : null}
                <button onClick={handleLogin} disabled={userReducer.loading}>login</button>
            </form>
            {/* <button onClick={() => dispatch(loginAction({ username: "TheEvilCount", email: "tt@ggg.com" }))}>Dev login</button> */}
            <button onClick={() => (loginAction(dispatch, { password: "123", email: "tt@ggg.com" }))}>Dev login</button>
        </div >
    )
}
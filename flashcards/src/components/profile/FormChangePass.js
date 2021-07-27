import React, { useState } from 'react'

import { useSelector, useDispatch } from "react-redux";

import { FaSpinner } from "react-icons/fa";

import Popup from 'reactjs-popup';
import "./formChangePass.scss"
import axios from 'axios';
import { API_SERVER_URL } from '../../config/paths';

export default function FormChangePass(props) 
{
    const [passwordCurr, setPassword] = useState("");
    const [passwordNew, setPasswordNew] = useState("");
    const [passwordNewRep, setPasswordNewRep] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(null);

    const authReducer = useSelector(state => state.auth);

    const handleChange = async (e) =>
    {
        e.preventDefault();

        setSuccess(null);
        if (!(passwordNew.length >= 5 && passwordNew.length <= 100))
        {
            //registerFailAction(dispatch, "Password must be between 5 and 100 characters!");
            setError("Password must be between 5 and 100 characters!");
        }
        else if (passwordNew !== passwordNewRep)
        {
            //registerFailAction(dispatch, "Password do not match!");
            setError("Password do not match!");
        }
        else if (!passwordNewRep)
        {
            //registerFailAction(dispatch, "Pleas repeat password!");
            setError("Please repeat password!");
        }//TODO
        else
        {
            setLoading(true);
            //change pass
            console.log("Change pass");
            //changePassAction(dispatch, { user: authReducer.user, password: passwordCurr, newPassword: passwordNew });
            axios.post(API_SERVER_URL + "/cpass",
                {
                    headers: {
                        Authorization: `token ${authReducer.authToken}`
                    },
                    data: {
                        user: authReducer.user,
                        password: passwordCurr,
                        passwordNew: passwordNew
                    }, withCredentials: true
                }).then((response) =>
                {
                    if (response.status === 200)
                    {
                        setLoading(false);
                        setSuccess(true);

                        passwordCurr("");
                        setPasswordNew("");
                        setPasswordNewRep("");

                        //TODO redirect??
                    }
                    else
                    { console.log("change pass error; status:" + response.status) }

                }).catch((error) =>
                {
                    console.log(error);
                    setError(error.message);
                    setLoading(false);
                })
            /* 
            
                        console.log(changePassPayload);
                        dispatch({ type: Types.CHANGE_PASS_REQ });
            
                        const user = changePassPayload.user;
                        const pass = changePassPayload.password;
                        const newPass = changePassPayload.newPassword; */
        }
    }

    return (
        <div>
            <Popup
                trigger={<button className="button"> Change password </button>}
                modal
                nested

            >
                {close => (
                    <div className="modal">
                        <button className="close" onClick={close}>
                            &times;
                        </button>
                        <div className="header"> Change password </div>
                        <div className="content login-container">
                            <form>
                                <h2>Change password</h2>
                                <div>
                                    <label htmlFor="pass-curr">Enter current password for authorization:</label>
                                    <input type="password" id="pass-curr" placeholder="Enter current password" required value={passwordCurr} onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <br />
                                <div>
                                    <label htmlFor="pass-new">Enter a new password:</label>
                                    <input type="password" id="pass-new" placeholder="Enter a new password" required value={passwordNew} onChange={(e) => setPasswordNew(e.target.value)} />
                                </div>
                                <div>
                                    <label htmlFor="pass-new-repeat">Repeat a new password:</label>
                                    <input type="password" id="pass-new-repeat" placeholder="Repeat a new password" required value={passwordNewRep} onChange={(e) => setPasswordNewRep(e.target.value)} />
                                </div>
                                {/*authReducer.errorMessage ? <p style={{ color: 'red' }}>{authReducer.errorMessage}</p> : null*/}
                                {/* <button onClick={handleChange} disabled={authReducer.loading}>{authReducer.loading ? <span>Please wait <FaSpinner /></span> : "Login"}</button> */}
                                {error ? <p style={{ color: 'red' }}>{error}</p> : null}
                                <button onClick={handleChange} disabled={loading}>{loading ? <span>Please wait <FaSpinner /></span> : "Change password"}</button>
                            </form>
                        </div>
                        <div className="actions">
                            <button
                                className="button"
                                onClick={() =>
                                {
                                    //console.log('modal closed ');
                                    close();
                                }}
                            >
                                Close &times;
                            </button>
                        </div>
                    </div>
                )}
            </Popup>
        </div>
    )
}


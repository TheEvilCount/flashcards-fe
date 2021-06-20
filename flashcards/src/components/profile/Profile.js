import React from 'react';

import { useSelector, useDispatch } from "react-redux";

import FormChangePass from './FormChangePass';



export default function Profile()
{
    const authReducer = useSelector(state => state.auth);
    const dispatch = useDispatch();

    return (
        <div>
            <div>{JSON.stringify(authReducer)}</div>
            <h1>Profile</h1>
            <span>
                <p>{authReducer.user.username}</p>
                <p>{authReducer.user.email}</p>
            </span>
            {/*  <button onClick={handleChangePass}>Change password</button> */}
            <FormChangePass />



            <span>
                <h2>Settings</h2>
                <label htmlFor="card-rot-ch">Left/Right card rotation</label>
                <input id="card-rot-ch" type="checkbox" value="" />
            </span>
        </div>
    )
}

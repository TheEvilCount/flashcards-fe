import React from 'react';

import { useSelector, useDispatch } from "react-redux";
import { Card, CardActionArea, CardActions, CardContent, Typography } from "@mui/material"
import FormChangePass from './FormChangePass';



export default function Profile()
{
    const authReducer = useSelector(state => state.auth);
    const dispatch = useDispatch();

    return (
        <div className="container">
            <div className="text-center">
                <div style={{ wordBreak: "break-word" }}>{JSON.stringify(authReducer)}</div>
                <Card>
                    <Typography textAlign={'center'} variant="h4">Profile</Typography>
                    <CardContent>
                        <span>
                            <p>username: {authReducer.user.username}</p>
                            <p>email: {authReducer.user.email}</p>
                        </span>


                        <FormChangePass />
                    </CardContent>
                </Card>


                <Card>
                    <h2>Settings</h2>
                    <label htmlFor="card-rot-ch">Left/Right card rotation</label>
                    <input id="card-rot-ch" type="checkbox" value="" />
                </Card>
            </div></div >
    )
}

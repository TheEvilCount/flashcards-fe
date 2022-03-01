import React, { useCallback } from 'react';

import { useSelector, useDispatch } from "react-redux";
import { Button, Card, CardContent, Typography } from "@mui/material"
import { preferencesChangeAction } from 'state/actions';
import useChangePassDialog from './useChangePassModal';



export default function Profile()
{
    const authReducer = useSelector(state => state.auth);
    const dispatch = useDispatch();

    //modal changepass stuff
    const [modal, openUpdate] = useChangePassDialog();
    const openModal = useCallback(
        (data) =>
        {
            openUpdate(data);
        },
        [openUpdate],
    );

    return (
        <div className="container">
            {modal}
            <div className="text-center">
                <div style={{ wordBreak: "break-word" }}>{JSON.stringify(authReducer)}</div>
                <Card>
                    <Typography textAlign={'center'} variant="h4">Profile</Typography>
                    <CardContent>
                        <span>
                            <p>username: {authReducer.user.username}</p>
                            <p>email: {authReducer.user.email}</p>
                        </span>

                        <Button variant='contained' onClick={() => openModal(authReducer.user)}>Change password</Button>
                    </CardContent>
                </Card>
                <Card>
                    <h2>Settings</h2>
                    <label htmlFor="card-rot-ch">Left/Right card rotation</label>
                    <input id="card-rot-ch" type="checkbox" value="" checked={authReducer.parsedPrefs?.flipLeft}
                        onChange={() =>
                        {
                            const newPrefs = authReducer.parsedPrefs;
                            newPrefs.flipLeft = !newPrefs.flipLeft;
                            dispatch(preferencesChangeAction({ preferences: newPrefs }))
                        }} />
                    {/* TODO rfactor to form with CollectionColorMode, dark mode,...?? */}
                </Card>
            </div></div >
    )
}

import React, { useCallback } from 'react';

import { useSelector, useDispatch } from "react-redux";
import { Button, Card, CardContent } from "@mui/material"
import { preferencesChangeAction } from 'state/actions';
import useChangePassDialog from '../components/otherModals/useChangePassModal';



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
            <div className="text-center mt-2">
                {/* <div style={{ wordBreak: "break-word" }}>{JSON.stringify(authReducer)}</div> */}
                <Card>
                    <CardContent>
                        <h1 className="text-center">Profile</h1>
                        <span>
                            <p>username: {authReducer.user.username}</p>
                            <p>email: {authReducer.user.email}</p>
                            <p>role: {authReducer.user.role}</p>
                            <p>registered: {new Date(authReducer.user.registrationDate).toLocaleDateString()}</p>
                        </span>

                        <Button variant='contained' onClick={() => openModal(authReducer.user)}>Change password</Button>
                    </CardContent>
                </Card>
                <Card>
                    <h2>Settings</h2>
                    <h4>Left/Right card rotation</h4>
                    <label htmlFor="card-rot-ch">Right rotation</label>
                    <input id="card-rot-ch" type="checkbox" value="" checked={authReducer.parsedPrefs?.flipLeft}
                        onChange={() =>
                        {
                            const newPrefs = authReducer.parsedPrefs;
                            newPrefs.flipLeft = !newPrefs.flipLeft;
                            dispatch(preferencesChangeAction({ preferences: newPrefs }))
                        }} />
                    {/* TODO rfactor to form with CollectionColorMode, dark mode,...?? */}
                    <div className='mb-2'>&nbsp;</div>
                </Card>
            </div>
        </div >
    )
}

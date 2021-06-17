import React from 'react';

import { useSelector, useDispatch } from "react-redux";

export default function Profile()
{
    const userReducer = useSelector(state => state.auth);

    return (
        <div>
            Profile!!!!
            <div>{JSON.stringify(userReducer)}</div>
        </div>
    )
}

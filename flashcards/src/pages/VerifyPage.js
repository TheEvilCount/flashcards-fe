import useAxios from 'axios-hooks';
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { Alert, Button, Card, CardActions, CardContent, Typography } from '@mui/material';

import ErrorLoadingDataWrapper from '../components/ErrorLoadingDataWrapper';
import apiReqConfig from '../config/apiReqConfig';

export const regMsg = { key: "msg", val: "RegSucc" }

const VerifyPage = () =>
{
    const search = useLocation().search;
    let msg = new URLSearchParams(search).get(regMsg.key);
    let token = new URLSearchParams(search).get("token");

    const [{ data: dataVerify, loading: isLoadingVerify, error: errorVerify }, postVerify] = useAxios(
        apiReqConfig.auth.verify(token), { manual: true });

    useEffect(() =>
    {
        postVerify().catch((error) => { console.error(error) });
    }, [token, postVerify]);

    return (
        <>
            <h1 className='text-center'>Verification Page</h1>
            {
                msg === regMsg.val && (
                    <Card style={{ maxWidth: "400px", margin: "auto" }} sx={{ borderRadius: 2 }}>
                        <Typography gutterBottom variant="h5" component="div">
                            <Alert severity='success'>Registration succeeded!</Alert>
                        </Typography>
                        <CardContent>
                            <Typography variant="body2">
                                Now activate account clicking on verification link in sent email
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Typography variant="body2">
                                Email not recieved?
                            </Typography>
                            <Button color='primary'>Resend email</Button>
                        </CardActions>
                    </Card>
                )
            }
            {
                token &&
                <ErrorLoadingDataWrapper isLoading={isLoadingVerify} error={errorVerify} retryRequest={postVerify} title={"Account Verification"}>
                    <div>{dataVerify || "no verify data"}</div>
                    {/* TODO success verification on success */}
                </ErrorLoadingDataWrapper>
            }
        </>
    );
};
export default VerifyPage;
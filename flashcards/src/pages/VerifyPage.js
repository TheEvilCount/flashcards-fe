import useAxios from 'axios-hooks';
import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

import { Alert, Button, Card, CardActions, CardContent, LinearProgress, Typography } from '@mui/material';

import ErrorLoadingDataWrapper from '../components/ErrorLoadingDataWrapper';
import apiReqConfig from '../config/apiReqConfig';
import { NavLink } from 'react-router-dom';
import { pathConsts } from 'config/paths';

import { toast } from 'react-toastify';

export const regMsg = { key: "msg", val: "RegSucc" }

const VerifyPage = () =>
{
    const search = useLocation().search;
    const msg = new URLSearchParams(search).get(regMsg.key);
    const token = new URLSearchParams(search).get("token");
    const email = new URLSearchParams(search).get("email");

    const [{ loading: isLoadingVerify, error: errorVerify }, postVerify, manualCancelVerify] = useAxios(
        apiReqConfig.auth.verify(token), { manual: true });

    const [{ loading: isLoadingResend }, postResend] = useAxios(
        apiReqConfig.auth.resend(email), { manual: true });

    useEffect(() =>
    {
        if (token)
            postVerify()
                .then(() =>
                {
                    toast.success("User account successfully verified!");
                })
                .catch((error) =>
                {
                    console.error(error);
                    toast.error(error.data.message || "Verification error!");
                });

        return () =>
        {
            manualCancelVerify();
        }
    }, [token, postVerify, manualCancelVerify]);

    const resendToastRef = useRef(null);

    const resendEmail = () =>
    {
        resendToastRef.current = toast.info("Email resend pending...", { autoClose: apiReqConfig.auth.resend().timeout });
        postResend()
            .then(() =>
            {
                toast.update(resendToastRef.current, { type: "success", render: "Email resended!" })
            })
            .catch((error) =>
            {
                console.error(error);
                toast.update(resendToastRef.current, { type: "error", render: error.data.message || "Error!" })
            });
    }

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
                            <Button color='primary' disabled={isLoadingResend} onClick={() => resendEmail()}>Resend email</Button>
                            {isLoadingResend && <LinearProgress />}
                        </CardActions>
                    </Card>
                )
            }
            {
                token &&
                <ErrorLoadingDataWrapper isLoading={isLoadingVerify} error={errorVerify?.data} retryRequest={postVerify} title={"Account Verification"}>
                    <Alert severity='success'>Account successfully verified!<br /><NavLink to={pathConsts.login}>Login</NavLink></Alert>
                    {/* TODO success verification on success */}
                </ErrorLoadingDataWrapper>
            }
        </>
    );
};
export default VerifyPage;
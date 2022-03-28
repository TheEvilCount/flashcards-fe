import React, { useCallback, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Alert, Button, Card, CardActions, CardContent, LinearProgress, Typography } from '@mui/material';
import ErrorLoadingDataWrapper from '../components/ErrorLoadingDataWrapper';
import { NavLink } from 'react-router-dom';
import { pathConsts } from 'config/paths';
import { useMutationResendVerifyEmail, useMutationVerifyAccount } from "api/react-query-hooks/useVerifyAccount";

import { toast } from 'react-toastify';
import ContentWrapper from 'components/ContentWrapper';

export const regMsg = { key: "msg", val: "RegSucc" }

const VerifyPage = () =>
{
    const search = useLocation().search;
    const msg = new URLSearchParams(search).get(regMsg.key);
    const token = new URLSearchParams(search).get("token");
    const email = new URLSearchParams(search).get("email");

    const mutationVerifyAccount = useMutationVerifyAccount(token);
    const mutationResendEmail = useMutationResendVerifyEmail();

    const verify = useCallback(() =>
    {
        mutationVerifyAccount.mutateAsync()
            .then(() =>
            {
                toast.success("User account successfully verified!");
            })
            .catch((error) =>
            {
                toast.error(error.data.message || "Verification error!");
                console.error(error);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() =>
    {
        if (token && token.length > 10)
            verify();
    }, [token, verify]);

    const resendToastRef = useRef(null);

    const resendEmail = (email) =>
    {
        resendToastRef.current = toast.info("Email resend pending...");
        mutationResendEmail.mutateAsync(email)
            .then(() =>
            {
                toast.update(resendToastRef.current, { type: "success", render: "Email resended!" })
            })
            .catch((error) =>
            {
                toast.update(resendToastRef.current, { type: "error", render: error.data.message || "Error!" })
                console.error(error);
            });
    }

    return (
        <ContentWrapper>
            <h1 className='text-center'>Verification Page</h1>
            {
                msg === regMsg.val && (
                    <Card style={{ maxWidth: "400px", margin: "auto" }} sx={{ borderRadius: 2 }}>
                        <Typography gutterBottom variant="h5" component="div">
                            <Alert severity='success'>Registration succeeded!</Alert>
                        </Typography>
                        <CardContent>
                            <Typography variant="body2">
                                Now activate account clicking on verification link in sent email ({email})
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Typography variant="body2">
                                Email not recieved?
                            </Typography>
                            <Button color='primary' disabled={mutationResendEmail.isLoading} onClick={() => resendEmail(email)}>Resend email</Button>
                            {mutationResendEmail.isLoading && <LinearProgress />}
                        </CardActions>
                    </Card>
                )
            }
            {console.log(mutationVerifyAccount.error)}
            {
                token &&
                <ErrorLoadingDataWrapper isLoading={mutationVerifyAccount.isLoading} error={mutationVerifyAccount.error?.data} retryRequest={verify} title={"Account Verification"}>
                    <Alert severity='success'>Account successfully verified!<br /><NavLink to={pathConsts.login}>Login</NavLink></Alert>
                </ErrorLoadingDataWrapper>
            }
        </ContentWrapper>
    );
};
export default VerifyPage;
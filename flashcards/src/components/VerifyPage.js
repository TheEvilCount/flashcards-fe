import { Button, Card, CardActions, CardContent, CardHeader, Typography } from '@material-ui/core';
import { Alert } from '@mui/material';
import useAxios from 'axios-hooks';
import React from 'react';
import { useLocation } from 'react-router-dom';
import apiReqConfig from '../config/apiReqConfig';

export const regMsg = { key: "msg", val: "RegSucc" }

const VerifyPage = (props) =>
{
    const search = useLocation().search;
    let msg = new URLSearchParams(search).get(regMsg.key);
    //?msg=RegisterSuccess
    const token = "";//TODO
    const [{ data: verifyData, isLoading: verifyIsLoading, error: verifyError }, postVerify] = useAxios(
        apiReqConfig.auth.verify(token), { manual: true });


    return (
        <div>
            <h1 className='text-center'>Verification Page</h1>
            {
                msg === regMsg.val && (
                    <>
                        <Card style={{ maxWidth: "400px", margin: "auto" }} sx={{ borderRadius: 2 }}>
                            <Typography gutterBottom variant="h5" component="div">
                                <Alert>Registration succeeded!</Alert>
                            </Typography>
                            <CardContent>
                                <Typography variant="body2" color="text.secondary">
                                    Now activate account clicking on verification link in sent email
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Typography variant="body2" color="text.secondary">
                                    Email not recieved?
                                </Typography>
                                <Button color='primary'>Resend email</Button>
                            </CardActions>
                        </Card>
                    </>
                )
            }
        </div>
    );
};
export default VerifyPage;
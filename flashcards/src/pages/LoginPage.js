import React from 'react';
import { NavLink } from "react-router-dom";

import { useDispatch } from "react-redux";
import { loginAction } from "state/actions"
import { pathConsts } from '../config/paths';

import loginFormValidation from '../validations/loginFormValidation';
import InputTextField from '../components/InputTextField';
import { Field, Form, Formik } from 'formik';
import { Button, LinearProgress, Card, FormControlLabel, Typography, Switch } from '@mui/material';
import ContentWrapper from 'components/ContentWrapper';


export default function LoginPage()
{
    const dispatch = useDispatch();

    return (
        <ContentWrapper>
            <Card id={"login-container"} >
                <Typography className="text-center" variant="h4">Login</Typography>
                <Formik
                    initialValues={{
                        email: "",
                        password: "",
                        rememberme: true
                    }}
                    validationSchema={loginFormValidation}
                    onSubmit={(values, actions) =>
                    {
                        console.log(JSON.stringify(values));
                        actions.setStatus({ message: null });//reset message
                        dispatch(loginAction({ password: values.password, email: values.email, remember: values.rememberme }, actions));
                    }}
                >
                    {({
                        isSubmitting,
                        handleSubmit,
                        values,
                        status,
                        resetForm,
                        setFieldValue
                    }) => (
                        <>
                            <Form>
                                <Card className="container">
                                    <div>
                                        <InputTextField name="email" type="email" label="E-mail" placeholder="@" />
                                        <InputTextField name="password" type="password" label="Password" placeholder="" />
                                    </div>
                                    <FormControlLabel
                                        control={
                                            <Field
                                                label="Remember Me"
                                                name="rememberme"
                                                component={Switch}
                                                onChange={() => { values.rememberme ? setFieldValue("rememberme", false) : setFieldValue("rememberme", true); }}
                                                checked={values.rememberme}
                                            />
                                        }
                                        label="Remember Me"
                                    />
                                </Card>
                                {/* {authReducer.errorMessage ? <p style={{ color: 'red' }}>{authReducer.errorMessage}</p> : null} */}
                                {status && status.message && (
                                    <div className="message">{status.message}</div>
                                )}
                                {isSubmitting && <LinearProgress />}
                                <Button
                                    color="primary"
                                    variant="contained"
                                    type="submit"
                                    onClick={handleSubmit}
                                    disabled={isSubmitting}
                                >
                                    Login
                                </Button>

                                <div>
                                    <Button type="reset" onClick={resetForm}>Cancel</Button>
                                    <span className="forgotPsw">
                                        Lost <NavLink to={pathConsts.lostPass}>password?</NavLink>
                                    </span>
                                </div>
                            </Form>
                            <p className="text-center">
                                <NavLink className="login-create" to={pathConsts.register}>Create an Account</NavLink>
                            </p>
                        </>
                    )}
                </Formik>
            </Card >
        </ContentWrapper>
    )
}
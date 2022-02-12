import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
import "./login.scss";

import { useSelector, useDispatch } from "react-redux";
import { loginAction, loginFailAction } from "../../actions"

import { FaSpinner } from "react-icons/fa";

import InputTextField from '../InputTextField';
import { Field, Form, Formik } from 'formik';
import * as Yup from "yup";
import { Button, Card, Checkbox, FormControl, FormControlLabel, Typography, Switch } from '@material-ui/core';
import { LinearProgress } from '@material-ui/core';
import { pathConsts } from '../../config/paths';


export default function Login(props)
{
    const dispatch = useDispatch();
    const authReducer = useSelector(state => state.auth);

    const [toggle, setToggle] = useState(false);

    const handleToggle = () =>
    {
        toggle ? setToggle(false) : setToggle(true);
    };

    const formValidation = Yup.object(
        {
            email: Yup.string()
                .required("Required field!")
                .min(5, "Email must contains 5 or more characters!")
                .email("Please provide a valid email address!"),
            password: Yup.string()
                .required("Required field!")
                .min(6, "Password must contains 6 or more characters!"),
        }
    );

    return (
        <Card id={"login-container"} >
            <Typography className="text-center" variant="h4">Login</Typography>
            <Formik
                initialValues={{
                    email: "",
                    password: "",
                    rememberme: true
                }}
                validationSchema={formValidation}
                onSubmit={(values, actions) =>
                {
                    console.log({ password: values.password, email: values.email });
                    actions.setStatus({ message: null });//reset message
                    dispatch(loginAction({ password: values.password, email: values.email, remember: values.remember ? "checked" : "" }, actions));
                }}
            >
                {({
                    isSubmitting,
                    handleSubmit,
                    values,
                    status,
                    errors,
                    touched,
                    resetForm,
                    actions,
                    setFieldValue
                }) => (
                    <>
                        <Form>
                            <Card className="container">
                                <div>
                                    <InputTextField error={errors.email} touched={touched.email} name="email" type="email" label="E-mail" placeholder="@" />
                                </div>
                                <div style={{ marginTop: 10 }}>
                                    <InputTextField error={errors.password} touched={touched.password} name="password" type="password" label="Password" placeholder="" />
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
                                type="submit"
                                onClick={() => { }}
                                block
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? <span>Please wait <FaSpinner /></span> : "Login"}
                            </Button>

                            <div>
                                <Button type="reset" onClick={() => { resetForm() }}>Cancel</Button>
                                <span className="forgotPsw">
                                    Forgot <NavLink to={pathConsts.resetPass}>password?</NavLink>
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
    )
}
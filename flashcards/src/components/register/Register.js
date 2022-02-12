import React from 'react';
import { useDispatch } from "react-redux";
import { registerAction } from "../../actions";
import { Form, Formik } from 'formik';
import * as Yup from "yup";

import { FaSpinner } from "react-icons/fa";
import InputTextField from '../InputTextField';
import { Button, Card, Typography } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { pathConsts } from '../../config/paths';


export default function Register()
{
    const dispatch = useDispatch();

    const formValidation = Yup.object(
        {
            email: Yup.string()
                .required("Required field!")
                .min(5, "Email must contains 5 or more characters!")
                .email("Please provide a valid email address!"),
            username: Yup.string()
                .required("Required field!")
                .min(5, "Username must cantains 5 or more characters!")
                .max(20, "Username is too long! (max 20 characters)"),
            password: Yup.string()
                .required("Required field!")
                .min(8, "Password must contains 8 or more characters!"),
            passwordRepeat: Yup.string()
                .required("Required field!")
                .test('passwordsRepeat', "Password do not match!", function (value)
                {
                    return this.parent.password === value
                })
        }
    );

    return (
        <Card id="login-container">
            <Typography className="text-center" variant="h4">Register</Typography>
            <Formik initialValues={{
                username: "",
                email: "",
                password: "",
                passwordRepeat: ""
            }}
                validationSchema={formValidation}
                onSubmit={(values, actions) =>
                {
                    actions.setStatus({ message: null });//reset message
                    dispatch(registerAction(values.email, values.username, values.password, actions));
                }}
            >
                {({
                    isSubmitting,
                    handleSubmit,
                    values,
                    status,
                    resetForm
                }) => (
                    <>
                        <Form >
                            <Card className="container">
                                <div>
                                    <InputTextField name="email" type="email" label="E-mail" placeholder="Enter email" />
                                    <InputTextField name="username" type="text" label="Username" placeholder="Enter username" />

                                </div>
                                <div style={{ marginTop: 10 }}>
                                    <InputTextField name="password" type="password" label="Password" placeholder="Enter password" />
                                    <InputTextField name="passwordRepeat" type="password" label="Repeat Password" placeholder="Repeat password" />
                                </div>
                            </Card>
                            {
                                status && status.message && (
                                    <div className="message">{status.message}</div>
                                )
                            }
                            <Button
                                color="primary"
                                type="submit"
                                onClick={handleSubmit}
                                block
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? <span>Please wait <FaSpinner /></span> : "Register"}
                            </Button>
                            <Button type="reset" onClick={() => { resetForm() }}>Cancel</Button>
                        </Form>
                        <p className="text-center">
                            <NavLink className="login-create" to={pathConsts.login}>Already registered?</NavLink>
                        </p>
                    </>
                )}
            </Formik>
        </Card>
    )
}
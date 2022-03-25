import React from 'react';
import { useDispatch } from "react-redux";
import { registerAction } from "../state/actions";
import { Form, Formik } from 'formik';
import InputTextField from '../components/InputTextField';
import { LinearProgress, Typography, Button, Card } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { pathConsts } from '../config/paths';
import registerFormValidation from '../validations/registerFormValidation';


export default function RegisterPage()
{
    const dispatch = useDispatch();

    return (
        <Card id="login-container">
            <Typography className="text-center" variant="h4">Register</Typography>
            <Formik initialValues={{
                username: "",
                email: "",
                password: "",
                passwordRepeat: ""
            }}
                validationSchema={registerFormValidation}
                onSubmit={(values, actions) =>
                {
                    actions.setStatus({ message: null });//reset message
                    dispatch(registerAction(values.email, values.username, values.password, actions));
                }}
            >
                {({
                    isSubmitting,
                    handleSubmit,
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
                            {isSubmitting && <LinearProgress />}
                            <Button
                                color="primary"
                                type="submit"
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                            >
                                Register
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
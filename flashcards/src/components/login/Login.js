import React, { useState } from 'react';
import "./login.scss";

import { useSelector, useDispatch } from "react-redux";
import { loginAction, loginFailAction } from "../../actions"

import { FaSpinner } from "react-icons/fa";

import InputTextField from '../InputTextField';
import { Field, Form, Formik } from 'formik';
import * as Yup from "yup";

export default function Login(props)
{
    const dispatch = useDispatch();
    const authReducer = useSelector(state => state.auth);

    /* const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [remember, setRemember] = useState(false); */

    /*  const handleLogin = async (e) => 
     {
         e.preventDefault();
 
         if (!(email.length > 0))
         {
             loginFailAction(dispatch, "Email cannot be blank!");
         }
         else if (!(password.length > 0))
         {
             loginFailAction(dispatch, "Password cannot be blank!");
         }
         else if (!(password.length >= 5 && password.length <= 100))
         {
             loginFailAction(dispatch, "Password must be between 5 and 100 characters!");
         }
         else
         {
             console.log({ password: password, email: email });
             loginAction(dispatch, { password: password, email: email, remember: remember ? "checked" : "" });
         } 
     }*/

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
        <div className="login-container">
            <h1 className="text-center">Login</h1>
            <Formik
                initialValues={{
                    email: "",
                    password: "",
                    remember: false
                }}
                validationSchema={formValidation}
                onSubmit={(values, actions) =>
                {
                    console.log({ password: values.password, email: values.email });
                    actions.setStatus({ message: null });//reset message

                    //loginAction(dispatch, values, actions);
                    loginAction(dispatch, { password: values.password, email: values.email, remember: values.remember ? "checked" : "" }, actions);
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
                        <Form>
                            <div className="container">
                                <div>
                                    {/* <label htmlFor="email">Email</label>
                                    <input type="text" id='email' placeholder="Enter email" required value={email} onChange={(e) => setEmail(e.target.value)} /> */}
                                    <InputTextField name="email" type="email" label="E-mail:" placeholder="Enter email" />
                                </div>
                                <div style={{ marginTop: 10 }}>
                                    {/* <label htmlFor="password">Password</label>
                                    <input type="password" id='password' placeholder="Enter password" required value={password} onChange={(e) => setPassword(e.target.value)} /> */}
                                    <InputTextField name="password" type="password" label="Password:" placeholder="Enter password" />
                                </div>
                                <div>
                                    <label htmlFor="remember">Remember me</label>
                                    <Field id="remember" type="checkbox" name="remember" checked={values.remember} />
                                </div>
                            </div>
                            {/* {authReducer.errorMessage ? <p style={{ color: 'red' }}>{authReducer.errorMessage}</p> : null} */}
                            {status && status.message && (
                                <div className="message">{status.message}</div>
                            )}
                            {/* <button onClick={handleLogin} disabled={authReducer.loading}>{authReducer.loading ? <span>Please wait <FaSpinner /></span> : "Login"}</button> */}
                            <button
                                color="primary"
                                type="submit"
                                onClick={handleSubmit}
                                block
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? <span>Please wait <FaSpinner /></span> : "Login"}
                            </button>

                            <div>
                                <button type="reset" onClick={() => { resetForm() }}>Cancel</button>
                                <span className="forgotPsw">Forgot <a href="#">password?</a></span>{/*TODO forgotten password */}
                            </div>
                        </Form>
                        <p className="text-center"><a className="login-create" href="/register">Create an Account</a></p>
                    </>
                )}
            </Formik>
        </div >
    )
}
import React, { useState } from 'react';

import { useSelector, useDispatch } from "react-redux";
import { registerAction, registerFailAction } from "../../actions";
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from "yup";

import { FaSpinner } from "react-icons/fa";
import InputTextField from '../InputTextField';


export default function Register()
{

    const dispatch = useDispatch();
    const registerReducer = useSelector(state => state.register);
    /* 
        const [email, setEmail] = useState("");
        const [username, setUsername] = useState("");
        const [password, setPassword] = useState("");
        const [passwordRep, setPasswordRep] = useState("");
     */

    //const emailReg = /^[^\s@]+@[^\s@]+$/;


    /* const handleRegister = async (e) => 
    {
        e.preventDefault();

        if (!(username.length >= 3 && username.length <= 20))
        {
            registerFailAction(dispatch, "Username must be between 3 and 20 characters!");
        }
        else if (password.length <= 5 || password.length > 100 || password === password.toLowerCase() || password === password.toUpperCase())
        {
            registerFailAction(dispatch, "Password must be between 5 and 100 characters and must contains at least one lower and one upper case letter!");
        }
        else if (password !== passwordRep)
        {
            registerFailAction(dispatch, "Password do not match!");
        }
        else if (!passwordRep)
        {
            registerFailAction(dispatch, "Pleas repeat password!");
        }
        else if (!emailReg.test(email))
        {
            registerFailAction(dispatch, "Please provide a valid email address!");
        }
        else
        {
            registerAction(dispatch, { password: password, email: email, username: username });
        }
    }; */

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
                .min(6, "Password must contains 6 or more characters!"),
            passwordRepeat: Yup.string()
                .required("Required field!")
                .test('passwordsRepeat', "Password do not match!", function (value)
                {
                    return this.parent.password === value
                })
        }
    );

    return (
        <div className="login-container">
            <h1 className="text-center">Register</h1>
            <Formik initialValues={{
                username: "",
                email: "",
                password: "",
                passwordRepeat: ""
            }}
                validationSchema={formValidation}
                onSubmit={(values, actions) =>
                {
                    //handleLoginSubmit(values, actions);

                    actions.setStatus({ message: null });//reset message
                    //registerAction(dispatch, values, actions);
                    registerAction(dispatch, { password: values.password, email: values.email, username: values.username }, actions);
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

                            <div className="container">
                                <div>
                                    {/* <label htmlFor="email">Email</label>
                                    <input type="text" id='email' placeholder="Enter email" required value={values.email} onChange={(e) => setEmail(e.target.value)} />
                                    <label htmlFor="username">Username</label>
                                    <input type="text" id='username' placeholder="Enter username" required value={username} onChange={(e) => setUsername(e.target.value)} /> */}

                                    <InputTextField name="email" type="email" label="E-mail:" placeholder="Enter email" />
                                    <InputTextField name="username" type="text" label="Username:" placeholder="Enter username" />


                                </div>
                                <div style={{ marginTop: 10 }}>
                                    {/* <label htmlFor="password">Password</label>
                                    <input type="password" id='password' placeholder="Enter password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                                    <label htmlFor="password-repeat">Repeat Password</label>
                                    <input type="password" id='password-repeat' placeholder="Enter repeat password" required value={passwordRep} onChange={(e) => setPasswordRep(e.target.value)} />
                                 */}
                                    <InputTextField name="password" type="password" label="Password:" placeholder="Enter password" />
                                    <InputTextField name="passwordRepeat" type="password" label="Repeat Password:" placeholder="Repeat password" />
                                </div>
                            </div>
                            {/* {registerReducer.errorMessage ? <p style={{ color: 'red' }}>{registerReducer.errorMessage}</p> : null} */}
                            {status && status.message && (
                                <div className="message">{status.message}</div>
                            )}
                            {/* <button onClick={handleRegister} disabled={registerReducer.loading}>{registerReducer.loading ? <span>Please wait <FaSpinner /></span> : "Register"}</button> */}
                            <button
                                color="primary"
                                type="submit"
                                onClick={handleSubmit}
                                block
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? <span>Please wait <FaSpinner /></span> : "Register"}
                            </button>
                            {/* <button type="reset" onClick={() => { setEmail(""); setPassword(""); setPasswordRep(""); setUsername(""); }}>Cancel</button> */}
                            <button type="reset" onClick={() => { resetForm() }}>Cancel</button>
                        </Form>
                        <p className="text-center"><a className="login-create" href="/login">Already registered?</a></p>
                        <button onClick={() => registerAction(dispatch, { email: "dd@gmail.com", username: "tttt", password: "123456Aa" })}>Dev reg</button>

                    </>)}
            </Formik>
        </div >
    )
}
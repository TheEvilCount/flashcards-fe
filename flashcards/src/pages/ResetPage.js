import PropTypes from "prop-types"
import { Button, Card, CardContent, Checkbox, FormControlLabel, FormGroup, LinearProgress, Typography } from '@mui/material';
import { useMutationResetPass } from 'api/react-query-hooks/useLostPass';
import InputTextField from 'components/InputTextField';
import { pathConsts } from 'config/paths';
import { push } from 'connected-react-router';
import { Form, Formik } from 'formik';
import React from 'react'
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import resetPassValidation from 'validations/resetPassValidation';

export default function ResetPage()
{
    const search = useLocation().search;
    const token = new URLSearchParams(search).get("token");

    const mutationResetPass = useMutationResetPass();
    const dispatch = useDispatch();

    return (
        <>
            <h1 className='text-center'>Reset password</h1>
            <Card style={{ maxWidth: "400px", margin: "auto" }} sx={{ borderRadius: 2 }}>
                <Formik
                    initialValues={{
                        password: "",
                        passwordRepeat: "",
                        resetToken: token
                    }}
                    validationSchema={resetPassValidation}
                    onSubmit={(values, actions) =>
                    {
                        actions.setStatus({ message: null });//reset message
                        mutationResetPass.mutateAsync({ password: values.password, token: values.resetToken })
                            .then(() =>
                            {
                                toast.success("Now you can login with your new password!");
                            })
                            .catch((error) =>
                            {
                                toast.error(error.data.message || "Error!")
                                console.error(error);
                            });

                        actions.setSubmitting(false);
                        dispatch(push(pathConsts.login))
                    }}
                >
                    {({
                        isSubmitting,
                        handleSubmit,
                        status,
                        resetForm,
                        isValid,
                        touched
                    }) => (
                        <Form>
                            <CardContent>
                                <Typography variant="body1">
                                    Instructions:
                                </Typography>
                                <FormGroup disabled sx={{ m: "0em 1em" }}>
                                    <InstructionCheckBox label="Enter registered email." checked />
                                    <InstructionCheckBox label="Wait for reset email." checked />
                                    <InstructionCheckBox label="Click on link in email." checked />
                                    <InstructionCheckBox label="Set new password." checked={touched.password && touched.passwordRepeat && isValid} />
                                    <InstructionCheckBox label="Login!" />
                                </FormGroup>
                            </CardContent>
                            <Card style={{ padding: "0.5em 2em 1.5em 2em" }}>
                                <FormGroup>
                                    <InputTextField name={"password"} label={"New Password"} required type='password' />
                                    <InputTextField name={"passwordRepeat"} label={"Repeat Password"} required type='password' />
                                </FormGroup>
                                {status && status.message && (
                                    <div className="message">{status.message}</div>
                                )}
                                {mutationResetPass.isLoading && <LinearProgress />}
                                <div className='mt-2'>
                                    <Button
                                        color="primary"
                                        variant="contained"
                                        type="submit"
                                        onClick={handleSubmit}
                                        disabled={isSubmitting}
                                    >
                                        Submit
                                    </Button>
                                    <Button type="reset" onClick={resetForm}>Cancel</Button>
                                </div>
                            </Card>
                        </Form>
                    )}
                </Formik>
            </Card>
        </>
    )
}

export const InstructionCheckBox = ({ label, checked = false, ...props }) =>
{
    return (
        <FormControlLabel
            sx={{ m: "0em 1em", cursor: "default" }}
            label={label}
            control={
                <Checkbox sx={{ p: "0", cursor: "default" }} color="success" checked={checked} {...props} />
            }
        />)
}
InstructionCheckBox.propTypes = {
    checked: PropTypes.bool,
    label: PropTypes.string
}

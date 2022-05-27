import { Button, Card, CardContent, FormGroup, LinearProgress, Typography } from '@mui/material';
import { useMutationLostPass } from 'api/react-query-hooks/useLostPass';
import ContentWrapper from 'components/ContentWrapper';
import InputTextField from 'components/InputTextField';
import { goBack } from 'connected-react-router';
import { Form, Formik } from 'formik';
import React from 'react'
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import lostPassValidation from 'validations/lostPassValidation';
import { InstructionCheckBox } from './ResetPage';

export default function LostPassPage()
{
    const dispatch = useDispatch();
    const mutationLostPass = useMutationLostPass();

    return (
        <ContentWrapper>
            <h1 className='text-center'>Reset password</h1>
            <Card style={{ maxWidth: "400px", margin: "auto" }} sx={{ borderRadius: 2 }}>
                <Formik
                    initialValues={{
                        email: ""
                    }}
                    validationSchema={lostPassValidation}
                    onSubmit={(values, actions) =>
                    {
                        actions.setStatus({ message: null });//reset message

                        mutationLostPass.mutateAsync(values.email)
                            .then(() =>
                            {
                                toast.success("Check your mailbox!");
                            })
                            .catch((error) =>
                            {
                                toast.error(error.data.message || "Error!")
                                actions.setStatus({ message: "Error: " + error?.data?.message || "Unexpected error" });
                                console.error(error);
                            });

                        actions.setSubmitting(false);
                    }}
                >
                    {({
                        isSubmitting,
                        handleSubmit,
                        status,
                        resetForm,
                        touched,
                        isValid,
                        values,
                        initialValues
                    }) => (
                        <Form>
                            <CardContent>
                                <Typography variant="body1">
                                    Instructions:
                                </Typography>
                                <FormGroup disabled sx={{ m: "0em 1em" }}>
                                    <InstructionCheckBox label="Enter registered email." checked={touched.email && isValid} />
                                    <InstructionCheckBox label="Wait for reset email." />
                                    <InstructionCheckBox label="Click on link in email." />
                                    <InstructionCheckBox label="Set new password." />
                                    <InstructionCheckBox label="Login!" />
                                </FormGroup>
                            </CardContent>
                            <Card style={{ padding: "0.5em 2em 1.5em 2em" }}>
                                <FormGroup>
                                    <InputTextField name={"email"} label={"Email"} required type='email' />
                                </FormGroup>
                                {status && status.message && (
                                    <div className="message">{status.message}</div>
                                )}
                                {mutationLostPass.isLoading && <LinearProgress />}
                                <div>
                                    <Button
                                        color="primary"
                                        variant="contained"
                                        type="submit"
                                        onClick={handleSubmit}
                                        disabled={isSubmitting}
                                    >
                                        Submit email
                                    </Button>
                                    <Button type="reset" onClick={() => { initialValues == values ? dispatch(goBack()) : resetForm() }}>Cancel</Button>
                                </div>
                            </Card>
                        </Form>
                    )}
                </Formik>
            </Card>
        </ContentWrapper>
    )
}
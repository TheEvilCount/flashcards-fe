
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, LinearProgress } from '@mui/material';
import { useMutationCreateCard } from 'api/react-query hooks/useCards';
import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import cardValidation from 'validations/cardValidation';
import InputTextField from '../InputTextField';

/**
 * 
 * @param {*} onSubmitcallback 
 * @returns [MyDialog(), handleClickOpen - handles open]
 */
const useCreateCardDialog = (onSubmitcallback) =>
{
    const [open, setOpen] = useState(false);
    const [data, setData] = useState({});

    const mutationCreateCard = useMutationCreateCard(data);

    const handleClickOpen = (data) =>
    {
        setData(data || {});
        setOpen(true);
    };

    const handleClose = () => { setOpen(false); };

    return [MyDialog(), handleClickOpen];

    function MyDialog()
    {
        return (
            <Dialog open={open} onClose={handleClose}>
                <Formik
                    initialValues={{
                        frontText: "",
                        backText: ""
                    }}
                    validationSchema={cardValidation}
                    onSubmit={(values, actions) =>
                    {
                        console.log("submit??")
                        actions.setStatus({ message: null });//reset message
                        actions.setSubmitting(true);

                        mutationCreateCard.mutateAsync(
                            {
                                frontText: values.frontText,
                                backText: values.backText
                            })
                            .then((response) =>
                            {
                                if (response.status === 201)
                                {
                                    setOpen(false);
                                    onSubmitcallback();
                                }
                                else
                                {
                                    actions.setStatus({ message: response?.data?.errorMessage || "Unexpected error" });
                                }
                            })
                            .catch((error) =>
                            {
                                console.log(error)
                                actions.setStatus({ message: "Error: " + error?.response?.data?.errorMessage || "Unexpected error" });
                            })
                        actions.setSubmitting(false);
                    }}
                >
                    {({
                        isSubmitting,
                        handleSubmit,
                        values,
                        status,
                        errors,
                        touched,
                        setFieldValue
                    }) => (
                        <>
                            <Form>
                                <DialogTitle>Create Card</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>

                                    </DialogContentText>
                                    <InputTextField error={errors.frontText} touched={touched.frontText}
                                        name="frontText" type="text" label="Front" placeholder="" />
                                    <InputTextField error={errors.backText} touched={touched.backText}
                                        name="backText" type="text" label="Back" placeholder="" />
                                    {status && status.message && (
                                        <div className="message">{status.message}</div>
                                    )}
                                </DialogContent>
                                {isSubmitting && <LinearProgress />}
                                <DialogActions>
                                    <Button onClick={() => handleClose()} disabled={isSubmitting}>Cancel</Button>
                                    <Button onClick={() => handleSubmit()} disabled={isSubmitting}>Submit</Button>
                                </DialogActions>
                            </Form>
                        </>
                    )}
                </Formik>
            </Dialog>
        );
    }
}
export default useCreateCardDialog;

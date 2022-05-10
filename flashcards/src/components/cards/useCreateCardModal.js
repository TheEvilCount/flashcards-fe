
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, LinearProgress } from '@mui/material';
import { useMutationCreateCard } from 'api/react-query-hooks/useCards';
import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
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
                                    toast.success("Card created");
                                    onSubmitcallback();
                                }
                                else
                                {
                                    toast.error(response?.data?.message || "Unexpected error");
                                    actions.setStatus({ message: response?.data?.message || "Unexpected error" });
                                }
                            })
                            .catch((error) =>
                            {
                                console.log(error)
                                toast.error("Error: " + error?.data?.message || "Unexpected error");
                                actions.setStatus({ message: "Error: " + error?.data?.message || "Unexpected error" });
                            })
                        actions.setSubmitting(false);
                    }}
                >
                    {({
                        isSubmitting,
                        handleSubmit,
                        status,
                    }) => (
                        <>
                            <Form>
                                <DialogTitle>Create Card</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>

                                    </DialogContentText>
                                    <InputTextField name="frontText" type="text" label="Front"
                                        placeholder="" required multiline />
                                    <InputTextField name="backText" type="text" label="Back"
                                        placeholder="" required multiline />
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

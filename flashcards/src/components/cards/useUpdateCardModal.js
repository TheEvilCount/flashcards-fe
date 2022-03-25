
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, LinearProgress } from '@mui/material';
import { useMutationUpdateCard } from 'api/react-query-hooks/useCards';
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
const useUpdateCardDialog = (onSubmitcallback) =>
{
    const [open, setOpen] = useState(false);
    const [data, setData] = useState({});//{ collectionId: 0, card: {} }

    const mutationUpdateCard = useMutationUpdateCard(data.collectionId);

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
                        frontText: data?.card?.frontText || "",
                        backText: data?.card?.backText || ""
                    }}
                    validationSchema={cardValidation}
                    onSubmit={(values, actions) =>
                    {
                        actions.setStatus({ message: null });//reset message
                        actions.setSubmitting(true);

                        mutationUpdateCard.mutateAsync(
                            {
                                id: data.card.id,
                                frontText: values.frontText,
                                backText: values.backText
                            })
                            .then((response) =>
                            {
                                if (response.status === 200)
                                {
                                    setOpen(false);
                                    toast.success("Card updated");
                                    onSubmitcallback();
                                }
                                else
                                {
                                    actions.setStatus({ message: response?.data?.message || "Unexpected error" });
                                    toast.error(response?.data?.message || "Unexpected error");
                                }
                            })
                            .catch((error) =>
                            {
                                console.log(error)
                                actions.setStatus({ message: "Error: " + error?.data?.message || "Unexpected error" });
                                toast.error("Error: " + error?.data?.message || "Unexpected error");
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
                                <DialogTitle>Update Card</DialogTitle>
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
export default useUpdateCardDialog;

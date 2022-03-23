
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, LinearProgress } from '@mui/material';
import { useMutationCreateCategory } from 'api/react-query hooks/useCategories';
import InputTextField from 'components/InputTextField';
import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

/**
 * 
 * @param {*} onSubmitcallback 
 * @returns [MyDialog(), handleClickOpen - handles open]
 */
const useCreateCategoryDialog = (onSubmitcallback) =>
{
    const [open, setOpen] = useState(false);

    const mutationCreateCategory = useMutationCreateCategory();

    const handleClickOpen = () =>
    {
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
                        title: ""
                    }}
                    /* validationSchema={ } */
                    onSubmit={(values, actions) =>
                    {
                        actions.setStatus({ message: null });//reset message
                        actions.setSubmitting(true);

                        mutationCreateCategory.mutateAsync(
                            {
                                title: values.title
                            })
                            .then((response) =>
                            {
                                if (response.status === 201)
                                {
                                    setOpen(false);
                                    toast.success("Category Created");
                                    onSubmitcallback();
                                }
                                else
                                {
                                    actions.setStatus({ message: response?.data?.message || "Unexpected error" });
                                }
                            })
                            .catch((error) =>
                            {
                                console.log(error)
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
                                    <InputTextField name="title" type="text" label="Title"
                                        placeholder="" required />

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
export default useCreateCategoryDialog;

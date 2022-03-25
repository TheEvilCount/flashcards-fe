
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, LinearProgress } from '@mui/material';
import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import InputTextField from '../InputTextField';
import authAPI from 'api/authAPI';
import changePassValidation from 'validations/changePassValidation';

/**
 * 
 * @param {*} onSubmitcallback 
 * @returns [MyDialog(), handleClickOpen - handles open and passing data]
 */
const useChangePassDialog = (onSubmitcallback) =>
{
    const [open, setOpen] = useState(false);

    const handleClickOpen = () =>
    {
        setOpen(true);
    };

    const handleClose = () =>
    {
        setOpen(false);
    };

    const changePass = (values, actions) =>
    {
        authAPI.changePass(values.oldPassword, values.newPassword)
            .then((response) =>
            {
                if (response.status === 200)
                {
                    setOpen(false);
                    onSubmitcallback && onSubmitcallback();
                }
                else
                {
                    actions.setStatus({ message: response?.data?.errorMessage || "Unexpected error" });
                }
            })
            .catch((error) =>
            {
                actions.setStatus({ message: "Error: " + error?.response?.data?.errorMessage || "Unexpected error" });
            })
    }

    return [MyDialog(), handleClickOpen];

    function MyDialog()
    {
        return (
            <Dialog open={open} onClose={handleClose}>
                <Formik
                    initialValues={{
                        oldPassword: "",
                        newPassword: "",
                        newPasswordRep: "",
                    }}
                    validationSchema={changePassValidation}
                    onSubmit={(values, actions) =>
                    {
                        actions.setStatus({ message: null });//reset message
                        actions.setSubmitting(true);

                        changePass(values, actions);
                        actions.setSubmitting(false);
                    }}
                >
                    {({
                        isSubmitting,
                        handleSubmit,
                        status
                    }) => (
                        <>
                            <Form style={{ minWidth: "30ch", display: "grid", justifyContent: "center" }}>
                                <DialogTitle>Change password</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                    </DialogContentText>

                                    <InputTextField name="oldPassword" type="password" required sx={{ display: "block" }}
                                        label="Current password" placeholder="" />
                                    <InputTextField name="newPassword" type="password" required sx={{ display: "block" }}
                                        label="New Password" placeholder="" />
                                    <InputTextField name="newPasswordRep" type="password" required sx={{ display: "block" }}
                                        label="Repeat new Password" placeholder="" />
                                    {status && status.message && (
                                        <div className="message">{status.message}</div>
                                    )}
                                </DialogContent>
                                {isSubmitting && <LinearProgress />}
                                <DialogActions>
                                    <Button onClick={handleClose} disabled={isSubmitting}>Cancel</Button>
                                    <Button onClick={handleSubmit} disabled={isSubmitting}>Submit</Button>
                                </DialogActions>
                            </Form>
                        </>
                    )}
                </Formik>
            </Dialog>
        );
    }
}
export default useChangePassDialog;
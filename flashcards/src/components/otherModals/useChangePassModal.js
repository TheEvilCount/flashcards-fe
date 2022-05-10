
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, LinearProgress } from '@mui/material';
import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import InputTextField from '../InputTextField';
import authAPI from 'api/authAPI';
import changePassValidation from 'validations/changePassValidation';
import errorParse from 'helpers/errorParse';
import { toast } from 'react-toastify';

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
                    toast.success("Password changed");
                    onSubmitcallback && onSubmitcallback();
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
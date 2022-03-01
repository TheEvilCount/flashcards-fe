
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, LinearProgress, Tooltip } from '@mui/material';
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
    const [data, setData] = useState({});

    const handleClickOpen = (data) =>
    {
        setData(data || {});
        setOpen(true);
    };

    const handleClose = () =>
    {
        setData({});
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
                        status,
                        errors,
                        touched
                    }) => (
                        <>
                            <Form style={{ minWidth: "40ch" }}>
                                <DialogTitle>Change password</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                    </DialogContentText>

                                    <InputTextField error={errors.title} touched={touched.title}
                                        name="oldPassword" type="password" label="Current password" placeholder="" />
                                    <InputTextField error={errors.title} touched={touched.title}
                                        name="newPassword" type="password" label="New Password" placeholder="" />
                                    <InputTextField error={errors.title} touched={touched.title}
                                        name="newPasswordRep" type="password" label="Repeat new Password" placeholder="" />
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
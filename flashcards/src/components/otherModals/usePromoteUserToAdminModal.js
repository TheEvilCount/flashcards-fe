
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, LinearProgress } from '@mui/material';
import { useMutationPromoteUser } from 'api/react-query-hooks/useAdmins';
import { useUsers } from 'api/react-query-hooks/useUsers';
import { Form, Formik } from 'formik';
import FormikMUIAutocomplete from 'lib/FormikMUIAutocomplete';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

/**
 * 
 * @param {*} onSubmitcallback 
 * @returns [MyDialog(), handleClickOpen - handles open]
 */
const usePromometUserToAdminDialog = (onSubmitcallback) =>
{
    const [open, setOpen] = useState(false);

    const mutationPromoteUser = useMutationPromoteUser();
    const { data: dataU, isLoading: isLoadingU } = useUsers();

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
                        user: {}
                    }}
                    /* validationSchema={ } */
                    onSubmit={(values, actions) =>
                    {
                        actions.setStatus({ message: null });//reset message
                        actions.setSubmitting(true);

                        mutationPromoteUser.mutateAsync(values.user.id)
                            .then((response) =>
                            {
                                if (response.status === 200)
                                {
                                    setOpen(false);
                                    toast.success("User promoted");
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
                                <DialogTitle>Promote user</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        Select user you whish to promote to Admin.
                                    </DialogContentText>
                                    <FormikMUIAutocomplete
                                        loading={isLoadingU}
                                        formikName="user"
                                        label="User"
                                        isOptionEqualToValue={(option, value) => option.label === value.label}
                                        options={
                                            dataU
                                                .filter((el) => el.admin === false)
                                                .map((op) =>
                                                {
                                                    return {
                                                        label: (op.username + " - " + op.email),
                                                        id: op.id
                                                    }
                                                })}
                                    />
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
export default usePromometUserToAdminDialog;


import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, LinearProgress, Tooltip } from '@mui/material';
import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import InputTextField from '../InputTextField';
import { ColorPicker, createColor } from "mui-color";
import useCategories from 'api/react-query-hooks/useCategories';
import collectionValidation from 'validations/collectionValidation';
import FormikMaterialUISelectInput from 'lib/FormikMaterialUISelectInput';
import FormikMaterialUIRadioInput from 'lib/FormikMaterialUIRadioInput';
import { useMutationPrivatizeCollection, useMutationPublishCollection, useMutationUpdateCollection } from 'api/react-query-hooks/useCollections';
import { toast } from 'react-toastify';

/**
 * 
 * @param {*} onSubmitcallback 
 * @returns [MyDialog(), handleClickOpen - handles open and passing data]
 */
const useEditCollectionDialog = (onSubmitcallback) =>
{
    const [open, setOpen] = useState(false);
    const [collectionData, setCollectionData] = useState({});
    const [isReadOnly, setIsReadOnly] = useState(false);

    const { data: dataCategories, error: errorCategories, isLoading: isLoadingCategories } = useCategories();

    const mutationUpdateCollection = useMutationUpdateCollection();

    const mutationPublishCollection = useMutationPublishCollection();

    const mutationPrivatizeCollection = useMutationPrivatizeCollection();

    const handleClickOpen = (data, isReadOnlyP = false) =>
    {
        setIsReadOnly(isReadOnlyP);
        setCollectionData(data || {});
        setOpen(true);
    };

    const handleClose = () =>
    {
        setCollectionData({});
        setOpen(false);
    };

    const publish = () =>
    {
        mutationPublishCollection.mutateAsync(collectionData.id)
            .then((response) =>
            {
                if (response.status === 200)
                {
                    setOpen(false);
                    toast.success("Collection updated");
                    onSubmitcallback();
                }
                else
                {
                    alert({ message: response?.data?.message || "Unexpected error" });
                    toast.error(response?.data?.message || "Unexpected error");
                }
            })
            .catch((error) =>
            {
                alert({ message: "Error: " + error?.data?.message || "Unexpected error" });
                toast.error("Error: " + error?.data?.message || "Unexpected error");
            })
    }

    const privatize = () =>
    {
        mutationPrivatizeCollection.mutateAsync(collectionData.id)
            .then((response) =>
            {
                if (response.status === 200)
                {
                    setOpen(false);
                    onSubmitcallback();
                }
                else
                {
                    toast.error(response?.data?.message || "Unexpected error");
                }
            })
            .catch((error) =>
            {
                toast.error("Error: " + error?.data?.message || "Unexpected error");
            })
    }

    const update = (values, actions) =>
    {
        mutationUpdateCollection.mutateAsync(
            {
                id: collectionData.id,
                title: values.title,
                collectionColor: values.collectionColor.hex,
                category: values.category
            })
            .then((response) =>
            {
                if (response.status === 200)
                {
                    setOpen(false);
                    onSubmitcallback();
                }
                else
                {
                    console.log("error res: " + response)
                    actions.setStatus({ message: response?.data?.message || "Unexpected error" });
                    toast.error(response?.data?.message || "Unexpected error");
                }
            })
            .catch((error) =>
            {
                console.log("error: " + error)
                actions.setStatus({ message: "Error: " + error?.data?.message || "Unexpected error" });
                toast.error("Error: " + error?.data?.message || "Unexpected error");
            })
    }

    return [MyDialog(), handleClickOpen];

    function MyDialog()
    {
        return (
            <Dialog open={open} onClose={handleClose}>
                <Formik
                    initialValues={{
                        title: collectionData.title || "",
                        visibility: collectionData.visibility || "",
                        category: collectionData.category || "",
                        collectionColor: createColor(collectionData.collectionColor ? "#" + collectionData.collectionColor : "white")
                    }}
                    validationSchema={collectionValidation}
                    onSubmit={(values, actions) =>
                    {
                        actions.setStatus({ message: null });//reset message
                        actions.setSubmitting(true);
                        update(values, actions);
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
                                <DialogTitle>Edit Collection</DialogTitle>
                                <DialogContent>
                                    {isReadOnly && (
                                        <DialogContentText>
                                            You cannot edit this collection. This is olny information window.
                                        </DialogContentText>)}

                                    <InputTextField error={errors.title} touched={touched.title} disabled={isReadOnly}
                                        name="title" type="text" label="Title" placeholder="" />

                                    <div className="form-group">
                                        <FormikMaterialUIRadioInput
                                            formikName="visibility"
                                            label="Visibility"
                                            margin="normal"
                                            row
                                            disabled
                                            options={[
                                                { label: 'Private', value: 'PRIVATE' },
                                                { label: 'Public', value: 'PUBLIC' },
                                            ]}
                                        />
                                        <DialogContentText>
                                            Please, use buttons Publish/Privatize below.
                                        </DialogContentText>
                                        <Tooltip title="make public"><span><Button onClick={publish} disabled={values.visibility === "PUBLIC" || isReadOnly}>Publish</Button></span></Tooltip>
                                        <Tooltip title="make private"><span><Button onClick={privatize} disabled={values.visibility === "PRIVATE" || isReadOnly}>Privatize</Button></span></Tooltip>
                                    </div>
                                    <div className="form-group">
                                        <FormikMaterialUISelectInput
                                            formikName={"category"}
                                            label={"Categories"}
                                            options={(() =>
                                            {
                                                const arr = [];
                                                dataCategories?.forEach((el) => { arr.push({ label: el.title, value: el.title }) })
                                                return arr;
                                            })()}
                                            isLoading={isLoadingCategories}
                                            loadingError={errorCategories}
                                            disabled={isReadOnly}
                                            fullWidth
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <ColorPicker
                                            name={"collectionColor"}
                                            value={values.collectionColor}
                                            onChange={(value) => setFieldValue("collectionColor", value)}
                                        />
                                    </div>
                                    {status && status.message && (
                                        <div className="message">{status.message}</div>
                                    )}
                                </DialogContent>
                                {isSubmitting && <LinearProgress />}
                                <DialogActions>
                                    <Button onClick={handleClose} disabled={isSubmitting}>Cancel</Button>
                                    <Button onClick={handleSubmit} disabled={isSubmitting || isReadOnly}>Submit</Button>
                                </DialogActions>
                            </Form>
                        </>
                    )}
                </Formik>
            </Dialog>
        );
    }
}
export default useEditCollectionDialog;
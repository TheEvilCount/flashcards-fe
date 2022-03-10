
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, LinearProgress, Tooltip } from '@mui/material';
import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import InputTextField from '../InputTextField';
import { ColorPicker, createColor } from "mui-color";
import useCategories from 'api/react-query hooks/useCategories';
import collectionValidation from 'validations/collectionValidation';
import FormikMaterialUISelectInput from 'lib/FormikMaterialUISelectInput';
import FormikMaterialUIRadioInput from 'lib/FormikMaterialUIRadioInput';
import { useMutationPrivatizeCollection, useMutationPublishCollection, useMutationUpdateCollection } from 'api/react-query hooks/useCollections';

/**
 * 
 * @param {*} onSubmitcallback 
 * @returns [MyDialog(), handleClickOpen - handles open and passing data]
 */
const useEditDialog = (onSubmitcallback) =>
{
    const [open, setOpen] = useState(false);
    const [collectionData, setCollectionData] = useState({});

    const { data: dataCategories, error: errorCategories, isLoading: isLoadingCategories } = useCategories();

    const mutationUpdateCollection = useMutationUpdateCollection();

    const mutationPublishCollection = useMutationPublishCollection();

    const mutationPrivatizeCollection = useMutationPrivatizeCollection();

    const handleClickOpen = (data) =>
    {
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
                    onSubmitcallback();
                }
                else
                {
                    alert({ message: response?.data?.errorMessage || "Unexpected error" });
                }
            })
            .catch((error) =>
            {
                alert({ message: "Error: " + error?.response?.data?.errorMessage || "Unexpected error" });
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
                    alert({ message: response?.data?.errorMessage || "Unexpected error" });
                }
            })
            .catch((error) =>
            {
                alert({ message: "Error: " + error?.response?.data?.errorMessage || "Unexpected error" });
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

                        console.log(collectionData.id, values.title, values.collectionColor.hex, values.category);//TODO
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
                                    <DialogContentText>

                                    </DialogContentText>

                                    <InputTextField error={errors.title} touched={touched.title}
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
                                        <Tooltip title="make public"><span><Button onClick={publish} disabled={values.visibility === "PUBLIC"}>Publish</Button></span></Tooltip>
                                        <Tooltip title="make private"><span><Button onClick={privatize} disabled={values.visibility === "PRIVATE"}>Privatize</Button></span></Tooltip>
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
                                    {/* <div style={{ marginTop: "2em" }}>{JSON.stringify(dataCategories) || {}}</div> */}
                                    {/* <div style={{ marginTop: "2em" }}>{JSON.stringify(collectionData)}</div> */}
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
export default useEditDialog;
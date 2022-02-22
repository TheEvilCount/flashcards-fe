
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, LinearProgress, TextField, Tooltip } from '@mui/material';
import useAxios from 'axios-hooks';
import { Form, Formik } from 'formik';
import { FormikRadioGroupField, FormikSelectField } from 'formik-material-fields';
import React, { useEffect, useState } from 'react';
import apiReqConfig from 'config/apiReqConfig';
import InputTextField from '../InputTextField';
import { ColorPicker, createColor } from "material-ui-color";
import collectionsAPI from 'api/collectionsAPI';


const useEditDialog = (onSubmitcallback) =>
{
    const [open, setOpen] = useState(false);
    const [collectionData, setCollectionData] = useState({});


    const [{ data: dataCategories, loading: isLoadingCategories, error: errorCategories, response: responseCategories }, requestGetCategories] = useAxios(
        apiReqConfig.categories.getCategories(), { manual: true }
    );

    useEffect(() =>
    {
        if (!dataCategories)
            requestGetCategories().catch((error) => console.log("categories: " + error.message));
    }, []);

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

    const getCollectionCategory = (categoryTitle) =>
    {
        if (dataCategories)
        {
            const cat = dataCategories.find((el) => { return el.title === categoryTitle })
            return cat?.id || "";
        }
    }
    const publish = () => { alert("visibility changed!"); handleClose() }//TODO
    const privatize = () => { publish() }

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
                    /*TODO validationSchema={ } */
                    onSubmit={(values, actions) =>
                    {
                        actions.setStatus({ message: null });//reset message
                        actions.setSubmitting(true);

                        collectionsAPI.updateCollection(
                            collectionData.id, values.title, values.collectionColor.hex, values.category)
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
                        resetForm,
                        actions,
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
                                        <FormikRadioGroupField
                                            name="visibility"
                                            label="Visibility"
                                            margin="normal"
                                            row
                                            disabled
                                            touched={touched.visibility}
                                            error={errors.visibility}
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
                                        <FormikSelectField name="category" label={"Category"}
                                            touched={touched.category} error={errors.category}
                                            fullWidth
                                            options={
                                                (() =>
                                                {
                                                    const arr = [];
                                                    dataCategories?.forEach((el) => { arr.push({ label: el.title, value: el.title }) })
                                                    return arr;
                                                })()
                                            }
                                        />
                                    </div>
                                    <div className="form-group">
                                        <ColorPicker name={"collectionColor"} value={values.collectionColor}
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
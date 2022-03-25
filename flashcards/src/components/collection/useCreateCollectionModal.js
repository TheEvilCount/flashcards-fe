import
{
    Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
    FormControl, LinearProgress
} from '@mui/material';
import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import InputTextField from '../InputTextField';
import { ColorPicker, createColor } from "mui-color";

import useCategories from 'api/react-query-hooks/useCategories';
import { useMutationCreateCollection } from 'api/react-query-hooks/useCollections';
import collectionValidation from 'validations/collectionValidation';
import FormikMaterialUISelectInput from "lib/FormikMaterialUISelectInput"
import FormikMaterialUIRadioInput from 'lib/FormikMaterialUIRadioInput';
import { toast } from 'react-toastify';

/**
 * 
 * @param {*} onSubmitcallback 
 * @returns [MyDialog(), handleClickOpen - handles open]
 */
const useCreateCollectionDialog = (onSubmitcallback) =>
{
    const [open, setOpen] = useState(false);

    const { data: dataCategories, error: errorCategories, isLoading: isLoadingCategories } = useCategories();//TODO loading/error info
    const mutationCreateCollection = useMutationCreateCollection();

    const handleClickOpen = () => { setOpen(true); };

    const handleClose = () => { setOpen(false); };

    return [MyDialog(), handleClickOpen];

    function MyDialog()
    {
        return (
            <Dialog open={open} onClose={handleClose}>
                <Formik
                    initialValues={{
                        title: "",
                        visibility: "PRIVATE",
                        category: "",
                        collectionColor: createColor("white")
                    }}
                    validationSchema={collectionValidation}
                    onSubmit={(values, actions) =>
                    {
                        console.log("submit??")
                        actions.setStatus({ message: null });//reset message
                        actions.setSubmitting(true);


                        mutationCreateCollection.mutateAsync(
                            {
                                title: values.title,
                                collectionColor: values.collectionColor.hex,
                                visibility: values.visibility,
                                category: values.category
                            })
                            .then((response) =>
                            {
                                if (response.status === 201)
                                {
                                    setOpen(false);
                                    toast.success("Collection created");
                                    onSubmitcallback();
                                }
                                else
                                {
                                    actions.setStatus({ message: response?.data?.errorMessage || "Unexpected error" });
                                    toast.error("Error: " + response?.data?.errorMessage || "Unexpected error");
                                }
                            })
                            .catch((error) =>
                            {
                                console.log(error)
                                actions.setStatus({ message: "Error: " + error?.response?.data?.errorMessage || "Unexpected error" });
                                toast.error("Error: " + error?.response?.data?.errorMessage || "Unexpected error");
                            })
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
                                <DialogTitle>Create Collection</DialogTitle>
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
                                            options={[
                                                { label: 'Private', value: 'PRIVATE' },
                                                { label: 'Public', value: 'PUBLIC' },
                                            ]}
                                        />
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
                                        <FormControl style={{ marginTop: "1em" }}>
                                            <ColorPicker name={"collectionColor"} value={values.collectionColor}
                                                onChange={(value) => setFieldValue("collectionColor", value)}
                                            />
                                        </FormControl>
                                    </div>
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
export default useCreateCollectionDialog;


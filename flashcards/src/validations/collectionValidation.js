import * as Yup from "yup";

const collectionValidation = Yup.object(
    {
        title: Yup.string().required("Required field!"),
        visibility: Yup.mixed().oneOf(["PRIVATE", "PUBLIC"]),
        category: Yup.string().required("Required field!"),
        collectionColor: Yup.object().required("Required field!")
    }
);
export default collectionValidation;
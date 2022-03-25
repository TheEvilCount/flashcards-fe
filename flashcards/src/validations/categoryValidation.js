import * as Yup from "yup";

const categoryValidation = Yup.object(
    {
        title: Yup.string()
            .min(1, "Type at least 1 character!")
            .max(30, "Maximum is 30 characters!")
            .required("Required field!"),
    }
);
export default categoryValidation;
import * as Yup from "yup";

const cardValidation = Yup.object(
    {
        frontText: Yup.string().min(1, "Type at least 1 character!").required("Required field!"),
        backText: Yup.string().min(1, "Type at least 1 character!").required("Required field!"),
    }
);
export default cardValidation;
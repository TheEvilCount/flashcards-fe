import * as Yup from "yup";

const lostPassValidation = Yup.object(
    {
        email: Yup.string()
            .required("Required field!")
            .min(5, "Email must contains 5 or more characters!")
            .email("Please provide a valid email address!")
    }
);
export default lostPassValidation;
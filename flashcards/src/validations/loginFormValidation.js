import * as Yup from "yup";

const loginFormValidation = Yup.object(
    {
        email: Yup.string()
            .required("Required field!")
            .min(5, "Email must contains 5 or more characters!")
            .email("Please provide a valid email address!"),
        password: Yup.string()
            .required("Required field!")
            .min(6, "Password must contains 6 or more characters!"),
    }
);
export default loginFormValidation;
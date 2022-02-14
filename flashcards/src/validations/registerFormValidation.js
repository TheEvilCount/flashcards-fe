import * as Yup from "yup";

const registerFormValidation = Yup.object(
    {
        email: Yup.string()
            .required("Required field!")
            .min(5, "Email must contains 5 or more characters!")
            .email("Please provide a valid email address!"),
        username: Yup.string()
            .required("Required field!")
            .min(5, "Username must cantains 5 or more characters!")
            .max(20, "Username is too long! (max 20 characters)"),
        password: Yup.string()
            .required("Required field!")
            .min(8, "Password must contains 8 or more characters!"),
        passwordRepeat: Yup.string()
            .required("Required field!")
            .test('passwordsRepeat', "Password do not match!", function (value)
            {
                return this.parent.password === value
            })
    }
);
export default registerFormValidation;
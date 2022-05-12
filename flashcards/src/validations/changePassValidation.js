import * as Yup from "yup";

const changePassValidation = Yup.object(
    {
        oldPassword: Yup.string().required("Required field!"),
        newPassword: Yup.string().required("Required field!")
            .min(8, "Password must contains 8 or more characters!")
            .max(100, "Password must contains maximum 100 characters!")
            .test("password-c-ch", "Password must contains at least one lower and one uppercase letter!", function (value)
            {
                return value.toLowerCase() != value && value.toUpperCase != value
            }),
        newPasswordRep: Yup.string().required("Required field!")
            .test("passwords-match", "Passwords must match!", function (value)
            {
                return this.parent.newPassword === value;
            })
    }
);
export default changePassValidation;
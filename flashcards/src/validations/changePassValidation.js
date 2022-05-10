import * as Yup from "yup";

const changePassValidation = Yup.object(
    {
        oldPassword: Yup.string().required("Required field!"),
        newPassword: Yup.string().required("Required field!")
            .min(8, "Password must be at least 8 characters long!")
            .max(100, "Password must be maximum 100 characters long!")
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
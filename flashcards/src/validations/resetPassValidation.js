import * as Yup from "yup";

const resetPassValidation = Yup.object(
    {
        password: Yup.string().required("Required field!")
            .min(8, "Password must contains 8 or more characters!")
            .max(100, "Password must contains maximum 100 characters!")
            .test("password-c-ch", "Password must contains at least one lower and one uppercase letter!", function (value)
            {
                return value.toLowerCase() != value && value.toUpperCase != value
            }),
        passwordRepeat: Yup.string()
            .required("Required field!")
            .test('passwordsRepeat', "Password do not match!", function (value)
            {
                return this.parent.password === value
            })
    }
);
export default resetPassValidation;
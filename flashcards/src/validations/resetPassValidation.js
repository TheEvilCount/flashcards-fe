import * as Yup from "yup";

const resetPassValidation = Yup.object(
    {
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
export default resetPassValidation;
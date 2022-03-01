/* if (!(passwordNew.length >= 5 && passwordNew.length <= 100))
        {
            //registerFailAction(dispatch, "Password must be between 5 and 100 characters!");
            setError("Password must be between 5 and 100 characters!");
        }
        else if (passwordNew !== passwordNewRep)
        {
            //registerFailAction(dispatch, "Password do not match!");
            setError("Password do not match!");
        }
        else if (!passwordNewRep)
        {
            //registerFailAction(dispatch, "Pleas repeat password!");
            setError("Please repeat password!");
        }//TODO
        else */


import * as Yup from "yup";

const changePassValidation = Yup.object(
    {
        oldPassword: Yup.string().required("Required field!"),
        newPassword: Yup.string().required("Required field!")
            .min(8, "Password must be at least 8 characters long!")
            .max(100, "Password must be maximum 100 characters long!"),
        newPasswordRep: Yup.string().required("Required field!")
            .test("passwords-match", "Passwords must match!", function (value)
            {
                return this.parent.newPassword === value;
            })
    }
);
export default changePassValidation;
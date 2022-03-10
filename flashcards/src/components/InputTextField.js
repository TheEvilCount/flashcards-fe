//import { ErrorMessage, Field } from 'formik';
import PropTypes from "prop-types"
//import { FormikTextField } from 'formik-material-fields';
import { useField } from "formik";
import { TextField } from "@mui/material";


/* export default function InputTextField({ name, type, label, placeholder, error, touched, required = true, ...props })
{
    return (
        <div className="form-group">
            <FormikTextField name={name} label={label} margin="normal" type={type} fullWidth required={required} {...props} />
        </div>
    )
} */

const InputTextField = ({ name, type = "text", label, variant = "standard", required = false, multiline = false, ...props }) =>
{
    const [field, meta] = useField(name);
    return (
        <TextField
            name={field.name}
            id={field.name}
            label={label}
            type={type}
            variant={variant}
            margin="normal"
            helperText={meta.touched ? meta.error : ""}
            error={meta.touched && Boolean(meta.error)}
            value={field.value}
            onChange={field.onChange}
            required={required}
            multiline={multiline}
            {...props}
        />
    )
}

InputTextField.propTypes = {
    label: PropTypes.string,
    multiline: PropTypes.bool,
    name: PropTypes.string,
    required: PropTypes.bool,
    type: PropTypes.string,
    variant: PropTypes.string
}


export default InputTextField;
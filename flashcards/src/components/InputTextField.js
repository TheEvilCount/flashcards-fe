import { ErrorMessage, Field } from 'formik';
import { FormikTextField } from 'formik-material-fields';


export default function InputTextField({ name, type, label, placeholder, error, touched, required = true, ...rest })
{
    return (
        <div className="form-group">
            {/* <label htmlFor={name}>{label}</label>
            <Field name={name} placeholder={placeholder} type={type} className="form-control" {...rest} /> */}
            {/* <TextField id={name} name={name} defaultValue={placeholder} type={type} label={label} variant="outlined"
                error={error && touched} /> */}
            {/* <ErrorMessage name={name} component="div" className="error" /> */}
            <FormikTextField name={name} label={label} margin="normal" type={type} fullWidth required={required} />
        </div>
    )
};
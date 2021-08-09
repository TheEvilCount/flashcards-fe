import { ErrorMessage, Field } from 'formik';


export default function InputTextField({ name, type, label, placeholder, ...rest })
{
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <Field name={name} placeholder={placeholder} type={type} className="form-control" {...rest} />
            <ErrorMessage name={name} component="div" className="error" />
        </div>
    )
};
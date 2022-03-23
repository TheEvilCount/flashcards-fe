import PropTypes from "prop-types"
import { Autocomplete, CircularProgress, FormHelperText, TextField } from '@mui/material';
import { useField } from 'formik';

export default function FormikMUIAutocomplete({ formikName, label, loading, ...props })
{
    // eslint-disable-next-line no-unused-vars
    const [field, meta, helper] = useField(formikName);

    return (
        <span>
            <Autocomplete
                sx={{ m: 2, minWidth: 120 }}
                onBlur={() => helper.setTouched(true)}
                onChange={
                    (_, value) =>
                    {
                        helper.setValue(value);
                        console.log(value);
                    }
                }
                {...props}
                renderInput={(params) => <TextField
                    {...params}
                    label={label}
                    error={meta.error}
                    helperText={meta.touched ? meta.error : ""}
                    InputProps={{
                        ...params.InputProps,
                        type: 'search',
                        endAdornment: (
                            <>
                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </>),
                    }}
                />
                }
            />
            <FormHelperText>{meta.touched ? meta.error : ""}</FormHelperText>
        </span>
    );
}

FormikMUIAutocomplete.propTypes = {
    formikName: PropTypes.string,
    loading: PropTypes.bool,
    label: PropTypes.string
}
{/* <FormControl
            error={meta.touched && Boolean(meta.error)}
            sx={{ m: 2, minWidth: 120 }}
            fullwidth={fullwidth}
        >
            <Autocomplete {...props} fullwidth={fullwidth} />
            <FormHelperText>{meta.touched ? meta.error : ""}</FormHelperText>
        </FormControl> */}
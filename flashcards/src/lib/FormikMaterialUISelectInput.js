import PropTypes from "prop-types"
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import { useField } from 'formik';

export default function FormikMaterialUISelectInput({ formikName, label, options, isLoading, loadingError, ...props })
{
    const [field, meta] = useField(formikName);
    return (
        <FormControl
            variant='standard'
            error={meta.touched && Boolean(meta.error) || Boolean(loadingError)}
            sx={{ m: 2, minWidth: 120 }}
            {...props}>
            <InputLabel id={"my-mui-select-label-" + field.name}>{label}</InputLabel>
            <Select
                labelId={"my-mui-select-label-" + field.name}
                name={field.name}
                id={"my-mui-select-" + label}
                value={field.value}
                label={label}
                onChange={field.onChange}
                onBlur={field.onBlur}
                disabled={isLoading || loadingError}
            >
                {(() =>
                {
                    return options?.map((el, idx) =>
                    {
                        return <MenuItem key={"my-mui-select-" + field.name + "-" + idx} value={el.value}>{el.label}</MenuItem>;
                    });
                })()}
            </Select>

            {(isLoading) && <FormHelperText>Loading options</FormHelperText>}
            {(loadingError) && <FormHelperText>Error when options loading.</FormHelperText>}
            <FormHelperText>{meta.touched ? meta.error : ""}</FormHelperText>
        </FormControl>
    );
}
FormikMaterialUISelectInput.propTypes = {
    formikName: PropTypes.string,
    isLoading: PropTypes.bool,
    label: PropTypes.string,
    loadingError: PropTypes.any,
    options: PropTypes.array
}

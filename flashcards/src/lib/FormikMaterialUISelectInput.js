import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import { useField } from 'formik';

export default function FormikMaterialUISelectInput({ formikName, label, options, ...props })
{
    const [field, meta, helpers] = useField(formikName);
    return (
        <FormControl
            variant='standard'
            error={meta.touched && Boolean(meta.error)}
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
            >
                {(() =>
                {
                    return options?.map((el, idx) =>
                    {
                        return <MenuItem key={"my-mui-select-" + field.name + "-" + idx} value={el.value}>{el.label}</MenuItem>;
                    });
                })()}
            </Select>
            <FormHelperText>{meta.touched ? meta.error : ""}</FormHelperText>
        </FormControl>
    );
}
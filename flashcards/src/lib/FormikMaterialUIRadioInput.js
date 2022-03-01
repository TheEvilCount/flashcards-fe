import { FormControl, FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup } from '@mui/material';
import { useField } from 'formik';

export default function FormikMaterialUIRadioInput({ formikName, label, options, row, ...props })
{
    const [field, meta, helpers] = useField(formikName);
    return (
        <FormControl
            variant='standard'
            error={meta.touched && Boolean(meta.error)}
            sx={{ m: 2, minWidth: 120 }}
            {...props}
        >
            <FormLabel id={"my-mui-radio-label-" + field.name}>{label}</FormLabel>
            <RadioGroup
                aria-labelledby={"my-mui-radio-label-" + field.name}
                name={field.name}
                id={"my-mui-radio-" + label}
                value={field.value}
                label={label}
                onChange={field.onChange}
                onBlur={field.onBlur}
                row={row || false}
            >
                {(() =>
                {
                    return options?.map((el, idx) =>
                    {
                        return (
                            <FormControlLabel
                                key={"my-mui-radio-" + field.name + "-" + idx}
                                value={el.value}
                                label={el.label}
                                control={<Radio />}
                            />
                        );
                    });
                })()}
            </RadioGroup>
            <FormHelperText>{meta.touched ? meta.error : ""}</FormHelperText>
        </FormControl>
    );
}
import PropTypes from 'prop-types';
import { useField } from "formik";
import { TextField } from "@mui/material";

function InputField({ label, ...props }) {
    const [field, meta] = useField(props);

    return (
        <TextField
            fullWidth
            label={label}
            {...field}
            {...props}
            variant="standard"
            error={meta.touched && Boolean(meta.error)}
            helperText={meta.touched && meta.error}
        />
    )
}

InputField.propTypes = {
    label: PropTypes.string.isRequired,
};

export { InputField }
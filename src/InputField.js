import TextField from '@mui/material/TextField';

import PropTypes from 'prop-types';

const InputField = props => {

    const { label, type, value, handleChange } = props;

    return (
        <TextField
            label={label}
            type={type}
            value={value}
            onChange={handleChange}
            variant='outlined'
            color='primary'
        />
    )
}

InputField.propTypes = {
    type: PropTypes.string.isRequired,
    label: PropTypes.string,
    handleChange: PropTypes.func,
}

export default InputField;
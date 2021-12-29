import React from 'react';
import InputField from './InputField';

import Save from '@mui/icons-material/Save';
import IconButton from '@mui/material/IconButton';

import PropTypes from 'prop-types';

class AddCourse extends React.Component {


    render () {
        const { handleSubmit } = this.props;
        return (
            <form>
                <h1>Add Course</h1>
                <div style={{ display: 'inline-flex' }}>
                <InputField
                    type="text"
                    label="Course Name"
                />
                <InputField
                    type="text"
                    label="Tees"
                />
                </div>
                <div style={{ display: 'inline-flex' }}>
                <InputField
                    type='number'
                    label='Par'
                />
                <InputField
                    type='number'
                    label='CR'
                />
                <InputField
                    type='number'
                    label='Slope'
                />
                <IconButton
                    onClick={handleSubmit}
                    color='primary'
                    size='large'
                >
                    <Save />
                </IconButton>
                </div>
            </form>
        )
    }
}

AddCourse.propTypes = {
    handleSubmit: PropTypes.func.isRequired
};

export default AddCourse;
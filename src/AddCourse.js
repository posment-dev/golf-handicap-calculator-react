import React from 'react';
import InputField from './InputField';

import Save from '@mui/icons-material/Save';
import IconButton from '@mui/material/IconButton';

import PropTypes from 'prop-types';

function AddCourse(props) {
    
    const { handleSubmit } = props;
    return (
        <form onSubmit={(event) => handleSubmit(event)}>
            <h1>Add Course</h1>
            <div style={{ display: 'inline-flex' }}>
                <InputField
                    type='text'
                    label='Course Name'
                    name='courseName'
                />
                <InputField
                    type='text'
                    label='Tees'
                    name='tees'
                />
                </div>
                <div style={{ display: 'inline-flex' }}>
                <InputField
                    type='number'
                    label='Par'
                    name='par'
                />
                <InputField
                    type='text'
                    label='CR'
                    name='courseRating'
                />
                <InputField
                    type='number'
                    label='Slope'
                    name='slope'
                />
                <IconButton
                    type='submit'
                    color='primary'
                    size='large'
                >
                    <Save />
                </IconButton>
            </div>
        </form>
    )
}

AddCourse.propTypes = {
    handleSubmit: PropTypes.func.isRequired
};

export default AddCourse;
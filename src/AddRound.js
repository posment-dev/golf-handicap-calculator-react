import React, { useState } from 'react';
import InputField from './InputField';
import BasicSelect from './BasicSelect';
import { ScoreType } from './Enums'

import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';

import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import Box from '@mui/material/Box'

import DatePicker from '@mui/lab/DatePicker';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import deLocale from 'date-fns/locale/de';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import Save from '@mui/icons-material/Save';
import IconButton from '@mui/material/IconButton';

import PropTypes from 'prop-types';

function AddRound(props) {

    const { handleSubmit, courses, loading } = props;

    const [date, setDate] = useState(new Date());
    
    return (
        <form onSubmit={(event) => handleSubmit(event)}>
            <h1>Add Round</h1>
                <Box sx={{
                    display: 'grid',
                    p: 1,
                    m: 1,
                    gridTemplateColumns: 'repeat(2, 1fr)'
                }}>
                    <Box sx={{
                    display: 'grid',
                    p: 1,
                    m: 1,
                    }}>
                        <LocalizationProvider dateAdapter={AdapterDateFns} locale={deLocale}>
                            <DatePicker
                                label='Date'
                                mask='__.__.____'
                                disableFuture
                                name='datePicker'
                                value={date}
                                renderInput={(params) => <TextField {...params} name='roundDate' color='primary' />}
                                onChange={(newValue) => {
                                    setDate(newValue);
                                }}
                            />
                        </LocalizationProvider>
                    </Box>
                    <Box sx={{
                        display: 'grid',
                        p: 1,
                        m: 1,
                    }}>
                        <BasicSelect courses={courses} loading={loading}/>
                    </Box>
                </Box>
                <Box sx={{
                    display: 'grid',
                    p: 1,
                    m: 1,
                    gridTemplateColumns: 'repeat(4, 1fr)'
                }}>
                    <Box sx={{
                    display: 'grid',
                    p: 1,
                    m: 1,
                    }}>
                        <FormLabel>Score Typ</FormLabel>
                        <RadioGroup
                            name='scoreTyp'
                            //onChange={this.onScoreTypChange}
                            row
                        >
                            {Object.keys(ScoreType).map( type => {
                               return (
                                 <FormControlLabel
                                    key={type}
                                    value={type}
                                    label={type} 
                                    control={<Radio size='small' />
                                  }/>    
                                )
                            })}
                        </RadioGroup>
                    </Box>
                    <Box sx={{
                        display: 'grid',
                        p: 1,
                        m: 1,
                    }}>
                        <InputField
                            name='score'
                            type='number'
                            label='Score'
                        />
                    </Box>
                    <Box sx={{
                        display: 'grid',
                        p: 1,
                        m: 1,
                    }}>
                        <InputField
                            name='adjGrossScore'
                            type='number'
                            label='Adjusted Gross Score'
                        />
                    </Box>
                    <Box sx={{
                        display: 'grid',
                        p: 1,
                        m: 1,
                    }}>
                        <InputField
                            name='pcc'
                            type='number'
                            label='PCC'
                        />
                    </Box>
                    <Box sx={{
                        display: 'grid',
                        p: 1,
                        m: 1,
                    }}>
                        <IconButton
                            type='submit'
                            color='primary'
                            size='large'
                        >
                            <Save />
                        </IconButton>
                    </Box>
                </Box>
        </form>
    )
}

AddRound.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    loading: PropTypes.bool
};

export default AddRound;
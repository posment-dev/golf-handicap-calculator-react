import React, { useState } from 'react';
import InputField from './InputField';
import SimpleListMenu from './SimpleListMenu';
import { addCourseAction, selectCourses } from './store';
import { useDispatch, useSelector } from 'react-redux';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';

import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';

import DatePicker from '@mui/lab/DatePicker';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import deLocale from 'date-fns/locale/de';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import Save from '@mui/icons-material/Save';
import IconButton from '@mui/material/IconButton';

import PropTypes from 'prop-types';

function AddRound(props) {

    const { handleSubmit } = props;

    const [date, setDate] = useState(new Date());
    const [course, setCourse] = useState('');

    const courses = [];

    /*add dummy data to redux store
    const dispatch = useDispatch();
    let dummycourse = {
        name: 'Goldi',
        tees: 'Weiss',
        par: 70,
        cr: 69.8,
        slope: 121,
      };
      dispatch(addCourseAction(dummycourse));
      dummycourse = {
          ...course,
          tees: 'Gelb',
      }
      dispatch(addCourseAction(dummycourse));
      const courses = useSelector(selectCourses);*/

    /*const onScoreTypChange = (event) => {
        // do something
    }*/
    
    return (
        <form onSubmit={(event) => handleSubmit(event, date)}>
            <h1>Add Round</h1>
            <Grid container alignItems="center" justify="center" direction="column">
                <Grid item>
                <LocalizationProvider dateAdapter={AdapterDateFns} locale={deLocale}>
                    <DatePicker
                        label='Date'
                        mask='__.__.____'
                        disableFuture
                        value={date}
                        renderInput={(params) => <TextField {...params} name='date' color='primary' />}
                        onChange={(newValue) => {
                            setDate(newValue);
                        }}
                    />
                    </LocalizationProvider>
                </Grid>
                <Grid item>
                    <SimpleListMenu />
                </Grid>
                <Grid item xs={12} lg={6} xl={6}>
                    <FormLabel>Score Typ</FormLabel>
                    <RadioGroup
                        name='scoreTyp'
                        //onChange={this.onScoreTypChange}
                        row
                    >
                        <FormControlLabel 
                            key='Stableford'
                            value='Stableford'
                            label='Stableford'
                            control={<Radio size='small' />}                        
                        />
                        <FormControlLabel 
                            key='Strokeplay'
                            value='Strokeplay'
                            label='Strokeplay'
                            control={<Radio size='small' />}
                        />
                    </RadioGroup>
                <Grid item xs={12} lg={6} xl={6}>
                </Grid>
                    <InputField
                        name='score'
                        type='number'
                        label='Score'
                    />
                    <InputField
                        name='pcc'
                        type='number'
                        label='PCC'
                    />
                    <IconButton
                        type='submit'
                        color='primary'
                        size='large'
                    >
                        <Save />
                    </IconButton>
                </Grid>
            </Grid>
        </form>
    )
}

AddRound.propTypes = {
    handleSubmit: PropTypes.func.isRequired
};

export default AddRound;
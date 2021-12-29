import React from 'react';
import InputField from './InputField';
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

import PropTypes from 'prop-types';

class AddRound extends React.Component {

    constructor (props) {
        super(props);

        this.state = {
            date: new Date(),
        }
    }
    onScoreTypChange = (event) => {
        // do something
    }


    render () {
        //const { handleSubmit } = this.props;
        return (
            <form>
                <h1>Add Round</h1>
                <Grid container alignItems="center" justify="center" direction="column">
                    <Grid item>
                    <LocalizationProvider dateAdapter={AdapterDateFns} locale={deLocale}>
                        <DatePicker
                            label="Date"
                            mask='__.__.____'
                            disableFuture
                            value={this.state.date}
                            renderInput={(params) => <TextField {...params} />}
                            onChange={(newValue) => {
                                this.setState({date: newValue});
                            }}
                        />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12} lg={6} xl={6}>
                        <FormLabel>Score Typ</FormLabel>
                        <RadioGroup
                            name='Score Typ'
                            onChange={this.onScoreTypChange}
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
                            type='number'
                            label='Score'
                        />
                        <InputField
                            type='number'
                            label='PCC'
                        />
                    </Grid>
                </Grid>
            </form>
        )
    }
}

AddRound.propTypes = {
    handleSubmit: PropTypes.func.isRequired
};

export default AddRound;
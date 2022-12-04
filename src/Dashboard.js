import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Delete from '@mui/icons-material/Delete';

import { handleRemoveRound, handleAddRound } from './store';
import { useDispatch } from 'react-redux';

import AddRound from './AddRound';
import { findHighestIdObjectArray } from './Utils';

import PropTypes from 'prop-types';

const RoundList = (props) => {

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: theme.palette.common.black,
          color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
        },
    }));

    const { hcp, loading } = props;
    const dispatch = useDispatch();


    if (loading === true) {
        return (<h3>Loading...</h3>)
    }

    return (
        <div>
            <h1>Dashboard</h1>
            <h1>HCP: {hcp.currentHcp}</h1>
            <h2>Lowest Score Differential: {hcp.lowestSD} | Highest Score Differential: {hcp.highestSD}</h2>
        </div>
    );
}

RoundList.propTypes = {
    courses: PropTypes.array,
    rounds: PropTypes.array,
    loading: PropTypes.bool
}

export default RoundList;
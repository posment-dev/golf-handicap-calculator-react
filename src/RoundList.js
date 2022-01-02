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

import { addRoundAction, removeRoundAction } from './store';
import { useDispatch } from 'react-redux';

import axios from 'axios';

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

    const removeRound = round => {
        dispatch(removeRoundAction(round.id));
        axios.delete('http://localhost:5050/round/' + round.id)
        .catch((err) => {
            console.log(err);
            dispatch(addRoundAction(round));
            alert('Delete failed. Try again.');
        });

    }

    const { courses, rounds, loading } = props;
    const dispatch = useDispatch();


    if (loading === true) {
        return (<h3>Loading...</h3>)
    }

    return (
        <div>
            <h1>Rounds</h1>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Date</StyledTableCell>
                            <StyledTableCell>Course / Tees</StyledTableCell>
                            <StyledTableCell>Score Typ</StyledTableCell>
                            <StyledTableCell align="right">Score</StyledTableCell>
                            <StyledTableCell align="right">PCC</StyledTableCell>
                            <StyledTableCell />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rounds.map((round) => (
                        <TableRow
                            key={round.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <StyledTableCell>{round.date}</StyledTableCell>
                            <StyledTableCell>
                                { courses.filter(course => 
                                    course.id === round.courseId
                                ).map(course => 
                                    course.name + '/' + course.tees
                                )[0]
                                }
                            </StyledTableCell>
                            <StyledTableCell>{round.scoreTyp}</StyledTableCell>
                            <StyledTableCell align="right">{round.score}</StyledTableCell>
                            <StyledTableCell align="right">{round.pcc}</StyledTableCell>
                            <StyledTableCell align='right'>
                            <IconButton
                                type='submit'
                                color='primary'
                                size='large'
                                onClick={() => { removeRound(round) }}
                            >
                                <Delete />
                            </IconButton>
                            </StyledTableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

RoundList.propTypes = {
    courses: PropTypes.array,
    rounds: PropTypes.array,
    loading: PropTypes.bool
}

export default RoundList;